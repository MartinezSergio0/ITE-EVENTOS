import { createRouter, createWebHistory } from "vue-router";

// ==========================================
// PÁGINAS PÚBLICAS
// ==========================================

import HomeView from "../views/public/HomeView.vue";
import CategoriasView from "../views/public/CategoriasView.vue";
import EventsByCategoryView from "../views/public/EventsByCategoryView.vue";
import EventDetailView from "../views/public/EventDetailView.vue";
import AboutView from "../views/public/AboutView.vue";

import ReferenciaEscalaView from "../views/public/ReferenciaEscalaView.vue";
import SubirComprobanteView from "../views/public/SubirComprobanteView.vue";

import RegistroEscala from "../views/public/RegistroEscala.vue";
import RegistroArgos from "../views/public/RegistroArgos.vue";


// ==========================================
// LOGIN
// ==========================================

import LoginView from "../views/public/LoginView.vue";


// ==========================================
// SUPER ADMINISTRADOR
// ==========================================

import SuperAdminView from "../views/SuperAdmin/SuperAdminView.vue";


// ==========================================
// RUTAS
// ==========================================

const routes = [

  // ========================================
  // INICIO
  // ========================================

  {
    path: "/",
    name: "home",
    component: HomeView
  },


  // ========================================
  // CATEGORÍAS
  // ========================================

  {
    path: "/eventos/categoria",
    name: "categorias",
    component: CategoriasView
  },


  // ========================================
  // EVENTOS POR CATEGORÍA
  // ========================================

  {
    path: "/eventos/:tipo",
    name: "eventosCategoria",
    component: EventsByCategoryView
  },


  // ========================================
  // DETALLE DEL EVENTO
  // ========================================

  {
    path: "/evento/:id",
    name: "detalleEvento",
    component: EventDetailView
  },


  // ========================================
  // SOBRE
  // ========================================

  {
    path: "/sobre",
    name: "about",
    component: AboutView
  },


  // ========================================
  // LOGIN
  // ========================================

  {
    path: "/login",
    name: "login",
    component: LoginView
  },


  // ========================================
  // SUPER ADMIN
  // ========================================

  {
    path: "/superadmin",
    name: "superadmin",
    component: SuperAdminView
  },


  // ========================================
  // REGISTRO ESCALA
  // ========================================

  {
    path: "/registro-escala",
    name: "registro-escala",
    component: RegistroEscala
  },


  // ========================================
  // REGISTRO ARGOS
  // ========================================

  {
    path: "/registro-argos",
    name: "registro-argos",
    component: RegistroArgos
  },


  // ========================================
  // REFERENCIA BANCARIA ESCALA
  // ========================================

  {
    path: "/referencia-escala",
    name: "referencia-escala",
    component: ReferenciaEscalaView
  },


  // ========================================
  // SUBIR COMPROBANTE
  // ========================================

  {
    path: "/subir-comprobante/:id",
    name: "SubirComprobante",
    component: SubirComprobanteView
  }

];

const router = createRouter({

  history: createWebHistory(),

  routes

});


export default router;