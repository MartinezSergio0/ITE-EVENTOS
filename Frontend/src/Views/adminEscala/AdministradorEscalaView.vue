<template>
  <div class="admin-escala">

    <!-- =====================================================
         SIDEBAR
    ====================================================== -->

    <aside
      class="sidebar"
      :class="{ open: sidebarOpen }"
    >

      <!-- LOGO -->
      <div class="sidebar-header">

        <div class="logo">
          ES
        </div>

        <div class="logo-info">
          <strong>ESCALA</strong>
          <span>Administrador</span>
        </div>

      </div>


      <!-- PERFIL -->
      <div class="profile">

        <div class="profile-avatar">
          AE
        </div>

        <div>
          <strong>Administrador</strong>
          <span>Congreso ESCALA</span>
        </div>

      </div>


      <!-- MENU -->
      <nav class="menu">

        <span class="menu-label">
          PRINCIPAL
        </span>

        <button
          :class="{ active: currentSection === 'dashboard' }"
          @click="changeSection('dashboard')"
        >
          <span>📊</span>
          Dashboard
        </button>


        <button
          :class="{ active: currentSection === 'participantes' }"
          @click="changeSection('participantes')"
        >
          <span>👥</span>
          Participantes

          <b class="menu-count">
            {{ participants.length }}
          </b>
        </button>


        <button
          :class="{ active: currentSection === 'comprobantes' }"
          @click="changeSection('comprobantes')"
        >
          <span>💳</span>
          Comprobantes

          <b
            v-if="pendingReceipts > 0"
            class="menu-alert"
          >
            {{ pendingReceipts }}
          </b>
        </button>


        <span class="menu-label event-label">
          EVENTO
        </span>


        <button
          :class="{ active: currentSection === 'constancias' }"
          @click="changeSection('constancias')"
        >
          <span>🎓</span>
          Constancias
        </button>

      </nav>


      <!-- PARTE INFERIOR -->
      <div class="sidebar-bottom">

        <button
          class="back-button"
          @click="goBack"
        >
          ← Volver al panel
        </button>

      </div>

    </aside>


    <!-- =====================================================
         CONTENIDO PRINCIPAL
    ====================================================== -->

    <main class="main">

      <!-- HEADER -->

      <header class="topbar">

        <div class="topbar-left">

          <button
            class="mobile-button"
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

        </div>


        <div class="topbar-right">

          <span class="event-active">
            <i></i>
            Evento activo
          </span>

          <div class="user">

            <div class="user-avatar">
              AE
            </div>

            <span>
              Administrador
            </span>

          </div>

        </div>

      </header>


      <!-- =====================================================
           DASHBOARD
      ====================================================== -->

      <section
        v-if="currentSection === 'dashboard'"
        class="page"
      >

        <!-- BIENVENIDA -->

        <div class="welcome">

          <div>

            <span>
              CONGRESO ESCALA
            </span>

            <h2>
              Panel de administración
            </h2>

            <p>
              Administra participantes, valida comprobantes
              de pago y genera las constancias del Congreso ESCALA.
            </p>

          </div>

          <div class="welcome-icon">
            🎓
          </div>

        </div>


        <!-- ESTADÍSTICAS -->

        <div class="stats">

          <div class="stat">

            <div class="stat-icon blue">
              👥
            </div>

            <div>
              <span>Participantes</span>
              <strong>{{ participants.length }}</strong>
              <small>Registrados</small>
            </div>

          </div>


          <div class="stat">

            <div class="stat-icon green">
              ✓
            </div>

            <div>
              <span>Pagos aprobados</span>
              <strong>{{ approvedPayments }}</strong>
              <small>Confirmados</small>
            </div>

          </div>


          <div class="stat">

            <div class="stat-icon orange">
              ⏳
            </div>

            <div>
              <span>Por revisar</span>
              <strong>{{ pendingReceipts }}</strong>
              <small>Comprobantes</small>
            </div>

          </div>


          <div class="stat">

            <div class="stat-icon purple">
              🎓
            </div>

            <div>
              <span>Constancias</span>
              <strong>{{ generatedCertificates }}</strong>
              <small>Generadas</small>
            </div>

          </div>

        </div>


        <!-- GRID -->

        <div class="dashboard-grid">

          <!-- COMPROBANTES -->

          <div class="card">

            <div class="card-header">

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
              v-if="pendingParticipants.length"
              class="pending-list"
            >

              <div
                v-for="participant in pendingParticipants.slice(0, 5)"
                :key="participant.id"
                class="pending"
              >

                <div class="avatar">
                  {{ getInitials(participant.name) }}
                </div>

                <div class="pending-info">

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
              ✓
              <p>No hay comprobantes pendientes.</p>
            </div>

          </div>


          <!-- EVENTO -->

          <div class="card">

            <div class="card-header">

              <div>
                <h3>
                  Información del evento
                </h3>

                <p>
                  Congreso ESCALA
                </p>
              </div>

            </div>


            <div class="event-info">

              <div>
                <span>Fecha</span>
                <strong>{{ eventInfo.date }}</strong>
              </div>

              <div>
                <span>Lugar</span>
                <strong>{{ eventInfo.place }}</strong>
              </div>

              <div>
                <span>Cuota</span>
                <strong>{{ eventInfo.cost }}</strong>
              </div>

              <div>
                <span>Capacidad</span>
                <strong>{{ eventInfo.capacity }}</strong>
              </div>

            </div>

          </div>

        </div>


        <!-- PARTICIPANTES RECIENTES -->

        <div class="card">

          <div class="card-header">

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


          <div class="table-container">

            <table>

              <thead>

                <tr>
                  <th>Participante</th>
                  <th>Control</th>
                  <th>Tipo</th>
                  <th>Pago</th>
                  <th>Asistencia</th>
                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="participant in participants.slice(0, 5)"
                  :key="participant.id"
                >

                  <td>

                    <div class="table-user">

                      <div class="avatar">
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
                    <span class="type">
                      {{ participant.type }}
                    </span>
                  </td>


                  <td>

                    <span
                      class="payment"
                      :class="participant.payment"
                    >
                      {{ paymentText(participant.payment) }}
                    </span>

                  </td>


                  <td>

                    <span
                      :class="[
                        'attendance',
                        { present: participant.attended }
                      ]"
                    >
                      {{
                        participant.attended
                          ? '✓ Presente'
                          : 'Sin asistencia'
                      }}
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>


      <!-- =====================================================
           PARTICIPANTES
      ====================================================== -->

      <section
        v-if="currentSection === 'participantes'"
        class="page"
      >

        <div class="section-header">

          <div>
            <h2>Participantes</h2>

            <p>
              Consulta los participantes registrados en ESCALA.
            </p>
          </div>

        </div>


        <!-- FILTROS -->

        <div class="filters">

          <input
            v-model="search"
            type="text"
            placeholder="🔎 Buscar participante..."
          />


          <select v-model="paymentFilter">

            <option value="all">
              Todos los pagos
            </option>

            <option value="approved">
              Aprobados
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
              Todos los tipos
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

        <div class="card">

          <div class="table-container">

            <table>

              <thead>

                <tr>
                  <th>Participante</th>
                  <th>Control</th>
                  <th>Tipo</th>
                  <th>Correo</th>
                  <th>Pago</th>
                  <th>Asistencia</th>
                  <th></th>
                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="participant in filteredParticipants"
                  :key="participant.id"
                >

                  <td>

                    <div class="table-user">

                      <div class="avatar">
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
                      class="payment"
                      :class="participant.payment"
                    >
                      {{ paymentText(participant.payment) }}
                    </span>

                  </td>


                  <td>

                    <span
                      :class="[
                        'attendance',
                        { present: participant.attended }
                      ]"
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
                      class="view-button"
                      @click="selectedParticipant = participant"
                    >
                      Ver
                    </button>

                  </td>

                </tr>


                <tr v-if="filteredParticipants.length === 0">

                  <td
                    colspan="7"
                    class="empty-table"
                  >
                    No se encontraron participantes.
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>


      <!-- =====================================================
           COMPROBANTES
      ====================================================== -->

      <section
        v-if="currentSection === 'comprobantes'"
        class="page"
      >

        <div class="section-header">

          <div>

            <h2>
              Comprobantes de pago
            </h2>

            <p>
              Revisa los archivos enviados por los participantes.
            </p>

          </div>

          <div class="receipt-counter">

            <strong>
              {{ pendingReceipts }}
            </strong>

            pendientes

          </div>

        </div>


        <!-- SIN COMPROBANTES -->

        <div
          v-if="pendingParticipants.length === 0"
          class="no-receipts"
        >

          <div>
            ✓
          </div>

          <h3>
            Todo está revisado
          </h3>

          <p>
            No existen comprobantes pendientes de revisión.
          </p>

        </div>


        <!-- COMPROBANTES -->

        <div
          v-else
          class="receipt-grid"
        >

          <article
            v-for="participant in pendingParticipants"
            :key="participant.id"
            class="receipt-card"
          >

            <!-- HEADER -->

            <div class="receipt-header">

              <div class="avatar">
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


            <!-- ARCHIVO -->

            <div class="file-preview">

              <div class="file-icon">
                📄
              </div>

              <strong>
                {{ participant.receiptName }}
              </strong>

              <span>
                Comprobante enviado por el participante
              </span>

              <button
                class="view-file"
                @click="openReceipt(participant)"
              >
                👁 Ver comprobante
              </button>

            </div>


            <!-- INFORMACIÓN -->

            <div class="receipt-info">

              <div>

                <span>
                  Referencia
                </span>

                <strong>
                  {{ participant.reference }}
                </strong>

              </div>


              <div>

                <span>
                  Monto
                </span>

                <strong>
                  {{ eventInfo.cost }}
                </strong>

              </div>


              <div>

                <span>
                  Fecha de envío
                </span>

                <strong>
                  {{ participant.receiptDate }}
                </strong>

              </div>

            </div>


            <!-- ACCIONES -->

            <div class="receipt-actions">

              <button
                class="approve"
                @click="approvePayment(participant)"
              >
                ✓ Aprobar pago
              </button>

              <button
                class="reject"
                @click="rejectPayment(participant)"
              >
                ✕ Rechazar
              </button>

            </div>

          </article>

        </div>


        <!-- HISTORIAL -->

        <div class="card history-card">

          <div class="card-header">

            <div>

              <h3>
                Historial de comprobantes
              </h3>

              <p>
                Comprobantes que ya fueron revisados.
              </p>

            </div>

          </div>


          <div class="table-container">

            <table>

              <thead>

                <tr>
                  <th>Participante</th>
                  <th>Archivo</th>
                  <th>Referencia</th>
                  <th>Estado</th>
                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="participant in reviewedParticipants"
                  :key="participant.id"
                >

                  <td>
                    {{ participant.name }}
                  </td>

                  <td>
                    {{ participant.receiptName }}
                  </td>

                  <td>
                    {{ participant.reference }}
                  </td>

                  <td>

                    <span
                      class="payment"
                      :class="participant.payment"
                    >
                      {{ paymentText(participant.payment) }}
                    </span>

                  </td>

                </tr>


                <tr
                  v-if="reviewedParticipants.length === 0"
                >

                  <td
                    colspan="4"
                    class="empty-table"
                  >
                    Todavía no hay comprobantes revisados.
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>


      <!-- =====================================================
           CONSTANCIAS
      ====================================================== -->

      <section
        v-if="currentSection === 'constancias'"
        class="page"
      >

        <div class="section-header">

          <div>

            <h2>
              Constancias
            </h2>

            <p>
              Administra la plantilla y genera constancias
              personalizadas para los participantes.
            </p>

          </div>

        </div>


        <!-- PLANTILLA -->

        <div class="card template-card">

          <div class="card-header">

            <div>

              <h3>
                Plantilla de constancia
              </h3>

              <p>
                Sube el archivo que se utilizará como plantilla.
              </p>

            </div>

            <span
              v-if="certificateTemplate"
              class="template-active"
            >
              ✓ Plantilla cargada
            </span>

          </div>


          <div class="template-content">

            <div class="template-icon">
              📜
            </div>


            <div class="template-info">

              <h3>
                {{
                  certificateTemplate
                    ? certificateTemplate.name
                    : 'No hay plantilla cargada'
                }}
              </h3>

              <p>
                {{
                  certificateTemplate
                    ? 'Esta plantilla será utilizada para generar las constancias.'
                    : 'Selecciona un archivo PDF o DOCX.'
                }}
              </p>


              <label class="upload-button">

                📤

                {{
                  certificateTemplate
                    ? 'Cambiar plantilla'
                    : 'Subir plantilla'
                }}

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  @change="uploadTemplate"
                />

              </label>

            </div>

          </div>

        </div>


        <!-- REGLAS -->

        <div class="info-box">

          <span>💡</span>

          <div>

            <strong>
              ¿Cómo funciona?
            </strong>

            <p>
              El sistema solamente permitirá generar una constancia
              cuando el participante tenga su pago aprobado y
              asistencia registrada.
            </p>

          </div>

        </div>


        <!-- PARTICIPANTES -->

        <div class="card">

          <div class="card-header">

            <div>

              <h3>
                Constancias de participantes
              </h3>

              <p>
                Genera la constancia individual.
              </p>

            </div>

          </div>


          <div class="certificate-list">

            <div
              v-for="participant in participants"
              :key="participant.id"
              class="certificate-row"
            >

              <div class="table-user">

                <div class="avatar">
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


              <div class="certificate-status">

                <span
                  v-if="canGenerateCertificate(participant)"
                  class="ready"
                >
                  ✓ Puede generar
                </span>

                <span
                  v-else
                  class="not-ready"
                >
                  ⏳ No cumple requisitos
                </span>

              </div>


              <div>

                <button
                  v-if="participant.certificate"
                  class="download-button"
                  @click="downloadCertificate(participant)"
                >
                  📥 Descargar
                </button>


                <button
                  v-else
                  class="generate-button"
                  :disabled="!canGenerateCertificate(participant)"
                  @click="generateCertificate(participant)"
                >
                  🎓 Generar
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>


    <!-- =====================================================
         MODAL PARTICIPANTE
    ====================================================== -->

    <div
      v-if="selectedParticipant"
      class="modal-overlay"
      @click.self="selectedParticipant = null"
    >

      <div class="modal">

        <button
          class="close"
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

        <p>
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
              {{ paymentText(selectedParticipant.payment) }}
            </strong>
          </div>

          <div>
            <span>Asistencia</span>
            <strong>
              {{
                selectedParticipant.attended
                  ? '✓ Presente'
                  : 'No registrada'
              }}
            </strong>
          </div>

        </div>

      </div>

    </div>


    <!-- =====================================================
         MODAL COMPROBANTE
    ====================================================== -->

    <div
      v-if="selectedReceipt"
      class="modal-overlay"
      @click.self="selectedReceipt = null"
    >

      <div class="receipt-modal">

        <button
          class="close"
          @click="selectedReceipt = null"
        >
          ✕
        </button>


        <h2>
          Comprobante de pago
        </h2>

        <p>
          {{ selectedReceipt.name }}
        </p>


        <div class="document-viewer">

          <div>
            📄
          </div>

          <strong>
            {{ selectedReceipt.receiptName }}
          </strong>

          <span>
            Vista previa simulada del comprobante
          </span>

        </div>


        <div class="modal-actions">

          <button
            class="approve"
            @click="approvePayment(selectedReceipt)"
          >
            ✓ Aprobar
          </button>

          <button
            class="reject"
            @click="rejectPayment(selectedReceipt)"
          >
            ✕ Rechazar
          </button>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted,
  watch
} from "vue";

