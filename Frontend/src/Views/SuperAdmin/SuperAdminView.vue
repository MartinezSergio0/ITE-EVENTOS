<template>

  <div class="super-admin">

    <!-- ==================================================
         SIDEBAR
    =================================================== -->

    <aside
      class="sidebar"
      :class="{ collapsed: sidebarCollapsed }"
    >

      <!-- LOGO -->

      <div class="logo-area">

        <div class="logo-icon">
          IT
        </div>

        <div
          v-if="!sidebarCollapsed"
          class="logo-text"
        >
          <strong>ITEvent</strong>
          <span>Administración</span>
        </div>

      </div>


      <!-- PERFIL -->

      <div
        v-if="!sidebarCollapsed"
        class="profile"
      >

        <div class="profile-avatar">
          SA
        </div>

        <div class="profile-info">

          <strong>
            Superadministrador
          </strong>

          <span>
            Control total
          </span>

        </div>

      </div>


      <!-- MENU -->

      <nav class="menu">

        <p
          v-if="!sidebarCollapsed"
          class="menu-title"
        >
          PRINCIPAL
        </p>


        <button
          class="menu-item active"
          @click="seccionActual = 'dashboard'"
        >

          <span class="menu-icon">
            📊
          </span>

          <span v-if="!sidebarCollapsed">
            Dashboard
          </span>

        </button>


        <button
          class="menu-item"
          @click="seccionActual = 'eventos'"
        >

          <span class="menu-icon">
            🎫
          </span>

          <span v-if="!sidebarCollapsed">
            Eventos
          </span>

          <span
            v-if="!sidebarCollapsed"
            class="menu-count"
          >
            {{ eventos.length }}
          </span>

        </button>


        <p
          v-if="!sidebarCollapsed"
          class="menu-title"
        >
          ADMINISTRACIÓN
        </p>


        <button
          class="menu-item"
          @click="seccionActual = 'administradores'"
        >

          <span class="menu-icon">
            👨‍💼
          </span>

          <span v-if="!sidebarCollapsed">
            Administradores
          </span>

        </button>


        <button
          class="menu-item"
          @click="seccionActual = 'gestores'"
        >

          <span class="menu-icon">
            👥
          </span>

          <span v-if="!sidebarCollapsed">
            Gestores
          </span>

        </button>


        <button
          class="menu-item"
          @click="seccionActual = 'usuarios'"
        >

          <span class="menu-icon">
            👤
          </span>

          <span v-if="!sidebarCollapsed">
            Usuarios
          </span>

          <span
            v-if="!sidebarCollapsed"
            class="menu-count"
          >
            {{ usuarios.length }}
          </span>

        </button>


        <button
          class="menu-item"
          @click="seccionActual = 'pagos'"
        >

          <span class="menu-icon">
            💳
          </span>

          <span v-if="!sidebarCollapsed">
            Pagos
          </span>

          <span
            v-if="!sidebarCollapsed"
            class="notification-count"
          >
            {{ pagosPendientes }}
          </span>

        </button>


        <p
          v-if="!sidebarCollapsed"
          class="menu-title"
        >
          SISTEMA
        </p>


        <button
          class="menu-item"
          @click="seccionActual = 'reportes'"
        >

          <span class="menu-icon">
            📄
          </span>

          <span v-if="!sidebarCollapsed">
            Reportes
          </span>

        </button>


        <button
          class="menu-item"
          @click="seccionActual = 'configuracion'"
        >

          <span class="menu-icon">
            ⚙️
          </span>

          <span v-if="!sidebarCollapsed">
            Configuración
          </span>

        </button>

      </nav>


      <!-- PARTE INFERIOR -->

      <div class="sidebar-bottom">

        <button
          class="menu-item logout"
          @click="cerrarSesion"
        >

          <span class="menu-icon">
            🚪
          </span>

          <span v-if="!sidebarCollapsed">
            Cerrar sesión
          </span>

        </button>

      </div>

    </aside>


    <!-- ==================================================
         CONTENIDO PRINCIPAL
    =================================================== -->

    <main class="main-content">


      <!-- =================================================
           NAVBAR
      ================================================== -->

      <header class="topbar">

        <div class="topbar-left">

          <button
            class="toggle-btn"
            @click="sidebarCollapsed = !sidebarCollapsed"
          >
            ☰
          </button>

          <div>

            <span class="breadcrumb">
              Administración
            </span>

            <h1>
              {{ tituloSeccion }}
            </h1>

          </div>

        </div>


        <div class="topbar-right">

          <!-- NOTIFICACIONES -->

          <button
            class="notification-btn"
            @click="mostrarNotificaciones = !mostrarNotificaciones"
          >

            🔔

            <span
              v-if="pagosPendientes > 0"
              class="notification-dot"
            >
              {{ pagosPendientes }}
            </span>

          </button>


          <!-- PERFIL -->

          <div class="top-profile">

            <div class="top-avatar">
              SA
            </div>

            <div class="top-profile-text">

              <strong>
                Superadministrador
              </strong>

              <span>
                Administrador principal
              </span>

            </div>

          </div>

        </div>

      </header>


      <!-- =================================================
           DASHBOARD
      ================================================== -->

      <section
        v-if="seccionActual === 'dashboard'"
        class="dashboard-content"
      >


        <!-- BIENVENIDA -->

        <div class="welcome-card">

          <div>

            <span>
              PANEL DE CONTROL
            </span>

            <h2>
              Bienvenido, Superadministrador 👋
            </h2>

            <p>
              Desde aquí puedes administrar todos los eventos,
              usuarios, pagos y recursos de ITEvent.
            </p>

          </div>


          <div class="welcome-icon">
            🎓
          </div>

        </div>


        <!-- =================================================
             ESTADÍSTICAS
        ================================================== -->

        <div class="stats-grid">


          <div class="stat-card">

            <div class="stat-icon blue">
              🎫
            </div>

            <div class="stat-data">

              <span>
                Eventos
              </span>

              <strong>
                {{ eventos.length }}
              </strong>

              <small>
                {{ eventosActivos }} activos
              </small>

            </div>

          </div>


          <div class="stat-card">

            <div class="stat-icon green">
              👥
            </div>

            <div class="stat-data">

              <span>
                Inscripciones
              </span>

              <strong>
                {{ totalInscritos }}
              </strong>

              <small class="positive">
                ↑ 12% este mes
              </small>

            </div>

          </div>


          <div class="stat-card">

            <div class="stat-icon orange">
              💳
            </div>

            <div class="stat-data">

              <span>
                Pagos
              </span>

              <strong>
                {{ pagosAprobados }}
              </strong>

              <small>
                {{ pagosPendientes }} pendientes
              </small>

            </div>

          </div>


          <div class="stat-card">

            <div class="stat-icon purple">
              🟣
            </div>

            <div class="stat-data">

              <span>
                Asistentes
              </span>

              <strong>
                {{ asistentes }}
              </strong>

              <small>
                Registrados
              </small>

            </div>

          </div>

        </div>


        <!-- =================================================
             FILA PRINCIPAL
        ================================================== -->

        <div class="dashboard-grid">


          <!-- EVENTOS -->

          <section class="panel">

            <div class="panel-header">

              <div>

                <h2>
                  Eventos
                </h2>

                <p>
                  Eventos registrados en ITEvent
                </p>

              </div>

              <button
                class="view-all"
                @click="seccionActual = 'eventos'"
              >
                Ver todos →
              </button>

            </div>


            <div class="events-list">


              <div
                v-for="evento in eventos"
                :key="evento.id"
                class="event-row"
              >

                <div
                  class="event-image"
                  :style="{
                    backgroundImage:
                      `url(${evento.imagen})`
                  }"
                ></div>


                <div class="event-info">

                  <strong>
                    {{ evento.nombre }}
                  </strong>

                  <span>
                    📅 {{ evento.fecha }}
                  </span>

                </div>


                <div class="event-progress">

                  <div class="progress-info">

                    <span>
                      {{ evento.inscritos }}
                      inscritos
                    </span>

                    <span>
                      {{ evento.cupo }}
                    </span>

                  </div>

                  <div class="progress-bar">

                    <div
                      class="progress-fill"
                      :style="{
                        width:
                          porcentajeCupo(evento) + '%'
                      }"
                    ></div>

                  </div>

                </div>


                <span
                  class="status"
                  :class="evento.estado"
                >
                  {{ textoEstado(evento.estado) }}
                </span>

              </div>


            </div>

          </section>


          <!-- PAGOS -->

          <section class="panel">

            <div class="panel-header">

              <div>

                <h2>
                  Pagos pendientes
                </h2>

                <p>
                  Requieren revisión
                </p>

              </div>

              <button
                class="warning-number"
                @click="seccionActual = 'pagos'"
              >
                {{ pagosPendientes }}
              </button>

            </div>


            <div class="payment-list">

              <div
                v-for="pago in pagos"
                :key="pago.id"
                class="payment-row"
              >

                <div class="payment-avatar">
                  {{ iniciales(pago.nombre) }}
                </div>


                <div class="payment-info">

                  <strong>
                    {{ pago.nombre }}
                  </strong>

                  <span>
                    {{ pago.referencia }}
                  </span>

                </div>


                <div class="payment-right">

                  <strong>
                    ${{ pago.monto }}
                  </strong>

                  <span
                    :class="[
                      'payment-status',
                      pago.estado
                    ]"
                  >
                    {{ pago.estado }}
                  </span>

                </div>

              </div>

            </div>

          </section>

        </div>


        <!-- =================================================
             ACCIONES RÁPIDAS
        ================================================== -->

        <section class="quick-section">

          <h2>
            Acciones rápidas
          </h2>

          <div class="quick-grid">


            <button
              class="quick-card"
              @click="crearEvento"
            >

              <div class="quick-icon blue">
                ➕
              </div>

              <strong>
                Crear evento
              </strong>

              <span>
                Registrar un nuevo evento
              </span>

            </button>


            <button
              class="quick-card"
              @click="seccionActual = 'administradores'"
            >

              <div class="quick-icon green">
                👨‍💼
              </div>

              <strong>
                Administradores
              </strong>

              <span>
                Gestionar administradores
              </span>

            </button>


            <button
              class="quick-card"
              @click="seccionActual = 'pagos'"
            >

              <div class="quick-icon orange">
                💳
              </div>

              <strong>
                Revisar pagos
              </strong>

              <span>
                Ver comprobantes pendientes
              </span>

            </button>


            <button
              class="quick-card"
              @click="seccionActual = 'reportes'"
            >

              <div class="quick-icon purple">
                📊
              </div>

              <strong>
                Generar reporte
              </strong>

              <span>
                Consultar estadísticas
              </span>

            </button>


          </div>

        </section>


      </section>


      <!-- =================================================
           EVENTOS
      ================================================== -->

      <section
        v-if="seccionActual === 'eventos'"
        class="section-content"
      >

        <div class="section-header">

          <div>

            <h2>
              Gestión de eventos
            </h2>

            <p>
              Administra todos los eventos de ITEvent.
            </p>

          </div>

          <button
            class="primary-btn"
            @click="crearEvento"
          >
            + Crear evento
          </button>

        </div>


        <div class="data-card">

          <div
            v-for="evento in eventos"
            :key="evento.id"
            class="large-event-row"
          >

            <div
              class="large-event-image"
              :style="{
                backgroundImage:
                  `url(${evento.imagen})`
              }"
            ></div>

            <div class="large-event-info">

              <span class="category">
                {{ evento.tipo }}
              </span>

              <h3>
                {{ evento.nombre }}
              </h3>

              <p>
                📅 {{ evento.fecha }}
              </p>

              <p>
                👥 {{ evento.inscritos }}
                / {{ evento.cupo }} participantes
              </p>

            </div>

            <span
              class="status"
              :class="evento.estado"
            >
              {{ textoEstado(evento.estado) }}
            </span>

            <button
              class="action-btn"
              @click="editarEvento(evento)"
            >
              ✏️
            </button>

          </div>

        </div>

      </section>


      <!-- =================================================
           ADMINISTRADORES
      ================================================== -->

      <section
        v-if="seccionActual === 'administradores'"
        class="section-content"
      >

        <div class="section-header">

          <div>

            <h2>
              Administradores
            </h2>

            <p>
              Personas con permisos administrativos.
            </p>

          </div>

          <button
            class="primary-btn"
            @click="crearAdministrador"
          >
            + Nuevo administrador
          </button>

        </div>


        <div class="users-grid">

          <div
            v-for="admin in administradores"
            :key="admin.id"
            class="user-card"
          >

            <div class="user-avatar">
              {{ iniciales(admin.nombre) }}
            </div>

            <h3>
              {{ admin.nombre }}
            </h3>

            <p>
              {{ admin.correo }}
            </p>

            <span
              class="role-badge"
            >
              {{ admin.rol }}
            </span>

            <span
              class="user-status"
              :class="admin.estado"
            >
              ● {{ admin.estado }}
            </span>

          </div>

        </div>

      </section>


      <!-- =================================================
           GESTORES
      ================================================== -->

      <section
        v-if="seccionActual === 'gestores'"
        class="section-content"
      >

        <div class="section-header">

          <div>

            <h2>
              Gestores
            </h2>

            <p>
              Personal encargado de gestionar actividades.
            </p>

          </div>

          <button
            class="primary-btn"
            @click="crearGestor"
          >
            + Nuevo gestor
          </button>

        </div>


        <div class="data-card">

          <div
            v-for="gestor in gestores"
            :key="gestor.id"
            class="table-row"
          >

            <div class="table-user">

              <div class="user-avatar small">
                {{ iniciales(gestor.nombre) }}
              </div>

              <div>

                <strong>
                  {{ gestor.nombre }}
                </strong>

                <span>
                  {{ gestor.correo }}
                </span>

              </div>

            </div>

            <span>
              {{ gestor.evento }}
            </span>

            <span class="role-badge">
              Gestor
            </span>

            <span
              class="user-status"
              :class="gestor.estado"
            >
              ● {{ gestor.estado }}
            </span>

          </div>

        </div>

      </section>


      <!-- =================================================
           USUARIOS
      ================================================== -->

      <section
        v-if="seccionActual === 'usuarios'"
        class="section-content"
      >

        <div class="section-header">

          <div>

            <h2>
              Usuarios
            </h2>

            <p>
              Usuarios registrados en la plataforma.
            </p>

          </div>

        </div>


        <div class="data-card">

          <div class="search-box">

            🔎

            <input
              v-model="busqueda"
              placeholder="Buscar usuario..."
            >

          </div>


          <div
            v-for="usuario in usuariosFiltrados"
            :key="usuario.id"
            class="table-row"
          >

            <div class="table-user">

              <div class="user-avatar small">
                {{ iniciales(usuario.nombre) }}
              </div>

              <div>

                <strong>
                  {{ usuario.nombre }}
                </strong>

                <span>
                  {{ usuario.correo }}
                </span>

              </div>

            </div>

            <span>
              {{ usuario.evento }}
            </span>

            <span>
              {{ usuario.tipo }}
            </span>

            <span
              class="user-status"
              :class="usuario.estado"
            >
              ● {{ usuario.estado }}
            </span>

          </div>

        </div>

      </section>


      <!-- =================================================
           PAGOS
      ================================================== -->

      <section
        v-if="seccionActual === 'pagos'"
        class="section-content"
      >

        <div class="section-header">

          <div>

            <h2>
              Validación de pagos
            </h2>

            <p>
              Revisa los comprobantes enviados por los participantes.
            </p>

          </div>

          <div class="payment-summary">

            <span>
              Pendientes
            </span>

            <strong>
              {{ pagosPendientes }}
            </strong>

          </div>

        </div>


        <div class="data-card">


          <div class="payment-admin-header">

            <span>
              Participante
            </span>

            <span>
              Referencia
            </span>

            <span>
              Monto
            </span>

            <span>
              Fecha
            </span>

            <span>
              Estado
            </span>

            <span>
              Acción
            </span>

          </div>


          <div
            v-for="pago in pagos"
            :key="pago.id"
            class="payment-admin-row"
          >

            <div class="table-user">

              <div class="user-avatar small">
                {{ iniciales(pago.nombre) }}
              </div>

              <div>

                <strong>
                  {{ pago.nombre }}
                </strong>

                <span>
                  {{ pago.correo }}
                </span>

              </div>

            </div>


            <code>
              {{ pago.referencia }}
            </code>


            <strong>
              ${{ pago.monto }}
            </strong>


            <span>
              {{ pago.fecha }}
            </span>


            <span
              class="payment-status"
              :class="pago.estado"
            >
              {{ pago.estado }}
            </span>


            <button
              class="review-btn"
              @click="revisarPago(pago)"
            >
              Revisar
            </button>

          </div>

        </div>

      </section>


      <!-- =================================================
           REPORTES
      ================================================== -->

      <section
        v-if="seccionActual === 'reportes'"
        class="section-content"
      >

        <div class="section-header">

          <div>

            <h2>
              Reportes
            </h2>

            <p>
              Consulta y descarga información del sistema.
            </p>

          </div>

        </div>


        <div class="reports-grid">


          <div class="report-card">

            <div class="report-icon">
              👥
            </div>

            <h3>
              Participantes
            </h3>

            <p>
              Reporte general de participantes registrados.
            </p>

            <button>
              Descargar Excel
            </button>

          </div>


          <div class="report-card">

            <div class="report-icon">
              💳
            </div>

            <h3>
              Pagos
            </h3>

            <p>
              Reporte de pagos aprobados y pendientes.
            </p>

            <button>
              Descargar Excel
            </button>

          </div>


          <div class="report-card">

            <div class="report-icon">
              🎫
            </div>

            <h3>
              Eventos
            </h3>

            <p>
              Estadísticas generales de los eventos.
            </p>

            <button>
              Descargar PDF
            </button>

          </div>


          <div class="report-card">

            <div class="report-icon">
              📊
            </div>

            <h3>
              Asistencia
            </h3>

            <p>
              Registro de asistentes mediante QR.
            </p>

            <button>
              Descargar CSV
            </button>

          </div>


        </div>

      </section>


      <!-- =================================================
           CONFIGURACIÓN
      ================================================== -->

      <section
        v-if="seccionActual === 'configuracion'"
        class="section-content"
      >

        <div class="section-header">

          <div>

            <h2>
              Configuración
            </h2>

            <p>
              Configuración general del sistema.
            </p>

          </div>

        </div>


        <div class="settings-card">


          <div class="setting">

            <div>

              <strong>
                Nombre del sistema
              </strong>

              <p>
                Nombre que aparece en la plataforma.
              </p>

            </div>

            <input
              value="ITEvent"
            >

          </div>


          <div class="setting">

            <div>

              <strong>
                Correo institucional
              </strong>

              <p>
                Correo utilizado para notificaciones.
              </p>

            </div>

            <input
              value="eventos@ite.edu.mx"
            >

          </div>


          <div class="setting">

            <div>

              <strong>
                Notificaciones
              </strong>

              <p>
                Enviar avisos sobre nuevos registros.
              </p>

            </div>

            <label class="switch">

              <input
                type="checkbox"
                checked
              >

              <span></span>

            </label>

          </div>


        </div>

      </section>


    </main>


    <!-- ==================================================
         MODAL NOTIFICACIONES
    =================================================== -->

    <div
      v-if="mostrarNotificaciones"
      class="notification-panel"
    >

      <div class="notification-header">

        <strong>
          Notificaciones
        </strong>

        <button
          @click="mostrarNotificaciones = false"
        >
          ×
        </button>

      </div>


      <div class="notification-item">

        <span class="notification-icon orange">
          💳
        </span>

        <div>

          <strong>
            Pagos pendientes
          </strong>

          <p>
            {{ pagosPendientes }}
            comprobantes requieren revisión.
          </p>

        </div>

      </div>


      <div class="notification-item">

        <span class="notification-icon blue">
          🎫
        </span>

        <div>

          <strong>
            Congreso ESCALA
          </strong>

          <p>
            Continúan las inscripciones.
          </p>

        </div>

      </div>

    </div>


    <!-- ==================================================
         MODAL REVISAR PAGO
    =================================================== -->

    <div
      v-if="pagoSeleccionado"
      class="modal-overlay"
    >

      <div class="review-modal">


        <button
          class="close-modal"
          @click="pagoSeleccionado = null"
        >
          ×
        </button>


        <div class="review-header">

          <div class="review-avatar">
            {{ iniciales(pagoSeleccionado.nombre) }}
          </div>

          <div>

            <h2>
              Revisar pago
            </h2>

            <p>
              {{ pagoSeleccionado.nombre }}
            </p>

          </div>

        </div>


        <div class="review-data">

          <div>

            <span>
              Referencia
            </span>

            <strong>
              {{ pagoSeleccionado.referencia }}
            </strong>

          </div>


          <div>

            <span>
              Monto
            </span>

            <strong>
              ${{ pagoSeleccionado.monto }} MXN
            </strong>

          </div>


          <div>

            <span>
              Fecha
            </span>

            <strong>
              {{ pagoSeleccionado.fecha }}
            </strong>

          </div>


          <div>

            <span>
              Correo
            </span>

            <strong>
              {{ pagoSeleccionado.correo }}
            </strong>

          </div>

        </div>


        <div class="receipt-placeholder">

          📄

          <strong>
            Comprobante de pago
          </strong>

          <span>
            Aquí se mostrará el comprobante
            cuando esté conectado al backend.
          </span>

        </div>


        <div class="review-actions">

          <button
            class="reject-btn"
            @click="rechazarPago"
          >
            ✕ Rechazar
          </button>


          <button
            class="approve-btn"
            @click="aprobarPago"
          >
            ✓ Aprobar pago
          </button>

        </div>


      </div>

    </div>


  </div>

