<template>

  <div class="referencia-page">

    <!-- =========================================
         ENCABEZADO
    ========================================== -->

    <header class="header">

      <div class="header-content">

        <button
          class="back-button"
          @click="regresar"
          type="button"
        >
          ← Regresar
        </button>

        <div class="header-title">

          <div class="header-icon">
            🏦
          </div>

          <div>

            <span class="header-small">
              CONGRESO ESCALA
            </span>

            <h1>
              Referencia bancaria
            </h1>

            <p>
              Consulta tu referencia bancaria utilizando tu folio.
            </p>

          </div>

        </div>

      </div>

    </header>


    <!-- =========================================
         CONTENIDO
    ========================================== -->

    <main class="main-container">


      <!-- =========================================
           FORMULARIO
      ========================================== -->

      <section
        v-if="!referenciaGenerada"
        class="form-card"
      >

        <!-- ENCABEZADO DEL FORMULARIO -->

        <div class="card-header">

          <div>

            <span class="step">
              CONSULTA DE PAGO
            </span>

            <h2>
              Consulta tu referencia bancaria
            </h2>

            <p>
              Ingresa únicamente el folio que recibiste al registrarte
              en el Congreso ESCALA.
            </p>

          </div>

          <div class="form-number">
            01
          </div>

        </div>


        <!-- =========================================
             INFORMACIÓN
        ========================================== -->

        <div class="info-box">

          <div class="info-icon">
            ℹ️
          </div>

          <div>

            <strong>
              ¿Dónde encuentro mi folio?
            </strong>

            <p>
              El folio es el número que recibiste al completar
              tu registro al Congreso ESCALA.
            </p>

          </div>

        </div>


        <!-- =========================================
             FORMULARIO
        ========================================== -->

        <div class="form-section">

          <h3>
            🔎 Consulta de referencia
          </h3>

          <div class="form-group">

            <label>
              Folio de registro
              <span>*</span>
            </label>

            <input
              v-model="folio"
              type="text"
              placeholder="Ej. ESCALA-2026-0001" 
              maxlength="50"
              autocomplete="off"
              @keyup.enter="buscarReferencia"
            >

            <small>
              Escribe el folio exactamente como aparece en tu registro.
            </small>

          </div>

        </div>


        <!-- =========================================
             INFORMACIÓN DEL PAGO
        ========================================== -->

        <div class="payment-preview">

          <div class="payment-icon">
            💰
          </div>

          <div>

            <span>
              CUOTA DE RECUPERACIÓN
            </span>

            <strong>
              ${{ montoEsperado }} MXN
            </strong>

            <p>
              Al consultar tu folio se mostrará la referencia
              bancaria correspondiente a tu registro.
            </p>

          </div>

        </div>


        <!-- =========================================
             ERROR
        ========================================== -->

        <div
          v-if="error"
          class="error-message"
        >
          ⚠️ {{ error }}
        </div>


        <!-- =========================================
             BOTÓN
        ========================================== -->

        <button
          class="generate-button"
          @click="buscarReferencia"
          :disabled="cargando"
          type="button"
        >

          <span v-if="!cargando">
            Consultar referencia bancaria
          </span>

          <span v-else>
            Buscando...
          </span>

          <span
            v-if="!cargando"
            class="arrow"
          >
            →
          </span>

          <span
            v-else
            class="loading-spinner"
          >
            ⏳
          </span>

        </button>


        <p class="required-text">
          * Campo obligatorio
        </p>

      </section>


      <!-- =========================================
           REFERENCIA ENCONTRADA
      ========================================== -->

      <section
        v-else
        class="reference-section"
      >


        <!-- =========================================
             MENSAJE DE ÉXITO
        ========================================== -->

        <div class="success-message">

          <div class="success-icon">
            ✓
          </div>

          <div>

            <h2>
              ¡Referencia encontrada!
            </h2>

            <p>
              Guarda esta información para realizar tu pago.
            </p>

          </div>

        </div>


        <!-- =========================================
             HOJA DE REFERENCIA
        ========================================== -->

        <div
          id="referencia-imprimir"
          class="reference-paper"
        >


          <!-- =========================================
               ENCABEZADO
          ========================================== -->

          <div class="paper-header">

            <div class="institution-logo">
              ITE
            </div>

            <div class="paper-title">

              <span>
                INSTITUTO TECNOLÓGICO DE ENSENADA
              </span>

              <h1>
                CONGRESO ESCALA
              </h1>

              <p>
                Congreso Internacional de Investigación e Innovación
              </p>

            </div>

          </div>


          <div class="paper-divider"></div>


          <!-- =========================================
               FOLIO
          ========================================== -->

          <div class="folio-box">

            <span>
              FOLIO DE REGISTRO
            </span>

            <strong>
              {{ folio }}
            </strong>

          </div>


          <!-- =========================================
               REFERENCIA BANCARIA
          ========================================== -->

          <div class="reference-title">

            <span>
              REFERENCIA BANCARIA
            </span>

            <strong>
              {{ referencia }}
            </strong>

            <small>
              Referencia para realizar tu pago
            </small>

          </div>


          <!-- =========================================
               DATOS DEL PARTICIPANTE
          ========================================== -->

          <div class="participant-box">

            <h3>
              Datos del participante
            </h3>

            <div class="participant-grid">


              <!-- NOMBRE -->

              <div>

                <span>
                  Nombre completo
                </span>

                <strong>
                  {{ datosParticipante.nombreCompleto || "No disponible" }}
                </strong>

              </div>


              <!-- CONTROL -->

              <div>

                <span>
                  No. de control
                </span>

                <strong>
                  {{ datosParticipante.control || "0" }}
                </strong>

              </div>


              <!-- INSTITUCIÓN -->

              <div>

                <span>
                  Institución
                </span>

                <strong>
                  {{ datosParticipante.institucion || "No disponible" }}
                </strong>

              </div>


              <!-- PARTICIPACIÓN -->

              <div>

                <span>
                  Tipo de participación
                </span>

                <strong>
                  {{ datosParticipante.tipoParticipacion || "No disponible" }}
                </strong>

              </div>


              <!-- CORREO -->

              <div>

                <span>
                  Correo
                </span>

                <strong>
                  {{ datosParticipante.correo || "No disponible" }}
                </strong>

              </div>


              <!-- WHATSAPP -->

              <div>

                <span>
                  WhatsApp
                </span>

                <strong>
                  {{ datosParticipante.whatsapp || "No disponible" }}
                </strong>

              </div>

            </div>

          </div>


          <!-- =========================================
               INFORMACIÓN DE PAGO
          ========================================== -->

          <div class="payment-box">

            <div class="payment-header">

              <h3>
                Información para realizar el pago
              </h3>

              <div class="amount">
                ${{ montoEsperado }} MXN
              </div>

            </div>


            <div class="bank-data">


              <!-- BANCO -->

              <div>

                <span>
                  Banco
                </span>

                <strong>
                  Scotiabank
                </strong>

              </div>


              <!-- TITULAR -->

              <div>

                <span>
                  Titular
                </span>

                <strong>
                  Academia Estatal de Ciencias Económico Administrativas
                </strong>

              </div>


              <!-- CUENTA -->

              <div>

                <span>
                  Cuenta
                </span>

                <strong>
                  13003338223
                </strong>

              </div>


              <!-- CLABE -->

              <div>

                <span>
                  CLABE Interbancaria
                </span>

                <strong>
                  044028130033382234
                </strong>

              </div>


              <!-- REFERENCIA -->

              <div class="bank-reference">

                <span>
                  REFERENCIA
                </span>

                <strong>
                  {{ referencia }}
                </strong>

              </div>

            </div>

          </div>


          <!-- =========================================
               INSTRUCCIONES
          ========================================== -->

          <div class="instructions">

            <h3>
              Instrucciones
            </h3>

            <ol>

              <li>
                Realiza el depósito o transferencia por
                <strong>${{ montoEsperado }} MXN</strong>.
              </li>

              <li>
                Utiliza exactamente la
                <strong>referencia bancaria</strong>
                indicada en este documento.
              </li>

              <li>
                Conserva tu comprobante de pago.
              </li>

              <li>
                Envía tu comprobante para confirmar tu registro.
              </li>

            </ol>

          </div>


          <!-- =========================================
               SITIO
          ========================================== -->

          <div class="website-box">

            <span>
              Sitio oficial
            </span>

            <strong>
              https://sites.google.com/ite.edu.mx/congresoescala-mx
            </strong>

          </div>


          <!-- =========================================
               FOOTER
          ========================================== -->

          <div class="paper-footer">

            <p>
              Este documento corresponde a una referencia
              de pago para el Congreso ESCALA.
            </p>

            <span>
              Año {{ anio }}
            </span>

          </div>

        </div>


        <!-- =========================================
             BOTONES
        ========================================== -->

        <div class="reference-actions">

          <button
            class="print-button"
            @click="imprimirReferencia"
            type="button"
          >
            🖨️ Imprimir referencia
          </button>

          <button
            class="back-form-button"
            @click="volverFormulario"
            type="button"
          >
            ← Consultar otro folio
          </button>

        </div>


        <!-- =========================================
             AVISO FINAL
        ========================================== -->

        <div class="final-notice">

          <div class="notice-icon">
            📤
          </div>

          <div>

            <h3>
              Después de realizar tu pago
            </h3>

            <p>
              Deberás enviar tu comprobante de pago para
              confirmar tu registro al Congreso ESCALA.
            </p>

            <a
              href="https://sites.google.com/ite.edu.mx/congresoescala-mx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ir al sitio de ESCALA →
            </a>

          </div>

        </div>

      </section>

    </main>

  </div>