import {
  useRouter
} from "vue-router";
import { API_URL } from "../../config/api";


// =====================================================
// ROUTER
// =====================================================

const router = useRouter();


// =====================================================
// SIDEBAR
// =====================================================

const sidebarOpen = ref(false);

// =====================================================
// INFORMACION EVENTO
// =====================================================

const eventInfo = ref({
  date: "",
  place: "",
  cost: "",
  capacity: ""
});

// =====================================================
// SECCIÓN
// =====================================================

// IMPORTANTE:
// Comprobantes será la pantalla inicial

const currentSection = ref("dashboard");


// =====================================================
// FILTROS
// =====================================================

const search = ref("");

const paymentFilter = ref("all");

const typeFilter = ref("all");


// =====================================================
// MODALES
// =====================================================

const selectedParticipant = ref(null);

const selectedReceipt = ref(null);


// =====================================================
// PLANTILLA
// =====================================================

const certificateTemplate = ref(null);


// =====================================================
// PARTICIPANTES
// =====================================================

const participants = ref([]);


// =====================================================
// ESTADÍSTICAS
// =====================================================

const approvedPayments = computed(() => {

  return participants.value.filter(
    participant =>
      participant.payment === "approved"
  ).length;

});


const pendingParticipants = computed(() => {

  return participants.value.filter(
    participant =>
      participant.payment === "pending"
  );

});


