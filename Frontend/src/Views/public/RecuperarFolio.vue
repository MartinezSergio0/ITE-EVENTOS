<template>
  <div class="folio-page">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <header class="page-header">

      <div class="header-container">

        <!-- REGRESAR -->
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
              Consulta tu folio
            </h1>

            <p>
              ¿Olvidaste tu folio? Recupéralo utilizando tu correo electrónico.
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

      <section class="folio-card">


        <!-- =================================================
             BUSCADOR
        ================================================== -->

        <div
          v-if="!resultado"
          class="search-section"
        >

          <div class="search-icon">
            ✉️
          </div>

          <h2>
            Recupera tu folio
          </h2>

          <p>
            Ingresa el correo electrónico que utilizaste
            durante tu registro al Congreso ESCALA.
            Te mostraremos el folio asociado a tu registro.
          </p>


          <!-- FORMULARIO -->

          <form
            @submit.prevent="consultarFolio"
            class="search-form"
          >

            <div class="form-group">

              <label>
                Correo electrónico
                <span>*</span>
              </label>

              <input
                v-model="correo"
                type="email"
                placeholder="Ej. correo@ejemplo.com"
                autocomplete="email"
                required
              >

              <small>
                Utiliza el mismo correo que proporcionaste durante tu registro.
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
                🔎 Buscar mi folio
              </span>

              <span v-else>
                ⏳ Buscando...
              </span>

            </button>

          </form>


          <!-- AYUDA -->

          <div class="help-box">

            <div class="help-icon">
              💡
            </div>

            <div>

              <strong>
                ¿Qué correo debo utilizar?
              </strong>

              <p>
                Debes ingresar el correo electrónico que registraste
                al momento de inscribirte al Congreso ESCALA.
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

          <!-- ICONO -->

          <div class="success-icon">
            ✓
          </div>


          <!-- BADGE -->

          <span class="result-badge">
            FOLIO ENCONTRADO
          </span>


          <h2>
            ¡Encontramos tu folio!
          </h2>

          <p class="result-description">
            Estos son los datos asociados al correo electrónico
            que proporcionaste.
          </p>


          <!-- =================================================
               FOLIO DESTACADO
          ================================================== -->

          <div class="folio-result">

            <span>
              Tu folio de registro
            </span>

            <strong>
              {{ resultado.folio }}
            </strong>

            <small>
              Conserva este folio para futuras consultas.
            </small>

          </div>


          <!-- =================================================
               INFORMACIÓN
          ================================================== -->

          <div class="participant-info">

            <div class="info-item">

              <span>
                Participante
              </span>

              <strong>
                {{ resultado.nombre }}
              </strong>

            </div>


            <div class="info-item">

              <span>
                Correo electrónico
              </span>

              <strong>
                {{ resultado.correo }}
              </strong>

            </div>


            <div class="info-item">

              <span>
                Evento
              </span>

              <strong>
                {{ resultado.evento }}
              </strong>

            </div>


            <div class="info-item">

              <span>
                Fecha de registro
              </span>

              <strong>
                {{ resultado.fechaRegistro }}
              </strong>

            </div>

          </div>


          <!-- =================================================
               MENSAJE
          ================================================== -->

          <div class="message-box">

            <span>
              📌
            </span>

            <div>

              <strong>
                Guarda tu folio
              </strong>

              <p>
                Te recomendamos guardar o anotar tu folio.
                Podrás necesitarlo para realizar consultas
                relacionadas con tu inscripción al Congreso ESCALA.
              </p>

            </div>

          </div>


          <!-- =================================================
               BOTONES
          ================================================== -->

          <div class="result-actions">

            <button
              class="secondary-btn"
              @click="nuevaConsulta"
            >
              🔎 Buscar otro correo
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
             INFORMACIÓN
        ================================================== -->

        <div class="info-card">

          <div class="info-card-icon">
            🔎
          </div>

          <div>

            <strong>
              ¿Para qué sirve esta consulta?
            </strong>

            <p>
              Esta sección te permite recuperar tu folio
              en caso de que lo hayas olvidado.
            </p>

          </div>

        </div>


        <!-- =================================================
             PASOS
        ================================================== -->

        <div class="steps-card">

          <h3>
            ¿Cómo recuperar mi folio?
          </h3>

          <p class="steps-description">
            Solo necesitas seguir estos sencillos pasos:
          </p>


          <div class="step-item">

            <div class="step-number">
              1
            </div>

            <div>

              <strong>
                Ingresa tu correo
              </strong>

              <p>
                Utiliza el correo que registraste
                durante tu inscripción.
              </p>

            </div>

          </div>


          <div class="step-item">

            <div class="step-number">
              2
            </div>

            <div>

              <strong>
                Busca tu registro
              </strong>

              <p>
                El sistema localizará la información
                asociada a tu correo.
              </p>

            </div>

          </div>


          <div class="step-item">

            <div class="step-number">
              3
            </div>

            <div>

              <strong>
                Recupera tu folio
              </strong>

              <p>
                Tu folio aparecerá en pantalla.
              </p>

            </div>

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
              Utiliza únicamente tu correo electrónico
              registrado para localizar tu información.
            </p>

          </div>

        </div>

      </aside>

    </main>

  </div>
