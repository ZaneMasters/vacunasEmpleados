<template>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <label for="estadoVacunacion">Estado de Vacunación:</label>
          <select id="estadoVacunacion" class="form-select" v-model="filtroEstadoVacunacion" @change="filtrarEmpleados">
            <option value="">Todos</option>
            <option value="Vacunado">Vacunado</option>
            <option value="No Vacunado">No Vacunado</option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="tipoVacuna">Tipo de Vacuna:</label>
          <select id="tipoVacuna" class="form-select" v-model="filtroTipoVacuna" @change="filtrarEmpleados">
            <option value="">Todos</option>
            <option value="Sputnik">Sputnik</option>
            <option value="AstraZeneca">AstraZeneca</option>
            <option value="Pfizer">Pfizer</option>
            <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="fechaInicio">Fecha de Inicio:</label>
          <input id="fechaInicio" type="date" class="form-control" v-model="filtroFechaInicio" @change="filtrarEmpleados">
        </div>
        <div class="col-md-3">
          <label for="fechaFin">Fecha de Fin:</label>
          <input id="fechaFin" type="date" class="form-control" v-model="filtroFechaFin" @change="filtrarEmpleados">
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="row">
            <div v-for="empleado in empleadosFiltrados" :key="empleado.cedula" class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ empleado.nombres }}</h5>
                  <p class="card-text">Estado de Vacunación: {{ empleado.estado_vacunacion }}</p>
                  <p class="card-text">Tipo de Vacuna: {{ empleado.tipo_vacuna }}</p>
                  <p class="card-text">Fecha de Vacunación: {{ empleado.fecha_vacunacion }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Empleados } from '@/interfaces/Empleados';
  import { getEmpleados } from '@/services/EmpleadoService';
  
  export default defineComponent({
    data() {
      return {
        empleados: [] as Empleados[],
        empleadosFiltrados: [] as Empleados[],
        filtroEstadoVacunacion: '' as string,
        filtroTipoVacuna: '' as string,
        filtroFechaInicio: null as string | null,
        filtroFechaFin: null as string | null
      };
    },
    async created() {
      await this.cargarEmpleados();
      this.filtrarEmpleados();
    },
    methods: {
      async cargarEmpleados() {
        try {
          const response = await getEmpleados();
          this.empleados = response.data;
          console.log(this.empleados);
        } catch (error) {
          console.error("Error al cargar empleados:", error);
        }
      },
      filtrarEmpleados() {
        this.empleadosFiltrados = this.empleados.filter(empleado => {
          let cumpleEstado = true;
          let cumpleTipo = true;
          let cumpleFecha = true;
  
          // Filtro por estado de vacunación
          if (this.filtroEstadoVacunacion) {
            cumpleEstado = empleado.estado_vacunacion === this.filtroEstadoVacunacion;
          }
  
          // Filtro por tipo de vacuna
          if (this.filtroTipoVacuna) {
            cumpleTipo = empleado.tipo_vacuna === this.filtroTipoVacuna;
          }
  
          // Filtro por rango de fecha de vacunación
          if (this.filtroFechaInicio && this.filtroFechaFin) {
            const fechaVacunacion = new Date(empleado.fecha_vacunacion);
            const fechaInicio = new Date(this.filtroFechaInicio);
            const fechaFin = new Date(this.filtroFechaFin);
            cumpleFecha = fechaVacunacion >= fechaInicio && fechaVacunacion <= fechaFin;
          }
  
          return cumpleEstado && cumpleTipo && cumpleFecha;
        });
      }
    }
  });
  </script>
  