</template>


<script setup>

import {
  computed,
  ref
} from "vue";

import {
  useRouter
} from "vue-router";


/* =====================================================
   ROUTER
===================================================== */

const router = useRouter();


/* =====================================================
   VARIABLES
===================================================== */

const sidebarCollapsed = ref(false);

const seccionActual = ref("dashboard");

const mostrarNotificaciones = ref(false);

const busqueda = ref("");

const pagoSeleccionado = ref(null);


/* =====================================================
   EVENTOS
===================================================== */

const eventos = ref([

  {

    id: 1,

    nombre:
      "Congreso ESCALA",

    tipo:
      "Académico",

    fecha:
      "10 al 12 de Septiembre",

    inscritos:
      128,

    cupo:
      500,

    estado:
      "activo",

    imagen:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600"

  },


  {

    id: 2,

    nombre:
      "Congreso ARGOS",

    tipo:
      "Académico",

    fecha:
      "25 de Octubre",

    inscritos:
      85,

    cupo:
      300,

    estado:
      "activo",

    imagen:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"

  },


  {

    id: 3,

    nombre:
      "Carrera Atlética",

    tipo:
      "Deportivo",

    fecha:
      "15 de Noviembre",

    inscritos:
      230,

    cupo:
      1000,

    estado:
      "activo",

    imagen:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600"

  }

]);


