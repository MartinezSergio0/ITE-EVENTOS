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
              Completa tus datos para generar tu referencia de pago.
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

      <section
        v-if="!referenciaGenerada"
        class="form-card"
      >

        <div class="card-header">

          <div>

            <span class="step">
              PASO 1 DE 2
            </span>

            <h2>
              Datos del participante
            </h2>

            <p>
              Ingresa tus datos correctamente para generar tu referencia bancaria.
            </p>

          </div>

          <div class="form-number">
            01
          </div>

        </div>


        <!-- =====================================
             INFORMACIÓN PERSONAL
        ====================================== -->

        <div class="form-section">

          <h3>
            👤 Información personal
          </h3>

          <div class="form-grid">


            <!-- PRIMER APELLIDO -->

            <div class="form-group">

              <label>
                Primer apellido
                <span>*</span>
              </label>

              <input
                v-model="form.primerApellido"
                type="text"
                placeholder="Ej. García"
                maxlength="50"
                autocomplete="family-name"
              >

            </div>


            <!-- SEGUNDO APELLIDO -->

            <div class="form-group">

              <label>
                Segundo apellido
              </label>

              <input
                v-model="form.segundoApellido"
                type="text"
                placeholder="Ej. López"
                maxlength="50"
                autocomplete="additional-name"
              >

            </div>


            <!-- NOMBRES -->

            <div class="form-group full">

              <label>
                Nombre(s)
                <span>*</span>
              </label>

              <input
                v-model="form.nombres"
                type="text"
                placeholder="Ej. María Fernanda"
                maxlength="80"
                autocomplete="given-name"
              >

            </div>


            <!-- EDAD -->

            <div class="form-group">

              <label>
                Edad
                <span>*</span>
              </label>

              <input
                v-model.number="form.edad"
                type="number"
                min="1"
                max="100"
                step="1"
                placeholder="Ej. 22"
              >

              <small>
                Escribe tu edad actual.
              </small>

            </div>


            <!-- SEXO -->

            <div class="form-group">

              <label>
                Sexo biológico
                <span>*</span>
              </label>

              <select v-model="form.sexo">

                <option value="">
                  Selecciona una opción
                </option>

                <option value="Femenino">
                  Femenino
                </option>

                <option value="Masculino">
                  Masculino
                </option>

              </select>

            </div>

          </div>

        </div>


        <!-- =====================================
             DATOS ACADÉMICOS
        ====================================== -->

        <div class="form-section">

          <h3>
            🎓 Información académica
          </h3>

          <div class="form-grid">


            <!-- CONTROL -->

            <div class="form-group">

              <label>
                No. de control
              </label>

              <input
                v-model="form.control"
                type="text"
                placeholder="Ej. 22760001"
                maxlength="30"
              >

              <small>
                Si no tienes número de control, escribe 0.
              </small>

            </div>


            <!-- TIPO DE PARTICIPACIÓN -->

            <div class="form-group">

              <label>
                Tipo de participación
                <span>*</span>
              </label>

              <select
                v-model="form.tipoParticipacion"
                required
              >

                <option value="">
                  Selecciona una opción
                </option>

                <option value="Participante general">
                  Participante general
                </option>

                <option value="Estudiante">
                  Estudiante
                </option>

                <option value="Docente">
                  Docente
                </option>

              </select>

            </div>


            <!-- INSTITUCIÓN -->

            <div class="form-group full">

              <label>
                Institución de procedencia
                <span>*</span>
              </label>

              <select
                v-model="form.institucion"
                required
              >

                <option value="">
                  Selecciona una institución
                </option>

                <option value="TecNM, Ensenada">
                  TecNM, Ensenada
                </option>

                <option value="TecNM, Tijuana">
                  TecNM, Tijuana
                </option>

                <option value="TecNM, Mexicali">
                  TecNM, Mexicali
                </option>

                <option value="UABC">
                  UABC
                </option>

                <option value="Otro">
                  Otro
                </option>

              </select>

            </div>

          </div>

        </div>


        <!-- =====================================
             CONTACTO
        ====================================== -->

        <div class="form-section">

          <h3>
            📱 Información de contacto
          </h3>

          <div class="form-grid">


            <!-- CORREO -->

            <div class="form-group">

              <label>
                Correo electrónico institucional
                <span>*</span>
              </label>

              <input
                v-model="form.correo"
                type="email"
                placeholder="ejemplo@instituto.edu.mx"
                maxlength="120"
                autocomplete="email"
              >

            </div>


            <!-- WHATSAPP -->

            <div class="form-group">

              <label>
                WhatsApp
                <span>*</span>
              </label>

              <input
                v-model="form.whatsapp"
                type="tel"
                placeholder="6461234567"
                maxlength="15"
                autocomplete="tel"
              >

            </div>

          </div>

        </div>


        <!-- =====================================
             INFORMACIÓN DEL PAGO
        ====================================== -->

        <div class="payment-preview">

          <div class="payment-icon">
            💰
          </div>

          <div>

            <span>
              CUOTA DE RECUPERACIÓN
            </span>

            <strong>
              $1,000 MXN
            </strong>

            <p>
              Al finalizar el formulario se generará tu referencia bancaria.
            </p>

          </div>

        </div>


        <!-- =====================================
             ERROR
        ====================================== -->

        <div
          v-if="error"
          class="error-message"
        >
          ⚠️ {{ error }}
        </div>


        <!-- =====================================
             BOTÓN GENERAR
        ====================================== -->

        <button
          class="generate-button"
          @click="buscarReferencia "
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
          * Campos obligatorios
        </p>

      </section>


      <!-- =====================================
           REFERENCIA GENERADA
      ====================================== -->

      <section
        v-else
        class="reference-section"
      >


        <!-- MENSAJE DE ÉXITO -->

        <div class="success-message">

          <div class="success-icon">
            ✓
          </div>

          <div>

            <h2>
              ¡Referencia Encontrada!
            </h2>

            <p>
              Guarda esta información para realizar tu pago.
            </p>

          </div>

        </div>


        <!-- =====================================
             HOJA DE REFERENCIA
        ====================================== -->

        <div
          id="referencia-imprimir"
          class="reference-paper"
        >


          <!-- ENCABEZADO -->

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


          <!-- =====================================
               REFERENCIA BANCARIA
          ====================================== -->

          <div class="reference-title">

            <span>
              REFERENCIA BANCARIA
            </span>

            <strong>
              {{ referencia }}
            </strong>

            <small>
              10 dígitos
            </small>

          </div>


          <!-- =====================================
               DATOS DEL PARTICIPANTE
          ====================================== -->

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
                  {{ nombreCompleto }}
                </strong>

              </div>


              <!-- CONTROL -->

              <div>

                <span>
                  No. de control
                </span>

                <strong>
                  {{ form.control || "0" }}
                </strong>

              </div>


              <!-- EDAD -->

              <div>

                <span>
                  Edad
                </span>

                <strong>
                  {{ form.edad }} años
                </strong>

              </div>


              <!-- INSTITUCIÓN -->

              <div>

                <span>
                  Institución
                </span>

                <strong>
                  {{ form.institucion }}
                </strong>

              </div>


              <!-- PARTICIPACIÓN -->

              <div>

                <span>
                  Tipo de participación
                </span>

                <strong>
                  {{ form.tipoParticipacion }}
                </strong>

              </div>


              <!-- CORREO -->

              <div>

                <span>
                  Correo
                </span>

                <strong>
                  {{ form.correo }}
                </strong>

              </div>


              <!-- WHATSAPP -->

              <div>

                <span>
                  WhatsApp
                </span>

                <strong>
                  {{ form.whatsapp }}
                </strong>

              </div>

            </div>

          </div>


          <!-- =====================================
               INFORMACIÓN DE PAGO
          ====================================== -->

          <div class="payment-box">

            <div class="payment-header">

              <h3>
                Información para realizar el pago
              </h3>

              <div class="amount">
                $1,000 MXN
              </div>

            </div>


            <div class="bank-data">


              <div>

                <span>
                  Banco
                </span>

                <strong>
                  Scotiabank
                </strong>

              </div>


              <div>

                <span>
                  Titular
                </span>

                <strong>
                  Academia Estatal de Ciencias Económico Administrativas
                </strong>

              </div>


              <div>

                <span>
                  Cuenta
                </span>

                <strong>
                  13003338223
                </strong>

              </div>


              <div>

                <span>
                  CLABE Interbancaria
                </span>

                <strong>
                  044028130033382234
                </strong>

              </div>


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


          <!-- =====================================
               INSTRUCCIONES
          ====================================== -->

          <div class="instructions">

            <h3>
              Instrucciones
            </h3>

            <ol>

              <li>
                Realiza el depósito o transferencia por
                <strong>$1,000 MXN</strong>.
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


          <!-- =====================================
               SITIO
          ====================================== -->

          <div class="website-box">

            <span>
              Sitio oficial
            </span>

            <strong>
              https://sites.google.com/ite.edu.mx/congresoescala-mx
            </strong>

          </div>


          <!-- =====================================
               FOOTER
          ====================================== -->

          <div class="paper-footer">

            <p>
              Este documento corresponde a una referencia de pago
              para el Congreso ESCALA.
            </p>

            <span>
              Año {{ anio }}
            </span>

          </div>

        </div>


        <!-- =====================================
             BOTONES
        ====================================== -->

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
            ← Modificar datos
          </button>

        </div>


        <!-- =====================================
             AVISO FINAL
        ====================================== -->

        <div class="final-notice">

          <div class="notice-icon">
            📤
          </div>

          <div>

            <h3>
              Después de realizar tu pago
            </h3>

            <p>
              Deberás enviar tu comprobante de pago para confirmar
              tu registro al Congreso ESCALA.
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
  computed,
  reactive,
  ref
} from "vue";

