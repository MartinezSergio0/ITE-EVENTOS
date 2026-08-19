<template>

  <div class="comprobante-page">

    <!-- =========================================
         HEADER
    ========================================== -->

    <header class="page-header">

      <div class="header-container">

        <router-link
          :to="`/evento/:id${eventId}`"
          class="back-btn"
        >
          ← Regresar al evento
        </router-link>

        <div class="header-content">

          <div class="header-icon">
            📤
          </div>

          <div>

            <span class="header-badge">
              CONGRESO ESCALA
            </span>

            <h1>
              Comprobante de pago
            </h1>

            <p>
              Envía tu comprobante para validar tu inscripción.
            </p>

          </div>

        </div>

      </div>

    </header>


    <!-- =========================================
         CONTENIDO
    ========================================== -->

    <main class="main-container">


      <!-- =====================================
           FORMULARIO
      ====================================== -->

      <section class="form-card">

        <div class="card-title">

          <div class="title-icon">
            💳
          </div>

          <div>

            <h2>
              Validar mi pago
            </h2>

            <p>
              Ingresa los datos de tu referencia bancaria.
            </p>

          </div>

        </div>


        <form
          @submit.prevent="enviarComprobante"
        >


          <!-- =================================
               REFERENCIA
          ================================== -->

          <div class="form-group">

            <label>
              Referencia bancaria
              <span>*</span>
            </label>

            <input
              v-model="form.referencia"
              type="text"
              maxlength="10"
              inputmode="numeric"
              placeholder="Ej. 2612000001"
              required
            >

            <small>
              Ingresa los 10 dígitos de tu referencia.
            </small>

          </div>


          <!-- =================================
               NOMBRE
          ================================== -->

          <div class="form-group">

            <label>
              Nombre completo
              <span>*</span>
            </label>

            <input
              v-model="form.nombre"
              type="text"
              placeholder="Nombre y apellidos"
              required
            >

          </div>


          <!-- =================================
               CORREO
          ================================== -->

          <div class="form-group">

            <label>
              Correo electrónico
              <span>*</span>
            </label>

            <input
              v-model="form.correo"
              type="email"
              placeholder="ejemplo@ite.edu.mx"
              required
            >

          </div>


          <!-- =================================
               MONTO
          ================================== -->

          <div class="form-group">

            <label>
              Monto pagado
              <span>*</span>
            </label>

            <div class="amount-input">

              <span>
                $
              </span>

              <input
                v-model.number="form.monto"
                type="number"
                min="0"
                step="0.01"
                placeholder="1000"
                required
              >

              <span>
                MXN
              </span>

            </div>

            <small>
              La cuota de recuperación del Congreso ESCALA es de
              <strong>${{ montoEsperado }} MXN</strong>.
            </small>

          </div>


          <!-- =================================
               FECHA
          ================================== -->

          <div class="form-group">

            <label>
              Fecha del pago
              <span>*</span>
            </label>

            <input
              v-model="form.fechaPago"
              type="date"
              required
            >

          </div>


          <!-- =================================
               ARCHIVO
          ================================== -->

          <div class="form-group">

            <label>
              Comprobante de pago
              <span>*</span>
            </label>


            <div
              class="upload-area"
              :class="{
                'drag-active': dragActive,
                'has-file': archivo
              }"
              @dragover.prevent="dragActive = true"
              @dragleave.prevent="dragActive = false"
              @drop.prevent="manejarDrop"
              @click="abrirSelector"
            >

              <input
                ref="fileInput"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                hidden
                @change="seleccionarArchivo"
              >


              <div
                v-if="!archivo"
                class="upload-content"
              >

                <div class="upload-icon">
                  📄
                </div>

                <h3>
                  Selecciona tu comprobante
                </h3>

                <p>
                  Haz clic aquí o arrastra el archivo.
                </p>

                <span>
                  JPG, PNG o PDF · Máximo 5 MB
                </span>

              </div>


              <div
                v-else
                class="file-selected"
              >

                <div class="file-icon">
                  📄
                </div>

                <div class="file-info">

                  <strong>
                    {{ archivo.name }}
                  </strong>

                  <span>
                    {{ tamañoArchivo }}
                  </span>

                </div>

                <button
                  type="button"
                  class="remove-file"
                  @click.stop="eliminarArchivo"
                >
                  ×
                </button>

              </div>

            </div>

          </div>


          <!-- =================================
               INFORMACIÓN
          ================================== -->

          <div class="info-box">

            <div class="info-icon">
              ℹ️
            </div>

            <div>

              <strong>
                Antes de enviar
              </strong>

              <p>
                Asegúrate de que el comprobante sea legible
                y que aparezcan claramente el monto,
                fecha y referencia de la operación.
              </p>

            </div>

          </div>


          <!-- =================================
               ERROR
          ================================== -->

          <div
            v-if="error"
            class="error-message"
          >

            ⚠️ {{ error }}

          </div>


          <!-- =================================
               ÉXITO
          ================================== -->

          <div
            v-if="success"
            class="success-message"
          >

            ✓ {{ success }}

          </div>


          <!-- =================================
               BOTÓN
          ================================== -->

          <button
            type="submit"
            class="submit-btn"
            :disabled="enviando"
          >

            <span v-if="!enviando">
              📤 Enviar comprobante
            </span>

            <span v-else>
              ⏳ Enviando...
            </span>

          </button>


        </form>

      </section>


      <!-- =====================================
           PANEL DERECHO
      ====================================== -->

      <aside class="side-panel">


        <!-- DATOS DEL PAGO -->

        <div class="payment-card">

          <div class="payment-header">

            <div class="bank-icon">
              🏦
            </div>

            <div>

              <h2>
                Datos de pago
              </h2>

              <span>
                Congreso ESCALA
              </span>

            </div>

          </div>


          <div class="amount">
            <span>Cuota de recuperación</span>
            <strong>${{ montoEsperado }}</strong>
            <small>MXN</small>
          </div>


          <div class="bank-data">


            <div class="bank-item">

              <span>
                Banco
              </span>

              <strong>
                Scotiabank
              </strong>

            </div>


            <div class="bank-item">

              <span>
                Titular
              </span>

              <strong>
                Academia Estatal de Ciencias Económico Administrativas
              </strong>

            </div>


            <div class="bank-item">

              <span>
                Cuenta
              </span>

              <strong>
                13003338223
              </strong>

            </div>


            <div class="bank-item">

              <span>
                CLABE
              </span>

              <strong>
                044028130033382234
              </strong>

            </div>


          </div>

        </div>


        <!-- =================================
             PASOS
        ================================== -->

        <div class="steps-card">

          <h3>
            ¿Qué sucede después?
          </h3>


          <div class="step">

            <div class="step-number">
              1
            </div>

            <div>

              <strong>
                Envío
              </strong>

              <p>
                Subes tu comprobante de pago.
              </p>

            </div>

          </div>


          <div class="step">

            <div class="step-number">
              2
            </div>

            <div>

              <strong>
                Revisión
              </strong>

              <p>
                El sistema verifica los datos de la operación.
              </p>

            </div>

          </div>


          <div class="step">

            <div class="step-number">
              3
            </div>

            <div>

              <strong>
                Validación
              </strong>

              <p>
                Se confirma que el pago corresponda
                a tu referencia.
              </p>

            </div>

          </div>


          <div class="step">

            <div class="step-number">
              4
            </div>

            <div>

              <strong>
                Registro confirmado
              </strong>

              <p>
                Recibirás la confirmación de tu inscripción.
              </p>

            </div>

          </div>


        </div>


        <!-- =================================
             SEGURIDAD
        ================================== -->

        <div class="security-card">

          🔒

          <div>

            <strong>
              Información segura
            </strong>

            <p>
              Tu comprobante será utilizado únicamente
              para validar tu pago e inscripción.
            </p>

          </div>

        </div>


      </aside>

    </main>


    <!-- =========================================
         MODAL PAGO EN REVISIÓN
    ========================================== -->

    <div
      v-if="mostrarModal"
      class="modal-overlay"
    >

      <div class="status-modal">


        <div class="pending-icon">
          ✓
        </div>


        <span class="pending-badge">
          COMPROBANTE RECIBIDO
        </span>


        <h2>
          Tu pago está en revisión
        </h2>


        <p>
          Hemos recibido correctamente tu comprobante.
          El sistema verificará la información de tu pago.
        </p>


        <div class="status-reference">

          <span>
            Referencia
          </span>

          <strong>
            {{ form.referencia }}
          </strong>

        </div>


        <div class="status-info">

          <div>
            🕐
            <span>
              Estado
            </span>

            <strong>
              En revisión
            </strong>
          </div>


          <div>
            💰
            <span>
              Monto
            </span>

            <strong>
              ${{ form.monto }} MXN
            </strong>
          </div>

        </div>


        <div class="modal-warning">

          ⚠️

          <p>
            No necesitas volver a enviar el comprobante.
            Conserva tu referencia bancaria para consultar
            posteriormente el estado de tu pago.
          </p>

        </div>


        <button
          class="modal-btn"
          @click="irAEstadoPago"
        >
          Consultar estado de mi pago
        </button>


      </div>

    </div>

  </div>