/* =====================================================
   ADMINISTRADORES
===================================================== */

const administradores = ref([

  {

    id: 1,

    nombre:
      "Administrador ESCALA",

    correo:
      "escala@ite.edu.mx",

    rol:
      "Administrador de evento",

    estado:
      "activo"

  },


  {

    id: 2,

    nombre:
      "Administrador ARGOS",

    correo:
      "argos@ite.edu.mx",

    rol:
      "Administrador de evento",

    estado:
      "activo"

  }

]);


/* =====================================================
   GESTORES
===================================================== */

const gestores = ref([

  {

    id: 1,

    nombre:
      "Carlos Hernández",

    correo:
      "carlos@ite.edu.mx",

    evento:
      "Congreso ESCALA",

    estado:
      "activo"

  },


  {

    id: 2,

    nombre:
      "María González",

    correo:
      "maria@ite.edu.mx",

    evento:
      "Congreso ARGOS",

    estado:
      "activo"

  }

]);


/* =====================================================
   USUARIOS
===================================================== */

const usuarios = ref([

  {

    id: 1,

    nombre:
      "Juan Pérez",

    correo:
      "juan@ite.edu.mx",

    evento:
      "Congreso ESCALA",

    tipo:
      "Estudiante",

    estado:
      "activo"

  },


  {

    id: 2,

    nombre:
      "María López",

    correo:
      "maria@ite.edu.mx",

    evento:
      "Congreso ESCALA",

    tipo:
      "Docente",

    estado:
      "activo"

  },


  {

    id: 3,

    nombre:
      "Carlos García",

    correo:
      "carlos@gmail.com",

    evento:
      "Congreso ARGOS",

    tipo:
      "Participante",

    estado:
      "activo"

  }

]);


