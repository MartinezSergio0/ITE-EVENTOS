<template>
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
        {{ pending.length }} pendientes
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
         SECCIÓN DE PENDIENTES
    ========================================== -->

    <section class="pending-section">

      <!-- TÍTULO -->

      <div class="section-header">

        <div>

          <span class="section-label">
            VALIDACIÓN
          </span>

          <h2>
            Comprobantes pendientes
          </h2>

          <p>
            Revisa los comprobantes antes de aprobar o rechazar el pago.
          </p>

        </div>

        <div class="section-number">
          {{ pending.length }}
        </div>

      </div>


      <!-- =========================================
           LISTA DE COMPROBANTES
      ========================================== -->

      <div
        v-if="pending.length > 0"
        class="receipt-grid"
      >

        <div
          v-for="participant in pending"
          :key="participant.id"
          class="receipt-card"
        >

          <!-- =====================================
               DATOS DEL PARTICIPANTE
          ====================================== -->

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


          <!-- =====================================
               INFORMACIÓN DEL PAGO
          ====================================== -->

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


          <!-- =====================================
               ARCHIVO DEL COMPROBANTE
          ====================================== -->

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

            <template v-else>

              <div class="no-file">
                <span>📄</span>
                <strong>No hay archivo</strong>
                <small>El participante aún no ha subido su comprobante.</small>
              </div>

            </template>

          </div>


          <!-- =====================================
               NOMBRE DEL ARCHIVO
          ====================================== -->

          <div
            v-if="participant.receipt"
            class="file-name"
          >

            📎

            <span>
              {{ participant.receipt.name }}
            </span>

          </div>


          <!-- =====================================
               BOTONES
          ====================================== -->

          <div class="actions">

            <!-- DESCARGAR -->

            <button
              v-if="participant.receiptUrl"
              class="view"
              @click="downloadReceipt(participant)"
            >
              📥 Descargar comprobante
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


      <!-- =========================================
           NO HAY PENDIENTES
      ========================================== -->

      <div
        v-else
        class="empty"
      >

        <div class="empty-icon">
          ✓
        </div>

        <h2>
          No hay comprobantes pendientes
        </h2>

        <p>
          Todos los comprobantes han sido revisados.
        </p>

      </div>

    </section>



    <!-- =========================================
         SEPARACIÓN GRANDE ENTRE SECCIONES
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

      <!-- TÍTULO DEL HISTORIAL -->

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


      <!-- =========================================
           HISTORIAL CON REGISTROS
      ========================================== -->

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

            <span
              v-if="participant.payment === 'approved'"
            >
              ✓
            </span>

            <span
              v-else
            >
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


      <!-- =========================================
           HISTORIAL VACÍO
      ========================================== -->

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
</template>



<script setup>

  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { API_URL } from "../../config/api";

  const router = useRouter();

  const participants = ref([]);
  const eventInfo = ref({ cost: "" });

  async function loadParticipants() {

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

    } catch (error) {
      console.error("Error al cargar participantes:", error);
      participants.value = [];
    }

  }

  async function loadEvento() {

    try {

      const response = await fetch(`${API_URL}/eventos/4`);

      if (response.ok) {
        const data = await response.json();
        eventInfo.value.cost = data.cost;
      }

    } catch (error) {
      console.error("Error al cargar el evento:", error);
    }

  }

  const pending = computed(() => {
    return participants.value.filter(p => p.payment === "pending" || p.payment === "in_review");
  });

  const approved = computed(() => {
    return participants.value.filter(p => p.payment === "approved").length;
  });

  const rejected = computed(() => {
    return participants.value.filter(p => p.payment === "rejected").length;
  });

  const history = computed(() => {
    return participants.value.filter(p => p.payment === "approved" || p.payment === "rejected");
  });

  async function approve(participant) {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/eventos/4/inscripciones/admin/${participant.id}/aprobar`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo aprobar el pago.");
      }

      participant.payment = "approved";

      alert(`Pago aprobado correctamente para ${participant.name}.`);

    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al aprobar el pago.");
    }

  }

  async function reject(participant) {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/eventos/4/inscripciones/admin/${participant.id}/rechazar`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo rechazar el comprobante.");
      }

      participant.payment = "rejected";

      alert(`Comprobante rechazado para ${participant.name}.`);

    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al rechazar el comprobante.");
    }

  }

  function downloadReceipt(participant) {

    if (!participant.receiptUrl) {
      alert("Este participante no tiene un comprobante disponible.");
      return;
    }

    window.open(participant.receiptUrl, "_blank");

  }

  function initials(name = "") {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase();
  }

  onMounted(async () => {
    await loadParticipants();
    await loadEvento();
  });

</script>



<style scoped>

/* =========================================
   PÁGINA
========================================= */

.page {

  padding: 35px;

  background: #f4f7fb;

  min-height: calc(100vh - 80px);

}



/* =========================================
   ENCABEZADO
========================================= */

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



/* =========================================
   ESTADOS
========================================= */

.status-grid {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

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



/* =========================================
   SECCIÓN
========================================= */

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



/* =========================================
   COMPROBANTES
========================================= */

.receipt-grid {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 20px;

  /*
    ESPACIO GRANDE ENTRE LOS
    COMPROBANTES Y EL SEPARADOR
  */

  margin-bottom: 300px;

}


.receipt-card {

  background: white;

  border-radius: 18px;

  padding: 20px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, .05);

}



/* =========================================
   PARTICIPANTE
========================================= */

.receipt-header {

  display: flex;

  gap: 12px;

  align-items: center;

  margin-bottom: 15px;

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



/* =========================================
   DATOS
========================================= */

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



/* =========================================
   ÁREA DEL ARCHIVO
========================================= */

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


.file-icon {

  font-size: 55px;

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



/* =========================================
   NOMBRE DEL ARCHIVO
========================================= */

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



/* =========================================
   BOTONES
========================================= */

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



/* =========================================
   VACÍO
========================================= */

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



/* =========================================
   SEPARADOR GRANDE
========================================= */

.history-separator {

  display: flex;

  align-items: center;

  gap: 15px;

  /*
    ESPACIO SUPERIOR
    DESPUÉS DE LOS COMPROBANTES
  */

  margin-top: 40px;

  /*
    ESPACIO INFERIOR
    ANTES DEL HISTORIAL
  */

  margin-bottom: 500px;

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



/* =========================================
   HISTORIAL
========================================= */

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



/* =========================================
   LISTA DEL HISTORIAL
========================================= */

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



/* =========================================
   ESTADO DEL PAGO
========================================= */

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



/* =========================================
   BOTÓN DEL HISTORIAL
========================================= */

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



/* =========================================
   HISTORIAL VACÍO
========================================= */

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



/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 1200px) {

  .receipt-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }


  .history-card {

    grid-template-columns:
      1fr 1fr;

  }

}


@media (max-width: 750px) {

  .page {

    padding: 20px 15px;

  }


  .header {

    flex-direction: column;

    align-items: flex-start;

    gap: 15px;

  }


  .status-grid {

    grid-template-columns: 1fr;

  }


  .receipt-grid {

    grid-template-columns: 1fr;

    /*
      En celular reducimos un poco
      el espacio para no hacer
      demasiado larga la página.
    */

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

    grid-template-columns: 1fr;

  }


  .payment-status {

    width: fit-content;

  }


  .history-button {

    width: 100%;

  }

}

</style>