const pendingReceipts = computed(() => {

  return pendingParticipants.value.length;

});


const reviewedParticipants = computed(() => {

  return participants.value.filter(
    participant =>
      participant.payment !== "pending"
  );

});


const generatedCertificates = computed(() => {

  return participants.value.filter(
    participant =>
      participant.certificate
  ).length;

});


// =====================================================
// FILTRAR PARTICIPANTES
// =====================================================

const filteredParticipants = computed(() => {

  return participants.value.filter(participant => {

    const text =
      search.value.toLowerCase().trim();

    const matchesSearch =
      participant.name
        .toLowerCase()
        .includes(text)

      ||

      participant.control
        .toLowerCase()
        .includes(text)

      ||

      participant.email
        .toLowerCase()
        .includes(text);


    const matchesPayment =
      paymentFilter.value === "all"

      ||

      participant.payment ===
        paymentFilter.value;


    const matchesType =
      typeFilter.value === "all"

      ||

      participant.type ===
        typeFilter.value;


    return (
      matchesSearch &&
      matchesPayment &&
      matchesType
    );

  });

});


// =====================================================
// TITULO
// =====================================================

const sectionTitle = computed(() => {

  const titles = {

    dashboard:
      "Dashboard",

    participantes:
      "Participantes",

    comprobantes:
      "Comprobantes de pago",

    constancias:
      "Constancias"

  };

  return titles[currentSection.value];

});


