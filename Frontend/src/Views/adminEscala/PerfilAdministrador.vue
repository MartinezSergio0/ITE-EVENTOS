<template>

  <div class="escala-admin">

    <!-- =========================================
         SIDEBAR
    ========================================== -->

    <aside
      class="sidebar"
      :class="{ 'sidebar-open': sidebarOpen }"
    >

      <!-- LOGO -->

      <div class="sidebar-header">

        <div class="logo-box">
          ESCALA
        </div>

        <div class="logo-text">

          <strong>Congreso</strong>

          <span>Administrador</span>

        </div>

      </div>


      <!-- PERFIL -->

      <div class="admin-profile">

        <div class="avatar">
          AE
        </div>

        <div>

          <strong>Administrador</strong>

          <span>Congreso ESCALA</span>

        </div>

      </div>


      <!-- MENU -->

      <nav class="menu">

        <p class="menu-title">
          PRINCIPAL
        </p>

        <button
          :class="{ active: activeSection === 'dashboard' }"
          @click="changeSection('dashboard')"
        >

          <span>📊</span>

          Dashboard

        </button>


        <button
          :class="{ active: activeSection === 'participantes' }"
          @click="changeSection('participantes')"
        >

          <span>👥</span>

          Participantes

        </button>


        <button
          :class="{ active: activeSection === 'pagos' }"
          @click="changeSection('pagos')"
        >

          <span>💰</span>

          Pagos

          <span
            v-if="pendingPayments > 0"
            class="notification"
          >
            {{ pendingPayments }}
          </span>

        </button>


        <button
          :class="{ active: activeSection === 'comprobantes' }"
          @click="changeSection('comprobantes')"
        >

          <span>📤</span>

          Comprobantes

          <span
            v-if="pendingReceipts > 0"
            class="notification"
          >
            {{ pendingReceipts }}
          </span>

        </button>


        <button
          :class="{ active: activeSection === 'asistencia' }"
          @click="changeSection('asistencia')"
        >

          <span>📱</span>

          Asistencia

        </button>


        <p class="menu-title">
          EVENTO
        </p>


        <button
          :class="{ active: activeSection === 'estadisticas' }"
          @click="changeSection('estadisticas')"
        >

          <span>📈</span>

          Estadísticas

        </button>


        <button
          :class="{ active: activeSection === 'constancias' }"
          @click="changeSection('constancias')"
        >

          <span>🎓</span>

          Constancias

        </button>


        <button
          :class="{ active: activeSection === 'reportes' }"
          @click="changeSection('reportes')"
        >

          <span>📄</span>

          Reportes

        </button>


        <button
          :class="{ active: activeSection === 'configuracion' }"
          @click="changeSection('configuracion')"
        >

          <span>⚙️</span>

          Configuración

        </button>

      </nav>


      <!-- VOLVER -->

      <div class="sidebar-bottom">

        <button
          class="back-btn"
          @click="volver"
        >

          ←

          Volver al panel

        </button>

      </div>

    </aside>


    <!-- =========================================
         CONTENIDO
    ========================================== -->

    <main class="main-content">


      <!-- HEADER -->

      <header class="topbar">

        <button
          class="mobile-menu"
          @click="sidebarOpen = !sidebarOpen"
        >
          ☰
        </button>


        <div>

          <h1>
            {{ sectionTitle }}
          </h1>

          <p>
            Administración del Congreso ESCALA
          </p>

        </div>


        <div class="topbar-right">

          <div class="event-status">

            <span class="status-dot"></span>

            Evento activo

          </div>


          <div class="user-mini">

            <div class="avatar small">
              AE
            </div>

            <span>
              Administrador
            </span>

          </div>

        </div>

      </header>


      <!-- =========================================
           DASHBOARD
      ========================================== -->

      <section
        v-if="activeSection === 'dashboard'"
        class="content"
      >

        <!-- BIENVENIDA -->

        <div class="welcome">

          <div>

            <span class="welcome-label">
              CONGRESO ESCALA
            </span>

            <h2>
              Panel de administración
            </h2>

            <p>
              Desde aquí puedes controlar participantes,
              pagos, comprobantes, asistencia y constancias
              del Congreso ESCALA.
            </p>

          </div>

          <div class="welcome-icon">
            🎓
          </div>

        </div>


        <!-- ESTADISTICAS -->

        <div class="stats-grid">


          <div class="stat-card">

            <div class="stat-icon blue">
              👥
            </div>

            <div>

              <span>
                Participantes
              </span>

              <strong>
                {{ participants.length }}
              </strong>

              <small>
                Registrados
              </small>

            </div>

          </div>


          <div class="stat-card">

            <div class="stat-icon green">
              💰
            </div>

            <div>

              <span>
                Pagos aprobados
              </span>

              <strong>
                {{ approvedPayments }}
              </strong>

              <small>
                Confirmados
              </small>

            </div>

          </div>


          <div class="stat-card">

            <div class="stat-icon orange">
              ⏳
            </div>

            <div>

              <span>
                Pagos pendientes
              </span>

              <strong>
                {{ pendingPayments }}
              </strong>

              <small>
                Por revisar
              </small>

            </div>

          </div>


          <div class="stat-card">

            <div class="stat-icon purple">
              📱
            </div>

            <div>

              <span>
                Asistentes
              </span>

              <strong>
                {{ attendees }}
              </strong>

              <small>
                Registrados
              </small>

            </div>

          </div>

        </div>


        <!-- CONTENIDO INFERIOR -->

        <div class="dashboard-grid">


          <!-- PAGOS -->

          <div class="panel">

            <div class="panel-header">

              <div>

                <h3>
                  Comprobantes pendientes
                </h3>

                <p>
                  Requieren revisión
                </p>

              </div>

              <button
                @click="changeSection('comprobantes')"
              >
                Ver todos →
              </button>

            </div>


            <div
              v-if="pendingReceipts > 0"
              class="pending-list"
            >

              <div
                v-for="participant in pendingParticipants"
                :key="participant.id"
                class="pending-item"
              >

                <div class="participant-avatar">
                  {{ getInitials(participant.name) }}
                </div>

                <div class="participant-info">

                  <strong>
                    {{ participant.name }}
                  </strong>

                  <span>
                    {{ participant.control }}
                  </span>

                </div>

                <span class="pending-badge">
                  Pendiente
                </span>

              </div>

            </div>


            <div
              v-else
              class="empty"
            >

              <span>✓</span>

              <p>
                No hay comprobantes pendientes.
              </p>

            </div>

          </div>


          <!-- RESUMEN -->

          <div class="panel">

            <div class="panel-header">

              <div>

                <h3>
                  Resumen del evento
                </h3>

                <p>
                  Congreso ESCALA
                </p>

              </div>

            </div>


            <div class="event-summary">

              <div>

                <span>
                  Fecha
                </span>

                <strong>
                  10 - 12 Septiembre
                </strong>

              </div>


              <div>

                <span>
                  Lugar
                </span>

                <strong>
                  Instituto Tecnológico de Ensenada
                </strong>

              </div>


              <div>

                <span>
                  Cuota
                </span>

                <strong>
                  $1,000 MXN
                </strong>

              </div>


              <div>

                <span>
                  Capacidad
                </span>

                <strong>
                  500 participantes
                </strong>

              </div>

            </div>

          </div>

        </div>


        <!-- PARTICIPANTES -->

        <div class="panel participants-panel">

          <div class="panel-header">

            <div>

              <h3>
                Participantes recientes
              </h3>

              <p>
                Últimos registros
              </p>

            </div>

            <button
              @click="changeSection('participantes')"
            >
              Ver participantes →
            </button>

          </div>


          <div class="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Participante
                  </th>

                  <th>
                    No. Control
                  </th>

                  <th>
                    Tipo
                  </th>

                  <th>
                    Pago
                  </th>

                  <th>
                    Asistencia
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="participant in participants.slice(0,5)"
                  :key="participant.id"
                >

                  <td>

                    <div class="table-user">

                      <div class="participant-avatar">
                        {{ getInitials(participant.name) }}
                      </div>

                      <div>

                        <strong>
                          {{ participant.name }}
                        </strong>

                        <span>
                          {{ participant.email }}
                        </span>

                      </div>

                    </div>

                  </td>


                  <td>
                    {{ participant.control }}
                  </td>


                  <td>

                    <span class="type-badge">
                      {{ participant.type }}
                    </span>

                  </td>


                  <td>

                    <span
                      class="payment-badge"
                      :class="participant.payment"
                    >

                      {{
                        participant.payment === 'approved'
                        ? 'Aprobado'
                        : participant.payment === 'pending'
                        ? 'Pendiente'
                        : 'Rechazado'
                      }}

                    </span>

                  </td>


                  <td>

                    <span
                      class="attendance"
                      :class="{ present: participant.attended }"
                    >

                      {{
                        participant.attended
                        ? '✓ Presente'
                        : '— No registrado'
                      }}

                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>


      <!-- =========================================
           PARTICIPANTES
      ========================================== -->

      <section
        v-if="activeSection === 'participantes'"
        class="content"
      >

        <div class="section-header">

          <div>

            <h2>
              Participantes
            </h2>

            <p>
              Consulta y administra los participantes
              registrados en ESCALA.
            </p>

          </div>

          <button
            class="primary-btn"
            @click="exportParticipants"
          >
            📥 Exportar Excel
          </button>

        </div>


        <!-- FILTROS -->

        <div class="filters">

          <input
            v-model="search"
            type="text"
            placeholder="🔎 Buscar por nombre o número de control..."
          >


          <select v-model="paymentFilter">

            <option value="all">
              Todos los pagos
            </option>

            <option value="approved">
              Pagados
            </option>

            <option value="pending">
              Pendientes
            </option>

            <option value="rejected">
              Rechazados
            </option>

          </select>


          <select v-model="typeFilter">

            <option value="all">
              Todos los participantes
            </option>

            <option value="Estudiante">
              Estudiantes
            </option>

            <option value="Docente">
              Docentes
            </option>

            <option value="General">
              Generales
            </option>

          </select>

        </div>


        <!-- TABLA -->

        <div class="panel">

          <div class="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Participante
                  </th>

                  <th>
                    Control
                  </th>

                  <th>
                    Tipo
                  </th>

                  <th>
                    Correo
                  </th>

                  <th>
                    Pago
                  </th>

                  <th>
                    Asistencia
                  </th>

                  <th>
                    Acción
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="participant in filteredParticipants"
                  :key="participant.id"
                >

                  <td>

                    <div class="table-user">

                      <div class="participant-avatar">
                        {{ getInitials(participant.name) }}
                      </div>

                      <strong>
                        {{ participant.name }}
                      </strong>

                    </div>

                  </td>


                  <td>
                    {{ participant.control }}
                  </td>


                  <td>
                    {{ participant.type }}
                  </td>


                  <td>
                    {{ participant.email }}
                  </td>


                  <td>

                    <span
                      class="payment-badge"
                      :class="participant.payment"
                    >

                      {{
                        participant.payment === 'approved'
                        ? 'Aprobado'
                        : participant.payment === 'pending'
                        ? 'Pendiente'
                        : 'Rechazado'
                      }}

                    </span>

                  </td>


                  <td>

                    <span
                      class="attendance"
                      :class="{ present: participant.attended }"
                    >

                      {{
                        participant.attended
                        ? '✓ Presente'
                        : 'Pendiente'
                      }}

                    </span>

                  </td>


                  <td>

                    <button
                      class="view-btn"
                      @click="viewParticipant(participant)"
                    >
                      Ver
                    </button>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>


      <!-- =========================================
           PAGOS
      ========================================== -->

      <section
        v-if="activeSection === 'pagos'"
        class="content"
      >

        <div class="section-header">

          <div>

            <h2>
              Control de pagos
            </h2>

            <p>
              Revisa el estado de las cuotas de recuperación.
            </p>

          </div>

        </div>


        <div class="stats-grid">

          <div class="stat-card">

            <div class="stat-icon green">
              ✓
            </div>

            <div>

              <span>
                Pagos aprobados
              </span>

              <strong>
                {{ approvedPayments }}
              </strong>

            </div>

          </div>


          <div class="stat-card">

            <div class="stat-icon orange">
              ⏳
            </div>

            <div>

              <span>
                Pendientes
              </span>

              <strong>
                {{ pendingPayments }}
              </strong>

            </div>

          </div>


          <div class="stat-card">

            <div class="stat-icon red">
              ✕
            </div>

            <div>

              <span>
                Rechazados
              </span>

              <strong>
                {{ rejectedPayments }}
              </strong>

            </div>

          </div>

        </div>


        <div class="panel">

          <div class="panel-header">

            <div>

              <h3>
                Información bancaria
              </h3>

              <p>
                Datos configurados para ESCALA
              </p>

            </div>

          </div>


          <div class="bank-info">

            <div>
              <span>Banco</span>
              <strong>Scotiabank</strong>
            </div>

            <div>
              <span>Titular</span>
              <strong>
                Academia Estatal de Ciencias Económico Administrativas
              </strong>
            </div>

            <div>
              <span>Cuenta</span>
              <strong>
                13003338223
              </strong>
            </div>

            <div>
              <span>CLABE</span>
              <strong>
                044028130033382234
              </strong>
            </div>

            <div>
              <span>Cuota</span>
              <strong>
                $1,000 MXN
              </strong>
            </div>

          </div>

        </div>

      </section>


      <!-- =========================================
           COMPROBANTES
      ========================================== -->

      <section
        v-if="activeSection === 'comprobantes'"
        class="content"
      >

        <div class="section-header">

          <div>

            <h2>
              Comprobantes de pago
            </h2>

            <p>
              Revisa y valida los comprobantes enviados
              por los participantes.
            </p>

          </div>

        </div>


        <div class="receipt-grid">

          <div
            v-for="participant in pendingParticipants"
            :key="participant.id"
            class="receipt-card"
          >

            <div class="receipt-header">

              <div class="participant-avatar">
                {{ getInitials(participant.name) }}
              </div>

              <div>

                <strong>
                  {{ participant.name }}
                </strong>

                <span>
                  {{ participant.control }}
                </span>

              </div>

            </div>


            <div class="receipt-preview">

              📄

              <span>
                Comprobante de pago
              </span>

            </div>


            <div class="receipt-data">

              <p>
                <strong>Referencia:</strong>
                {{ participant.reference }}
              </p>

              <p>
                <strong>Monto:</strong>
                $1,000 MXN
              </p>

            </div>


            <div class="receipt-actions">

              <button
                class="approve-btn"
                @click="approvePayment(participant)"
              >
                ✓ Aprobar
              </button>

              <button
                class="reject-btn"
                @click="rejectPayment(participant)"
              >
                ✕ Rechazar
              </button>

            </div>

          </div>

        </div>

      </section>


      <!-- =========================================
           ASISTENCIA
      ========================================== -->

      <section
        v-if="activeSection === 'asistencia'"
        class="content"
      >

        <div class="section-header">

          <div>

            <h2>
              Control de asistencia
            </h2>

            <p>
              Consulta las personas que han registrado
              asistencia mediante QR.
            </p>

          </div>

        </div>


        <div class="attendance-box">

          <div class="qr-icon">
            📱
          </div>

          <h3>
            Escaneo de asistencia
          </h3>

          <p>
            Utiliza el lector QR para registrar
            automáticamente la asistencia.
          </p>

          <button
            class="primary-btn"
            @click="startQR"
          >
            📷 Escanear QR
          </button>

        </div>


        <div class="panel">

          <div class="panel-header">

            <h3>
              Resumen de asistencia
            </h3>

          </div>

          <div class="attendance-stats">

            <div>

              <strong>
                {{ attendees }}
              </strong>

              <span>
                Asistentes
              </span>

            </div>


            <div>

              <strong>
                {{ participants.length - attendees }}
              </strong>

              <span>
                Sin asistencia
              </span>

            </div>


            <div>

              <strong>
                {{ attendancePercentage }}%
              </strong>

              <span>
                Porcentaje
              </span>

            </div>

          </div>

        </div>

      </section>


      <!-- =========================================
           ESTADISTICAS
      ========================================== -->

      <section
        v-if="activeSection === 'estadisticas'"
        class="content"
      >

        <div class="section-header">

          <div>

            <h2>
              Estadísticas
            </h2>

            <p>
              Información general del Congreso ESCALA.
            </p>

          </div>

        </div>


        <div class="statistics-grid">

          <div class="chart-card">

            <h3>
              Participantes por tipo
            </h3>

            <div class="fake-chart">

              <div
                class="bar"
                style="height:80%"
              >
                <span>Estudiantes</span>
              </div>

              <div
                class="bar"
                style="height:45%"
              >
                <span>Docentes</span>
              </div>

              <div
                class="bar"
                style="height:30%"
              >
                <span>Generales</span>
              </div>

            </div>

          </div>


          <div class="chart-card">

            <h3>
              Estado de pagos
            </h3>

            <div class="payment-circle">

              <strong>
                {{ approvedPayments }}
              </strong>

              <span>
                aprobados
              </span>

            </div>

          </div>

        </div>

      </section>


      <!-- =========================================
           CONSTANCIAS
      ========================================== -->

      <section
        v-if="activeSection === 'constancias'"
        class="content"
      >

        <div class="section-header">

          <div>

            <h2>
              Constancias
            </h2>

            <p>
              Genera y administra las constancias
              de participación.
            </p>

          </div>

          <button
            class="primary-btn"
            @click="generateCertificates"
          >
            🎓 Generar constancias
          </button>

        </div>


        <div class="certificate-info">

          <div class="certificate-icon">
            🎓
          </div>

          <div>

            <h3>
              Generación de constancias
            </h3>

            <p>
              Las constancias podrán generarse
              únicamente para participantes con
              pago aprobado y asistencia registrada.
            </p>

          </div>

        </div>

      </section>


      <!-- =========================================
           REPORTES
      ========================================== -->

      <section
        v-if="activeSection === 'reportes'"
        class="content"
      >

        <div class="section-header">

          <div>

            <h2>
              Reportes
            </h2>

            <p>
              Exporta la información del Congreso ESCALA.
            </p>

          </div>

        </div>


        <div class="reports-grid">

          <button
            class="report-card"
            @click="exportParticipants"
          >

            <span>📊</span>

            <strong>
              Reporte de participantes
            </strong>

            <small>
              Excel / CSV
            </small>

          </button>


          <button
            class="report-card"
            @click="exportPayments"
          >

            <span>💰</span>

            <strong>
              Reporte de pagos
            </strong>

            <small>
              Excel / PDF
            </small>

          </button>


          <button
            class="report-card"
            @click="exportAttendance"
          >

            <span>📱</span>

            <strong>
              Reporte de asistencia
            </strong>

            <small>
              Excel / PDF
            </small>

          </button>


          <button
            class="report-card"
            @click="exportStatistics"
          >

            <span>📈</span>

            <strong>
              Estadísticas
            </strong>

            <small>
              PDF
            </small>

          </button>

        </div>

      </section>


      <!-- =========================================
           CONFIGURACIÓN
      ========================================== -->

      <section
        v-if="activeSection === 'configuracion'"
        class="content"
      >

        <div class="section-header">

          <div>

            <h2>
              Configuración de ESCALA
            </h2>

            <p>
              Configura los datos generales del evento.
            </p>

          </div>

          <button
            class="primary-btn"
            @click="saveSettings"
          >
            💾 Guardar cambios
          </button>

        </div>


        <div class="panel settings">

          <div class="form-grid">

            <div class="form-group">

              <label>
                Nombre del evento
              </label>

              <input
                v-model="settings.name"
                type="text"
              >

            </div>


            <div class="form-group">

              <label>
                Cuota
              </label>

              <input
                v-model="settings.cost"
                type="text"
              >

            </div>


            <div class="form-group">

              <label>
                Fecha
              </label>

              <input
                v-model="settings.date"
                type="text"
              >

            </div>


            <div class="form-group">

              <label>
                Capacidad
              </label>

              <input
                v-model="settings.capacity"
                type="number"
              >

            </div>


            <div class="form-group full">

              <label>
                Lugar
              </label>

              <input
                v-model="settings.place"
                type="text"
              >

            </div>

          </div>

        </div>

      </section>

    </main>


    <!-- =========================================
         MODAL PARTICIPANTE
    ========================================== -->

    <div
      v-if="selectedParticipant"
      class="modal-overlay"
      @click.self="selectedParticipant = null"
    >

      <div class="modal">

        <button
          class="close-modal"
          @click="selectedParticipant = null"
        >
          ✕
        </button>

        <div class="modal-avatar">
          {{ getInitials(selectedParticipant.name) }}
        </div>

        <h2>
          {{ selectedParticipant.name }}
        </h2>

        <p class="modal-control">
          {{ selectedParticipant.control }}
        </p>


        <div class="modal-data">

          <div>
            <span>Correo</span>
            <strong>
              {{ selectedParticipant.email }}
            </strong>
          </div>

          <div>
            <span>Tipo</span>
            <strong>
              {{ selectedParticipant.type }}
            </strong>
          </div>

          <div>
            <span>Referencia</span>
            <strong>
              {{ selectedParticipant.reference }}
            </strong>
          </div>

          <div>
            <span>Pago</span>
            <strong>
              {{
                selectedParticipant.payment === 'approved'
                ? 'Aprobado'
                : 'Pendiente'
              }}
            </strong>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>


