import { createRouter, createWebHistory } from "vue-router";


// ==========================================
// PÁGINAS PÚBLICAS
// ==========================================

import HomeView from "../Views/public/HomeView.vue";
import CategoriasView from "../Views/public/CategoriasView.vue";
import EventsByCategoryView from "../Views/public/EventsByCategoryView.vue";
import EventDetailView from "../Views/public/EventDetailView.vue";
import AboutView from "../Views/public/AboutView.vue";

import ReferenciaEscalaView from "../Views/public/ReferenciaEscalaView.vue";
import SubirComprobanteView from "../Views/public/SubirComprobanteView.vue";
import EstadoPagoView from "../Views/public/EstadoPagoView.vue";

import RegistroEscala from "../Views/public/RegistroEscala.vue";
import RegistroArgos from "../Views/public/RegistroArgos.vue";


// ==========================================
// LOGIN
// ==========================================

import LoginView from "../Views/public/LoginView.vue";


// ==========================================
// SUPER ADMINISTRADOR
// ==========================================

import SuperAdminView from "../Views/SuperAdmin/SuperAdminView.vue";


// ==========================================
// ADMINISTRADOR ESCALA
// ==========================================

import AdministradorEscalaView
  from "../Views/adminEscala/AdministradorEscalaView.vue";

import ParticipantesEscalaView
  from "../Views/adminEscala/ParticipantesEscalaView.vue";

import ComprobantesEscalaView
  from "../Views/adminEscala/ComprobantesEscalaView.vue";

import ConstanciasEscalaView
  from "../Views/adminEscala/ConstanciasEscalaView.vue";


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
  // SUPER ADMINISTRADOR
  // ========================================

  {
    path: "/superadmin",
    name: "superadmin",
    component: SuperAdminView
  },


  // ========================================
  // ADMINISTRADOR ESCALA
  // ========================================

  {
    path: "/admin/escala",

    name: "AdministradorEscala",

    component: AdministradorEscalaView,

    // ======================================
    // RUTAS HIJAS
    // ======================================

    children: [

      // ------------------------------------
      // PARTICIPANTES
      // /admin/escala/participantes
      // ------------------------------------

      {
        path: "participantes",

        name: "ParticipantesEscala",

        component: ParticipantesEscalaView
      },


      // ------------------------------------
      // COMPROBANTES
      // /admin/escala/comprobantes
      // ------------------------------------

      {
        path: "comprobantes",

        name: "ComprobantesEscala",

        component: ComprobantesEscalaView
      },


      // ------------------------------------
      // CONSTANCIAS
      // /admin/escala/constancias
      // ------------------------------------

      {
        path: "constancias",

        name: "ConstanciasEscala",

        component: ConstanciasEscalaView
      }

    ]

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
  },


  // ========================================
  // CONSULTAR ESTADO DEL PAGO
  // ========================================

  {
    path: "/estado-pago",

    name: "EstadoPago",

    component: EstadoPagoView
  },


  // ========================================
  // CONSULTAR ESTADO DEL PAGO CON FOLIO
  // ========================================
  //
  // Ejemplo:
  // /estado-pago/2612000001
  //
  // El componente recibe:
  // route.params.folio
  //
  // ========================================

  {
    path: "/estado-pago/:folio",

    name: "EstadoPagoFolio",

    component: EstadoPagoView
  }

];


// ==========================================
// CREAR ROUTER
// ==========================================

const router = createRouter({

  history: createWebHistory(),

  routes

});


// ==========================================
// EXPORTAR
// ==========================================

export default router;
