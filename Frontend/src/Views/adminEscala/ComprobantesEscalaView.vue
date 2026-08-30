<template>

  <!-- =====================================================
       CONTENEDOR PRINCIPAL
  ====================================================== -->

  <div class="admin-layout">

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

        <div class="profile-info">
          <strong>Administrador</strong>
          <span>Congreso ESCALA</span>
        </div>

      </div>


      <!-- MENU -->

      <nav class="menu">

        <span class="menu-label">
          PRINCIPAL
        </span>


        <!-- DASHBOARD -->

        <button
          :class="{ active: currentSection === 'dashboard' }"
          @click="changeSection('dashboard')"
        >
          <span class="menu-icon">📊</span>
          <span>Dashboard</span>
        </button>


        <!-- PARTICIPANTES -->

        <button
          :class="{ active: currentSection === 'participantes' }"
          @click="changeSection('participantes')"
        >

          <span class="menu-icon">
            👥
          </span>

          <span class="menu-text">
            Participantes
          </span>

          <b class="menu-count">
            {{ participants.length }}
          </b>

        </button>


        <!-- COMPROBANTES -->

        <button
          :class="{ active: currentSection === 'comprobantes' }"
          @click="changeSection('comprobantes')"
        >

          <span class="menu-icon">
            💳
          </span>

          <span class="menu-text">
            Comprobantes
          </span>

          <b
            v-if="pendingReceipts > 0"
            class="menu-alert"
          >
            {{ pendingReceipts }}
          </b>

        </button>


        <!-- EVENTO -->

        <span class="menu-label event-menu-label">
          EVENTO
        </span>


        <!-- CONSTANCIAS -->

        <button
          :class="{ active: currentSection === 'constancias' }"
          @click="changeSection('constancias')"
        >

          <span class="menu-icon">
            🎓
          </span>

          <span>
            Constancias
          </span>

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
         CONTENIDO
    ====================================================== -->

    <main class="main-content">

      <!-- BOTÓN MOBILE -->

      <button
        class="mobile-menu-button"
        @click="sidebarOpen = !sidebarOpen"
      >
        ☰
      </button>


      <div class="page">

        <!-- =========================================
             ENCABEZADO
        ========================================== -->

        <div class="header">

          <div>

            <span class="event-label">
              CONGRESO ESCALA
            </span>

            <h1>
              Comprobantes de pago
            </h1>

            <p>
              Revisa y valida los comprobantes enviados por los participantes.
            </p>

          </div>

          <div class="counter">
            {{ validationList.length }} pendientes
          </div>

        </div>


        <!-- =========================================
             TARJETAS DE ESTADOS
        ========================================== -->

        <div class="status-grid">

          <!-- APROBADOS -->

          <div class="status-card green">

            <div class="status-icon">
              ✓
            </div>

            <div>

              <small>
                Aprobados
              </small>

              <strong>
                {{ approved }}
              </strong>

            </div>

          </div>


          <!-- EN REVISIÓN -->

          <div class="status-card blue">

            <div class="status-icon">
              🔎
            </div>

            <div>

              <small>
                En revisión
              </small>

              <strong>
                {{ inReview }}
              </strong>

            </div>

          </div>


          <!-- PENDIENTES -->

          <div class="status-card orange">

            <div class="status-icon">
              ⏳
            </div>

            <div>

              <small>
                Pendientes
              </small>

              <strong>
                {{ pending.length }}
              </strong>

            </div>

          </div>


          <!-- RECHAZADOS -->

          <div class="status-card red">

            <div class="status-icon">
              ✕
            </div>

            <div>

              <small>
                Rechazados
              </small>

              <strong>
                {{ rejected }}
              </strong>

            </div>

          </div>

        </div>



        <!-- =========================================
             SECCIÓN DE VALIDACIÓN
        ========================================== -->

        <section class="pending-section">

          <div class="section-header">

            <div>

              <span class="section-label">
                VALIDACIÓN
              </span>

              <h2>
                Comprobantes pendientes de validación
              </h2>

              <p>
                Revisa los comprobantes antes de aprobar o rechazar el pago.
              </p>

            </div>

            <div class="section-number">
              {{ validationList.length }}
            </div>

          </div>


          <!-- =========================================
               LISTA DE COMPROBANTES
          ========================================== -->

          <div
            v-if="validationList.length > 0"
            class="receipt-grid"
          >

            <div
              v-for="participant in validationList"
              :key="participant.id"
              class="receipt-card"
            >

              <!-- DATOS DEL PARTICIPANTE -->

              <div class="receipt-header">

                <div class="avatar">
                  {{ initials(participant.name) }}
                </div>

                <div class="participant-info">

                  <strong>
                    {{ participant.name }}
                  </strong>

                  <span>
                    {{ participant.control || "Sin número de control" }}
                  </span>

                </div>

              </div>


              <!-- ESTADO DEL PAGO -->

              <div
                class="receipt-status"
                :class="participant.payment"
              >

                <span v-if="participant.payment === 'pending'">
                  ⏳
                </span>

                <span v-else-if="participant.payment === 'in_review'">
                  🔎
                </span>

                <strong>
                  {{
                    participant.payment === "pending"
                      ? "Pendiente"
                      : "En revisión"
                  }}
                </strong>

              </div>


              <!-- INFORMACIÓN DEL PAGO -->

              <div class="data">

                <div>

                  <span>
                    Referencia
                  </span>

                  <strong>
                    {{ participant.reference || "Sin referencia" }}
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


                <div class="email-data">

                  <span>
                    Correo
                  </span>

                  <strong>
                    {{ participant.email || "Sin correo" }}
                  </strong>

                </div>

              </div>


              <!-- ARCHIVO DEL COMPROBANTE -->

              <div class="file-area">

                <!-- EXISTE COMPROBANTE -->

                <template v-if="participant.receiptUrl">

                  <iframe
                    v-if="participant.receiptUrl.includes('.pdf')"
                    :src="participant.receiptUrl"
                    class="receipt-pdf"
                    title="Comprobante PDF"
                  ></iframe>

                  <img
                    v-else
                    :src="participant.receiptUrl"
                    class="receipt-image"
                    alt="Comprobante de pago"
                  >

                </template>


                <!-- NO EXISTE COMPROBANTE -->

                <template v-else>

                  <div class="no-file">

                    <span>
                      📄
                    </span>

                    <strong>
                      No hay archivo
                    </strong>

                    <small>
                      El participante aún no ha subido su comprobante.
                    </small>

                  </div>

                </template>

              </div>


              <!-- NOMBRE DEL ARCHIVO -->

              <div
                v-if="participant.receiptName"
                class="file-name"
              >

                📎

                <span>
                  {{ participant.receiptName }}
                </span>

              </div>


              <!-- BOTONES -->

              <div class="actions">

                <!-- DESCARGAR -->

                <button
                  v-if="participant.receiptUrl"
                  class="view"
                  @click="downloadReceipt(participant)"
                >
                  📥 Ver comprobante
                </button>


                <!-- APROBAR -->

                <button
                  class="approve"
                  @click="approve(participant)"
                >
                  ✓ Aprobar
                </button>


                <!-- RECHAZAR -->

                <button
                  class="reject"
                  @click="reject(participant)"
                >
                  ✕ Rechazar
                </button>

              </div>

            </div>

          </div>


          <!-- NO HAY PENDIENTES -->

          <div
            v-else
            class="empty"
          >

            <div class="empty-icon">
              ✓
            </div>

            <h2>
              No hay comprobantes pendientes de validación
            </h2>

            <p>
              Todos los comprobantes han sido revisados.
            </p>

          </div>

        </section>



        <!-- =========================================
             SEPARACIÓN
        ========================================== -->

        <div class="history-separator">

          <div class="separator-line"></div>

          <div class="separator-icon">
            ↓
          </div>

          <div class="separator-line"></div>

        </div>



        <!-- =========================================
             HISTORIAL
        ========================================== -->

        <section class="history-section">

          <div class="section-header">

            <div>

              <span class="section-label history-label">
                HISTORIAL
              </span>

              <h2>
                Historial de comprobantes
              </h2>

              <p>
                Aquí aparecen los comprobantes que ya fueron aprobados o rechazados.
              </p>

            </div>

            <div class="history-counter">
              {{ history.length }} registros
            </div>

          </div>


          <!-- HISTORIAL CON REGISTROS -->

          <div
            v-if="history.length > 0"
            class="history-list"
          >

            <div
              v-for="participant in history"
              :key="'history-' + participant.id"
              class="history-card"
            >

              <!-- PARTICIPANTE -->

              <div class="history-person">

                <div class="avatar">
                  {{ initials(participant.name) }}
                </div>

                <div class="history-person-info">

                  <strong>
                    {{ participant.name }}
                  </strong>

                  <span>
                    {{ participant.control || "Sin número de control" }}
                  </span>

                </div>

              </div>


              <!-- REFERENCIA -->

              <div class="history-data">

                <small>
                  Referencia
                </small>

                <strong>
                  {{ participant.reference || "Sin referencia" }}
                </strong>

              </div>


              <!-- CORREO -->

              <div class="history-data">

                <small>
                  Correo
                </small>

                <strong>
                  {{ participant.email || "Sin correo" }}
                </strong>

              </div>


              <!-- ESTADO -->

              <div
                class="payment-status"
                :class="participant.payment"
              >

                <span v-if="participant.payment === 'approved'">
                  ✓
                </span>

                <span v-else>
                  ✕
                </span>

                <strong>
                  {{
                    participant.payment === "approved"
                      ? "Aprobado"
                      : "Rechazado"
                  }}
                </strong>

              </div>


              <!-- VER COMPROBANTE -->

              <button
                v-if="participant.receiptUrl"
                class="history-button"
                @click="downloadReceipt(participant)"
              >
                📥 Ver comprobante
              </button>

            </div>

          </div>


          <!-- HISTORIAL VACÍO -->

          <div
            v-else
            class="history-empty"
          >

            <div>
              🗂️
            </div>

            <h3>
              No hay registros en el historial
            </h3>

            <p>
              Los comprobantes aprobados o rechazados aparecerán aquí.
            </p>

          </div>

        </section>

      </div>

    </main>

  </div>