</template>


<script setup>

import {
  ref
} from "vue";

import { API_URL } from "../../config/api";

// ==========================================
// VARIABLES
// ==========================================

const correo = ref("");

const resultado = ref(null);

const error = ref("");

const consultando = ref(false);


// ==========================================
// CONSULTAR FOLIO
// ==========================================

async function consultarFolio() {

  error.value = "";
  resultado.value = null;

  correo.value = String(correo.value).trim().toLowerCase();

  if (!correo.value) {
    error.value = "Ingresa tu correo electrónico.";
    return;
  }

  consultando.value = true;

  try {

    const params = new URLSearchParams({ correo: correo.value });

    const response = await fetch(
      `${API_URL}/eventos/4/inscripciones/folio?${params}`
    );

    if (!response.ok) {

      let errorData = {};
      try { errorData = await response.json(); } catch { errorData = {}; }

      throw new Error(
        errorData.message ||
        "No encontramos ningún registro asociado a este correo electrónico. Verifica que hayas utilizado el mismo correo con el que realizaste tu inscripción."
      );

    }

    const data = await response.json();

    resultado.value = {
      folio: data.folio,
      nombre: data.nombre,
      correo: data.correo,
      evento: data.evento,
      fechaRegistro: data.fechaRegistro,
    };

  } catch (e) {
    error.value = e.message || "No se pudo consultar tu folio.";
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

  correo.value = "";

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

.folio-page {

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
   TARJETA PRINCIPAL
===================================================== */

.folio-card {

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
   BOTÓN
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

  line-height: 1.5;

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


.success-icon {

  width: 85px;

  height: 85px;

  margin:
    0 auto 18px;

  border-radius: 50%;

  background: #e8f5e9;

  color: #2e7d32;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 40px;

  font-weight: 900;

}


.result-badge {

  display: inline-block;

  padding:
    7px 15px;

  border-radius: 20px;

  background: #e8f5e9;

  color: #2e7d32;

  font-size: .75rem;

  font-weight: 800;

}


.result-section h2 {

  color: #003366;

  margin:
    18px 0 10px;

  font-size: 1.7rem;

}


.result-description {

  color: #666;

  line-height: 1.7;

  margin-bottom: 25px;

}


/* =====================================================
   FOLIO DESTACADO
===================================================== */

.folio-result {

  background:
    linear-gradient(
      135deg,
      #eef6ff,
      #e3f0ff
    );

  border:
    1px solid #c5ddf5;

  border-radius: 16px;

  padding: 25px;

  margin-bottom: 25px;

}


.folio-result span {

  display: block;

  color: #567;

  font-size: .85rem;

  margin-bottom: 8px;

}


.folio-result strong {

  display: block;

  color: #003366;

  font-size: 1.8rem;

  letter-spacing: 1px;

  margin-bottom: 8px;

  word-break: break-word;

}


.folio-result small {

  color: #777;

  font-size: .8rem;

}


/* =====================================================
   INFORMACIÓN PARTICIPANTE
===================================================== */

.participant-info {

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

  background: #f1f7ff;

  border:
    1px solid #cfe2f5;

  color: #3b526b;

}


.message-box > span {

  font-size: 22px;

}


.message-box strong {

  display: block;

  margin-bottom: 5px;

  color: #003366;

}


.message-box p {

  margin: 0;

  font-size: .84rem;

  line-height: 1.6;

}


/* =====================================================
   BOTONES
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
   INFO CARD
===================================================== */

.info-card {

  display: flex;

  gap: 13px;

  background: #f1f7ff;

  border:
    1px solid #cfe2f5;

  border-radius: 15px;

  padding: 20px;

}


.info-card-icon {

  font-size: 25px;

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
   STEPS CARD
===================================================== */

.steps-card {

  background: white;

  border-radius: 20px;

  padding: 28px;

  box-shadow:
    0 15px 40px
    rgba(0,0,0,.08);

}


.steps-card h3 {

  margin:
    0 0 8px;

  color: #003366;

}


.steps-description {

  color: #777;

  font-size: .85rem;

  line-height: 1.5;

  margin-bottom: 22px;

}


/* =====================================================
   STEP
===================================================== */

.step-item {

  display: flex;

  align-items: flex-start;

  gap: 13px;

  margin-bottom: 22px;

}


.step-item:last-child {

  margin-bottom: 0;

}


.step-number {

  width: 38px;

  height: 38px;

  flex-shrink: 0;

  border-radius: 50%;

  background:
    #e8f1fb;

  color: #0055aa;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 900;

}


.step-item strong {

  color: #26384d;

}


.step-item p {

  margin:
    4px 0 0;

  color: #777;

  font-size: .8rem;

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


  .folio-card {

    padding:
      25px 20px;

  }


  .participant-info {

    grid-template-columns: 1fr;

  }


  .result-actions {

    grid-template-columns: 1fr;

  }


  .folio-result strong {

    font-size: 1.45rem;

  }

}

</style>