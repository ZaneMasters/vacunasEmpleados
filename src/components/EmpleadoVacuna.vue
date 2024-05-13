<template>
  <div class="col-md-4 offset-md-4">
    <form @submit.prevent="handleUpdate()" class="card card-body">
      <h1 class="card-title my-3 text-center">Actualizar mi Informacion</h1>

      <input
        type="date"
        v-model="currentTask.fecha_nacimiento"
        placeholder="Fecha de Nacimiento"
        class="form-control mb-3"
      />

      <input
        type="text"
        v-model="currentTask.direccion_domicilio"
        placeholder="Direccion domicilio"
        class="form-control mb-3"
      />

      <input
        type="number"
        v-model="currentTask.telefono_movil"
        placeholder="Telefono movil"
        class="form-control mb-3"
      />

      <input
        type="text"
        v-model="currentTask.estado_vacunacion"
        class="form-control mb-3"
      />

      <div v-if="currentTask.estado_vacunacion === 'Vacunado'">
        <div class="form-group">
          <label for="tipoVacuna">Seleccione tipo de vacuna:</label>
          <select
            id="tipoVacuna"
            v-model="currentTask.tipo_vacuna"
            class="form-control mb-3"
            placeholder="Cédula"
          >
            <option value="Sputnik">Sputnik</option>
            <option value="AstraZeneca">AstraZeneca</option>
            <option value="Pfizer">Pfizer</option>
            <option value="Johnson&Johnson">Johnson&Johnson</option>

            
          </select>
        </div>

        <input
          type="date"
          v-model="currentTask.fecha_vacunacion"
          class="form-control mb-3"
          placeholder="Fecha de vacunación"
        />

        <input
          type="number"
          v-model="currentTask.numero_dosis"
          class="form-control mb-3"
          placeholder="Número de dosis"
        />
      </div>

      <button
        class="btn btn-primary"
        :disabled="
          !currentTask.fecha_nacimiento ||
          !currentTask.direccion_domicilio ||
          !currentTask.telefono_movil ||
          !currentTask.estado_vacunacion
        "
      >
        Update
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Empleados } from "@/interfaces/Empleados";
import {
  getEmpleadosId,
  updateEmpleados,
} from "@/services/EmpleadoService";

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
          alert("Gracias! Por actualizar tus datos...");
          this.$router.push("/login");
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