</template>


<script setup>

import {
  ref,
  computed,
  onMounted
} from "vue";

import {
  useRouter,
  useRoute
} from "vue-router";
import { API_URL } from "../../config/api";

const EVENTO_ID = 4;


/* =========================================
   ROUTER
========================================= */

const router = useRouter();
const route = useRoute();


/* =========================================
   SIDEBAR
========================================= */

const sidebarOpen = ref(false);


/* =========================================
   RUTAS DEL MENU
========================================= */

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


/* =========================================
   SECCIÓN ACTUAL
========================================= */

const currentSection = computed(() => {

  const currentPath = route.path;

  if (currentPath === routes.dashboard) {
    return "dashboard";
  }

  if (currentPath === routes.participantes) {
    return "participantes";
  }

  if (currentPath === routes.comprobantes) {
    return "comprobantes";
  }

  if (currentPath === routes.constancias) {
    return "constancias";
  }

  return "comprobantes";

});


/* =========================================
   CAMBIAR SECCIÓN
========================================= */

function changeSection(section) {

  if (!routes[section]) {
    return;
  }

  sidebarOpen.value = false;

  router.push(routes[section]);

}


/* =========================================
   VOLVER AL PANEL
========================================= */

function goBack() {

  router.push("/admin");

}


/* =========================================
   DATOS
========================================= */