</template>


<script setup>

import {
  computed,
  onMounted,
  reactive,
  ref
} from "vue";

import {
  useRoute,
  useRouter
} from "vue-router";

import { API_URL } from "../../config/api";


/* =========================================
   ROUTER
========================================= */

const route = useRoute();

const router = useRouter();


const eventId =
  route.params.id || 4;


/* =========================================
   FORMULARIO
========================================= */

const form = reactive({

  referencia: "",

  nombre: "",

  correo: "",

  monto: 0,

  fechaPago: ""

});


/* =========================================
   MONTO ESPERADO (viene del backend)
========================================= */

const montoEsperado = ref(0);


/* =========================================
   VARIABLES
========================================= */

const archivo = ref(null);

const fileInput = ref(null);

const dragActive = ref(false);

const enviando = ref(false);

const error = ref("");

const success = ref("");

const mostrarModal = ref(false);


/* =========================================
   CARGAR DATOS DEL EVENTO
========================================= */

onMounted(async () => {

  try {

    const response = await fetch(`${API_URL}/eventos/${eventId}`);

    if (response.ok) {
      const data = await response.json();
      montoEsperado.value = data.costoNumero ?? 0;
      form.monto = montoEsperado.value;
    }

  } catch (e) {
    console.error("Error al cargar el evento:", e);
  }

});