</template>


<script setup>

import {
  
  reactive,
  ref
} from "vue";

import {
  useRouter
} from "vue-router";

import {
  API_URL
} from "../../config/api";

import {
  onMounted,
  reactive,
  ref
} from "vue";


// ============================================
// ROUTER
// ============================================

const router = useRouter();


// ============================================
// VARIABLES
// ============================================

const referenciaGenerada = ref(false);

const referencia = ref("");

const folio = ref("");

const error = ref("");

const cargando = ref(false);

const montoEsperado = ref(0);

// ============================================
// AÑO
// ============================================

const anio = new Date().getFullYear();


// ============================================
// DATOS DEL PARTICIPANTE
// ============================================

const datosParticipante = reactive({

  nombreCompleto: "",

  control: "",

  institucion: "",

  tipoParticipacion: "",

  correo: "",

  whatsapp: ""

});

//
// CARGAR COSTO
//
onMounted(async () => {

  try {

    const response = await fetch(`${API_URL}/eventos/4`);

    if (response.ok) {
      const data = await response.json();
      montoEsperado.value = data.costoNumero ?? 0;
    }

  } catch (e) {
    console.error("Error al cargar el evento:", e);
  }

});

// ============================================
// BUSCAR REFERENCIA POR FOLIO
// ============================================

