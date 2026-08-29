<template>

  <div class="estado-page">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <header class="page-header">

      <div class="header-container">

        <router-link
          to="/"
          class="back-btn"
        >
          ← Regresar al inicio
        </router-link>

        <div class="header-content">

          <div class="header-icon">
            🔎
          </div>

          <div>

            <span class="header-badge">
              CONGRESO ESCALA
            </span>

            <h1>
              Consulta el estado de tu pago
            </h1>

            <p>
              Ingresa tu folio para consultar el estado de tu comprobante.
            </p>

          </div>

        </div>

      </div>

    </header>


    <!-- =====================================================
         CONTENIDO
    ====================================================== -->

    <main class="main-container">


      <!-- ===================================================
           TARJETA PRINCIPAL
      ==================================================== -->

      <section class="status-card">


        <!-- =================================================
             BUSCADOR
        ================================================== -->

        <div
          v-if="!resultado"
          class="search-section"
        >

          <div class="search-icon">
            🔎
          </div>

          <h2>
            Consulta tu pago
          </h2>

          <p>
            Ingresa el folio o referencia bancaria que recibiste
            al enviar tu comprobante de pago.
          </p>


          <form
            @submit.prevent="consultarPago"
            class="search-form"
          >

            <div class="form-group">

              <label>
                Folio / Referencia bancaria
                <span>*</span>
              </label>

              <input
                v-model="folio"
                type="text"
                maxlength="10"
                inputmode="numeric"
                placeholder="Ej. 2612000001"
                autocomplete="off"
                required
              >

              <small>
                Ingresa los 10 dígitos de tu referencia bancaria.
              </small>

            </div>


            <!-- ERROR -->

            <div
              v-if="error"
              class="error-message"
            >
              ⚠️ {{ error }}
            </div>


            <!-- BOTÓN -->

            <button
              type="submit"
              class="search-btn"
              :disabled="consultando"
            >

              <span v-if="!consultando">
                🔎 Consultar estado
              </span>

              <span v-else>
                ⏳ Consultando...
              </span>

            </button>

          </form>


          <div class="help-box">

            <div class="help-icon">
              💡
            </div>

            <div>

              <strong>
                ¿Dónde encuentro mi folio?
              </strong>

              <p>
                Tu folio corresponde a la referencia bancaria
                que utilizaste al enviar tu comprobante de pago.
              </p>

            </div>

          </div>

        </div>


        <!-- =================================================
             RESULTADO
        ================================================== -->

        <div
          v-else
          class="result-section"
        >


          <!-- ===============================================
               ESTADO EN REVISIÓN
          ================================================ -->

          <div
            v-if="resultado.estado === 'en_revision'"
            class="status-content status-review"
          >

            <div class="status-icon">
              ⏳
            </div>

            <span class="status-badge">
              EN REVISIÓN
            </span>

            <h2>
              Tu pago está en revisión
            </h2>

            <p>
              Hemos recibido correctamente tu comprobante.
              Nuestro sistema está verificando la información
              proporcionada.
            </p>

          </div>


          <!-- ===============================================
               ESTADO APROBADO
          ================================================ -->

          <div
            v-if="resultado.estado === 'aprobado'"
            class="status-content status-approved"
          >

            <div class="status-icon">
              ✓
            </div>

            <span class="status-badge">
              PAGO APROBADO
            </span>

            <h2>
              ¡Tu pago ha sido aprobado!
            </h2>

            <p>
              Tu comprobante fue validado correctamente.
              Tu inscripción al Congreso ESCALA ha sido confirmada.
            </p>

          </div>


          <!-- ===============================================
               ESTADO RECHAZADO
          ================================================ -->

          <div
            v-if="resultado.estado === 'rechazado'"
            class="status-content status-rejected"
          >

            <div class="status-icon">
              ×
            </div>

            <span class="status-badge">
              PAGO RECHAZADO
            </span>

            <h2>
              Tu comprobante fue rechazado
            </h2>

            <p>
              No fue posible validar tu comprobante de pago.
              Revisa la información indicada y, si es necesario,
              contacta al equipo organizador.
            </p>

          </div>


          <!-- ===============================================
               INFORMACIÓN DEL PAGO
          ================================================ -->

          <div class="payment-info">

            <div class="info-item">

              <span>
                Folio / Referencia
              </span>

              <strong>
                {{ resultado.referencia }}
              </strong>

            </div>


            <div class="info-item">

              <span>
                Participante
              </span>

              <strong>
                {{ resultado.nombre || "No disponible" }}
              </strong>

            </div>


            <div class="info-item">

              <span>
                Correo
              </span>

              <strong>
                {{ resultado.correo || "No disponible" }}
              </strong>

            </div>


            <div class="info-item">

              <span>
                Monto
              </span>

              <strong>
                ${{ montoEsperado || resultado.monto   }} MXN
              </strong>

            </div>


            <div class="info-item">

              <span>
                Fecha de pago
              </span>

              <strong>
                {{ resultado.fechaPago || "No disponible" }}
              </strong>

            </div>


            <div class="info-item">

              <span>
                Estado
              </span>

              <strong
                :class="[
                  'state-text',
                  resultado.estado
                ]"
              >
                {{ textoEstado }}
              </strong>

            </div>

          </div>


          <!-- ===============================================
               MENSAJE SEGÚN ESTADO
          ================================================ -->

          <div
            v-if="resultado.estado === 'en_revision'"
            class="message-box review-box"
          >

            <span>
              🕐
            </span>

            <div>

              <strong>
                ¿Qué sigue?
              </strong>

              <p>
                No necesitas volver a enviar tu comprobante.
                Conserva tu folio y consulta nuevamente más tarde
                para conocer el resultado de la validación.
              </p>

            </div>

          </div>


          <div
            v-if="resultado.estado === 'aprobado'"
            class="message-box approved-box"
          >

            <span>
              🎉
            </span>

            <div>

              <strong>
                ¡Inscripción confirmada!
              </strong>

              <p>
                Tu pago ha sido validado correctamente.
                Conserva tu folio para futuras consultas
                relacionadas con tu inscripción.
              </p>

            </div>

          </div>


          <div
            v-if="resultado.estado === 'rechazado'"
            class="message-box rejected-box"
          >

            <span>
              ⚠️
            </span>

            <div>

              <strong>
                ¿Qué puedes hacer?
              </strong>

              <p>
                Verifica que los datos de tu comprobante sean
                correctos. Si consideras que hubo un error,
                comunícate con los organizadores del Congreso ESCALA.
              </p>

            </div>

          </div>


          <!-- ===============================================
               BOTONES
          ================================================ -->

          <div class="result-actions">

            <button
              class="secondary-btn"
              @click="nuevaConsulta"
            >
              🔎 Consultar otro folio
            </button>


            <router-link
              to="/"
              class="primary-btn"
            >
              ← Regresar al inicio
            </router-link>

          </div>

        </div>

      </section>


      <!-- ===================================================
           PANEL DERECHO
      ==================================================== -->

      <aside class="side-panel">


        <!-- =================================================
             ESTADOS
        ================================================== -->

        <div class="states-card">

          <h3>
            Estados del pago
          </h3>

          <p class="states-description">
            Después de enviar tu comprobante, tu pago puede
            encontrarse en uno de los siguientes estados:
          </p>


          <div class="state-item">

            <div class="state-circle review">
              ⏳
            </div>

            <div>

              <strong>
                En revisión
              </strong>

              <p>
                Tu comprobante fue recibido y está siendo validado.
              </p>

            </div>

          </div>


          <div class="state-item">

            <div class="state-circle approved">
              ✓
            </div>

            <div>

              <strong>
                Aprobado
              </strong>

              <p>
                Tu comprobante fue validado correctamente.
              </p>

            </div>

          </div>


          <div class="state-item">

            <div class="state-circle rejected">
              ×
            </div>

            <div>

              <strong>
                Rechazado
              </strong>

              <p>
                El comprobante no pudo ser validado.
              </p>

            </div>

          </div>

        </div>


        <!-- =================================================
             INFORMACIÓN
        ================================================== -->

        <div class="info-card">

          <div class="info-card-icon">
            ℹ️
          </div>

          <div>

            <strong>
              Importante
            </strong>

            <p>
              Tu folio o referencia bancaria.
              Lo necesitarás para consultar nuevamente
              el estado de tu pago.
            </p>

          </div>

        </div>


        <!-- =================================================
             SEGURIDAD
        ================================================== -->

        <div class="security-card">

          <div class="security-icon">
            🔒
          </div>

          <div>

            <strong>
              Consulta segura
            </strong>

            <p>
              La información de tu pago se utiliza únicamente
              para gestionar y validar tu inscripción.
            </p>

          </div>

        </div>

      </aside>

    </main>

  </div>