/* =========================================
   TAMAÑO ARCHIVO
========================================= */

const tamañoArchivo = computed(() => {

  if (!archivo.value) {

    return "";

  }

  const bytes =
    archivo.value.size;

  if (bytes < 1024) {

    return `${bytes} Bytes`;

  }

  if (bytes < 1024 * 1024) {

    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;

  }

  return `${(
    bytes / (1024 * 1024)
  ).toFixed(2)} MB`;

});


/* =========================================
   ABRIR SELECTOR
========================================= */

function abrirSelector() {

  fileInput.value?.click();

}


/* =========================================
   SELECCIONAR ARCHIVO
========================================= */

function seleccionarArchivo(event) {

  const files =
    event.target.files;

  if (!files || !files.length) {

    return;

  }

  validarArchivo(files[0]);

}


/* =========================================
   DRAG & DROP
========================================= */

function manejarDrop(event) {

  dragActive.value = false;

  const files =
    event.dataTransfer.files;

  if (!files || !files.length) {

    return;

  }

  validarArchivo(files[0]);

}


/* =========================================
   VALIDAR ARCHIVO
========================================= */

function validarArchivo(file) {

  error.value = "";

  success.value = "";


  const tiposPermitidos = [

    "image/jpeg",

    "image/png",

    "application/pdf"

  ];


  if (!tiposPermitidos.includes(file.type)) {

    error.value =
      "El comprobante debe ser JPG, PNG o PDF.";

    return;

  }


  const maximo =
    5 * 1024 * 1024;


  if (file.size > maximo) {

    error.value =
      "El comprobante no puede superar los 5 MB.";

    return;

  }


  archivo.value = file;

}


/* =========================================
   ELIMINAR ARCHIVO
========================================= */

function eliminarArchivo() {

  archivo.value = null;

  if (fileInput.value) {

    fileInput.value.value = "";

  }

}


/* =========================================
   VALIDAR REFERENCIA
========================================= */

function validarReferencia() {

  return /^\d{10}$/.test(
    form.referencia
  );

}


/* =========================================
   ENVIAR COMPROBANTE
========================================= */

