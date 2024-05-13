<template>
  <div class="col-md-4 offset-md-4">
    <form @submit.prevent="handleUpdate()" class="card card-body">
      <h1 class="card-title my-3 text-center">Editar Empleado</h1>

      <input
        type="number"
        v-model="currentTask.cedula"
        class="form-control mb-3"
      />

      <input
        type="text"
        v-model="currentTask.nombres"
        class="form-control mb-3"
        pattern="[a-zA-Z\s]+"
          title="El nombre no debe contener números ni caracteres especiales"
          required
          autofocus
      />

      <input
        type="text"
        v-model="currentTask.apellidos"
        class="form-control mb-3"
        pattern="[a-zA-Z\s]+"
          title="El apellido no debe contener números ni caracteres especiales"
          required
          autofocus
      />

      <input
        type="email"
        v-model="currentTask.correo"
        class="form-control mb-3"
      />


      <button class="btn btn-primary"  
      :disabled="!currentTask.cedula || !currentTask.nombres || !currentTask.apellidos || !currentTask.correo"
      >Update</button>
    </form>
  <div class="text-center">
    <button @click="handleDelete()" class="btn btn-danger my-4">delete</button>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Empleados } from "@/interfaces/Empleados";
import { deleteEmpleados, getEmpleadosId, updateEmpleados } from "@/services/EmpleadoService";

export default defineComponent({
  name: "TaskDetail",
  data() {
    return {
      currentTask: {} as Empleados,
    };
  },
  methods: {
    async loadTask(id: string) {
      try {
        const { data } = await getEmpleadosId(id);
        this.currentTask = data;
      } catch (error) {
        console.error(error);
      }
    },
    async handleUpdate() {
      try {
        if (typeof this.$route.params.id === "string") {
          await updateEmpleados(this.$route.params.id, this.currentTask);
          this.$router.push("/employees");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          deleteEmpleados(this.$route.params.id);
          this.$router.push("/employees");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadTask(this.$route.params.id);
    }
  },
});
</script>