<template>
  <ul class="list-group">
    <li
      class="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-3"
      style="cursor: pointer"
      v-for="(task, index) in tasks"
      :key="index"
      @click="this.$router.push(`/employee/${task._id}`)"
    >
      <div>
        <span class="fw-bold">{{ index + 1 }}.</span>
        <span>{{ task.nombres }} {{ task.apellidos }}</span>
      </div>
      <span class="badge bg-primary rounded-pill">{{ task.estado_vacunacion }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Empleados } from "@/interfaces/Empleados";
import { getEmpleados } from "@/services/EmpleadoService";
import { defineComponent } from "vue";

export default defineComponent({
  name: "tasks-list",
  data() {
    return {
      tasks: [] as Empleados[],
    };
  },
  methods: {
    async loadTasks() {
      try {
        const res = await getEmpleados();
        this.tasks = res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.loadTasks();
  },
});
</script>