</template>


<script setup>

import {
  computed,
  onMounted,
  ref
} from "vue";

import {
  useRoute
} from "vue-router";

import { API_URL } from "../../config/api";


// ==========================================
// ROUTE
// ==========================================

const route = useRoute();


// ==========================================
// VARIABLES
// ==========================================

const folio = ref("");

const resultado = ref(null);

const error = ref("");

const consultando = ref(false);

const montoEsperado = ref(700);


// ==========================================
// ESTADO EN TEXTO
// ==========================================

const textoEstado = computed(() => {

  if (!resultado.value) {
    return "";
  }

  switch (resultado.value.estado) {

    case "aprobado":
      return "Aprobado";

    case "rechazado":
      return "Rechazado";

    case "en_revision":
      return "En revisión";

    default:
      return "Desconocido";

  }

});


// ==========================================
// CARGAR FOLIO DESDE LA URL
// ==========================================

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

  const folioUrl = route.params.folio;
  if (folioUrl) {
    folio.value = String(folioUrl);
    consultarPago();
  }

});


// ==========================================
// VALIDAR FOLIO
// ==========================================

function validarFolio() {

  return /^\d{10}$/.test(
    folio.value
  );

}


// ==========================================
// CONSULTAR PAGO
// ==========================================

async function consultarPago() {

  error.value = "";

  resultado.value = null;


  // ==========================================
  // LIMPIAR FOLIO
  // ==========================================

  folio.value =
    String(folio.value).trim();


  // ==========================================
  // VALIDAR
  // ==========================================

  if (!validarFolio()) {

    error.value =
      "El folio debe contener exactamente 10 dígitos.";

    return;

  }


  // ==========================================
  // MOSTRAR ESTADO DE CONSULTA
  // ==========================================

  consultando.value = true;


  // ==========================================
  // CONSULTAR BACKEND
  // ==========================================

  try {

    const response = await fetch(
      `${API_URL}/eventos/4/inscripciones/referencia/${folio.value}`
    );

    if (!response.ok) {

      throw new Error(
        "No se encontró ningún pago asociado a este folio."
      );

    }

    const data = await response.json();


    // ==========================================
    // MOSTRAR RESULTADO
    // ==========================================

    resultado.value = {

      referencia:
        data.referencia,

      nombre:
        data.nombre,

      correo:
        data.correo,

      monto:
        data.monto,

      fechaPago:
        data.fechaPago,

      estado:
        data.estado

    };

  } catch (e) {

    error.value =
      e.message ||
      "No se pudo consultar el estado del pago.";

  } finally {

    consultando.value = false;

  }

}