const participants = ref([]);


/* =========================================
   INFORMACIÓN DEL EVENTO
========================================= */

const eventInfo = ref({

  cost: "$700 MXN"

});


/* =========================================
   CARGAR PARTICIPANTES
========================================= */

/*
  IMPORTANTE:

  Por ahora usamos información falsa para
  probar únicamente el FRONTEND.

  Cuando el backend esté listo, esta función
  se puede volver a conectar a la API.
*/

async function loadParticipants() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${API_URL}/eventos/${EVENTO_ID}/inscripciones/admin/participantes`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

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

const eventInfo = ref({ cost: "" });

async function loadEvento() {
  try {
    const response = await fetch(`${API_URL}/eventos/${EVENTO_ID}`);
    if (response.ok) {
      const data = await response.json();
      eventInfo.value.cost = data.cost;
    }
  } catch (e) {
    console.error("Error al cargar el evento:", e);
  }
}

/* =========================================
   PENDIENTES
   NO HA SUBIDO COMPROBANTE
========================================= */

const pending = computed(() => {

  return participants.value.filter(
    p => p.payment === "pending"
  );

});


/* =========================================
   PENDIENTES PARA SIDEBAR
========================================= */

const pendingReceipts = computed(() => {

  return pending.value.length;

});


/* =========================================
   EN REVISIÓN
========================================= */

const inReviewParticipants = computed(() => {

  return participants.value.filter(
    p => p.payment === "in_review"
  );

});


const inReview = computed(() => {

  return inReviewParticipants.value.length;

});


/* =========================================
   LISTA PARA VALIDACIÓN
========================================= */

const validationList = computed(() => {

  return participants.value.filter(
    p =>
      p.payment === "pending" ||
      p.payment === "in_review"
  );

});


/* =========================================
   APROBADOS
========================================= */

const approved = computed(() => {

  return participants.value.filter(
    p => p.payment === "approved"
  ).length;

});


/* =========================================
   RECHAZADOS
========================================= */

const rejected = computed(() => {

  return participants.value.filter(
    p => p.payment === "rejected"
  ).length;

});


/* =========================================
   HISTORIAL
========================================= */

const history = computed(() => {

  return participants.value.filter(
    p =>
      p.payment === "approved" ||
      p.payment === "rejected"
  );

});


/* =========================================
   APROBAR
========================================= */

async function approve(participant) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${API_URL}/eventos/${EVENTO_ID}/inscripciones/admin/${participant.id}/aprobar`,
      { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
    );
    if (!response.ok) throw new Error("No se pudo aprobar el pago.");
    participant.payment = "approved";
  } catch (e) {
    alert(e.message);
  }
}