<script setup>

import {
  ref,
  computed
} from "vue";

import {
  useRouter
} from "vue-router";


/* =========================================
   ROUTER
========================================= */

const router = useRouter();


/* =========================================
   SIDEBAR
========================================= */

const sidebarOpen = ref(false);


/* =========================================
   SECCIÓN ACTUAL
========================================= */

const activeSection = ref("dashboard");


/* =========================================
   FILTROS
========================================= */

const search = ref("");

const paymentFilter = ref("all");

const typeFilter = ref("all");


/* =========================================
   PARTICIPANTE SELECCIONADO
========================================= */

const selectedParticipant = ref(null);


/* =========================================
   CONFIGURACIÓN
========================================= */

const settings = ref({

  name: "Congreso ESCALA",

  cost: "$1,000 MXN",

  date: "10 al 12 de Septiembre",

  capacity: 500,

  place:
    "Instituto Tecnológico de Ensenada"

});


/* =========================================
   PARTICIPANTES
========================================= */

const participants = ref([

  {
    id: 1,

    name: "Ana López García",

    control: "21460234",

    type: "Estudiante",

    email: "ana@ite.edu.mx",

    payment: "approved",

    attended: true,

    reference: "2608000001"

  },

  {
    id: 2,

    name: "Carlos Hernández",

    control: "21460321",

    type: "Estudiante",

    email: "carlos@ite.edu.mx",

    payment: "pending",

    attended: false,

    reference: "2608000002"

  },

  {
    id: 3,

    name: "María Fernanda Ruiz",

    control: "21460120",

    type: "Docente",

    email: "maria@ite.edu.mx",

    payment: "approved",

    attended: true,

    reference: "2608000003"

  },

  {
    id: 4,

    name: "José Martínez",

    control: "0",

    type: "General",

    email: "jose@gmail.com",

    payment: "pending",

    attended: false,

    reference: "2608000004"

  },

  {
    id: 5,

    name: "Laura Sánchez",

    control: "21460444",

    type: "Estudiante",

    email: "laura@ite.edu.mx",

    payment: "approved",

    attended: true,

    reference: "2608000005"

  },

  {
    id: 6,

    name: "Miguel Torres",

    control: "21460555",

    type: "Estudiante",

    email: "miguel@ite.edu.mx",

    payment: "rejected",

    attended: false,

    reference: "2608000006"

  }

]);