import {
  useRouter
} from "vue-router";

import { API_URL } from "../../config/api";


// ============================================
// ROUTER
// ============================================

const router = useRouter();


// ============================================
// VARIABLES
// ============================================

const referenciaGenerada = ref(false);

const referencia = ref("");

const error = ref("");

const cargando = ref(false);


// ============================================
// AÑO
// ============================================

const anio = new Date().getFullYear();


// ============================================
// FORMULARIO
// ============================================

const form = reactive({

  primerApellido: "",

  segundoApellido: "",

  nombres: "",

  edad: "",

  sexo: "",

  control: "",

  correo: "",

  whatsapp: "",

  institucion: "",

  tipoParticipacion: ""

});


// ============================================
// NOMBRE COMPLETO
// ============================================

const nombreCompleto = computed(() => {

  return [

    form.nombres,

    form.primerApellido,

    form.segundoApellido

  ]

    .filter(Boolean)

    .join(" ");

});


// ============================================
// VALIDAR FORMULARIO
// ============================================

function validarFormulario() {

  // Primer apellido

  if (!form.primerApellido.trim()) {

    error.value =
      "Escribe tu primer apellido.";

    return false;

  }


  // Nombre

  if (!form.nombres.trim()) {

    error.value =
      "Escribe tu nombre.";

    return false;

  }


  // Edad

  if (
    form.edad === "" ||
    form.edad === null ||
    form.edad === undefined
  ) {

    error.value =
      "Escribe tu edad.";

    return false;

  }


  const edad = Number(form.edad);


  if (!Number.isInteger(edad)) {

    error.value =
      "La edad debe ser un número entero.";

    return false;

  }


  if (edad < 1 || edad > 100) {

    error.value =
      "La edad debe estar entre 1 y 100 años.";

    return false;

  }


  // Sexo

  if (!form.sexo) {

    error.value =
      "Selecciona tu sexo biológico.";

    return false;

  }


  // Número de control

  if (!form.control.trim()) {

    form.control = "0";

  }


  // Correo

  if (!form.correo.trim()) {

    error.value =
      "Escribe tu correo electrónico institucional.";

    return false;

  }


  // Validación básica de correo

  const correoValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!correoValido.test(form.correo.trim())) {

    error.value =
      "Escribe un correo electrónico válido.";

    return false;

  }


  // WhatsApp

  if (!form.whatsapp.trim()) {

    error.value =
      "Escribe tu número de WhatsApp.";

    return false;

  }


  // Institución

  if (!form.institucion) {

    error.value =
      "Selecciona una institución de procedencia.";

    return false;

  }


  // Tipo de participación

  if (!form.tipoParticipacion) {

    error.value =
      "Selecciona el tipo de participación.";

    return false;

  }


  error.value = "";

  return true;

}


