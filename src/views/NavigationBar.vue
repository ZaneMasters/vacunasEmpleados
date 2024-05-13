<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/employees">Vacunación de Empleados</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/employee/filter">Filtro Lista</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/employees">Lista Empleados</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/employee/register">Nuevo Empleado</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Log Out</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavigationBar",
});
</script>