/* =========================================
   ESTADÍSTICAS
========================================= */

const approvedPayments = computed(() => {

  return participants.value.filter(
    p => p.payment === "approved"
  ).length;

});


const pendingPayments = computed(() => {

  return participants.value.filter(
    p => p.payment === "pending"
  ).length;

});


const rejectedPayments = computed(() => {

  return participants.value.filter(
    p => p.payment === "rejected"
  ).length;

});


const pendingParticipants = computed(() => {

  return participants.value.filter(
    p => p.payment === "pending"
  );

});


const pendingReceipts = computed(() => {

  return pendingParticipants.value.length;

});


const attendees = computed(() => {

  return participants.value.filter(
    p => p.attended
  ).length;

});


const attendancePercentage = computed(() => {

  if (!participants.value.length) {
    return 0;
  }

  return Math.round(
    (attendees.value / participants.value.length) * 100
  );

});


/* =========================================
   PARTICIPANTES FILTRADOS
========================================= */

const filteredParticipants = computed(() => {

  return participants.value.filter(participant => {

    const matchesSearch =

      participant.name
        .toLowerCase()
        .includes(search.value.toLowerCase())

      ||

      participant.control
        .includes(search.value);


    const matchesPayment =

      paymentFilter.value === "all"

      ||

      participant.payment === paymentFilter.value;


    const matchesType =

      typeFilter.value === "all"

      ||

      participant.type === typeFilter.value;


    return (

      matchesSearch &&

      matchesPayment &&

      matchesType

    );

  });

});