async function enviarComprobante() {

  error.value = "";
  success.value = "";

  if (!validarReferencia()) {
    error.value = "La referencia bancaria debe contener exactamente 10 dígitos.";
    return;
  }

  if (Number(form.monto) !== montoEsperado.value) {
    error.value = `El monto del comprobante debe ser de $${montoEsperado.value} MXN.`;
    return;
  }

  if (!archivo.value) {
    error.value = "Debes seleccionar tu comprobante de pago.";
    return;
  }

  enviando.value = true;

  try {

    const formData = new FormData();
    formData.append("referencia", form.referencia);
    formData.append("correo", form.correo);
    formData.append("archivo", archivo.value);

    const response = await fetch(
      `${API_URL}/eventos/${eventId}/inscripciones/comprobante`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      let errorData = {};
      try { errorData = await response.json(); } catch { errorData = {}; }
      throw new Error(errorData.message || "No se pudo enviar el comprobante.");
    }

    const data = await response.json();

    success.value = data.mensaje || "Comprobante enviado correctamente.";
    mostrarModal.value = true;

  } catch (err) {
    console.error(err);
    error.value = err.message || "No fue posible enviar el comprobante.";
  } finally {
    enviando.value = false;
  }

}


/* =========================================
   CONSULTAR ESTADO
========================================= */

function irAEstadoPago() {

  mostrarModal.value = false;

  router.push(
    `/estado-pago/${form.referencia}`
  );

}

</script>


<style scoped>

/* =====================================================
   RESET
===================================================== */

* {

  box-sizing: border-box;

}


/* =====================================================
   PÁGINA
===================================================== */

.comprobante-page {

  min-height: 100vh;

  background:
    linear-gradient(
      135deg,
      #f4f8fc,
      #eaf2fb
    );

  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

  color: #1f2937;

}


/* =====================================================
   HEADER
===================================================== */

.page-header {

  background:
    linear-gradient(
      135deg,
      #003366,
      #0055aa
    );

  color: white;

  padding: 28px 6% 45px;

}


.header-container {

  max-width: 1200px;

  margin: auto;

}


.back-btn {

  display: inline-block;

  color: white;

  text-decoration: none;

  margin-bottom: 32px;

  font-weight: 600;

  transition: .3s;

}


.back-btn:hover {

  transform: translateX(-4px);

}


.header-content {

  display: flex;

  align-items: center;

  gap: 25px;

}


.header-icon {

  width: 80px;

  height: 80px;

  background:
    rgba(255,255,255,.15);

  border-radius: 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 38px;

}


.header-badge {

  display: inline-block;

  background:
    rgba(255,255,255,.15);

  padding: 7px 15px;

  border-radius: 30px;

  font-size: .75rem;

  font-weight: 800;

  letter-spacing: 1px;

  margin-bottom: 8px;

}


.header-content h1 {

  margin: 0 0 8px;

  font-size: 2.4rem;

}


.header-content p {

  margin: 0;

  opacity: .9;

}


/* =====================================================
   CONTENEDOR
===================================================== */

.main-container {

  max-width: 1200px;

  margin: -20px auto 60px;

  padding: 0 20px;

  display: grid;

  grid-template-columns: 1.5fr 1fr;

  gap: 30px;

}


/* =====================================================
   FORM CARD
===================================================== */

.form-card {

  background: white;

  border-radius: 20px;

  padding: 35px;

  box-shadow:
    0 15px 40px rgba(0,0,0,.08);

}


.card-title {

  display: flex;

  align-items: center;

  gap: 15px;

  margin-bottom: 30px;

}


.title-icon {

  width: 55px;

  height: 55px;

  background: #e8f1fb;

  border-radius: 15px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 25px;

}


.card-title h2 {

  margin: 0 0 5px;

  color: #003366;

}


.card-title p {

  margin: 0;

  color: #777;

}


/* =====================================================
   FORMULARIO
===================================================== */

.form-group {

  margin-bottom: 22px;

}


.form-group label {

  display: block;

  margin-bottom: 8px;

  font-weight: 700;

  color: #26384d;

}


.form-group label span {

  color: #d32f2f;

}


.form-group input {

  width: 100%;

  padding: 14px 15px;

  border:
    1px solid #d8e0ea;

  border-radius: 10px;

  outline: none;

  font-size: .95rem;

  transition: .25s;

}


.form-group input:focus {

  border-color: #0055aa;

  box-shadow:
    0 0 0 3px
    rgba(0,85,170,.1);

}


.form-group small {

  display: block;

  color: #777;

  margin-top: 7px;

  line-height: 1.5;

}


/* =====================================================
   MONTO
===================================================== */

.amount-input {

  display: flex;

  align-items: center;

  border:
    1px solid #d8e0ea;

  border-radius: 10px;

  overflow: hidden;

}


.amount-input span {

  padding: 0 14px;

  color: #777;

  font-weight: 700;

}


.amount-input input {

  border: none;

  border-radius: 0;

}


/* =====================================================
   UPLOAD
===================================================== */