/* =====================================================
   PAGOS
===================================================== */

const pagos = ref([

  {

    id: 1,

    nombre:
      "Juan Pérez",

    correo:
      "juan@ite.edu.mx",

    referencia:
      "2612000001",

    monto:
      1000,

    fecha:
      "12/08/2026",

    estado:
      "pendiente"

  },


  {

    id: 2,

    nombre:
      "María López",

    correo:
      "maria@ite.edu.mx",

    referencia:
      "2612000002",

    monto:
      1000,

    fecha:
      "12/08/2026",

    estado:
      "pendiente"

  },


  {

    id: 3,

    nombre:
      "Carlos García",

    correo:
      "carlos@gmail.com",

    referencia:
      "2612000003",

    monto:
      1000,

    fecha:
      "11/08/2026",

    estado:
      "aprobado"

  }

]);


/* =====================================================
   COMPUTED
===================================================== */

const eventosActivos = computed(() => {

  return eventos.value.filter(
    evento =>
      evento.estado === "activo"
  ).length;

});


const totalInscritos = computed(() => {

  return eventos.value.reduce(
    (total, evento) =>
      total + evento.inscritos,
    0
  );

});


const pagosPendientes = computed(() => {

  return pagos.value.filter(
    pago =>
      pago.estado === "pendiente"
  ).length;

});


const pagosAprobados = computed(() => {

  return pagos.value.filter(
    pago =>
      pago.estado === "aprobado"
  ).length;

});


const asistentes = ref(86);


/* =====================================================
   BUSCAR USUARIOS
===================================================== */

const usuariosFiltrados = computed(() => {

  if (!busqueda.value.trim()) {

    return usuarios.value;

  }


  const texto =
    busqueda.value.toLowerCase();


  return usuarios.value.filter(
    usuario =>
      usuario.nombre
        .toLowerCase()
        .includes(texto) ||

      usuario.correo
        .toLowerCase()
        .includes(texto)
  );

});