/* =========================================
   TITULO
========================================= */

const sectionTitle = computed(() => {

  const titles = {

    dashboard: "Dashboard",

    participantes: "Participantes",

    pagos: "Pagos",

    comprobantes: "Comprobantes",

    asistencia: "Asistencia",

    estadisticas: "Estadísticas",

    constancias: "Constancias",

    reportes: "Reportes",

    configuracion: "Configuración"

  };

  return titles[activeSection.value];

});


/* =========================================
   CAMBIAR SECCIÓN
========================================= */

function changeSection(section) {

  activeSection.value = section;

  sidebarOpen.value = false;

}


/* =========================================
   INICIALES
========================================= */

function getInitials(name) {

  return name

    .split(" ")

    .slice(0, 2)

    .map(word => word.charAt(0))

    .join("")

    .toUpperCase();

}


/* =========================================
   VER PARTICIPANTE
========================================= */

function viewParticipant(participant) {

  selectedParticipant.value = participant;

}


/* =========================================
   APROBAR PAGO
========================================= */

function approvePayment(participant) {

  participant.payment = "approved";

  alert(
    `El pago de ${participant.name} fue aprobado.`
  );

}


/* =========================================
   RECHAZAR PAGO
========================================= */

function rejectPayment(participant) {

  participant.payment = "rejected";

  alert(
    `El comprobante de ${participant.name} fue rechazado.`
  );

}