// ==========================================
// NUEVA CONSULTA
// ==========================================

function nuevaConsulta() {

  resultado.value = null;

  error.value = "";

  folio.value = "";

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

.estado-page {

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

  padding:
    28px 6% 45px;

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

  transform:
    translateX(-4px);

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

  padding:
    7px 15px;

  border-radius: 30px;

  font-size: .75rem;

  font-weight: 800;

  letter-spacing: 1px;

  margin-bottom: 8px;

}


.header-content h1 {

  margin:
    0 0 8px;

  font-size:
    2.3rem;

}


.header-content p {

  margin: 0;

  opacity: .9;

}


/* =====================================================
   CONTENEDOR
===================================================== */

.main-container {

  max-width: 1100px;

  margin:
    -20px auto 60px;

  padding:
    0 20px;

  display: grid;

  grid-template-columns:
    1.5fr 1fr;

  gap: 30px;

}


/* =====================================================
   TARJETA
===================================================== */

.status-card {

  background: white;

  border-radius: 22px;

  padding: 40px;

  box-shadow:
    0 15px 40px
    rgba(0,0,0,.08);

}


/* =====================================================
   BUSCADOR
===================================================== */

.search-section {

  text-align: center;

}


.search-icon {

  width: 75px;

  height: 75px;

  margin:
    0 auto 20px;

  border-radius: 50%;

  background: #e8f1fb;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 35px;

}


.search-section h2 {

  margin:
    0 0 10px;

  color: #003366;

  font-size:
    1.8rem;

}


.search-section > p {

  max-width: 550px;

  margin:
    0 auto 30px;

  color: #666;

  line-height: 1.7;

}


/* =====================================================
   FORMULARIO
===================================================== */

.search-form {

  max-width: 500px;

  margin: auto;

  text-align: left;

}


.form-group {

  margin-bottom: 20px;

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

  padding: 15px;

  border:
    1px solid #d8e0ea;

  border-radius: 11px;

  outline: none;

  font-size: 1rem;

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

  font-size: .82rem;

}


/* =====================================================
   BOTÓN CONSULTAR
===================================================== */

.search-btn {

  width: 100%;

  border: none;

  background:
    linear-gradient(
      90deg,
      #003366,
      #0055aa
    );

  color: white;

  padding: 16px;

  border-radius: 11px;

  font-size: 1rem;

  font-weight: 800;

  cursor: pointer;

  transition: .3s;

}


.search-btn:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 10px 25px
    rgba(0,85,170,.25);

}