/* =====================================================
   TITULO
===================================================== */

const tituloSeccion = computed(() => {

  const titulos = {

    dashboard:
      "Dashboard",

    eventos:
      "Eventos",

    administradores:
      "Administradores",

    gestores:
      "Gestores",

    usuarios:
      "Usuarios",

    pagos:
      "Pagos",

    reportes:
      "Reportes",

    configuracion:
      "Configuración"

  };


  return titulos[
    seccionActual.value
  ];

});


/* =====================================================
   FUNCIONES
===================================================== */

function iniciales(nombre) {

  return nombre
    .split(" ")
    .slice(0, 2)
    .map(
      palabra =>
        palabra.charAt(0)
    )
    .join("")
    .toUpperCase();

}


/* =====================================================
   PORCENTAJE CUPO
===================================================== */

function porcentajeCupo(evento) {

  return Math.min(
    (evento.inscritos / evento.cupo) * 100,
    100
  );

}


/* =====================================================
   ESTADO
===================================================== */

function textoEstado(estado) {

  const estados = {

    activo:
      "Activo",

    finalizado:
      "Finalizado",

    pendiente:
      "Pendiente"

  };


  return estados[estado] || estado;

}


/* =====================================================
   CREAR EVENTO
===================================================== */

function crearEvento() {

  router.push("/admin/crear-evento");

}


/* =====================================================
   EDITAR EVENTO
===================================================== */

function editarEvento(evento) {

  console.log(
    "Editar evento:",
    evento
  );

}


/* =====================================================
   ADMINISTRADOR
===================================================== */

function crearAdministrador() {

  alert(
    "Aquí se abrirá el formulario para crear un administrador."
  );

}


/* =====================================================
   GESTOR
===================================================== */

function crearGestor() {

  alert(
    "Aquí se abrirá el formulario para crear un gestor."
  );

}


/* =====================================================
   REVISAR PAGO
===================================================== */

function revisarPago(pago) {

  pagoSeleccionado.value =
    pago;

}


/* =====================================================
   APROBAR PAGO
===================================================== */

function aprobarPago() {

  if (!pagoSeleccionado.value) {

    return;

  }


  pagoSeleccionado.value.estado =
    "aprobado";


  pagoSeleccionado.value =
    null;

}


/* =====================================================
   RECHAZAR PAGO
===================================================== */

function rechazarPago() {

  if (!pagoSeleccionado.value) {

    return;

  }


  pagoSeleccionado.value.estado =
    "rechazado";


  pagoSeleccionado.value =
    null;

}


/* =====================================================
   CERRAR SESIÓN
===================================================== */

function cerrarSesion() {

  router.push("/login");

}

</script>


<style scoped>

/* =====================================================
   RESET
===================================================== */

* {

  box-sizing: border-box;

}


button,
input {

  font-family: inherit;

}


/* =====================================================
   SISTEMA
===================================================== */

.super-admin {

  min-height: 100vh;

  background: #f4f7fb;

  color: #26384d;

  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

  display: flex;

}


/* =====================================================
   SIDEBAR
===================================================== */

.sidebar {

  width: 265px;

  height: 100vh;

  position: fixed;

  left: 0;

  top: 0;

  background:
    linear-gradient(
      180deg,
      #002b55,
      #003d73
    );

  color: white;

  display: flex;

  flex-direction: column;

  z-index: 1000;

  transition: .3s;

  box-shadow:
    5px 0 25px
    rgba(0,0,0,.08);

}


.sidebar.collapsed {

  width: 80px;

}


/* =====================================================
   LOGO
===================================================== */

.logo-area {

  height: 85px;

  display: flex;

  align-items: center;

  gap: 13px;

  padding: 20px;

  border-bottom:
    1px solid
    rgba(255,255,255,.1);

}


.logo-icon {

  width: 45px;

  height: 45px;

  flex-shrink: 0;

  border-radius: 12px;

  background: white;

  color: #003d73;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 900;

  font-size: 17px;

}


.logo-text {

  display: flex;

  flex-direction: column;

}


.logo-text strong {

  font-size: 1.25rem;

}


.logo-text span {

  font-size: .72rem;

  opacity: .7;

}


/* =====================================================
   PERFIL
===================================================== */

.profile {

  margin: 20px 15px;

  padding: 13px;

  border-radius: 13px;

  background:
    rgba(255,255,255,.08);

  display: flex;

  gap: 10px;

  align-items: center;

}


.profile-avatar {

  width: 40px;

  height: 40px;

  background: #1e88e5;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: .8rem;

  font-weight: 800;

}


.profile-info {

  display: flex;

  flex-direction: column;

  min-width: 0;

}


.profile-info strong {

  font-size: .78rem;

  white-space: nowrap;

}


.profile-info span {

  font-size: .68rem;

  opacity: .65;

}


/* =====================================================
   MENU
===================================================== */

.menu {

  flex: 1;

  padding: 5px 12px;

  overflow-y: auto;

}


.menu-title {

  color:
    rgba(255,255,255,.45);

  font-size: .65rem;

  font-weight: 800;

  letter-spacing: 1px;

  margin: 20px 12px 8px;

}


.menu-item {

  width: 100%;

  border: none;

  background: transparent;

  color:
    rgba(255,255,255,.78);

  padding: 12px 13px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  gap: 12px;

  cursor: pointer;

  font-size: .88rem;

  text-align: left;

  margin-bottom: 4px;

  transition: .25s;

}


.menu-item:hover {

  background:
    rgba(255,255,255,.1);

  color: white;

}


.menu-item.active {

  background:
    linear-gradient(
      90deg,
      #1976d2,
      #1565c0
    );

  color: white;

  box-shadow:
    0 7px 18px
    rgba(0,0,0,.15);

}


.menu-icon {

  width: 22px;

  text-align: center;

  font-size: 17px;

  flex-shrink: 0;

}


.menu-count {

  margin-left: auto;

  background:
    rgba(255,255,255,.15);

  padding: 3px 7px;

  border-radius: 10px;

  font-size: .68rem;

}


.notification-count {

  margin-left: auto;

  background: #ef6c00;

  padding: 3px 7px;

  border-radius: 10px;

  font-size: .68rem;

}


.sidebar-bottom {

  padding: 12px;

  border-top:
    1px solid
    rgba(255,255,255,.1);

}


.logout:hover {

  background:
    rgba(211,47,47,.25);

  color: #ffcdd2;

}


/* =====================================================
   MAIN
===================================================== */

.main-content {

  width: calc(100% - 265px);

  margin-left: 265px;

  min-height: 100vh;

  transition: .3s;

}