/* =========================================
   QR
========================================= */

function startQR() {

  alert(
    "Aquí se abrirá el lector QR para registrar asistencia."
  );

}


/* =========================================
   CONSTANCIAS
========================================= */

function generateCertificates() {

  alert(
    "Se generarán las constancias de los participantes que cumplan los requisitos."
  );

}


/* =========================================
   EXPORTACIONES
========================================= */

function exportParticipants() {

  alert(
    "Aquí se descargará el reporte de participantes."
  );

}


function exportPayments() {

  alert(
    "Aquí se descargará el reporte de pagos."
  );

}


function exportAttendance() {

  alert(
    "Aquí se descargará el reporte de asistencia."
  );

}


function exportStatistics() {

  alert(
    "Aquí se descargará el reporte estadístico."
  );

}


/* =========================================
   CONFIGURACIÓN
========================================= */

function saveSettings() {

  alert(
    "Configuración guardada correctamente."
  );

}


/* =========================================
   VOLVER
========================================= */

function volver() {

  router.push("/admin");

}

</script>


<style scoped>

/* =========================================
   RESET
========================================= */

* {
  box-sizing: border-box;
}

.escala-admin {

  min-height: 100vh;

  display: flex;

  background: #f4f7fb;

  color: #263238;

  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

}


/* =========================================
   SIDEBAR
========================================= */

.sidebar {

  width: 270px;

  min-height: 100vh;

  background:
    linear-gradient(
      180deg,
      #003366 0%,
      #004b82 100%
    );

  color: white;

  display: flex;

  flex-direction: column;

  position: fixed;

  left: 0;

  top: 0;

  z-index: 1000;

}


/* HEADER SIDEBAR */

.sidebar-header {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 25px 20px;

  border-bottom:
    1px solid
    rgba(255,255,255,.12);

}


.logo-box {

  width: 50px;

  height: 50px;

  border-radius: 13px;

  background: white;

  color: #003366;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 900;

  font-size: 12px;

}


.logo-text {

  display: flex;

  flex-direction: column;

}

.logo-text strong {

  font-size: 17px;

}

.logo-text span {

  font-size: 12px;

  opacity: .7;

}


/* PERFIL */

.admin-profile {

  margin: 20px;

  padding: 15px;

  border-radius: 14px;

  background:
    rgba(255,255,255,.08);

  display: flex;

  align-items: center;

  gap: 12px;

}

.admin-profile div:last-child {

  display: flex;

  flex-direction: column;

}

.admin-profile strong {

  font-size: 13px;

}