// =====================================================
// CAMBIAR SECCIÓN
// =====================================================

function changeSection(section) {

  currentSection.value =
    section;

  sidebarOpen.value =
    false;


  const routes = {

    dashboard:
      "/admin/escala",

    participantes:
      "/admin/escala/participantes",

    comprobantes:
      "/admin/escala/comprobantes",

    constancias:
      "/admin/escala/constancias"

  };


  if (routes[section]) {

    router.push(
      routes[section]
    );

  }

}


// =====================================================
// INICIALES
// =====================================================

function getInitials(name) {

  return name

    .split(" ")

    .filter(Boolean)

    .slice(0, 2)

    .map(word =>
      word.charAt(0)
    )

    .join("")

    .toUpperCase();

}


// =====================================================
// TEXTO PAGO
// =====================================================

function paymentText(status) {

  if (status === "approved") {
    return "Aprobado";
  }

  if (status === "pending") {
    return "Pendiente";
  }

  if (status === "rejected") {
    return "Rechazado";
  }

  return status;

}


// =====================================================
// ABRIR COMPROBANTE
// =====================================================

function openReceipt(participant) {

  selectedReceipt.value =
    participant;

}


// =====================================================
// APROBAR
// =====================================================

function approvePayment(participant) {

  participant.payment =
    "approved";

  selectedReceipt.value =
    null;

  alert(
    `El pago de ${participant.name} fue aprobado correctamente.`
  );

}


// =====================================================
// RECHAZAR
// =====================================================

function rejectPayment(participant) {

  participant.payment =
    "rejected";

  selectedReceipt.value =
    null;

  alert(
    `El comprobante de ${participant.name} fue rechazado.`
  );

}