// ============================================
// GENERAR REFERENCIA
// ============================================

async function buscarReferencia() {

  if (cargando.value) {
    return;
  }

  if (!validarFormulario()) {
    return;
  }

  cargando.value = true;
  error.value = "";

  try {

    const params = new URLSearchParams({
      correo: form.correo.trim(),
      control: form.control.trim() || "0",
    });

    const response = await fetch(
      `${API_URL}/eventos/4/inscripciones/buscar?${params}`
    );

    if (!response.ok) {

      let errorData = {};

      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      }

      throw new Error(
        errorData.message ||
        "No se encontró un registro con esos datos. Verifica tu correo y número de control, o regístrate primero."
      );

    }

    const data = await response.json();

    if (!data.referencia_bancaria) {
      throw new Error("Tu registro no tiene una referencia bancaria asociada.");
    }

    referencia.value = String(data.referencia_bancaria).trim();
    referenciaGenerada.value = true;

    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (e) {

    console.error("Error al buscar referencia:", e);

    error.value = e.message || "No se pudo consultar la referencia. Intenta de nuevo.";

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

  error.value = "";

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

  background: rgba(255,255,255,.15);

  color: white;

  padding: 10px 18px;

  border-radius: 10px;

  cursor: pointer;

  font-size: .95rem;

  margin-bottom: 25px;

  transition: .3s;

}


.back-button:hover {

  background: rgba(255,255,255,.25);

  transform: translateX(-3px);

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
   FORM SECTIONS
============================================ */

.form-section {

  margin-bottom: 35px;

}


.form-section h3 {

  color: #003366;

  font-size: 1.1rem;

  margin-bottom: 20px;

  padding-bottom: 10px;

  border-bottom: 2px solid #eef3f9;

}


/* ============================================
   GRID
============================================ */

.form-grid {

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 22px;

}


.form-group {

  display: flex;

  flex-direction: column;

}


.form-group.full {

  grid-column: 1 / -1;

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


.form-group input,

.form-group select {

  width: 100%;

  padding: 14px 15px;

  border: 1px solid #d1d5db;

  border-radius: 10px;

  background: white;

  color: #1f2937;

  font-size: .95rem;

  outline: none;

  transition: .2s;

}


.form-group input:focus,

.form-group select:focus {

  border-color: #0055a5;

  box-shadow:
    0 0 0 3px rgba(0,85,165,.1);

}


.form-group small {

  color: #6b7280;

  font-size: .78rem;

  margin-top: 6px;

}


/* ============================================
   PAGO PREVIEW
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
   GENERATE BUTTON
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


.participant-box h3,

.payment-box h3,

.instructions h3 {

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


  .form-grid {

    grid-template-columns: 1fr;

  }


  .form-group.full {

    grid-column: auto;

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

  .reference-title {

    break-inside: avoid;

  }

}

</style>