.admin-profile span {

  font-size: 11px;

  opacity: .65;

}


/* AVATAR */

.avatar {

  width: 40px;

  height: 40px;

  border-radius: 50%;

  background: #1976d2;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: bold;

  flex-shrink: 0;

}

.avatar.small {

  width: 35px;

  height: 35px;

  font-size: 12px;

}


/* MENU */

.menu {

  padding: 0 12px;

  flex: 1;

  overflow-y: auto;

}

.menu-title {

  font-size: 10px;

  letter-spacing: 1.5px;

  opacity: .45;

  padding: 15px 12px 8px;

}

.menu button {

  width: 100%;

  border: none;

  background: transparent;

  color: white;

  padding: 13px 14px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  gap: 12px;

  text-align: left;

  cursor: pointer;

  margin-bottom: 4px;

  font-size: 13px;

  transition: .25s;

}

.menu button span:first-child {

  width: 22px;

  text-align: center;

}

.menu button:hover {

  background:
    rgba(255,255,255,.10);

}

.menu button.active {

  background: white;

  color: #003366;

  font-weight: 700;

  box-shadow:
    0 8px 20px
    rgba(0,0,0,.12);

}

.notification {

  margin-left: auto;

  background: #ef5350;

  color: white;

  min-width: 21px;

  height: 21px;

  border-radius: 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 10px;

}


/* BOTTOM */

.sidebar-bottom {

  padding: 18px;

}

.back-btn {

  width: 100%;

  border: 1px solid
    rgba(255,255,255,.18);

  background:
    rgba(255,255,255,.08);

  color: white;

  padding: 12px;

  border-radius: 10px;

  cursor: pointer;

}

.back-btn:hover {

  background:
    rgba(255,255,255,.15);

}


/* =========================================
   MAIN
========================================= */

.main-content {

  margin-left: 270px;

  width: calc(100% - 270px);

  min-height: 100vh;

}


/* TOPBAR */

.topbar {

  height: 80px;

  background: white;

  border-bottom: 1px solid #e7ebf0;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 35px;

  position: sticky;

  top: 0;

  z-index: 100;

}

.topbar h1 {

  color: #003366;

  font-size: 22px;

  margin: 0 0 3px;

}

.topbar p {

  color: #78909c;

  margin: 0;

  font-size: 12px;

}

.topbar-right {

  display: flex;

  align-items: center;

  gap: 25px;

}

.event-status {

  display: flex;

  align-items: center;

  gap: 7px;

  color: #2e7d32;

  font-size: 12px;

  font-weight: 600;

}

.status-dot {

  width: 8px;

  height: 8px;

  background: #43a047;

  border-radius: 50%;

}

.user-mini {

  display: flex;

  align-items: center;

  gap: 10px;

  font-size: 13px;

}

.mobile-menu {

  display: none;

}


/* =========================================
   CONTENT
========================================= */

.content {

  padding: 35px;

  max-width: 1600px;

  margin: auto;

}


/* WELCOME */

.welcome {

  background:
    linear-gradient(
      110deg,
      #003366,
      #0066b3
    );

  color: white;

  border-radius: 20px;

  padding: 35px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 30px;

  overflow: hidden;

}

.welcome-label {

  font-size: 11px;

  letter-spacing: 2px;

  opacity: .7;

}

.welcome h2 {

  font-size: 28px;

  margin: 10px 0;

}

.welcome p {

  max-width: 650px;

  line-height: 1.6;

  opacity: .85;

  margin: 0;

}

.welcome-icon {

  font-size: 90px;

  opacity: .85;

}


/* =========================================
   STATS
========================================= */

.stats-grid {

  display: grid;

  grid-template-columns:
    repeat(4,1fr);

  gap: 20px;

  margin-bottom: 30px;

}

.stat-card {

  background: white;

  border-radius: 16px;

  padding: 22px;

  display: flex;

  align-items: center;

  gap: 16px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

}

.stat-icon {

  width: 52px;

  height: 52px;

  border-radius: 14px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 22px;

}

.stat-icon.blue {

  background: #e3f2fd;

}

.stat-icon.green {

  background: #e8f5e9;

}

.stat-icon.orange {

  background: #fff3e0;

}

.stat-icon.purple {

  background: #f3e5f5;

}

.stat-icon.red {

  background: #ffebee;

}

.stat-card span {

  display: block;

  color: #78909c;

  font-size: 12px;

}

.stat-card strong {

  display: block;

  color: #263238;

  font-size: 27px;

  margin: 3px 0;

}

.stat-card small {

  color: #90a4ae;

  font-size: 10px;

}


/* =========================================
   DASHBOARD GRID
========================================= */

.dashboard-grid {

  display: grid;

  grid-template-columns:
    1.5fr 1fr;

  gap: 25px;

  margin-bottom: 25px;

}


/* PANEL */

.panel {

  background: white;

  border-radius: 18px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

  overflow: hidden;

}

.panel-header {

  padding: 22px 25px;

  border-bottom:
    1px solid #edf0f3;

  display: flex;

  justify-content: space-between;

  align-items: center;

}

.panel-header h3 {

  color: #003366;

  margin: 0 0 4px;

  font-size: 16px;

}

.panel-header p {

  color: #90a4ae;

  margin: 0;

  font-size: 11px;

}

.panel-header button {

  border: none;

  background: transparent;

  color: #0066b3;

  cursor: pointer;

  font-weight: 600;

}


/* PENDING */

.pending-list {

  padding: 8px 20px;

}

.pending-item {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 13px 0;

  border-bottom:
    1px solid #f0f2f5;

}

.participant-avatar {

  width: 38px;

  height: 38px;

  border-radius: 50%;

  background: #e3f2fd;

  color: #0066b3;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 11px;

  font-weight: bold;

  flex-shrink: 0;

}

.participant-info {

  display: flex;

  flex-direction: column;

  flex: 1;

}

.participant-info strong {

  font-size: 13px;

}