.sidebar.collapsed
~ .main-content {

  width: calc(100% - 80px);

  margin-left: 80px;

}


/* =====================================================
   TOPBAR
===================================================== */

.topbar {

  height: 85px;

  background: white;

  border-bottom:
    1px solid #e7edf4;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 35px;

  position: sticky;

  top: 0;

  z-index: 900;

}


.topbar-left {

  display: flex;

  align-items: center;

  gap: 17px;

}


.toggle-btn {

  border: none;

  background: #f0f4f8;

  color: #003d73;

  width: 40px;

  height: 40px;

  border-radius: 10px;

  cursor: pointer;

  font-size: 18px;

}


.breadcrumb {

  color: #8a98a8;

  font-size: .72rem;

}


.topbar h1 {

  margin: 2px 0 0;

  color: #003366;

  font-size: 1.3rem;

}


.topbar-right {

  display: flex;

  align-items: center;

  gap: 22px;

}


.notification-btn {

  position: relative;

  width: 42px;

  height: 42px;

  border: none;

  border-radius: 50%;

  background: #f4f7fb;

  cursor: pointer;

  font-size: 18px;

}


.notification-dot {

  position: absolute;

  top: -2px;

  right: -2px;

  background: #e53935;

  color: white;

  min-width: 19px;

  height: 19px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: .65rem;

  font-weight: 800;

}


.top-profile {

  display: flex;

  align-items: center;

  gap: 10px;

}


.top-avatar {

  width: 40px;

  height: 40px;

  border-radius: 50%;

  background: #003d73;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: .75rem;

  font-weight: 800;

}


.top-profile-text {

  display: flex;

  flex-direction: column;

}


.top-profile-text strong {

  font-size: .78rem;

}


.top-profile-text span {

  color: #8a98a8;

  font-size: .68rem;

}


/* =====================================================
   DASHBOARD
===================================================== */

.dashboard-content,
.section-content {

  padding: 32px;

  max-width: 1600px;

  margin: auto;

}


/* =====================================================
   WELCOME
===================================================== */

.welcome-card {

  min-height: 190px;

  border-radius: 20px;

  padding: 35px;

  color: white;

  background:
    linear-gradient(
      110deg,
      #003366,
      #0066b3
    );

  display: flex;

  align-items: center;

  justify-content: space-between;

  overflow: hidden;

  position: relative;

  margin-bottom: 25px;

}


.welcome-card > div:first-child {

  position: relative;

  z-index: 2;

}


.welcome-card span {

  font-size: .72rem;

  font-weight: 800;

  letter-spacing: 1.5px;

  opacity: .75;

}


.welcome-card h2 {

  font-size: 2rem;

  margin: 8px 0;

}


.welcome-card p {

  max-width: 650px;

  opacity: .85;

  line-height: 1.6;

  margin: 0;

}


.welcome-icon {

  width: 150px;

  height: 150px;

  border-radius: 50%;

  background:
    rgba(255,255,255,.1);

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 70px;

}


/* =====================================================
   STATS
===================================================== */

.stats-grid {

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;

  margin-bottom: 25px;

}


.stat-card {

  background: white;

  border-radius: 16px;

  padding: 22px;

  display: flex;

  align-items: center;

  gap: 17px;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.05);

}


.stat-icon {

  width: 55px;

  height: 55px;

  border-radius: 14px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 24px;

}


.stat-icon.blue,
.quick-icon.blue {

  background: #e3f2fd;

}


.stat-icon.green,
.quick-icon.green {

  background: #e8f5e9;

}


.stat-icon.orange,
.quick-icon.orange {

  background: #fff3e0;

}


.stat-icon.purple,
.quick-icon.purple {

  background: #f3e5f5;

}


.stat-data {

  display: flex;

  flex-direction: column;

}


.stat-data span {

  color: #7d8b99;

  font-size: .75rem;

}


.stat-data strong {

  color: #003366;

  font-size: 1.7rem;

  margin: 2px 0;

}


.stat-data small {

  color: #8a98a8;

  font-size: .68rem;

}


.stat-data .positive {

  color: #2e7d32;

}


/* =====================================================
   DASHBOARD GRID
===================================================== */

.dashboard-grid {

  display: grid;

  grid-template-columns:
    1.5fr 1fr;

  gap: 25px;

}


.panel {

  background: white;

  border-radius: 18px;

  padding: 25px;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.05);

}


.panel-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;

}


.panel-header h2 {

  color: #003366;

  font-size: 1.15rem;

  margin: 0 0 4px;

}


.panel-header p {

  color: #8a98a8;

  font-size: .78rem;

  margin: 0;

}


.view-all {

  border: none;

  background: transparent;

  color: #0066b3;

  font-weight: 700;

  cursor: pointer;

}


/* =====================================================
   EVENT ROW
===================================================== */

.event-row {

  display: grid;

  grid-template-columns:
    65px 1fr 150px 75px;

  align-items: center;

  gap: 15px;

  padding: 13px 0;

  border-bottom:
    1px solid #edf1f5;

}


.event-row:last-child {

  border-bottom: none;

}


.event-image,
.large-event-image {

  background-size: cover;

  background-position: center;

  border-radius: 10px;

}


.event-image {

  width: 65px;

  height: 55px;

}


.event-info {

  display: flex;

  flex-direction: column;

  gap: 5px;

}


.event-info strong {

  color: #26384d;

  font-size: .82rem;

}


.event-info span {

  color: #8a98a8;

  font-size: .7rem;

}


.event-progress {

  min-width: 0;

}


.progress-info {

  display: flex;

  justify-content: space-between;

  font-size: .65rem;

  color: #7d8b99;

  margin-bottom: 5px;

}


.progress-bar {

  height: 6px;

  border-radius: 10px;

  background: #e9eef3;

  overflow: hidden;

}


.progress-fill {

  height: 100%;

  background:
    linear-gradient(
      90deg,
      #1976d2,
      #42a5f5
    );

  border-radius: 10px;

}


/* =====================================================
   STATUS
===================================================== */

.status {

  display: inline-flex;

  justify-content: center;

  padding: 5px 9px;

  border-radius: 20px;

  font-size: .65rem;

  font-weight: 800;

}


.status.activo {

  color: #2e7d32;

  background: #e8f5e9;

}


.status.finalizado {

  color: #616161;

  background: #eeeeee;

}


.status.pendiente {

  color: #ef6c00;

  background: #fff3e0;

}


/* =====================================================
   PAYMENTS
===================================================== */

.warning-number {

  width: 40px;

  height: 40px;

  border: none;

  border-radius: 10px;

  background: #fff3e0;

  color: #ef6c00;

  font-weight: 900;

  cursor: pointer;

}


.payment-row {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 13px 0;

  border-bottom:
    1px solid #edf1f5;

}


