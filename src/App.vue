<template>
    <NavigationBar v-if="showNavigationBar"/>
  <main class="container py-5">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from './views/NavigationBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavigationBar
  },
  computed: {
    showNavigationBar() {
      const currentRoute = this.$route;
      return currentRoute.meta?.showNavigationBar !== false;
    }
  }
});
</script>