.participant-info span {

  font-size: 10px;

  color: #90a4ae;

}

.pending-badge {

  background: #fff3e0;

  color: #ef6c00;

  padding: 6px 10px;

  border-radius: 20px;

  font-size: 10px;

  font-weight: 600;

}


/* EMPTY */

.empty {

  padding: 40px;

  text-align: center;

  color: #78909c;

}

.empty span {

  color: #43a047;

  font-size: 30px;

}


/* EVENT SUMMARY */

.event-summary {

  padding: 10px 25px;

}

.event-summary div {

  padding: 14px 0;

  border-bottom:
    1px solid #edf0f3;

}

.event-summary span {

  display: block;

  color: #90a4ae;

  font-size: 10px;

  margin-bottom: 4px;

}

.event-summary strong {

  font-size: 13px;

  color: #37474f;

}


/* =========================================
   TABLE
========================================= */

.table-wrapper {

  overflow-x: auto;

}

table {

  width: 100%;

  border-collapse: collapse;

  min-width: 850px;

}

th {

  background: #f8fafc;

  color: #78909c;

  font-size: 10px;

  text-align: left;

  padding: 14px 20px;

  text-transform: uppercase;

}

td {

  padding: 14px 20px;

  border-bottom:
    1px solid #edf0f3;

  font-size: 12px;

}

.table-user {

  display: flex;

  align-items: center;

  gap: 10px;

}

.table-user div:last-child {

  display: flex;

  flex-direction: column;

}

.table-user span {

  color: #90a4ae;

  font-size: 9px;

  margin-top: 2px;

}

.type-badge {

  background: #f0f4f8;

  color: #546e7a;

  padding: 5px 9px;

  border-radius: 15px;

  font-size: 10px;

}

.payment-badge {

  padding: 5px 9px;

  border-radius: 15px;

  font-size: 10px;

  font-weight: 600;

}

.payment-badge.approved {

  background: #e8f5e9;

  color: #2e7d32;

}

.payment-badge.pending {

  background: #fff3e0;

  color: #ef6c00;

}

.payment-badge.rejected {

  background: #ffebee;

  color: #c62828;

}

.attendance {

  color: #90a4ae;

  font-size: 10px;

}

.attendance.present {

  color: #2e7d32;

  font-weight: 600;

}

.view-btn {

  border: none;

  background: #e3f2fd;

  color: #0066b3;

  padding: 7px 12px;

  border-radius: 8px;

  cursor: pointer;

}


/* =========================================
   SECTION HEADER
========================================= */

.section-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 25px;

}

.section-header h2 {

  margin: 0 0 6px;

  color: #003366;

}

.section-header p {

  margin: 0;

  color: #78909c;

  font-size: 13px;

}


/* =========================================
   BUTTON
========================================= */

.primary-btn {

  border: none;

  background:
    linear-gradient(
      90deg,
      #003366,
      #0066b3
    );

  color: white;

  padding: 12px 18px;

  border-radius: 10px;

  font-weight: 600;

  cursor: pointer;

}

.primary-btn:hover {

  transform: translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(0,80,150,.25);

}


/* =========================================
   FILTERS
========================================= */

.filters {

  background: white;

  padding: 20px;

  border-radius: 16px;

  display: grid;

  grid-template-columns:
    2fr 1fr 1fr;

  gap: 12px;

  margin-bottom: 20px;

}

.filters input,
.filters select {

  border: 1px solid #dfe5eb;

  padding: 12px;

  border-radius: 9px;

  outline: none;

}

.filters input:focus,
.filters select:focus {

  border-color: #0066b3;

}


/* =========================================
   BANK INFO
========================================= */

.bank-info {

  padding: 25px;

  display: grid;

  grid-template-columns:
    repeat(2,1fr);

  gap: 20px;

}

.bank-info div {

  background: #f8fafc;

  padding: 16px;

  border-radius: 10px;

}

.bank-info span {

  display: block;

  color: #90a4ae;

  font-size: 10px;

  margin-bottom: 5px;

}

.bank-info strong {

  color: #37474f;

  font-size: 13px;

}


/* =========================================
   RECEIPTS
========================================= */

.receipt-grid {

  display: grid;

  grid-template-columns:
    repeat(3,1fr);

  gap: 20px;

}

.receipt-card {

  background: white;

  border-radius: 16px;

  padding: 20px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

}

.receipt-header {

  display: flex;

  gap: 12px;

  align-items: center;

  margin-bottom: 15px;

}

.receipt-header div:last-child {

  display: flex;

  flex-direction: column;

}

.receipt-header span {

  color: #90a4ae;

  font-size: 10px;

}

.receipt-preview {

  height: 150px;

  background: #f5f7fa;

  border-radius: 12px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  font-size: 40px;

  margin-bottom: 15px;

}

.receipt-preview span {

  font-size: 11px;

  color: #78909c;

  margin-top: 5px;

}

.receipt-data {

  font-size: 11px;

  color: #607d8b;

}

.receipt-data p {

  margin: 7px 0;

}

.receipt-actions {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 8px;

  margin-top: 15px;

}

.approve-btn,
.reject-btn {

  border: none;

  padding: 10px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;

}

.approve-btn {

  background: #e8f5e9;

  color: #2e7d32;

}

.reject-btn {

  background: #ffebee;

  color: #c62828;

}


/* =========================================
   ASISTENCIA
========================================= */

.attendance-box {

  background: white;

  padding: 50px;

  text-align: center;

  border-radius: 18px;

  margin-bottom: 25px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

}

.qr-icon {

  font-size: 65px;

  margin-bottom: 15px;

}

.attendance-box h3 {

  color: #003366;

}

.attendance-box p {

  color: #78909c;

  margin-bottom: 20px;

}

.attendance-stats {

  display: grid;

  grid-template-columns:
    repeat(3,1fr);

  padding: 25px;

}