// =====================================================
// SUBIR PLANTILLA
// =====================================================

function uploadTemplate(event) {

  const file =
    event.target.files[0];

  if (!file) {
    return;
  }


  const allowedTypes = [

    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

  ];


  if (!allowedTypes.includes(file.type)) {

    alert(
      "Solo se permiten archivos PDF o Word."
    );

    return;

  }


  certificateTemplate.value = {

    name: file.name,

    size: file.size,

    type: file.type

  };


  localStorage.setItem(

    "escala_certificate_template",

    JSON.stringify(
      certificateTemplate.value
    )

  );


  alert(
    "Plantilla cargada correctamente."
  );

}


// =====================================================
// CONSTANCIA
// =====================================================

function canGenerateCertificate(participant) {

  return (

    certificateTemplate.value &&

    participant.payment ===
      "approved" &&

    participant.attended ===
      true

  );

}


// =====================================================
// GENERAR CONSTANCIA
// =====================================================

function generateCertificate(participant) {

  if (
    !canGenerateCertificate(
      participant
    )
  ) {

    alert(
      "El participante no cumple los requisitos."
    );

    return;

  }


  participant.certificate =
    true;


  alert(
    `Constancia generada para ${participant.name}.`
  );

}


// =====================================================
// DESCARGAR
// =====================================================

function downloadCertificate(participant) {

  const content = `

CONGRESO ESCALA

CONSTANCIA DE PARTICIPACIÓN

Se hace constar que:

${participant.name}

participó en el Congreso ESCALA.

Instituto Tecnológico de Ensenada

Fecha: 10 al 12 de Septiembre

Folio:
ESCALA-${participant.id}-${participant.control}

`;


  const blob =
    new Blob(

      [content],

      {
        type:
          "text/plain"
      }

    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    `Constancia_${participant.name.replaceAll(" ", "_")}.txt`;


  link.click();


  URL.revokeObjectURL(
    url
  );

}


// =====================================================
// VOLVER
// =====================================================

function goBack() {

  router.push("/admin");

}


// =====================================================
// CARGAR DATOS
// =====================================================

onMounted(async () => {

  const savedTemplate = localStorage.getItem("escala_certificate_template");

  if (savedTemplate) {
    certificateTemplate.value = JSON.parse(savedTemplate);
  }

  await cargarParticipantes();
  await cargarEvento();

});


async function cargarParticipantes() {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/eventos/4/inscripciones/admin/participantes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    if (response.ok) {
      participants.value = await response.json();
    }

  } catch (e) {
    console.error("Error al cargar participantes:", e);
  }
}
async function cargarEvento() {
    try {

      const response = await fetch(`${API_URL}/eventos/4`);

      if (response.ok) {

        const data = await response.json();

        eventInfo.value = {
          date: data.date,
          place: data.place,
          cost: data.cost,
          capacity: data.capacity
        };

      }

    } catch (e) {
      console.error("Error al cargar el evento:", e);
    }
  }

</script>


<style scoped>

/* =====================================================
   RESET
===================================================== */

* {
  box-sizing: border-box;
}