.payment-row:last-child {

  border-bottom: none;

}


.payment-avatar {

  width: 38px;

  height: 38px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #e3f2fd;

  color: #0055aa;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: .7rem;

  font-weight: 800;

}


.payment-info {

  flex: 1;

  display: flex;

  flex-direction: column;

  gap: 3px;

}


.payment-info strong {

  font-size: .78rem;

}


.payment-info span {

  font-family: monospace;

  font-size: .68rem;

  color: #8a98a8;

}


.payment-right {

  text-align: right;

  display: flex;

  flex-direction: column;

  gap: 4px;

}


.payment-right strong {

  font-size: .78rem;

}


.payment-status {

  font-size: .62rem;

  padding: 4px 7px;

  border-radius: 10px;

  font-weight: 800;

}


.payment-status.pendiente {

  color: #ef6c00;

  background: #fff3e0;

}


.payment-status.aprobado {

  color: #2e7d32;

  background: #e8f5e9;

}


.payment-status.rechazado {

  color: #c62828;

  background: #ffebee;

}


/* =====================================================
   QUICK
===================================================== */

.quick-section {

  margin-top: 25px;

}


.quick-section h2 {

  color: #003366;

  font-size: 1.2rem;

}


.quick-grid {

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 17px;

}


.quick-card {

  border: none;

  background: white;

  padding: 22px;

  border-radius: 15px;

  text-align: left;

  cursor: pointer;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.05);

  transition: .25s;

}


.quick-card:hover {

  transform: translateY(-4px);

  box-shadow:
    0 14px 30px
    rgba(0,0,0,.1);

}


.quick-icon {

  width: 45px;

  height: 45px;

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  margin-bottom: 13px;

}


.quick-card strong {

  display: block;

  color: #26384d;

  margin-bottom: 5px;

}


.quick-card span {

  color: #8a98a8;

  font-size: .73rem;

}


/* =====================================================
   SECTION
===================================================== */

.section-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;

}


.section-header h2 {

  color: #003366;

  margin: 0 0 5px;

}


.section-header p {

  color: #8a98a8;

  margin: 0;

}


.primary-btn {

  border: none;

  background:
    linear-gradient(
      90deg,
      #003366,
      #0066b3
    );

  color: white;

  padding: 13px 20px;

  border-radius: 10px;

  font-weight: 700;

  cursor: pointer;

}


/* =====================================================
   DATA CARD
===================================================== */

.data-card {

  background: white;

  border-radius: 18px;

  padding: 20px;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.05);

}


/* =====================================================
   LARGE EVENT
===================================================== */

.large-event-row {

  display: flex;

  align-items: center;

  gap: 20px;

  padding: 18px;

  border-bottom:
    1px solid #edf1f5;

}


.large-event-image {

  width: 100px;

  height: 70px;

  flex-shrink: 0;

}


.large-event-info {

  flex: 1;

}


.category {

  color: #0066b3;

  font-size: .68rem;

  font-weight: 800;

}


.large-event-info h3 {

  margin: 5px 0;

  color: #003366;

}


.large-event-info p {

  margin: 3px 0;

  color: #8a98a8;

  font-size: .75rem;

}


.action-btn {

  width: 38px;

  height: 38px;

  border: none;

  border-radius: 9px;

  background: #f0f4f8;

  cursor: pointer;

}


/* =====================================================
   USERS
===================================================== */

.users-grid {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 20px;

}


.user-card {

  background: white;

  border-radius: 17px;

  padding: 25px;

  text-align: center;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.05);

}


.user-avatar {

  width: 60px;

  height: 60px;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #003366,
      #1976d2
    );

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  margin: 0 auto 12px;

  font-weight: 800;

}


.user-avatar.small {

  width: 38px;

  height: 38px;

  margin: 0;

  font-size: .7rem;

}


.user-card h3 {

  margin: 5px 0;

  color: #003366;

}


.user-card p {

  color: #8a98a8;

  font-size: .78rem;

}


.role-badge {

  display: inline-block;

  padding: 5px 9px;

  border-radius: 12px;

  background: #e3f2fd;

  color: #0055aa;

  font-size: .65rem;

  font-weight: 800;

  margin: 7px 0;

}


.user-status {

  display: block;

  color: #2e7d32;

  font-size: .7rem;

}


.user-status.inactivo {

  color: #c62828;

}


/* =====================================================
   TABLE ROW
===================================================== */

.table-row {

  min-height: 70px;

  display: grid;

  grid-template-columns:
    2fr 1.5fr 1fr 1fr;

  align-items: center;

  gap: 20px;

  border-bottom:
    1px solid #edf1f5;

}


.table-user {

  display: flex;

  align-items: center;

  gap: 12px;

}


.table-user > div:last-child {

  display: flex;

  flex-direction: column;

  gap: 4px;

}


.table-user strong {

  font-size: .8rem;

}


.table-user span {

  color: #8a98a8;

  font-size: .7rem;

}


/* =====================================================
   SEARCH
===================================================== */

.search-box {

  width: 100%;

  display: flex;

  align-items: center;

  gap: 10px;

  background: #f5f7fa;

  border-radius: 10px;

  padding: 11px 15px;

  margin-bottom: 15px;

}


.search-box input {

  width: 100%;

  border: none;

  outline: none;

  background: transparent;

}


/* =====================================================
   PAYMENT ADMIN
===================================================== */

.payment-summary {

  background: #fff3e0;

  color: #ef6c00;

  padding: 10px 20px;

  border-radius: 12px;

  text-align: center;

}


.payment-summary span {

  display: block;

  font-size: .65rem;

}


.payment-summary strong {

  font-size: 1.3rem;

}


.payment-admin-header,
.payment-admin-row {

  display: grid;

  grid-template-columns:
    1.7fr 1.1fr .7fr .9fr .8fr .7fr;

  gap: 15px;

  align-items: center;

}


.payment-admin-header {

  color: #8a98a8;

  font-size: .65rem;

  font-weight: 800;

  padding: 12px;

  border-bottom:
    1px solid #e5eaf0;

}


.payment-admin-row {

  padding: 15px 12px;

  border-bottom:
    1px solid #edf1f5;

  font-size: .75rem;

}


.payment-admin-row code {

  color: #003366;

  font-weight: 700;

}


.review-btn {

  border: none;

  background: #e3f2fd;

  color: #0055aa;

  padding: 8px 11px;

  border-radius: 8px;

  font-size: .7rem;

  font-weight: 700;

  cursor: pointer;

}


/* =====================================================
   REPORTS
===================================================== */

.reports-grid {

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;

}


.report-card {

  background: white;

  border-radius: 17px;

  padding: 25px;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.05);

}


.report-icon {

  font-size: 30px;

  margin-bottom: 15px;

}