.attendance-stats div {

  text-align: center;

  border-right:
    1px solid #edf0f3;

}

.attendance-stats div:last-child {

  border-right: none;

}

.attendance-stats strong {

  display: block;

  color: #003366;

  font-size: 30px;

}

.attendance-stats span {

  color: #90a4ae;

  font-size: 11px;

}


/* =========================================
   ESTADISTICAS
========================================= */

.statistics-grid {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 25px;

}

.chart-card {

  background: white;

  border-radius: 18px;

  padding: 25px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

}

.chart-card h3 {

  color: #003366;

}

.fake-chart {

  height: 250px;

  display: flex;

  align-items: flex-end;

  justify-content: center;

  gap: 50px;

  padding: 30px;

}

.bar {

  width: 70px;

  background:
    linear-gradient(
      180deg,
      #1976d2,
      #003366
    );

  border-radius:
    10px 10px 0 0;

  position: relative;

  min-height: 40px;

}

.bar span {

  position: absolute;

  bottom: -25px;

  width: 100px;

  left: -15px;

  font-size: 9px;

  text-align: center;

  color: #78909c;

}

.payment-circle {

  width: 190px;

  height: 190px;

  border-radius: 50%;

  margin: 30px auto;

  border:
    18px solid #e3f2fd;

  border-top-color: #1976d2;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

}

.payment-circle strong {

  font-size: 35px;

  color: #003366;

}

.payment-circle span {

  color: #78909c;

  font-size: 11px;

}


/* =========================================
   CONSTANCIAS
========================================= */

.certificate-info {

  background: white;

  border-radius: 18px;

  padding: 35px;

  display: flex;

  align-items: center;

  gap: 25px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

}

.certificate-icon {

  font-size: 60px;

}


/* =========================================
   REPORTES
========================================= */

.reports-grid {

  display: grid;

  grid-template-columns:
    repeat(4,1fr);

  gap: 20px;

}

.report-card {

  background: white;

  border: none;

  border-radius: 18px;

  padding: 30px;

  text-align: left;

  cursor: pointer;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

  transition: .25s;

}

.report-card:hover {

  transform: translateY(-5px);

}

.report-card span {

  display: block;

  font-size: 35px;

  margin-bottom: 20px;

}

.report-card strong {

  display: block;

  color: #003366;

  margin-bottom: 5px;

}

.report-card small {

  color: #90a4ae;

}


/* =========================================
   CONFIGURACION
========================================= */

.settings {

  padding: 30px;

}

.form-grid {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 20px;

}

.form-group {

  display: flex;

  flex-direction: column;

  gap: 7px;

}

.form-group.full {

  grid-column: 1 / -1;

}

.form-group label {

  color: #546e7a;

  font-size: 12px;

  font-weight: 600;

}

.form-group input {

  border: 1px solid #dfe5eb;

  border-radius: 9px;

  padding: 13px;

  outline: none;

}

.form-group input:focus {

  border-color: #0066b3;

}


/* =========================================
   MODAL
========================================= */

.modal-overlay {

  position: fixed;

  inset: 0;

  background:
    rgba(0,0,0,.55);

  z-index: 2000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

}

.modal {

  background: white;

  width: 100%;

  max-width: 480px;

  border-radius: 20px;

  padding: 35px;

  text-align: center;

  position: relative;

}

.close-modal {

  position: absolute;

  right: 18px;

  top: 18px;

  border: none;

  background: #f2f4f7;

  width: 32px;

  height: 32px;

  border-radius: 50%;

  cursor: pointer;

}

.modal-avatar {

  width: 75px;

  height: 75px;

  background: #e3f2fd;

  color: #0066b3;

  border-radius: 50%;

  margin: auto;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 22px;

  font-weight: bold;

}

.modal h2 {

  color: #003366;

  margin-bottom: 4px;

}

.modal-control {

  color: #90a4ae;

  margin-top: 0;

}

.modal-data {

  margin-top: 25px;

  display: grid;

  gap: 12px;

  text-align: left;

}

.modal-data div {

  background: #f7f9fb;

  padding: 12px;

  border-radius: 9px;

}

.modal-data span {

  display: block;

  color: #90a4ae;

  font-size: 9px;

  margin-bottom: 4px;

}

.modal-data strong {

  font-size: 12px;

}


/* =========================================
   RESPONSIVE
========================================= */

@media(max-width:1200px) {

  .stats-grid {

    grid-template-columns:
      repeat(2,1fr);

  }

  .receipt-grid {

    grid-template-columns:
      repeat(2,1fr);

  }

  .reports-grid {

    grid-template-columns:
      repeat(2,1fr);

  }

}


@media(max-width:900px) {

  .sidebar {

    transform:
      translateX(-100%);

    transition: .3s;

  }

  .sidebar.sidebar-open {

    transform:
      translateX(0);

  }

  .main-content {

    margin-left: 0;

    width: 100%;

  }

  .mobile-menu {

    display: block;

    border: none;

    background: transparent;

    font-size: 22px;

    margin-right: 15px;

    cursor: pointer;

  }

  .topbar {

    padding: 0 20px;

  }

  .dashboard-grid,
  .statistics-grid {

    grid-template-columns: 1fr;

  }

}


@media(max-width:650px) {

  .content {

    padding: 20px 15px;

  }

  .stats-grid {

    grid-template-columns: 1fr;

  }

  .receipt-grid,
  .reports-grid {

    grid-template-columns: 1fr;

  }

  .filters {

    grid-template-columns: 1fr;

  }

  .section-header {

    flex-direction: column;  

    align-items: flex-start;

    gap: 15px;

  }

  .topbar-right {

    display: none;

  }

  .welcome {

    padding: 25px;

  }

  .welcome-icon {

    display: none;

  }

  .welcome h2 {

    font-size: 22px;

  }

  .bank-info,
  .form-grid {

    grid-template-columns: 1fr;

  }

  .form-group.full {

    grid-column: auto;

  }

}

</style>