async function buscarReferencia() {

  // Evitar múltiples peticiones

  if (cargando.value) {
    return;
  }


  // Validar folio

  if (!folio.value.trim()) {

    error.value =
      "Escribe tu folio de registro.";

    return;

  }


  cargando.value = true;

  error.value = "";


  try {

    // ========================================
    // LIMPIAR FOLIO
    // ========================================

    const folioLimpio =
      folio.value.trim();


    // ========================================
    // CREAR PARÁMETROS
    // ========================================

    const params = new URLSearchParams({

      folio: folioLimpio

    });


    // ========================================
    // CONSULTAR BACKEND
    // ========================================

    const response = await fetch(

      `${API_URL}/eventos/4/inscripciones/buscar?${params}`

    );


    // ========================================
    // ERROR DEL BACKEND
    // ========================================

    if (!response.ok) {

      let errorData = {};

      try {

        errorData =
          await response.json();

      } catch {

        errorData = {};

      }


      throw new Error(

        errorData.message ||

        "No se encontró una inscripción con ese folio. Verifica que el folio sea correcto."

      );

    }


    // ========================================
    // RESPUESTA
    // ========================================

    const data =
      await response.json();


    console.log(
      "Respuesta del backend:",
      data
    );


    // ========================================
    // VALIDAR REFERENCIA
    // ========================================

    if (!data.referencia_bancaria) {

      throw new Error(
        "El registro encontrado no tiene una referencia bancaria asociada."
      );

    }


    // ========================================
    // GUARDAR REFERENCIA
    // ========================================

    referencia.value =
      String(
        data.referencia_bancaria
      ).trim();


    // ========================================
    // GUARDAR DATOS
    // ========================================

    datosParticipante.nombreCompleto =
      data.nombre_completo ||
      data.nombreCompleto ||
      "";


    datosParticipante.control =
      data.control ||
      "0";


    datosParticipante.institucion =
      data.institucion ||
      "";


    datosParticipante.tipoParticipacion =
      data.tipo_participacion ||
      data.tipoParticipacion ||
      "";


    datosParticipante.correo =
      data.correo ||
      "";


    datosParticipante.whatsapp =
      data.whatsapp ||
      "";


    // ========================================
    // MOSTRAR RESULTADO
    // ========================================

    referenciaGenerada.value = true;


    // ========================================
    // SUBIR AL INICIO
    // ========================================

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });


  } catch (e) {

    console.error(
      "Error al buscar referencia:",
      e
    );


    error.value =
      e.message ||
      "No se pudo consultar la referencia. Intenta nuevamente.";

  } finally {

    cargando.value = false;

  }

}