.search-btn:disabled {

  opacity: .7;

  cursor: wait;

  transform: none;

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

  text-align: left;

}


/* =====================================================
   AYUDA
===================================================== */

.help-box {

  max-width: 500px;

  margin:
    25px auto 0;

  display: flex;

  gap: 13px;

  text-align: left;

  background: #f1f7ff;

  border:
    1px solid #cfe2f5;

  border-radius: 13px;

  padding: 17px;

}


.help-icon {

  font-size: 22px;

}


.help-box strong {

  color: #003366;

}


.help-box p {

  margin:
    5px 0 0;

  color: #666;

  font-size: .84rem;

  line-height: 1.5;

}


/* =====================================================
   RESULTADO
===================================================== */

.result-section {

  text-align: center;

}


.status-content {

  padding-bottom: 30px;

  border-bottom:
    1px solid #eee;

}


.status-icon {

  width: 85px;

  height: 85px;

  margin:
    0 auto 18px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 40px;

  font-weight: 900;

}


.status-review .status-icon {

  background: #fff8e1;

  color: #f9a825;

}


.status-approved .status-icon {

  background: #e8f5e9;

  color: #2e7d32;

}


.status-rejected .status-icon {

  background: #ffebee;

  color: #c62828;

}


/* =====================================================
   BADGES
===================================================== */

.status-badge {

  display: inline-block;

  padding:
    7px 15px;

  border-radius: 20px;

  font-size: .75rem;

  font-weight: 800;

}


.status-review .status-badge {

  background: #fff8e1;

  color: #f57f17;

}


.status-approved .status-badge {

  background: #e8f5e9;

  color: #2e7d32;

}


.status-rejected .status-badge {

  background: #ffebee;

  color: #c62828;

}


/* =====================================================
   TITULO RESULTADO
===================================================== */

.status-content h2 {

  color: #003366;

  margin:
    18px 0 10px;

  font-size:
    1.7rem;

}


.status-content p {

  color: #666;

  line-height: 1.7;

  margin:
    0 auto;

  max-width: 550px;

}


/* =====================================================
   INFORMACIÓN DEL PAGO
===================================================== */

.payment-info {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 12px;

  margin:
    25px 0;

}


.info-item {

  background: #f8fafc;

  border-radius: 12px;

  padding: 15px;

  text-align: left;

}


.info-item span {

  display: block;

  color: #777;

  font-size: .75rem;

  margin-bottom: 6px;

}


.info-item strong {

  display: block;

  color: #26384d;

  font-size: .88rem;

  word-break: break-word;

}


.state-text.en_revision {

  color: #f57f17;

}


.state-text.aprobado {

  color: #2e7d32;

}


.state-text.rechazado {

  color: #c62828;

}


/* =====================================================
   MESSAGE BOX
===================================================== */

.message-box {

  display: flex;

  gap: 12px;

  text-align: left;

  border-radius: 13px;

  padding: 17px;

  margin-bottom: 25px;

}