.admin-escala {

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


/* =====================================================
   SIDEBAR
===================================================== */

.sidebar {

  width: 270px;

  min-height: 100vh;

  background:
    linear-gradient(
      180deg,
      #003366,
      #005b96
    );

  color: white;

  position: fixed;

  left: 0;

  top: 0;

  bottom: 0;

  z-index: 1000;

  display: flex;

  flex-direction: column;

}


.sidebar-header {

  padding: 24px 20px;

  display: flex;

  align-items: center;

  gap: 12px;

  border-bottom:
    1px solid
    rgba(255,255,255,.12);

}


.logo {

  width: 48px;

  height: 48px;

  border-radius: 13px;

  background: white;

  color: #003366;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 900;

}


.logo-info {

  display: flex;

  flex-direction: column;

}


.logo-info strong {

  font-size: 17px;

}


.logo-info span {

  font-size: 11px;

  opacity: .65;

}


/* =====================================================
   PROFILE
===================================================== */

.profile {

  margin: 20px;

  padding: 14px;

  background:
    rgba(255,255,255,.09);

  border-radius: 14px;

  display: flex;

  align-items: center;

  gap: 11px;

}


.profile > div:last-child {

  display: flex;

  flex-direction: column;

}


.profile strong {

  font-size: 13px;

}


.profile span {

  font-size: 10px;

  opacity: .65;

}


.profile-avatar {

  width: 40px;

  height: 40px;

  border-radius: 50%;

  background: #1976d2;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: bold;

}


/* =====================================================
   MENU
===================================================== */

.menu {

  padding: 0 12px;

  flex: 1;

}


.menu-label {

  display: block;

  padding:
    15px
    12px
    8px;

  font-size: 10px;

  letter-spacing: 1.5px;

  opacity: .45;

}


.event-label {

  margin-top: 10px;

}


.menu button {

  width: 100%;

  border: none;

  background: transparent;

  color: white;

  padding: 13px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  gap: 12px;

  cursor: pointer;

  margin-bottom: 4px;

  font-size: 13px;

  text-align: left;

}


.menu button:hover {

  background:
    rgba(255,255,255,.1);

}


.menu button.active {

  background: white;

  color: #003366;

  font-weight: 700;

}


.menu-count {

  margin-left: auto;

  font-size: 10px;

  opacity: .6;

}


.menu-alert {

  margin-left: auto;

  background: #ef5350;

  color: white;

  width: 22px;

  height: 22px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 10px;

}


/* =====================================================
   SIDEBAR BOTTOM
===================================================== */

.sidebar-bottom {

  padding: 18px;

}


.back-button {

  width: 100%;

  padding: 12px;

  background:
    rgba(255,255,255,.08);

  border:
    1px solid
    rgba(255,255,255,.15);

  color: white;

  border-radius: 10px;

  cursor: pointer;

}


/* =====================================================
   MAIN
===================================================== */

.main {

  margin-left: 270px;

  width: calc(100% - 270px);

  min-height: 100vh;

}


/* =====================================================
   TOPBAR
===================================================== */

.topbar {

  height: 80px;

  background: white;

  border-bottom:
    1px solid #e6ebf0;

  padding: 0 35px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  position: sticky;

  top: 0;

  z-index: 100;

}


.topbar-left {

  display: flex;

  align-items: center;

}


.topbar h1 {

  margin: 0;

  color: #003366;

  font-size: 22px;

}


.topbar p {

  margin: 3px 0 0;

  color: #90a4ae;

  font-size: 12px;

}


.topbar-right {

  display: flex;

  align-items: center;

  gap: 25px;

}


.event-active {

  color: #2e7d32;

  font-size: 12px;

  font-weight: 600;

}


.event-active i {

  width: 8px;

  height: 8px;

  background: #43a047;

  display: inline-block;

  border-radius: 50%;

  margin-right: 5px;

}


.user {

  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 13px;

}


.user-avatar {

  width: 35px;

  height: 35px;

  border-radius: 50%;

  background: #e3f2fd;

  color: #0066b3;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: bold;

}


.mobile-button {

  display: none;

}


/* =====================================================
   PAGE
===================================================== */

.page {

  padding: 35px;

  max-width: 1600px;

  margin: auto;

}


/* =====================================================
   WELCOME
===================================================== */

.welcome {

  padding: 35px;

  border-radius: 20px;

  background:
    linear-gradient(
      110deg,
      #003366,
      #0066b3
    );

  color: white;

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;

}


.welcome span {

  font-size: 10px;

  letter-spacing: 2px;

  opacity: .7;

}


.welcome h2 {

  font-size: 28px;

  margin: 10px 0;

}


.welcome p {

  max-width: 650px;

  margin: 0;

  line-height: 1.6;

  opacity: .85;

}


.welcome-icon {

  font-size: 80px;

}


/* =====================================================
   STATS
===================================================== */

.stats {

  display: grid;

  grid-template-columns:
    repeat(4,1fr);

  gap: 18px;

  margin-bottom: 25px;

}


.stat {

  background: white;

  border-radius: 16px;

  padding: 20px;

  display: flex;

  align-items: center;

  gap: 14px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.04);

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


.stat span {

  display: block;

  color: #78909c;

  font-size: 11px;

}


.stat strong {

  display: block;

  font-size: 27px;

  color: #263238;

  margin: 3px 0;

}


.stat small {

  color: #90a4ae;

  font-size: 9px;

}


/* =====================================================
   DASHBOARD GRID
===================================================== */

.dashboard-grid {

  display: grid;

  grid-template-columns:
    1.4fr 1fr;

  gap: 20px;

  margin-bottom: 20px;

}


/* =====================================================
   CARD
===================================================== */

.card {

  background: white;

  border-radius: 18px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

  overflow: hidden;

  margin-bottom: 20px;

}


.card-header {

  padding: 20px 24px;

  border-bottom:
    1px solid #edf0f3;

  display: flex;

  justify-content: space-between;

  align-items: center;

}


.card-header h3 {

  margin: 0 0 4px;

  color: #003366;

  font-size: 16px;

}


.card-header p {

  margin: 0;

  color: #90a4ae;

  font-size: 11px;

}


.card-header button {

  border: none;

  background: none;

  color: #0066b3;

  font-weight: 600;

  cursor: pointer;

}


/* =====================================================
   PENDING
===================================================== */

.pending-list {

  padding: 10px 22px;

}


.pending {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 13px 0;

  border-bottom:
    1px solid #edf0f3;

}


.avatar {

  width: 38px;

  height: 38px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #e3f2fd;

  color: #0066b3;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 10px;

  font-weight: bold;

}


.pending-info {

  display: flex;

  flex-direction: column;

  flex: 1;

}


.pending-info strong {

  font-size: 12px;

}


.pending-info span {

  color: #90a4ae;

  font-size: 10px;

}


.pending-badge {

  background: #fff3e0;

  color: #ef6c00;

  padding: 5px 9px;

  border-radius: 15px;

  font-size: 9px;

}


/* =====================================================
   EVENT INFO
===================================================== */

.event-info {

  padding: 10px 24px;

}


.event-info div {

  padding: 14px 0;

  border-bottom:
    1px solid #edf0f3;

}


.event-info span {

  display: block;

  color: #90a4ae;

  font-size: 10px;

  margin-bottom: 4px;

}


.event-info strong {

  color: #37474f;

  font-size: 12px;

}


/* =====================================================
   TABLE
===================================================== */

.table-container {

  overflow-x: auto;

}


table {

  width: 100%;

  border-collapse: collapse;

  min-width: 800px;

}


th {

  background: #f8fafc;

  color: #78909c;

  padding: 14px 20px;

  text-align: left;

  font-size: 9px;

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


.type {

  background: #f1f5f8;

  color: #546e7a;

  padding: 5px 8px;

  border-radius: 12px;

  font-size: 9px;

}


.payment {

  padding: 5px 9px;

  border-radius: 15px;

  font-size: 9px;

  font-weight: 600;

}


.payment.approved {

  background: #e8f5e9;

  color: #2e7d32;

}


.payment.pending {

  background: #fff3e0;

  color: #ef6c00;

}


.payment.rejected {

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


.view-button {

  border: none;

  background: #e3f2fd;

  color: #0066b3;

  padding: 7px 12px;

  border-radius: 8px;

  cursor: pointer;

}


/* =====================================================
   SECTION HEADER
===================================================== */

.section-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 25px;

}


.section-header h2 {

  margin: 0 0 5px;

  color: #003366;

}


.section-header p {

  margin: 0;

  color: #78909c;

  font-size: 13px;

}


/* =====================================================
   FILTERS
===================================================== */

.filters {

  display: grid;

  grid-template-columns:
    2fr 1fr 1fr;

  gap: 12px;

  background: white;

  padding: 18px;

  border-radius: 16px;

  margin-bottom: 20px;

}


.filters input,
.filters select {

  border:
    1px solid #dfe5eb;

  border-radius: 9px;

  padding: 12px;

  outline: none;

}


.filters input:focus,
.filters select:focus {

  border-color: #0066b3;

}


/* =====================================================
   RECEIPTS
===================================================== */

.receipt-counter {

  background: #fff3e0;

  color: #ef6c00;

  padding: 10px 15px;

  border-radius: 10px;

  font-size: 11px;

}


.receipt-counter strong {

  font-size: 18px;

  margin-right: 4px;

}


.receipt-grid {

  display: grid;

  grid-template-columns:
    repeat(3,1fr);

  gap: 20px;

}


.receipt-card {

  background: white;

  border-radius: 18px;

  padding: 20px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

}


.receipt-header {

  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 15px;

}


.receipt-header > div:last-child {

  display: flex;

  flex-direction: column;

}


.receipt-header span {

  color: #90a4ae;

  font-size: 10px;

}


/* =====================================================
   FILE PREVIEW
===================================================== */

.file-preview {

  height: 190px;

  border:
    2px dashed #dce4eb;

  border-radius: 14px;

  background: #f8fafc;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  padding: 20px;

}


.file-icon {

  font-size: 48px;

  margin-bottom: 10px;

}


.file-preview strong {

  font-size: 12px;

  color: #37474f;

  word-break: break-word;

}


.file-preview span {

  color: #90a4ae;

  font-size: 9px;

  margin: 5px 0 12px;

}


.view-file {

  border: none;

  background: #e3f2fd;

  color: #0066b3;

  padding: 8px 12px;

  border-radius: 8px;

  cursor: pointer;

  font-size: 10px;

}


/* =====================================================
   RECEIPT INFO
===================================================== */

.receipt-info {

  display: grid;

  gap: 10px;

  margin: 15px 0;

}


.receipt-info div {

  background: #f8fafc;

  padding: 10px;

  border-radius: 8px;

}


.receipt-info span {

  display: block;

  color: #90a4ae;

  font-size: 9px;

}


.receipt-info strong {

  font-size: 11px;

}


/* =====================================================
   ACTIONS
===================================================== */

.receipt-actions {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 8px;

}


.approve,
.reject {

  border: none;

  padding: 10px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;

}


.approve {

  background: #e8f5e9;

  color: #2e7d32;

}


.reject {

  background: #ffebee;

  color: #c62828;

}


/* =====================================================
   EMPTY
===================================================== */

.empty {

  padding: 35px;

  text-align: center;

  color: #78909c;

}


.empty p {

  margin: 8px 0 0;

}


.empty-table {

  text-align: center;

  padding: 40px;

  color: #90a4ae;

}


.no-receipts {

  background: white;

  border-radius: 18px;

  padding: 70px 20px;

  text-align: center;

  margin-bottom: 25px;

}


.no-receipts > div {

  width: 70px;

  height: 70px;

  background: #e8f5e9;

  color: #2e7d32;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 35px;

  margin: auto;

}


.no-receipts h3 {

  color: #003366;

  margin-bottom: 5px;

}


.no-receipts p {

  color: #90a4ae;

}


/* =====================================================
   CONSTANCIAS
===================================================== */

.template-content {

  padding: 30px;

  display: flex;

  align-items: center;

  gap: 25px;

}


.template-icon {

  width: 80px;

  height: 80px;

  border-radius: 18px;

  background: #e3f2fd;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 40px;

}


.template-info h3 {

  margin: 0 0 5px;

  color: #003366;

}


.template-info p {

  color: #78909c;

  font-size: 12px;

}


.template-active {

  background: #e8f5e9;

  color: #2e7d32;

  padding: 7px 10px;

  border-radius: 15px;

  font-size: 10px;

}


.upload-button {

  display: inline-block;

  background:
    linear-gradient(
      90deg,
      #003366,
      #0066b3
    );

  color: white;

  padding: 10px 15px;

  border-radius: 9px;

  cursor: pointer;

  font-size: 11px;

  font-weight: 600;

}


.info-box {

  display: flex;

  align-items: flex-start;

  gap: 12px;

  background: #e3f2fd;

  color: #37474f;

  padding: 18px;

  border-radius: 14px;

  margin-bottom: 20px;

}


.info-box > span {

  font-size: 22px;

}


.info-box strong {

  color: #003366;

}


.info-box p {

  margin: 5px 0 0;

  font-size: 11px;

  line-height: 1.5;

}


.certificate-list {

  padding: 5px 20px;

}


.certificate-row {

  padding: 15px 0;

  border-bottom:
    1px solid #edf0f3;

  display: grid;

  grid-template-columns:
    1.5fr 1fr auto;

  align-items: center;

  gap: 20px;

}


.ready {

  background: #e8f5e9;

  color: #2e7d32;

  padding: 6px 10px;

  border-radius: 15px;

  font-size: 9px;

}


.not-ready {

  background: #fff3e0;

  color: #ef6c00;

  padding: 6px 10px;

  border-radius: 15px;

  font-size: 9px;

}


.generate-button,
.download-button {

  border: none;

  padding: 9px 12px;

  border-radius: 8px;

  cursor: pointer;

  font-size: 10px;

  font-weight: 600;

}


.generate-button {

  background: #003366;

  color: white;

}


.generate-button:disabled {

  background: #cfd8dc;

  color: #78909c;

  cursor: not-allowed;

}


.download-button {

  background: #e8f5e9;

  color: #2e7d32;

}


/* =====================================================
   MODAL
===================================================== */

.modal-overlay {

  position: fixed;

  inset: 0;

  background:
    rgba(0,0,0,.55);

  z-index: 3000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

}


.modal,
.receipt-modal {

  background: white;

  border-radius: 20px;

  width: 100%;

  max-width: 480px;

  padding: 30px;

  position: relative;

}


.close {

  position: absolute;

  top: 15px;

  right: 15px;

  width: 32px;

  height: 32px;

  border: none;

  border-radius: 50%;

  cursor: pointer;

}


.modal-avatar {

  width: 75px;

  height: 75px;

  border-radius: 50%;

  background: #e3f2fd;

  color: #0066b3;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 23px;

  font-weight: bold;

  margin: auto;

}


.modal h2 {

  text-align: center;

  color: #003366;

  margin-bottom: 3px;

}


.modal > p {

  text-align: center;

  color: #90a4ae;

}


.modal-data {

  display: grid;

  gap: 10px;

  margin-top: 20px;

}


.modal-data div {

  background: #f8fafc;

  padding: 11px;

  border-radius: 8px;

}


.modal-data span {

  display: block;

  color: #90a4ae;

  font-size: 9px;

  margin-bottom: 4px;

}


.modal-data strong {

  font-size: 11px;

}


.document-viewer {

  height: 250px;

  background: #f5f7fa;

  border-radius: 14px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  margin: 20px 0;

}


.document-viewer div {

  font-size: 65px;

}


.document-viewer strong {

  margin-top: 10px;

}


.document-viewer span {

  color: #90a4ae;

  font-size: 10px;

}


.modal-actions {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 10px;

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media(max-width:1200px) {

  .stats {

    grid-template-columns:
      repeat(2,1fr);

  }

  .receipt-grid {

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


  .sidebar.open {

    transform:
      translateX(0);

  }


  .main {

    margin-left: 0;

    width: 100%;

  }


  .mobile-button {

    display: block;

    border: none;

    background: transparent;

    font-size: 22px;

    margin-right: 15px;

    cursor: pointer;

  }


  .dashboard-grid {

    grid-template-columns: 1fr;

  }


  .topbar {

    padding: 0 20px;

  }

}


@media(max-width:650px) {

  .page {

    padding: 20px 15px;

  }


  .stats {

    grid-template-columns: 1fr;

  }


  .receipt-grid {

    grid-template-columns: 1fr;

  }


  .filters {

    grid-template-columns: 1fr;

  }


  .section-header {

    flex-direction: column;

    align-items: flex-start;

    gap: 12px;

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


  .template-content {

    flex-direction: column;

    align-items: flex-start;

  }


  .certificate-row {

    grid-template-columns: 1fr;

    gap: 10px;

  }

}

</style>