// ============================================
// IMPRIMIR
// ============================================

function imprimirReferencia() {

  window.print();

}


// ============================================
// VOLVER AL FORMULARIO
// ============================================

function volverFormulario() {

  referenciaGenerada.value = false;

  referencia.value = "";

  error.value = "";

  folio.value = "";


  datosParticipante.nombreCompleto = "";

  datosParticipante.control = "";

  datosParticipante.institucion = "";

  datosParticipante.tipoParticipacion = "";

  datosParticipante.correo = "";

  datosParticipante.whatsapp = "";


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


// ============================================
// REGRESAR
// ============================================

function regresar() {

  router.back();

}

</script>


<style scoped>

/* ============================================
   RESET
============================================ */

* {
  box-sizing: border-box;
}


/* ============================================
   PÁGINA
============================================ */

.referencia-page {

  min-height: 100vh;

  background: #f3f6fb;

  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

  color: #1f2937;

}


/* ============================================
   HEADER
============================================ */

.header {

  background:
    linear-gradient(
      135deg,
      #002b5c,
      #0055a5
    );

  color: white;

  padding: 28px 30px;

  box-shadow:
    0 8px 25px rgba(0, 0, 0, .15);

}


.header-content {

  max-width: 1100px;

  margin: auto;

}


.back-button {

  border: none;

  background:
    rgba(255,255,255,.15);

  color: white;

  padding: 10px 18px;

  border-radius: 10px;

  cursor: pointer;

  font-size: .95rem;

  margin-bottom: 25px;

  transition: .3s;

}


.back-button:hover {

  background:
    rgba(255,255,255,.25);

  transform:
    translateX(-3px);

}


.header-title {

  display: flex;

  align-items: center;

  gap: 20px;

}


.header-icon {

  width: 65px;

  height: 65px;

  border-radius: 18px;

  background: white;

  color: #003366;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 30px;

}


.header-small {

  display: block;

  font-size: .8rem;

  letter-spacing: 2px;

  opacity: .8;

  margin-bottom: 5px;

}


.header h1 {

  margin: 0;

  font-size: 2rem;

}


.header p {

  margin-top: 7px;

  opacity: .9;

}


/* ============================================
   CONTENEDOR
============================================ */

.main-container {

  max-width: 1050px;

  margin: 40px auto;

  padding: 0 20px 60px;

}


/* ============================================
   FORM CARD
============================================ */

.form-card {

  background: white;

  border-radius: 20px;

  padding: 40px;

  box-shadow:
    0 15px 40px rgba(0,0,0,.08);

}


/* ============================================
   CARD HEADER
============================================ */

.card-header {

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  border-bottom: 1px solid #e5e7eb;

  padding-bottom: 30px;

  margin-bottom: 30px;

}


.step {

  color: #0055a5;

  font-size: .75rem;

  font-weight: 800;

  letter-spacing: 1.5px;

}


.card-header h2 {

  color: #003366;

  font-size: 1.8rem;

  margin: 8px 0;

}


.card-header p {

  color: #6b7280;

  margin: 0;

}


.form-number {

  font-size: 3rem;

  font-weight: 900;

  color: #e5edf7;

}


/* ============================================
   INFO BOX
============================================ */

.info-box {

  display: flex;

  align-items: flex-start;

  gap: 15px;

  background: #f0f7ff;

  border: 1px solid #cfe4fa;

  border-radius: 14px;

  padding: 20px;

  margin-bottom: 30px;

}


.info-icon {

  font-size: 24px;

}


.info-box strong {

  display: block;

  color: #003366;

  margin-bottom: 5px;

}


.info-box p {

  margin: 0;

  color: #6b7280;

  font-size: .9rem;

  line-height: 1.5;

}


/* ============================================
   FORM SECTION
============================================ */

.form-section {

  margin-bottom: 30px;

}



.form-section h3 {

  color: #003366;

  font-size: 1.1rem;

  margin-bottom: 20px;

  padding-bottom: 10px;

  border-bottom: 2px solid #eef3f9;

}


/* ============================================
   FORM GROUP
============================================ */
.form-group {

  display: flex;

  flex-direction: column;
}


.form-group label {

  font-size: .9rem;

  font-weight: 700;

  color: #374151;

  margin-bottom: 8px;

}


.form-group label span {

  color: #dc2626;

}


.form-group input {

  width: 100%;

  padding: 16px;

  border: 1px solid #d1d5db;

  border-radius: 10px;

  background: white;

  color: #1f2937;

  font-size: 1rem;

  outline: none;

  transition: .2s;

}


.form-group input:focus {

  border-color: #0055a5;

  box-shadow:
    0 0 0 3px rgba(0,85,165,.1);

}


.form-group small {

  color: #6b7280;

  font-size: .78rem;

  margin-top: 7px;

}


/* ============================================
   PAYMENT PREVIEW
============================================ */

.payment-preview {

  display: flex;

  align-items: center;

  gap: 18px;

  background: #f0f7ff;

  border: 1px solid #cfe4fa;

  border-radius: 15px;

  padding: 22px;

  margin: 30px 0;

}


.payment-icon {

  width: 55px;

  height: 55px;

  border-radius: 14px;

  background: #0055a5;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 25px;

}


.payment-preview span {

  display: block;

  color: #6b7280;

  font-size: .75rem;

  font-weight: 700;

  letter-spacing: 1px;

}


.payment-preview strong {

  display: block;

  color: #003366;

  font-size: 1.7rem;

  margin: 3px 0;

}


.payment-preview p {

  margin: 0;

  color: #6b7280;

  font-size: .85rem;

}


/* ============================================
   ERROR
============================================ */

.error-message {

  background: #fff1f2;

  border: 1px solid #fecdd3;

  color: #be123c;

  padding: 14px 16px;

  border-radius: 10px;

  margin-bottom: 20px;

  font-size: .9rem;

}


/* ============================================
   BUTTON
============================================ */

.generate-button {

  width: 100%;

  border: none;

  background:
    linear-gradient(
      90deg,
      #003366,
      #0055a5
    );

  color: white;

  padding: 17px;

  border-radius: 12px;

  font-size: 1rem;

  font-weight: 800;

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 15px;

  transition: .3s;

}


.generate-button:hover:not(:disabled) {

  transform: translateY(-2px);

  box-shadow:
    0 12px 25px rgba(0,85,165,.3);

}


.generate-button:disabled {

  opacity: .7;

  cursor: not-allowed;

}


.arrow {

  font-size: 1.3rem;

}


.loading-spinner {

  font-size: 1.1rem;

}


.required-text {

  text-align: center;

  color: #9ca3af;

  font-size: .75rem;

  margin-top: 15px;

}


/* ============================================
   SUCCESS
============================================ */

.success-message {

  display: flex;

  align-items: center;

  gap: 18px;

  background: #ecfdf5;

  border: 1px solid #a7f3d0;

  padding: 20px;

  border-radius: 15px;

  margin-bottom: 25px;

}


.success-icon {

  width: 50px;

  height: 50px;

  border-radius: 50%;

  background: #16a34a;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 25px;

  font-weight: bold;

}


.success-message h2 {

  color: #166534;

  margin: 0 0 5px;

  font-size: 1.2rem;

}


.success-message p {

  margin: 0;

  color: #4b5563;

}


/* ============================================
   REFERENCE PAPER
============================================ */

.reference-paper {

  background: white;

  border-radius: 5px;

  padding: 45px;

  box-shadow:
    0 15px 45px rgba(0,0,0,.12);

}


/* ============================================
   PAPER HEADER
============================================ */

.paper-header {

  display: flex;

  align-items: center;

  gap: 22px;

}


.institution-logo {

  width: 75px;

  height: 75px;

  background: #003366;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 900;

  font-size: 1.4rem;

  border-radius: 12px;

}


.paper-title span {

  font-size: .75rem;

  color: #6b7280;

  font-weight: 700;

  letter-spacing: 1px;

}


.paper-title h1 {

  margin: 5px 0;

  color: #003366;

  font-size: 1.7rem;

}


.paper-title p {

  margin: 0;

  color: #6b7280;

  font-size: .85rem;

}


.paper-divider {

  height: 3px;

  background: #003366;

  margin: 25px 0;

}


/* ============================================
   FOLIO
============================================ */

.folio-box {

  text-align: center;

  background: #fafafa;

  border: 1px solid #e5e7eb;

  border-radius: 12px;

  padding: 18px;

  margin-bottom: 20px;

}


.folio-box span {

  display: block;

  color: #6b7280;

  font-size: .75rem;

  font-weight: 800;

  letter-spacing: 2px;

}


.folio-box strong {

  display: block;

  color: #003366;

  font-size: 1.5rem;

  margin-top: 6px;

  letter-spacing: 2px;

}


/* ============================================
   REFERENCE
============================================ */

.reference-title {

  text-align: center;

  background: #f0f7ff;

  border: 2px solid #cfe4fa;

  border-radius: 15px;

  padding: 25px;

  margin-bottom: 25px;

}


.reference-title span {

  display: block;

  color: #6b7280;

  font-size: .75rem;

  font-weight: 800;

  letter-spacing: 2px;

}


.reference-title strong {

  display: block;

  color: #003366;

  font-size: 2.5rem;

  letter-spacing: 5px;

  margin: 8px 0;

}


.reference-title small {

  color: #6b7280;

}


/* ============================================
   PARTICIPANT
============================================ */

.participant-box {

  border: 1px solid #e5e7eb;

  border-radius: 12px;

  padding: 25px;

  margin-bottom: 25px;

}


.participant-box h3 {

  color: #003366;

  margin-top: 0;

  margin-bottom: 20px;

}


.participant-grid {

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 20px;

}


.participant-grid div {

  display: flex;

  flex-direction: column;

  gap: 5px;

}


.participant-grid span,

.bank-data span {

  color: #6b7280;

  font-size: .75rem;

  font-weight: 700;

  text-transform: uppercase;

}


.participant-grid strong,

.bank-data strong {

  color: #1f2937;

  font-size: .9rem;

  word-break: break-word;

}


/* ============================================
   PAYMENT BOX
============================================ */

.payment-box {

  border-radius: 14px;

  overflow: hidden;

  margin-bottom: 25px;

  border: 1px solid #dbe5ef;

}


.payment-header {

  background: #003366;

  color: white;

  padding: 20px 25px;

  display: flex;

  justify-content: space-between;

  align-items: center;

}


.payment-header h3 {

  color: white;

  margin: 0;

}


.amount {

  font-size: 1.5rem;

  font-weight: 900;

}


.bank-data {

  padding: 25px;

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 20px;

}


.bank-data div {

  display: flex;

  flex-direction: column;

  gap: 5px;

}


.bank-reference {

  grid-column: 1 / -1;

  background: #f0f7ff;

  border-radius: 10px;

  padding: 15px;

}


.bank-reference strong {

  font-size: 1.4rem;

  color: #003366;

  letter-spacing: 3px;

}


/* ============================================
   INSTRUCTIONS
============================================ */

.instructions {

  background: #fafafa;

  border-radius: 12px;

  padding: 25px;

  margin-bottom: 25px;

}


.instructions h3 {

  color: #003366;

  margin-top: 0;

  margin-bottom: 20px;

}


.instructions ol {

  margin: 0;

  padding-left: 20px;

}


.instructions li {

  color: #4b5563;

  margin-bottom: 10px;

  line-height: 1.6;

}


/* ============================================
   WEBSITE
============================================ */

.website-box {

  background: #eef3fb;

  border-radius: 10px;

  padding: 18px;

  text-align: center;

}


.website-box span {

  display: block;

  color: #6b7280;

  font-size: .75rem;

  margin-bottom: 5px;

}


.website-box strong {

  color: #003366;

  font-size: .85rem;

  word-break: break-all;

}


/* ============================================
   FOOTER
============================================ */

.paper-footer {

  display: flex;

  justify-content: space-between;

  gap: 20px;

  margin-top: 25px;

  padding-top: 15px;

  border-top: 1px solid #ddd;

  color: #9ca3af;

  font-size: .75rem;

}


/* ============================================
   ACTIONS
============================================ */

.reference-actions {

  display: flex;

  gap: 15px;

  margin-top: 25px;

}


.print-button,

.back-form-button {

  flex: 1;

  border: none;

  padding: 16px;

  border-radius: 12px;

  font-weight: 800;

  cursor: pointer;

  font-size: .95rem;

}


.print-button {

  background: #003366;

  color: white;

}


.print-button:hover {

  background: #0055a5;

}


.back-form-button {

  background: white;

  color: #003366;

  border: 1px solid #d1d5db;

}


.back-form-button:hover {

  background: #f3f6fb;

}


/* ============================================
   FINAL NOTICE
============================================ */

.final-notice {

  display: flex;

  gap: 18px;

  background: white;

  border-radius: 15px;

  padding: 25px;

  margin-top: 25px;

  box-shadow:
    0 8px 25px rgba(0,0,0,.06);

}


.notice-icon {

  font-size: 30px;

}


.final-notice h3 {

  margin: 0 0 7px;

  color: #003366;

}


.final-notice p {

  margin: 0 0 10px;

  color: #6b7280;

}


.final-notice a {

  color: #0055a5;

  font-weight: 700;

  text-decoration: none;

}


/* ============================================
   RESPONSIVE
============================================ */

@media(max-width: 768px) {

  .header {

    padding: 22px 18px;

  }


  .header-title {

    align-items: flex-start;

  }


  .header-icon {

    width: 50px;

    height: 50px;

    font-size: 23px;

  }


  .header h1 {

    font-size: 1.5rem;

  }


  .main-container {

    margin-top: 25px;

    padding: 0 12px 40px;

  }


  .form-card {

    padding: 25px 18px;

  }





  .form-number {

    display: none;

  }


  .payment-preview {

    align-items: flex-start;

  }


  .reference-paper {

    padding: 25px 18px;

  }


  .paper-header {

    align-items: flex-start;

  }


  .institution-logo {

    width: 55px;

    height: 55px;

    font-size: 1rem;

  }


  .paper-title h1 {

    font-size: 1.25rem;

  }


  .reference-title strong {

    font-size: 1.8rem;

    letter-spacing: 3px;

  }


  .participant-grid,
  
  .bank-data {

    grid-template-columns: 1fr;

  }


  .bank-reference {

    grid-column: auto;

  }


  .payment-header {

    align-items: flex-start;

    flex-direction: column;

    gap: 10px;

  }


  .reference-actions {

    flex-direction: column;

  }


  .paper-footer {

    flex-direction: column;

  }

}


/* ============================================
   IMPRESIÓN
============================================ */

@media print {

  body {

    background: white !important;

  }


  .header,
  
  .success-message,
  
  .reference-actions,
  
  .final-notice {

    display: none !important;

  }


  .main-container {

    margin: 0;

    padding: 0;

    max-width: none;

  }


  .reference-section {

    width: 100%;

  }


  .reference-paper {

    box-shadow: none;

    border-radius: 0;

    padding: 20px;

    width: 100%;

  }


 
  .participant-box,
 
  .payment-box,
 
  .instructions,
  .reference-title,
  .folio-box {

    break-inside: avoid;

  }

}

</style>