.message-box > span {

  font-size: 22px;

}


.message-box strong {

  display: block;

  margin-bottom: 5px;

}


.message-box p {

  margin: 0;

  font-size: .84rem;

  line-height: 1.6;

}


.review-box {

  background: #fff8e1;

  color: #665500;

}


.review-box strong {

  color: #8a6d00;

}


.approved-box {

  background: #e8f5e9;

  color: #355e3b;

}


.approved-box strong {

  color: #2e7d32;

}


.rejected-box {

  background: #ffebee;

  color: #7f1d1d;

}


.rejected-box strong {

  color: #c62828;

}


/* =====================================================
   BOTONES RESULTADO
===================================================== */

.result-actions {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 12px;

}


.primary-btn,
.secondary-btn {

  display: flex;

  align-items: center;

  justify-content: center;

  min-height: 50px;

  border-radius: 11px;

  font-weight: 800;

  text-decoration: none;

  cursor: pointer;

  transition: .3s;

}


.primary-btn {

  background:
    linear-gradient(
      90deg,
      #003366,
      #0055aa
    );

  color: white;

  border: none;

}


.secondary-btn {

  background: white;

  color: #003366;

  border:
    1px solid #ccd8e5;

}


.primary-btn:hover,
.secondary-btn:hover {

  transform:
    translateY(-2px);

}


/* =====================================================
   PANEL DERECHO
===================================================== */

.side-panel {

  display: flex;

  flex-direction: column;

  gap: 20px;

}


/* =====================================================
   ESTADOS
===================================================== */

.states-card {

  background: white;

  border-radius: 20px;

  padding: 28px;

  box-shadow:
    0 15px 40px
    rgba(0,0,0,.08);

}


.states-card h3 {

  margin:
    0 0 8px;

  color: #003366;

}


.states-description {

  color: #777;

  font-size: .85rem;

  line-height: 1.5;

  margin-bottom: 22px;

}


/* =====================================================
   ESTADO ITEM
===================================================== */

.state-item {

  display: flex;

  align-items: flex-start;

  gap: 13px;

  margin-bottom: 20px;

}


.state-item:last-child {

  margin-bottom: 0;

}


.state-circle {

  width: 38px;

  height: 38px;

  flex-shrink: 0;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 900;

}


.state-circle.review {

  background: #fff8e1;

  color: #f9a825;

}


.state-circle.approved {

  background: #e8f5e9;

  color: #2e7d32;

}


.state-circle.rejected {

  background: #ffebee;

  color: #c62828;

}


.state-item strong {

  color: #26384d;

}


.state-item p {

  margin:
    4px 0 0;

  color: #777;

  font-size: .8rem;

  line-height: 1.5;

}


/* =====================================================
   INFO CARD
===================================================== */

.info-card {

  display: flex;

  gap: 13px;

  background: #f1f7ff;

  border:
    1px solid #cfe2f5;

  border-radius: 15px;

  padding: 18px;

}


.info-card-icon {

  font-size: 22px;

}


.info-card strong {

  color: #003366;

}


.info-card p {

  margin:
    5px 0 0;

  color: #666;

  font-size: .82rem;

  line-height: 1.5;

}


/* =====================================================
   SEGURIDAD
===================================================== */

.security-card {

  display: flex;

  gap: 13px;

  background: white;

  border-radius: 15px;

  padding: 18px;

  box-shadow:
    0 10px 25px
    rgba(0,0,0,.05);

}


.security-icon {

  font-size: 22px;

}


.security-card strong {

  color: #003366;

}


.security-card p {

  margin:
    5px 0 0;

  color: #666;

  font-size: .82rem;

  line-height: 1.5;

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

  .page-header {

    padding:
      22px 20px 40px;

  }


  .header-content {

    align-items: flex-start;

    gap: 15px;

  }


  .header-icon {

    width: 60px;

    height: 60px;

    font-size: 28px;

  }


  .header-content h1 {

    font-size: 1.7rem;

  }


  .status-card {

    padding:
      25px 20px;

  }


  .payment-info {

    grid-template-columns: 1fr;

  }


  .result-actions {

    grid-template-columns: 1fr;

  }

}

</style>

