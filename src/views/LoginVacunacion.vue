<template>
  <div class="col-md-5 offset-3">
    <div class="card card-body">
      <h1 class="card-title my-5 text-center">Login</h1>
      <form @submit.prevent="logearse()">
        <input
          class="form-control mb-3"
          placeholder="Usuario"
          type="text"
          v-model="task.username"
        />
        <input
          class="form-control mb-3"
          placeholder="Contraseña"
          type="password"
          v-model="task.password"
        />

        <button
          class="btn btn-primary w-100"
          :disabled="!task.username || !task.password"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Login } from "@/interfaces/Logins";
import { loginadmin } from "@/services/LoginService";
import { Empleados } from "@/interfaces/Empleados";
import { getEmpleados } from "@/services/EmpleadoService";

export default defineComponent({
  data() {
    return {
      task: {} as Login,
      tasks: [] as Empleados[],
    };
  },
  methods: {
    async logearse() {
      try {
        const res = await loginadmin(this.task);
        console.log(res);
        if (res.data.message === "Credenciales correctas admin") {
          this.$router.push({ name: "employees" });
        } else {
          const lastId = await this.getUserId();
          this.$router.push({ path: `/employeeupdate/${lastId}`});
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getUserId() {
      try {
        const res = await getEmpleados();
        this.tasks = res.data;

        // Buscar el objeto que tenga el correo electrónico introducido
        const correoIntroducido = this.task.username;
        let empleadoEncontrado = null;
        for (const empleado of this.tasks) {
          if (empleado.correo === correoIntroducido) {
            empleadoEncontrado = empleado;
            break; // Detener el bucle una vez que se encuentre el empleado
          }
        }

        // Verificar si se encontró el empleado y obtener su ID
        if (empleadoEncontrado) {
          const lastId = empleadoEncontrado._id;
          console.log(lastId);
          return lastId;
        } else {
          console.log("Empleado no encontrado");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