.upload-area {

  border:
    2px dashed #b8c9dc;

  border-radius: 15px;

  padding: 35px 20px;

  text-align: center;

  cursor: pointer;

  transition: .3s;

  background: #fafcff;

}


.upload-area:hover,
.upload-area.drag-active {

  border-color: #0055aa;

  background: #f1f7ff;

}


.upload-area.has-file {

  border-style: solid;

  border-color: #2e7d32;

  background: #f4fbf5;

}


.upload-icon {

  font-size: 45px;

  margin-bottom: 10px;

}


.upload-content h3 {

  color: #003366;

  margin: 8px 0;

}


.upload-content p {

  color: #666;

  margin: 5px 0;

}


.upload-content span {

  color: #999;

  font-size: .8rem;

}


/* =====================================================
   ARCHIVO
===================================================== */

.file-selected {

  display: flex;

  align-items: center;

  text-align: left;

  gap: 15px;

}


.file-icon {

  font-size: 35px;

}


.file-info {

  flex: 1;

  display: flex;

  flex-direction: column;

  gap: 5px;

}


.file-info strong {

  color: #26384d;

  word-break: break-word;

}


.file-info span {

  color: #777;

  font-size: .8rem;

}


.remove-file {

  border: none;

  background: #ffebee;

  color: #c62828;

  width: 35px;

  height: 35px;

  border-radius: 50%;

  font-size: 20px;

  cursor: pointer;

}


/* =====================================================
   INFO
===================================================== */

.info-box {

  display: flex;

  gap: 13px;

  background: #f1f7ff;

  border:
    1px solid #cfe2f5;

  border-radius: 13px;

  padding: 17px;

  margin-bottom: 20px;

}


.info-icon {

  font-size: 22px;

}


.info-box strong {

  color: #003366;

}


.info-box p {

  color: #555;

  font-size: .87rem;

  line-height: 1.6;

  margin-bottom: 0;

}


/* =====================================================
   ERROR
===================================================== */

.error-message {

  background: #ffebee;

  color: #c62828;

  border:
    1px solid #ffcdd2;

  padding: 14px;

  border-radius: 10px;

  margin-bottom: 18px;

  font-weight: 600;

}


/* =====================================================
   SUCCESS
===================================================== */

.success-message {

  background: #e8f5e9;

  color: #2e7d32;

  border:
    1px solid #c8e6c9;

  padding: 14px;

  border-radius: 10px;

  margin-bottom: 18px;

  font-weight: 600;

}


/* =====================================================
   BOTÓN
===================================================== */

.submit-btn {

  width: 100%;

  border: none;

  background:
    linear-gradient(
      90deg,
      #003366,
      #0055aa
    );

  color: white;

  padding: 17px;

  border-radius: 12px;

  font-size: 1rem;

  font-weight: 800;

  cursor: pointer;

  transition: .3s;

}


.submit-btn:hover {

  transform: translateY(-3px);

  box-shadow:
    0 12px 25px
    rgba(0,85,170,.25);

}


.submit-btn:disabled {

  opacity: .7;

  cursor: wait;

  transform: none;

}


/* =====================================================
   PANEL
===================================================== */

.side-panel {

  display: flex;

  flex-direction: column;

  gap: 20px;

}


/* =====================================================
   PAYMENT
===================================================== */

.payment-card {

  background: white;

  border-radius: 20px;

  padding: 28px;

  box-shadow:
    0 15px 40px rgba(0,0,0,.08);

}


.payment-header {

  display: flex;

  gap: 14px;

  align-items: center;

}


.bank-icon {

  width: 55px;

  height: 55px;

  background: #e8f5e9;

  border-radius: 15px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 25px;

}


.payment-header h2 {

  margin: 0 0 4px;

  color: #003366;

  font-size: 1.3rem;

}


.payment-header span {

  color: #777;

  font-size: .85rem;

}


/* =====================================================
   MONTO
===================================================== */

.amount {

  text-align: center;

  padding: 25px 0;

  border-bottom:
    1px solid #eee;

}


.amount span {

  display: block;

  color: #777;

}


.amount strong {

  color: #2e7d32;

  font-size: 2.3rem;

}


.amount small {

  color: #777;

}


/* =====================================================
   BANK DATA
===================================================== */

.bank-data {

  padding-top: 20px;

  display: flex;

  flex-direction: column;

  gap: 17px;

}


.bank-item span {

  display: block;

  color: #888;

  font-size: .78rem;

  margin-bottom: 4px;

}