.report-card h3 {

  color: #003366;

  margin: 0 0 8px;

}


.report-card p {

  color: #8a98a8;

  font-size: .78rem;

  line-height: 1.5;

  min-height: 45px;

}


.report-card button {

  border: none;

  background: #eef4fb;

  color: #0055aa;

  padding: 10px 13px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 700;

  font-size: .7rem;

}


/* =====================================================
   SETTINGS
===================================================== */

.settings-card {

  background: white;

  border-radius: 18px;

  padding: 10px 30px;

  box-shadow:
    0 8px 25px
    rgba(0,0,0,.05);

}


.setting {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 30px;

  padding: 25px 0;

  border-bottom:
    1px solid #edf1f5;

}


.setting:last-child {

  border-bottom: none;

}


.setting strong {

  color: #26384d;

}


.setting p {

  color: #8a98a8;

  font-size: .75rem;

}


.setting input {

  width: 300px;

  border:
    1px solid #dce3ea;

  border-radius: 8px;

  padding: 11px;

  outline: none;

}


/* =====================================================
   SWITCH
===================================================== */

.switch input {

  display: none;

}


.switch span {

  display: block;

  width: 50px;

  height: 26px;

  background: #ccd5df;

  border-radius: 20px;

  position: relative;

  cursor: pointer;

}


.switch span::after {

  content: "";

  position: absolute;

  width: 20px;

  height: 20px;

  background: white;

  border-radius: 50%;

  top: 3px;

  left: 3px;

  transition: .25s;

}


.switch input:checked + span {

  background: #1976d2;

}


.switch input:checked + span::after {

  transform:
    translateX(24px);

}


/* =====================================================
   NOTIFICATION PANEL
===================================================== */

.notification-panel {

  position: fixed;

  top: 75px;

  right: 25px;

  width: 330px;

  background: white;

  border-radius: 15px;

  box-shadow:
    0 20px 50px
    rgba(0,0,0,.18);

  z-index: 2000;

  overflow: hidden;

}


.notification-header {

  display: flex;

  justify-content: space-between;

  padding: 17px;

  border-bottom:
    1px solid #edf1f5;

}


.notification-header button {

  border: none;

  background: transparent;

  font-size: 20px;

  cursor: pointer;

}


.notification-item {

  display: flex;

  gap: 12px;

  padding: 17px;

  border-bottom:
    1px solid #edf1f5;

}


.notification-icon {

  width: 38px;

  height: 38px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

}


.notification-icon.orange {

  background: #fff3e0;

}


.notification-icon.blue {

  background: #e3f2fd;

}


.notification-item strong {

  font-size: .8rem;

}


.notification-item p {

  color: #8a98a8;

  font-size: .7rem;

  margin: 4px 0 0;

}


/* =====================================================
   MODAL
===================================================== */

.modal-overlay {

  position: fixed;

  inset: 0;

  background:
    rgba(0,0,0,.6);

  z-index: 3000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

}


.review-modal {

  width: 100%;

  max-width: 650px;

  background: white;

  border-radius: 20px;

  padding: 30px;

  position: relative;

  box-shadow:
    0 30px 80px
    rgba(0,0,0,.3);

}


.close-modal {

  position: absolute;

  right: 20px;

  top: 20px;

  border: none;

  background: #f1f4f7;

  width: 35px;

  height: 35px;

  border-radius: 50%;

  font-size: 20px;

  cursor: pointer;

}


.review-header {

  display: flex;

  align-items: center;

  gap: 15px;

  margin-bottom: 25px;

}


.review-avatar {

  width: 55px;

  height: 55px;

  border-radius: 50%;

  background: #003d73;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 800;

}


.review-header h2 {

  color: #003366;

  margin: 0 0 3px;

}


.review-header p {

  color: #8a98a8;

  margin: 0;

}


.review-data {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 15px;

  margin-bottom: 20px;

}


.review-data div {

  background: #f6f8fa;

  padding: 14px;

  border-radius: 10px;

}


.review-data span {

  display: block;

  color: #8a98a8;

  font-size: .68rem;

  margin-bottom: 5px;

}


.review-data strong {

  font-size: .8rem;

  color: #26384d;

}


.receipt-placeholder {

  height: 180px;

  border:
    2px dashed #ccd7e3;

  border-radius: 13px;

  background: #fafcff;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 7px;

  color: #8a98a8;

}


.receipt-placeholder:first-letter {

  font-size: 40px;

}


.receipt-placeholder strong {

  color: #003366;

}


.receipt-placeholder span {

  font-size: .75rem;

}


.review-actions {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 15px;

  margin-top: 20px;

}


.reject-btn,
.approve-btn {

  border: none;

  padding: 14px;

  border-radius: 10px;

  font-weight: 800;

  cursor: pointer;

}


.reject-btn {

  background: #ffebee;

  color: #c62828;

}


.approve-btn {

  background: #e8f5e9;

  color: #2e7d32;

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media(max-width: 1200px) {

  .stats-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }


  .quick-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }


  .reports-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }

}


@media(max-width: 1000px) {

  .dashboard-grid {

    grid-template-columns: 1fr;

  }


  .users-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }

}


@media(max-width: 768px) {

  .sidebar {

    width: 80px;

  }


  .sidebar:not(.collapsed) {

    width: 265px;

  }


  .main-content {

    width: calc(100% - 80px);

    margin-left: 80px;

  }


  .sidebar.collapsed
  ~ .main-content {

    width: calc(100% - 80px);

    margin-left: 80px;

  }


  .top-profile-text {

    display: none;

  }


  .dashboard-content,
  .section-content {

    padding: 20px 15px;

  }


  .welcome-card {

    padding: 25px;

  }


  .welcome-icon {

    display: none;

  }


  .event-row {

    grid-template-columns:
      55px 1fr;

  }


  .event-progress,
  .event-row .status {

    display: none;

  }


  .users-grid {

    grid-template-columns: 1fr;

  }


  .payment-admin-header {

    display: none;

  }


  .payment-admin-row {

    grid-template-columns: 1fr 1fr;

    padding: 20px 5px;

  }


  .large-event-row {

    flex-wrap: wrap;

  }


  .setting {

    flex-direction: column;

    align-items: flex-start;

  }


  .setting input {

    width: 100%;

  }

}


@media(max-width: 550px) {

  .stats-grid,
  .quick-grid,
  .reports-grid {

    grid-template-columns: 1fr;

  }


  .topbar {

    padding: 0 15px;

  }


  .topbar-right {

    gap: 8px;

  }


  .notification-panel {

    right: 10px;

    width: calc(100% - 20px);

  }


  .review-data {

    grid-template-columns: 1fr;

  }


  .review-actions {

    grid-template-columns: 1fr;

  }

}

</style>