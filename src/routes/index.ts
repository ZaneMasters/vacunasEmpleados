import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login-admin",
    component: () => import("../views/LoginVacunacion.vue"),
    meta: { showNavigationBar: false }
  },
  {
    path: "/employees",
    name: "employees",
    component: () => import("../components/EmpleadoList.vue"),
  },
  {
    path: "/employee/register",
    name: "employee-register",
    component: () => import("../components/EmpleadoFrom.vue"),
  },
  {
    path: "/employee/:id",
    name: "employee-details",
    component: () => import("../components/EmpleadoDetail.vue"),
  },
  {
    path: "/employeeupdate/:id",
    name: "employee-update",
    component: () => import("../components/EmpleadoVacuna.vue"),
    meta: { showNavigationBar: false }
  },
  {
    path: "/employee/filter",
    name: "employee-filter",
    component: () => import("../views/FiltroVacuna.vue"),
  },
];

console.log(process.env.BASE_URL);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;