.bank-item strong {

  display: block;

  color: #26384d;

  font-size: .88rem;

  line-height: 1.45;

  word-break: break-word;

}


/* =====================================================
   STEPS
===================================================== */

.steps-card {

  background: white;

  border-radius: 20px;

  padding: 28px;

  box-shadow:
    0 15px 40px rgba(0,0,0,.08);

}


.steps-card h3 {

  color: #003366;

  margin-top: 0;

  margin-bottom: 22px;

}


.step {

  display: flex;

  gap: 13px;

  margin-bottom: 20px;

}


.step:last-child {

  margin-bottom: 0;

}


.step-number {

  width: 32px;

  height: 32px;

  flex-shrink: 0;

  background: #003366;

  color: white;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 800;

}


.step strong {

  color: #26384d;

}


.step p {

  margin: 5px 0 0;

  color: #777;

  font-size: .86rem;

  line-height: 1.5;

}


/* =====================================================
   SECURITY
===================================================== */

.security-card {

  display: flex;

  gap: 13px;

  background: #f1f7ff;

  border-radius: 15px;

  padding: 18px;

  color: #0055aa;

}


.security-card strong {

  color: #003366;

}


.security-card p {

  margin: 5px 0 0;

  color: #666;

  font-size: .82rem;

  line-height: 1.5;

}


/* =====================================================
   MODAL
===================================================== */

.modal-overlay {

  position: fixed;

  inset: 0;

  z-index: 2000;

  background:
    rgba(0,0,0,.65);

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

}


.status-modal {

  width: 100%;

  max-width: 560px;

  background: white;

  border-radius: 22px;

  padding: 40px;

  text-align: center;

  box-shadow:
    0 30px 80px
    rgba(0,0,0,.25);

}


.pending-icon {

  width: 75px;

  height: 75px;

  margin: 0 auto 15px;

  border-radius: 50%;

  background: #e8f5e9;

  color: #2e7d32;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 38px;

  font-weight: 900;

}


.pending-badge {

  display: inline-block;

  background: #e8f5e9;

  color: #2e7d32;

  padding: 7px 14px;

  border-radius: 20px;

  font-size: .75rem;

  font-weight: 800;

}


.status-modal h2 {

  color: #003366;

  margin: 18px 0 10px;

}


.status-modal > p {

  color: #666;

  line-height: 1.7;

}


/* =====================================================
   REFERENCIA
===================================================== */

.status-reference {

  background: #f1f7ff;

  border-radius: 13px;

  padding: 17px;

  margin: 22px 0;

}


.status-reference span {

  display: block;

  color: #777;

  font-size: .8rem;

  margin-bottom: 7px;

}


.status-reference strong {

  font-family: monospace;

  color: #003366;

  font-size: 1.7rem;

  letter-spacing: 3px;

}


/* =====================================================
   STATUS
===================================================== */

.status-info {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 12px;

}


.status-info div {

  background: #fafafa;

  border-radius: 12px;

  padding: 15px;

}


.status-info span {

  display: block;

  color: #777;

  font-size: .75rem;

  margin: 5px 0;

}


.status-info strong {

  color: #26384d;

}


/* =====================================================
   WARNING
===================================================== */

.modal-warning {

  display: flex;

  gap: 10px;

  text-align: left;

  background: #fff8e1;

  border-radius: 12px;

  padding: 15px;

  margin: 20px 0;

}


.modal-warning p {

  margin: 0;

  color: #665500;

  font-size: .85rem;

  line-height: 1.5;

}


/* =====================================================
   MODAL BUTTON
===================================================== */

.modal-btn {

  width: 100%;

  border: none;

  background:
    linear-gradient(
      90deg,
      #003366,
      #0055aa
    );

  color: white;

  padding: 15px;

  border-radius: 11px;

  font-weight: 800;

  cursor: pointer;

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media(max-width: 900px) {

  .main-container {

    grid-template-columns: 1fr;

  }

}


@media(max-width: 600px) {

  .header-content {

    align-items: flex-start;

  }


  .header-icon {

    width: 60px;

    height: 60px;

    font-size: 28px;

  }


  .header-content h1 {

    font-size: 1.8rem;

  }


  .form-card,
  .payment-card,
  .steps-card {

    padding: 22px;

  }


  .status-modal {

    padding: 28px 20px;

  }


  .status-info {

    grid-template-columns: 1fr;

  }

}

</style>