/* =========================================
   RECHAZAR
========================================= */

async function reject(participant) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${API_URL}/eventos/${EVENTO_ID}/inscripciones/admin/${participant.id}/rechazar`,
      { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
    );
    if (!response.ok) throw new Error("No se pudo rechazar el comprobante.");
    participant.payment = "rejected";
  } catch (e) {
    alert(e.message);
  }
}


/* =========================================
   DESCARGAR / VER COMPROBANTE
========================================= */

function downloadReceipt(participant) {

  if (!participant.receiptUrl) {

    alert(
      "Este participante no tiene un comprobante disponible."
    );

    return;

  }


  window.open(
    participant.receiptUrl,
    "_blank"
  );

}


/* =========================================
   INICIALES
========================================= */

function initials(name = "") {

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


/* =========================================
   INICIO
========================================= */

onMounted(() => {

  await loadParticipants();
  await loadEvento();

});

</script>



<style scoped>

/* =====================================================
   LAYOUT GENERAL
===================================================== */

.admin-layout {

  display: flex;

  min-height: 100vh;

  background: #f4f7fb;

}


/* =====================================================
   SIDEBAR
===================================================== */

.sidebar {

  width: 245px;

  min-width: 245px;

  height: 100vh;

  position: fixed;

  left: 0;

  top: 0;

  z-index: 1000;

  display: flex;

  flex-direction: column;

  background: #ffffff;

  border-right: 1px solid #e7edf2;

  box-shadow:
    5px 0 20px rgba(0, 0, 0, .04);

}


/* =====================================================
   HEADER DEL SIDEBAR
===================================================== */

.sidebar-header {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 24px 20px;

  border-bottom: 1px solid #edf2f6;

}


.logo {

  width: 42px;

  height: 42px;

  border-radius: 12px;

  background: #0066b3;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 800;

  font-size: 14px;

  box-shadow:
    0 5px 15px rgba(0, 102, 179, .20);

}


.logo-info {

  display: flex;

  flex-direction: column;

}


.logo-info strong {

  color: #003366;

  font-size: 15px;

  letter-spacing: 1px;

}


.logo-info span {

  color: #90a4ae;

  font-size: 10px;

  margin-top: 2px;

}


/* =====================================================
   PERFIL
===================================================== */

.profile {

  display: flex;

  align-items: center;

  gap: 11px;

  padding: 20px;

  margin: 10px;

  background: #f5f9fc;

  border-radius: 12px;

}


.profile-avatar {

  width: 38px;

  height: 38px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #e3f2fd;

  color: #0066b3;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 11px;

  font-weight: 800;

}


.profile-info {

  display: flex;

  flex-direction: column;

  min-width: 0;

}


.profile-info strong {

  color: #263238;

  font-size: 12px;

}


.profile-info span {

  color: #90a4ae;

  font-size: 9px;

  margin-top: 3px;

}


/* =====================================================
   MENU
===================================================== */

.menu {

  display: flex;

  flex-direction: column;

  padding: 10px;

  gap: 5px;

}


.menu-label {

  color: #90a4ae;

  font-size: 9px;

  font-weight: 800;

  letter-spacing: 1.5px;

  padding: 12px 12px 7px;

}


.event-menu-label {

  margin-top: 12px;

}


.menu button {

  width: 100%;

  border: none;

  background: transparent;

  color: #607d8b;

  padding: 12px;

  border-radius: 9px;

  display: flex;

  align-items: center;

  gap: 11px;

  cursor: pointer;

  text-align: left;

  font-size: 12px;

  font-weight: 600;

  transition: .2s;

}


.menu button:hover {

  background: #f1f7fb;

  color: #0066b3;

}


.menu button.active {

  background: #e3f2fd;

  color: #0066b3;

  font-weight: 700;

}


.menu-icon {

  width: 20px;

  text-align: center;

  font-size: 15px;

}


.menu-text {

  flex: 1;

}


.menu-count {

  min-width: 22px;

  height: 22px;

  padding: 0 5px;

  border-radius: 20px;

  background: #edf2f6;

  color: #607d8b;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 9px;

}


.menu button.active .menu-count {

  background: white;

  color: #0066b3;

}


.menu-alert {

  min-width: 22px;

  height: 22px;

  padding: 0 5px;

  border-radius: 20px;

  background: #fff3e0;

  color: #ef6c00;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 9px;

}


/* =====================================================
   PARTE INFERIOR
===================================================== */

.sidebar-bottom {

  margin-top: auto;

  padding: 15px;

  border-top: 1px solid #edf2f6;

}


.back-button {

  width: 100%;

  border: none;

  background: #f5f7fa;

  color: #607d8b;

  padding: 11px;

  border-radius: 9px;

  cursor: pointer;

  font-size: 11px;

  font-weight: 600;

  transition: .2s;

}


.back-button:hover {

  background: #e3f2fd;

  color: #0066b3;

}


/* =====================================================
   CONTENIDO
===================================================== */

.main-content {

  width: calc(100% - 245px);

  margin-left: 245px;

  min-height: 100vh;

}


.page {

  padding: 35px;

  background: #f4f7fb;

  min-height: 100vh;

}


/* =====================================================
   BOTÓN MOBILE
===================================================== */

.mobile-menu-button {

  display: none;

}



/* =====================================================
   ENCABEZADO
===================================================== */

.header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 30px;

}


.event-label {

  color: #0066b3;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 2px;

}


.header h1 {

  color: #003366;

  margin: 6px 0;

  font-size: 30px;

}


.header p {

  color: #78909c;

  margin: 0;

  font-size: 14px;

}


.counter {

  background: #fff3e0;

  color: #ef6c00;

  padding: 11px 18px;

  border-radius: 20px;

  font-size: 12px;

  font-weight: 700;

}


/* =====================================================
   ESTADOS
===================================================== */

.status-grid {

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;

  margin-bottom: 45px;

}


.status-card {

  background: white;

  border-radius: 15px;

  padding: 20px;

  display: flex;

  align-items: center;

  gap: 15px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, .05);

}


.status-icon {

  width: 45px;

  height: 45px;

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 20px;

  font-weight: bold;

}


.status-card small {

  color: #90a4ae;

  display: block;

  font-size: 11px;

}


.status-card strong {

  display: block;

  margin-top: 2px;

  font-size: 25px;

}


.green .status-icon {

  background: #e8f5e9;

  color: #2e7d32;

}


.orange .status-icon {

  background: #fff3e0;

  color: #ef6c00;

}


.red .status-icon {

  background: #ffebee;

  color: #c62828;

}


.blue .status-icon {

  background: #e3f2fd;

  color: #1565c0;

}


/* =====================================================
   SECCIÓN
===================================================== */

.pending-section {

  width: 100%;

}


.section-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 22px;

}


.section-label {

  display: block;

  color: #ef6c00;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 2px;

  margin-bottom: 5px;

}


.history-label {

  color: #0066b3;

}


.section-header h2 {

  color: #003366;

  margin: 0;

  font-size: 22px;

}


.section-header p {

  color: #78909c;

  margin: 5px 0 0;

  font-size: 13px;

}


.section-number {

  width: 40px;

  height: 40px;

  border-radius: 50%;

  background: #fff3e0;

  color: #ef6c00;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 800;

}


/* =====================================================
   COMPROBANTES
===================================================== */

.receipt-grid {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 20px;

  margin-bottom: 100px;

}


.receipt-card {

  background: white;

  border-radius: 18px;

  padding: 20px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, .05);

}


/* =====================================================
   PARTICIPANTE
===================================================== */

.receipt-header {

  display: flex;

  gap: 12px;

  align-items: center;

  margin-bottom: 12px;

}


.participant-info {

  display: flex;

  flex-direction: column;

}


.participant-info strong {

  color: #263238;

  font-size: 14px;

}


.participant-info span {

  color: #90a4ae;

  font-size: 10px;

  margin-top: 3px;

}


.avatar {

  width: 42px;

  height: 42px;

  flex-shrink: 0;

  background: #e3f2fd;

  color: #0066b3;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 700;

  font-size: 11px;

}


/* =====================================================
   ESTADO
===================================================== */

.receipt-status {

  display: inline-flex;

  align-items: center;

  gap: 6px;

  padding: 6px 10px;

  border-radius: 20px;

  font-size: 10px;

  font-weight: 700;

  margin-bottom: 15px;

}


.receipt-status.pending {

  background: #fff3e0;

  color: #ef6c00;

}


.receipt-status.in_review {

  background: #e3f2fd;

  color: #1565c0;

}


/* =====================================================
   DATOS
===================================================== */

.data {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 8px;

  margin-bottom: 15px;

}


.data div {

  background: #f7f9fb;

  padding: 10px;

  border-radius: 8px;

}


.email-data {

  grid-column: 1 / -1;

}


.data span {

  display: block;

  color: #90a4ae;

  font-size: 9px;

  margin-bottom: 3px;

}


.data strong {

  font-size: 11px;

  word-break: break-word;

  color: #37474f;

}


/* =====================================================
   ARCHIVO
===================================================== */

.file-area {

  height: 210px;

  background: #f5f7fa;

  border-radius: 12px;

  overflow: hidden;

  display: flex;

  align-items: center;

  justify-content: center;

}


.receipt-image {

  width: 100%;

  height: 100%;

  object-fit: contain;

}


.receipt-pdf {

  width: 100%;

  height: 100%;

  border: none;


}


.no-file {

  text-align: center;

  padding: 20px;

  color: #90a4ae;

}


.no-file span {

  display: block;

  font-size: 45px;

}


.no-file strong {

  display: block;

  color: #546e7a;

  margin: 8px;

}


.no-file small {

  display: block;

  font-size: 10px;

}


/* =====================================================
   NOMBRE DEL ARCHIVO
===================================================== */

.file-name {

  margin-top: 10px;

  background: #f7f9fb;

  padding: 9px;

  border-radius: 8px;

  font-size: 10px;

  color: #607d8b;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

}


/* =====================================================
   BOTONES
===================================================== */

.actions {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 8px;

  margin-top: 15px;

}


.actions button {

  border: none;

  padding: 10px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;

  transition: .2s;

}


.actions button:hover {

  transform: translateY(-1px);

}


.view {

  grid-column: 1 / -1;

  background: #e3f2fd;

  color: #0066b3;

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
   VACÍO
===================================================== */

.empty {

  background: white;

  border-radius: 18px;

  padding: 70px 20px;

  text-align: center;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, .05);

}


.empty-icon {

  font-size: 50px;

  color: #43a047;

}


.empty h2 {

  color: #003366;

  margin-bottom: 5px;

}


.empty p {

  color: #90a4ae;

  margin: 0;

}


/* =====================================================
   SEPARADOR
===================================================== */

.history-separator {

  display: flex;

  align-items: center;

  gap: 15px;

  margin-top: 40px;

  margin-bottom: 80px;

}


.separator-line {

  flex: 1;

  height: 1px;

  background: #dce5ec;

}


.separator-icon {

  width: 35px;

  height: 35px;

  border-radius: 50%;

  background: white;

  color: #0066b3;

  border: 1px solid #dce5ec;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 16px;

}


/* =====================================================
   HISTORIAL
===================================================== */

.history-section {

  width: 100%;

  padding-bottom: 50px;

}


.history-counter {

  background: #e3f2fd;

  color: #0066b3;

  padding: 10px 16px;

  border-radius: 20px;

  font-size: 12px;

  font-weight: 700;

}


.history-list {

  display: flex;

  flex-direction: column;

  gap: 14px;

}


.history-card {

  background: white;

  border-radius: 15px;

  padding: 18px;

  display: grid;

  grid-template-columns:
    1.3fr
    1fr
    1.3fr
    auto
    auto;

  align-items: center;

  gap: 20px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, .04);

  border: 1px solid #edf2f6;

}


.history-person {

  display: flex;

  align-items: center;

  gap: 12px;

}


.history-person-info {

  display: flex;

  flex-direction: column;

}


.history-person-info strong {

  color: #263238;

  font-size: 13px;

}


.history-person-info span {

  color: #90a4ae;

  font-size: 10px;

  margin-top: 3px;

}


.history-data small {

  display: block;

  color: #90a4ae;

  font-size: 9px;

  margin-bottom: 4px;

}


.history-data strong {

  color: #37474f;

  font-size: 11px;

  word-break: break-word;

}


/* =====================================================
   ESTADO HISTORIAL
===================================================== */

.payment-status {

  display: flex;

  align-items: center;

  gap: 7px;

  padding: 8px 12px;

  border-radius: 20px;

  font-size: 11px;

  white-space: nowrap;

}


.payment-status.approved {

  background: #e8f5e9;

  color: #2e7d32;

}


.payment-status.rejected {

  background: #ffebee;

  color: #c62828;

}


.payment-status span {

  font-weight: 900;

}


/* =====================================================
   BOTÓN HISTORIAL
===================================================== */

.history-button {

  border: none;

  background: #e3f2fd;

  color: #0066b3;

  padding: 9px 12px;

  border-radius: 8px;

  cursor: pointer;

  font-size: 11px;

  font-weight: 600;

}


.history-button:hover {

  background: #d5ebfa;

}


/* =====================================================
   HISTORIAL VACÍO
===================================================== */

.history-empty {

  background: white;

  border-radius: 18px;

  padding: 55px 20px;

  text-align: center;

  border: 1px dashed #ccd9e2;

}


.history-empty > div {

  font-size: 40px;

  margin-bottom: 10px;

}


.history-empty h3 {

  color: #003366;

  margin: 0 0 7px;

}


.history-empty p {

  color: #90a4ae;

  margin: 0;

  font-size: 13px;

}


/* =====================================================
   RESPONSIVE TABLET
===================================================== */

@media (max-width: 1200px) {

  .status-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }


  .receipt-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }


  .history-card {

    grid-template-columns:
      1fr 1fr;

  }

}


/* =====================================================
   RESPONSIVE MOBILE
===================================================== */

@media (max-width: 750px) {

  .sidebar {

    transform: translateX(-100%);

    transition: transform .25s ease;

  }


  .sidebar.open {

    transform: translateX(0);

  }


  .main-content {

    width: 100%;

    margin-left: 0;

  }


  .mobile-menu-button {

    display: flex;

    position: fixed;

    top: 15px;

    left: 15px;

    z-index: 900;

    width: 42px;

    height: 42px;

    border: none;

    border-radius: 10px;

    background: white;

    color: #0066b3;

    align-items: center;

    justify-content: center;

    font-size: 20px;

    box-shadow:
      0 4px 15px rgba(0, 0, 0, .10);

    cursor: pointer;

  }


  .page {

    padding: 75px 15px 20px;

  }


  .header {

    flex-direction: column;

    align-items: flex-start;

    gap: 15px;

  }


  .status-grid {

    grid-template-columns:
      1fr;

  }


  .receipt-grid {

    grid-template-columns:
      1fr;

    margin-bottom: 70px;

  }


  .section-header {

    align-items: flex-start;

    gap: 15px;

  }


  .section-header h2 {

    font-size: 19px;

  }


  .history-separator {

    margin-top: 25px;

    margin-bottom: 55px;

  }


  .history-card {

    grid-template-columns:
      1fr;

  }


  .payment-status {

    width: fit-content;

  }


  .history-button {

    width: 100%;

  }

}

</style>

