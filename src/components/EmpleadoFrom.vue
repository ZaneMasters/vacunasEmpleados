<template>
  <div class="col-md-5 offset-3">
    <div class="card card-body">
      <h1 class="card-title my-5 text-center">Registrar Empleado</h1>
      <form @submit.prevent="saveEmployee()">
        <div class="form-text">
          La cédula debe contener exactamente 10 dígitos
        </div>
        
        <input
          class="form-control mb-3"
          placeholder="Cédula"
          type="number"
          v-model="task.cedula"
          pattern="{10}"
          title="La cédula debe contener exactamente 10 dígitos"
          required
          autofocus
        />


        <input
          class="form-control mb-3"
          placeholder="Nombres"
          type="text"
          v-model="task.nombres"
          pattern="[a-zA-Z\s]+"
          title="El nombre no debe contener números ni caracteres especiales"
          required
          autofocus
        />
        <input
          class="form-control mb-3"
          placeholder="Apellidos"
          type="text"
          v-model="task.apellidos"
          pattern="[a-zA-Z\s]+"
          title="El apellido no debe contener números ni caracteres especiales"
          required
          autofocus
        />
        <input
          class="form-control mb-3"
          placeholder="Correo"
          type="email"
          v-model="task.correo"
          autofocus
        />

        <button
          class="btn btn-primary w-100"
          :disabled="!task.cedula || !task.nombres || !task.apellidos || !task.correo"
        >
          Registrar
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Empleados } from "@/interfaces/Empleados";
import { Login } from "@/interfaces/Logins";
import { createEmpleados, getEmpleados } from "@/services/EmpleadoService";
import { loginuser } from "@/services/LoginService";

export default defineComponent({
  data() {
    return {
      task: {} as Empleados,
      user: {} as Login,
      tasks: [] as Empleados[],
    };
  },
  methods: {
    async saveEmployee() {
      try {
        const res = await createEmpleados(this.task);
        this.saveUser();
        this.$router.push({ name: "employees" });
      } catch (error) {
        console.error(error);
      }
    },
    async saveUser() {
      try {
        this.user.username=this.task.correo;
        this.user.password=this.task.cedula.toString();
        const res = await loginuser(this.user);
        this.getUserId();
        alert(`usuario: ${this.user.username}  contraseña: ${this.user.password}`);
        this.$router.push({ name: "login-admin" });
      } catch (error) {
        console.error(error);
      }
    },
    async getUserId() {
      try {
        const res = await getEmpleados();
        this.tasks = res.data;
        const lastId=this.tasks[this.tasks.length-1];
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>