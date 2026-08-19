<template>
  <div class="registro-page">

    <!-- =========================================
         HEADER
    ========================================== -->

    <header class="registro-header">

      <div class="header-content">

        <router-link
          to="/evento/1"
          class="back-link"
        >
          ← Regresar al evento
        </router-link>

        <div class="header-title">

          <span class="event-badge">
            CONGRESO ESCALA
          </span>

          <h1>
            Registro de Participante
          </h1>

          <p>
            Completa el formulario para registrarte
            al Congreso ESCALA.
          </p>

        </div>

      </div>

    </header>


    <!-- =========================================
         CONTENIDO PRINCIPAL
    ========================================== -->

    <main class="registro-container">


      <!-- =======================================
           FORMULARIO
      ======================================== -->

      <div class="registro-card">


        <!-- =====================================
             MENSAJE DE ÉXITO
        ====================================== -->

        <div
          v-if="registroExitoso"
          class="success-message"
        >

          <div class="success-icon">
            ✓
          </div>

          <div class="success-content">

            <h2>
              ¡Registro realizado correctamente!
            </h2>

            <p>
              Tus datos fueron registrados
              correctamente para el Congreso ESCALA.
            </p>

            <div class="folio-box">

              <span>
                Folio de registro
              </span>

              <strong>
                {{ folio }}
              </strong>

            </div>

            <p class="success-note">
              Guarda este folio. Te servirá para
              consultar posteriormente tu registro.
            </p>

            <button
              class="new-register-button"
              @click="nuevoRegistro"
            >
              Realizar otro registro
            </button>

          </div>

        </div>


        <!-- =====================================
             FORMULARIO
        ====================================== -->

        <form
          v-else
          class="registro-form"
          @submit.prevent="registrar"
        >


          <!-- ===================================
               DATOS PERSONALES
          ==================================== -->

          <section class="form-section">

            <div class="section-header">

              <div class="section-icon">
                👤
              </div>

              <div>

                <h2>
                  Datos Personales
                </h2>

                <p>
                  Le solicitamos que complete cada uno
                  de los campos requeridos con datos
                  verídicos y actualizados.
                </p>

              </div>

            </div>


            <div class="privacy-intro">

              <p>
                La información proporcionada será
                utilizada únicamente para fines
                relacionados con la organización y
                logística del congreso, respetando en
                todo momento la confidencialidad y
                protección de sus datos personales.
              </p>

            </div>


            <!-- APELLIDOS -->

            <div class="form-grid">

              <div class="form-group">

                <label>
                  Apellido paterno
                  <span>*</span>
                </label>

                <input
                  v-model="form.apellidoPaterno"
                  type="text"
                  placeholder="Apellido paterno"
                  required
                />

              </div>


              <!-- APELLIDO MATERNO -->

              <div class="form-group">

                <label>
                  Apellido materno
                  <span>*</span>
                </label>

                <input
                  v-model="form.apellidoMaterno"
                  type="text"
                  placeholder="Apellido materno"
                  required
                />

              </div>

            </div>


            <!-- NOMBRE -->

            <div class="form-group">

              <label>
                Nombre(s)
                <span>*</span>
              </label>

              <input
                v-model="form.nombre"
                type="text"
                placeholder="Nombre(s)"
                required
              />

            </div>


            <!-- NÚMERO DE CONTROL -->

            <div class="form-group">

              <label>
                Número de control
              </label>

              <input
                v-model="form.numeroControl"
                type="text"
                placeholder="Número de control"
                maxlength="20"
              />

            </div>


            <!-- EDAD -->

            <div class="form-group">

              <label>
                Edad
                <span>*</span>
              </label>

              <input
                v-model="form.edad"
                type="number"
                min="1"
                max="120"
                placeholder="Escribe tu edad"
                required
              />

            </div>


            <!-- SEXO -->

            <div class="form-group">

              <label>
                Sexo biológico
                <span>*</span>
              </label>

              <div class="radio-group">

                <label class="radio-option">

                  <input
                    v-model="form.sexo"
                    type="radio"
                    value="Masculino"
                    required
                  />

                  <span>
                    Masculino
                  </span>

                </label>


                <label class="radio-option">

                  <input
                    v-model="form.sexo"
                    type="radio"
                    value="Femenino"
                  />

                  <span>
                    Femenino
                  </span>

                </label>


              </div>

            </div>

          </section>


          <!-- ===================================
               INFORMACIÓN DE CONTACTO
          ==================================== -->

          <section class="form-section">

            <div class="section-header">

              <div class="section-icon">
                📱
              </div>

              <div>

                <h2>
                  Información de Contacto
                </h2>

                <p>
                  Proporciona información mediante la
                  cual podamos comunicarnos contigo.
                </p>

              </div>

            </div>


            <!-- CORREO -->

            <div class="form-group">

              <label>
                Correo electrónico
                <span>*</span>
              </label>

              <input
                v-model="form.email"
                type="email"
                placeholder="ejemplo@correo.com"
                required
              />

            </div>


            <!-- TELÉFONO -->

            <div class="form-group">

              <label>
                Teléfono
                <span>*</span>
              </label>

              <input
                v-model="form.telefono"
                type="tel"
                placeholder="646 000 0000"
                maxlength="15"
                required
              />

            </div>


            <!-- ESTADO -->

            <div class="form-group">

              <label>
                Estado de procedencia
                <span>*</span>
              </label>

              <select
                v-model="form.estado"
                required
              >

                <option value="">
                  Selecciona tu estado
                </option>

                <option value="Aguascalientes">
                  Aguascalientes
                </option>

                <option value="Baja California">
                  Baja California
                </option>

                <option value="Baja California Sur">
                  Baja California Sur
                </option>

                <option value="Campeche">
                  Campeche
                </option>

                <option value="Chiapas">
                  Chiapas
                </option>

                <option value="Chihuahua">
                  Chihuahua
                </option>

                <option value="Ciudad de México">
                  Ciudad de México
                </option>

                <option value="Coahuila">
                  Coahuila
                </option>

                <option value="Colima">
                  Colima
                </option>

                <option value="Durango">
                  Durango
                </option>

                <option value="Estado de México">
                  Estado de México
                </option>

                <option value="Guanajuato">
                  Guanajuato
                </option>

                <option value="Guerrero">
                  Guerrero
                </option>

                <option value="Hidalgo">
                  Hidalgo
                </option>

                <option value="Jalisco">
                  Jalisco
                </option>

                <option value="Michoacán">
                  Michoacán
                </option>

                <option value="Morelos">
                  Morelos
                </option>

                <option value="Nayarit">
                  Nayarit
                </option>

                <option value="Nuevo León">
                  Nuevo León
                </option>

                <option value="Oaxaca">
                  Oaxaca
                </option>

                <option value="Puebla">
                  Puebla
                </option>

                <option value="Querétaro">
                  Querétaro
                </option>

                <option value="Quintana Roo">
                  Quintana Roo
                </option>

                <option value="San Luis Potosí">
                  San Luis Potosí
                </option>

                <option value="Sinaloa">
                  Sinaloa
                </option>

                <option value="Sonora">
                  Sonora
                </option>

                <option value="Tabasco">
                  Tabasco
                </option>

                <option value="Tamaulipas">
                  Tamaulipas
                </option>

                <option value="Tlaxcala">
                  Tlaxcala
                </option>

                <option value="Veracruz">
                  Veracruz
                </option>

                <option value="Yucatán">
                  Yucatán
                </option>

                <option value="Zacatecas">
                  Zacatecas
                </option>

                <option value="Otro">
                  Otro
                </option>

              </select>

            </div>

          </section>


          <!-- ===================================
               INSTITUCIÓN
          ==================================== -->

          <section class="form-section">

            <div class="section-header">

              <div class="section-icon">
                🏫
              </div>

              <div>

                <h2>
                  Institución de procedencia
                </h2>

                <p>
                  Indica la institución a la que
                  perteneces actualmente.
                </p>

              </div>

            </div>


            <!-- INSTITUCIÓN -->

            <div class="form-group">

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


            <!-- OTRA INSTITUCIÓN -->

            <div
              v-if="form.institucion === 'Otro'"
              class="form-group"
            >

              <label>
                Especifica tu institución
                <span>*</span>
              </label>

              <input
                v-model="form.otraInstitucion"
                type="text"
                placeholder="Nombre de la institución"
                :required="form.institucion === 'Otro'"
              />

            </div>


            <!-- CARRERA -->

            <div class="form-group">

              <label>
                Carrera / Área de especialización / disciplina
                <span>*</span>
              </label>

              <select
                v-model="form.carrera"
                required
              >

                <option value="">
                  Selecciona una opción
                </option>

                <option value="Lic. en Administración">
                  Lic. en Administración
                </option>

                <option value="Lic. Contador Público">
                  Lic. Contador Público
                </option>

                <option value="Ing. en Gestión Empresarial">
                  Ing. en Gestión Empresarial
                </option>

                <option value="Ing. en Logística">
                  Ing. en Logística
                </option>

                <option value="Ing. Industrial">
                  Ing. Industrial
                </option>

                <option value="Maestría en Administración">
                  Maestría en Administración
                </option>

                <option value="Doctorado en Administración">
                  Doctorado en Administración
                </option>

                <option value="Ingeniería en Administración">
                  Ingeniería en Administración
                </option>

                <option value="Otro">
                  Otro
                </option>

              </select>

            </div>


            <!-- OTRA CARRERA -->

            <div
              v-if="form.carrera === 'Otro'"
              class="form-group"
            >

              <label>
                Especifica tu carrera / área
                <span>*</span>
              </label>

              <input
                v-model="form.otraCarrera"
                type="text"
                placeholder="Escribe tu carrera o área"
                :required="form.carrera === 'Otro'"
              />

            </div>

          </section>


          <!-- ===================================
               CONTACTO DE EMERGENCIA
          ==================================== -->

          <section class="form-section">

            <div class="section-header">

              <div class="section-icon">
                🚨
              </div>

              <div>

                <h2>
                  Contacto de emergencia
                </h2>

                <p>
                  Proporciona los datos de una persona
                  a quien podamos contactar en caso
                  de emergencia.
                </p>

              </div>

            </div>


            <div class="form-grid">

              <!-- NOMBRE -->

              <div class="form-group">

                <label>
                  Nombre del contacto
                  <span>*</span>
                </label>

                <input
                  v-model="form.contactoEmergenciaNombre"
                  type="text"
                  placeholder="Nombre completo"
                  required
                />

              </div>


              <!-- CELULAR -->

              <div class="form-group">

                <label>
                  Número de celular
                  <span>*</span>
                </label>

                <input
                  v-model="form.contactoEmergenciaTelefono"
                  type="tel"
                  placeholder="646 000 0000"
                  maxlength="15"
                  required
                />

              </div>

            </div>

          </section>


          <!-- ===================================
               TIPO DE PARTICIPACIÓN
          ==================================== -->

          <section class="form-section">

            <div class="section-header">

              <div class="section-icon">
                🎓
              </div>

              <div>

                <h2>
                  Tipo de participación
                </h2>

                <p>
                  Selecciona el tipo de participación
                  que tendrás en el congreso.
                </p>

              </div>

            </div>


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

          </section>


          <!-- ===================================
               CÓMO SE ENTERÓ
          ==================================== -->

          <section class="form-section">

            <div class="section-header">

              <div class="section-icon">
                📢
              </div>

              <div>

                <h2>
                  ¿Cómo se enteró del congreso?
                </h2>

                <p>
                  Esta información nos ayuda a mejorar
                  nuestros medios de difusión.
                </p>

              </div>

            </div>


            <div class="form-group">

              <label>
                Medio por el que conoció el congreso
                <span>*</span>
              </label>

              <select
                v-model="form.comoSeEntero"
                required
              >

                <option value="">
                  Selecciona una opción
                </option>

                <option value="Facebook">
                  Facebook
                </option>

                <option value="Instagram">
                  Instagram
                </option>

                <option value="TikTok">
                  TikTok
                </option>

                <option value="Página Web">
                  Página Web
                </option>

                <option value="Promoción presencial del Comité Organizador">
                  Promoción presencial del Comité Organizador
                </option>

                <option value="A través de un(a) amigo(a)">
                  A través de un(a) amigo(a)
                </option>

                <option value="A través de un(a) docente">
                  A través de un(a) docente
                </option>

                <option value="Otro">
                  Otro
                </option>

              </select>

            </div>


            <!-- OTRO MEDIO -->

            <div
              v-if="form.comoSeEntero === 'Otro'"
              class="form-group"
            >

              <label>
                Especifica
                <span>*</span>
              </label>

              <input
                v-model="form.otroMedio"
                type="text"
                placeholder="Especifica cómo te enteraste"
                :required="
                  form.comoSeEntero === 'Otro'
                "
              />

            </div>

          </section>


          <!-- ===================================
               CONSENTIMIENTO
          ==================================== -->

          <section class="form-section consent-section">

            <div class="section-header">

              <div class="section-icon">
                🔐
              </div>

              <div>

                <h2>
                  Consentimiento y protección de datos
                </h2>

                <p>
                  Lee cuidadosamente la siguiente
                  información antes de registrarte.
                </p>

              </div>

            </div>


            <div class="consent-box">

              <p>
                Autorizo expresamente al Comité
                Organizador del Congreso ESCALA para
                recopilar, almacenar, tratar y utilizar
                mis datos personales proporcionados en
                este formulario, con el único propósito
                de gestionar mi participación en el
                evento, así como para enviarme
                información relevante relacionada con
                el congreso.
              </p>

              <p>
                Reconozco que mis datos serán tratados
                de manera confidencial y conforme a la
                legislación aplicable en materia de
                protección de datos personales.
              </p>

            </div>


            <label class="consent-checkbox">

              <input
                v-model="form.consentimiento"
                type="checkbox"
                required
              />

              <span>
                He leído y acepto el consentimiento.
                <strong>*</strong>
              </span>

            </label>

          </section>


          <!-- ===================================
               ERROR
          ==================================== -->

          <div
            v-if="error"
            class="error-message"
          >
            ⚠️ {{ error }}
          </div>


          <!-- ===================================
               BOTÓN
          ==================================== -->

          <div class="submit-area">

            <p class="required-note">
              <span>*</span>
              Campos obligatorios
            </p>

            <button
              type="submit"
              class="submit-button"
              :disabled="loading"
            >

              <span v-if="!loading">
                Completar registro
                <span class="arrow">
                  →
                </span>
              </span>

              <span
                v-else
                class="loading-content"
              >

                <span class="spinner"></span>

                Registrando...

              </span>

            </button>

          </div>

        </form>

      </div>


      <!-- =======================================
           INFORMACIÓN DEL EVENTO
      ======================================== -->

      <aside class="event-info">

        <div class="info-card">

          <div class="info-icon">
            🎓
          </div>

          <h3>
            Congreso ESCALA
          </h3>

          <p>
            Congreso Internacional de Investigación
            e Innovación.
          </p>


          <!-- FECHA -->

          <div class="info-item">

            <span>
              📅
            </span>

            <div>

              <strong>
                Fecha
              </strong>

              <p>
                10 al 12 de Septiembre
              </p>

            </div>

          </div>


          <!-- LUGAR -->

          <div class="info-item">

            <span>
              📍
            </span>

            <div>

              <strong>
                Lugar
              </strong>

              <p>
                Instituto Tecnológico de Ensenada
              </p>

            </div>

          </div>


          <!-- ORGANIZADOR -->

          <div class="info-item">

            <span>
              🏢
            </span>

            <div>

              <strong>
                Organizador
              </strong>

              <p>
                Departamento de Sistemas
              </p>

            </div>

          </div>


          <!-- CUPO -->

          <div class="info-item">

            <span>
              👥
            </span>

            <div>

              <strong>
                Cupo
              </strong>

              <p>
                500 participantes
              </p>

            </div>

          </div>


          <div class="info-divider"></div>


          <!-- INFORMACIÓN IMPORTANTE -->

          <div class="important-notice">

            <strong>
              ℹ Información importante
            </strong>

            <p>
              Asegúrate de proporcionar información
              correcta y actualizada. Los datos serán
              utilizados para la organización y
              logística del evento.
            </p>

          </div>

        </div>

      </aside>

    </main>

  </div>
</template>


<script setup>

import {
  reactive,
  ref
} from "vue";

import { API_URL } from "../../config/api";

// ============================================
// FORMULARIO
// ============================================

const form = reactive({

  // -----------------------------
  // DATOS PERSONALES
  // -----------------------------

  apellidoPaterno: "",

  apellidoMaterno: "",

  nombre: "",

  numeroControl: "",

  edad: "",

  sexo: "",


  // -----------------------------
  // CONTACTO
  // -----------------------------

  email: "",

  telefono: "",

  estado: "",


  // -----------------------------
  // INSTITUCIÓN
  // -----------------------------

  institucion: "",

  otraInstitucion: "",

  carrera: "",

  otraCarrera: "",


  // -----------------------------
  // EMERGENCIA
  // -----------------------------

  contactoEmergenciaNombre: "",

  contactoEmergenciaTelefono: "",


  // -----------------------------
  // PARTICIPACIÓN
  // -----------------------------

  tipoParticipacion: "",



  // -----------------------------
  // DIFUSIÓN
  // -----------------------------

  comoSeEntero: "",

  otroMedio: "",


  // -----------------------------
  // CONSENTIMIENTO
  // -----------------------------

  consentimiento: false

});


// ============================================
// ESTADOS
// ============================================

const loading = ref(false);

const registroExitoso = ref(false);

const folio = ref("");

const error = ref("");


// ============================================
// GENERAR FOLIO
// ============================================

function generarFolio() {

  const fecha = new Date();

  const año = fecha.getFullYear();

  const numero = Math.floor(
    100000 +
    Math.random() * 900000
  );

  return `ESCALA-${año}-${numero}`;

}


// ============================================
// VALIDAR DATOS
// ============================================

function validarFormulario() {

  if (!form.apellidoPaterno.trim()) {

    error.value =
      "Escribe tu apellido paterno.";

    return false;

  }


  if (!form.apellidoMaterno.trim()) {

    error.value =
      "Escribe tu apellido materno.";

    return false;

  }


  if (!form.nombre.trim()) {

    error.value =
      "Escribe tu nombre.";

    return false;

  }


  if (!form.edad) {

    error.value =
      "Selecciona tu rango de edad.";

    return false;

  }


  if (!form.sexo) {

    error.value =
      "Selecciona tu sexo biológico.";

    return false;

  }


  if (!form.email.trim()) {

    error.value =
      "Escribe tu correo electrónico.";

    return false;

  }


  if (!form.telefono.trim()) {

    error.value =
      "Escribe tu número de teléfono.";

    return false;

  }


  if (!form.estado) {

    error.value =
      "Selecciona tu estado de procedencia.";

    return false;

  }


  if (!form.institucion) {

    error.value =
      "Selecciona tu institución de procedencia.";

    return false;

  }


  if (
    form.institucion === "Otro" &&
    !form.otraInstitucion.trim()
  ) {

    error.value =
      "Especifica tu institución.";

    return false;

  }


  if (!form.carrera) {

    error.value =
      "Selecciona tu carrera o área de especialización.";

    return false;

  }


  if (
    form.carrera === "Otro" &&
    !form.otraCarrera.trim()
  ) {

    error.value =
      "Especifica tu carrera o área.";

    return false;

  }


  if (
    !form.contactoEmergenciaNombre.trim()
  ) {

    error.value =
      "Escribe el nombre del contacto de emergencia.";

    return false;

  }


  if (
    !form.contactoEmergenciaTelefono.trim()
  ) {

    error.value =
      "Escribe el número del contacto de emergencia.";

    return false;

  }


  if (!form.tipoParticipacion) {

    error.value =
      "Selecciona el tipo de participación.";

    return false;

  }


  if (!form.comoSeEntero) {

    error.value =
      "Selecciona cómo te enteraste del congreso.";

    return false;

  }


  if (
    form.comoSeEntero === "Otro" &&
    !form.otroMedio.trim()
  ) {

    error.value =
      "Especifica cómo te enteraste del congreso.";

    return false;

  }


  if (!form.consentimiento) {

    error.value =
      "Debes aceptar el consentimiento para continuar.";

    return false;

  }


  error.value = "";

  return true;

}


// ============================================
// REGISTRAR
// ============================================

async function registrar() {

  if (!validarFormulario()) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  loading.value = true;
  error.value = "";

  try {

    const response = await fetch(`${API_URL}/eventos/4/inscripciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apellidoPaterno: form.apellidoPaterno.trim(),
        apellidoMaterno: form.apellidoMaterno.trim(),
        nombre: form.nombre.trim(),
        numeroControl: form.numeroControl.trim(),
        edad: Number(form.edad),
        sexo: form.sexo,
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        estado: form.estado,
        institucion: form.institucion,
        otraInstitucion: form.otraInstitucion,
        carrera: form.carrera,
        otraCarrera: form.otraCarrera,
        contactoEmergenciaNombre: form.contactoEmergenciaNombre.trim(),
        contactoEmergenciaTelefono: form.contactoEmergenciaTelefono.trim(),
        tipoParticipacion: form.tipoParticipacion,
        comoSeEntero: form.comoSeEntero,
        otroMedio: form.otroMedio,
        consentimiento: form.consentimiento,
      }),
    });

    if (!response.ok) {
      let errorData = {};
      try { errorData = await response.json(); } catch { errorData = {}; }
      throw new Error(errorData.message || "No se pudo completar el registro.");
    }

    const data = await response.json();

    if (!data.folio) {
      throw new Error("El servidor no devolvió un folio de registro.");
    }

    folio.value = data.folio;
    registroExitoso.value = true;
    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (e) {
    console.error("Error al registrar:", e);
    error.value = e.message || "No se pudo completar el registro. Intenta de nuevo.";
  } finally {
    loading.value = false;
  }

}


// ============================================
// NUEVO REGISTRO
// ============================================

function nuevoRegistro() {

  Object.keys(form).forEach((key) => {

    if (typeof form[key] === "boolean") {

      form[key] = false;

    } else {

      form[key] = "";

    }

  });


  folio.value = "";

  error.value = "";

  registroExitoso.value = false;

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}

</script>


<style scoped>

/* =========================================
   RESET
========================================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


/* =========================================
   PAGE
========================================= */

.registro-page {

  min-height: 100vh;

  background: #f4f7fb;

  font-family:
    'Segoe UI',
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

  color: #334155;

}


/* =========================================
   HEADER
========================================= */

.registro-header {

  background:
    linear-gradient(
      135deg,
      #003366,
      #0052a3
    );

  color: white;

  padding:
    35px 20px 80px;

}


.header-content {

  max-width: 1150px;

  margin: auto;

}


.back-link {

  color: white;

  text-decoration: none;

  font-size: 0.9rem;

  opacity: 0.9;

  transition: 0.2s;

}


.back-link:hover {

  opacity: 1;

  text-decoration: underline;

}


.header-title {

  margin-top: 30px;

}


.event-badge {

  display: inline-block;

  background:
    rgba(255,255,255,0.15);

  border:
    1px solid
    rgba(255,255,255,0.25);

  padding:
    7px 14px;

  border-radius: 30px;

  font-size: 0.78rem;

  font-weight: 700;

  letter-spacing: 1px;

}


.header-title h1 {

  margin-top: 15px;

  font-size: 2.5rem;

  font-weight: 700;

}


.header-title p {

  margin-top: 8px;

  color:
    rgba(255,255,255,0.85);

  font-size: 1rem;

}


/* =========================================
   CONTAINER
========================================= */

.registro-container {

  max-width: 1150px;

  margin:
    -45px auto 50px;

  padding:
    0 20px;

  display: grid;

  grid-template-columns:
    1fr 330px;

  gap: 30px;

  position: relative;

  z-index: 2;

}


/* =========================================
   CARD
========================================= */

.registro-card {

  background: white;

  border-radius: 18px;

  padding: 35px;

  box-shadow:
    0 10px 30px
    rgba(0,0,0,0.08);

}


/* =========================================
   FORM SECTION
========================================= */

.form-section {

  padding-bottom: 35px;

  margin-bottom: 35px;

  border-bottom:
    1px solid #e2e8f0;

}


.form-section:last-of-type {

  border-bottom: none;

  margin-bottom: 0;

}


/* =========================================
   SECTION HEADER
========================================= */

.section-header {

  display: flex;

  gap: 15px;

  align-items: flex-start;

  margin-bottom: 25px;

}


.section-icon {

  width: 48px;

  height: 48px;

  min-width: 48px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #e8f1fb;

  border-radius: 12px;

  font-size: 22px;

}


.section-header h2 {

  color: #003366;

  font-size: 1.35rem;

  margin-bottom: 5px;

}


.section-header p {

  color: #64748b;

  font-size: 0.88rem;

  line-height: 1.5;

}


/* =========================================
   PRIVACY
========================================= */

.privacy-intro {

  background: #f8fafc;

  border-left:
    4px solid #0052a3;

  padding: 15px 18px;

  margin-bottom: 25px;

  border-radius: 0 10px 10px 0;

}


.privacy-intro p {

  color: #64748b;

  font-size: 0.87rem;

  line-height: 1.6;

}


/* =========================================
   FORM GRID
========================================= */

.form-grid {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 20px;

}


/* =========================================
   FORM GROUP
========================================= */

.form-group {

  margin-bottom: 20px;

}


.form-grid .form-group {

  margin-bottom: 0;

}


.form-group label {

  display: block;

  margin-bottom: 8px;

  color: #334155;

  font-weight: 600;

  font-size: 0.9rem;

}


.form-group label span {

  color: #dc2626;

  margin-left: 2px;

}


.form-group label .optional-label {

  color: #64748b;

  font-size: 0.75rem;

  font-weight: 400;

  margin-left: 5px;

}


/* =========================================
   INPUTS
========================================= */

.form-group input,
.form-group select {

  width: 100%;

  height: 48px;

  padding:
    0 14px;

  border:
    1px solid #d7dee8;

  border-radius: 10px;

  background: #f8fafc;

  outline: none;

  font-size: 0.95rem;

  color: #334155;

  transition: 0.25s;

}


.form-group input::placeholder {

  color: #94a3b8;

}


.form-group input:focus,
.form-group select:focus {

  border-color: #0052a3;

  background: white;

  box-shadow:
    0 0 0 3px
    rgba(0,82,163,0.10);

}


/* =========================================
   RADIO
========================================= */

.radio-group {

  display: flex;

  gap: 25px;

  flex-wrap: wrap;

}


.radio-option {

  display: flex !important;

  align-items: center;

  gap: 8px;

  cursor: pointer;

  font-weight: 500 !important;

  margin: 0 !important;

}


.radio-option input {

  width: 18px;

  height: 18px;

  accent-color: #0052a3;

}


/* =========================================
   CONSENT
========================================= */

.consent-section {

  padding-bottom: 10px;

}


.consent-box {

  background: #f8fafc;

  border:
    1px solid #e2e8f0;

  border-radius: 12px;

  padding: 20px;

  margin-bottom: 20px;

}


.consent-box p {

  color: #64748b;

  font-size: 0.85rem;

  line-height: 1.7;

  margin-bottom: 12px;

}


.consent-box p:last-child {

  margin-bottom: 0;

}


.consent-checkbox {

  display: flex;

  align-items: flex-start;

  gap: 10px;

  cursor: pointer;

  color: #475569;

  font-size: 0.9rem;

  line-height: 1.5;

}


.consent-checkbox input {

  width: 18px;

  height: 18px;

  margin-top: 2px;

  accent-color: #0052a3;

}


.consent-checkbox strong {

  color: #dc2626;

}


/* =========================================
   ERROR
========================================= */

.error-message {

  background: #fef2f2;

  border:
    1px solid #fecaca;

  color: #b91c1c;

  padding: 14px 16px;

  border-radius: 10px;

  margin-bottom: 20px;

  font-size: 0.9rem;

}


/* =========================================
   SUBMIT
========================================= */

.submit-area {

  margin-top: 25px;

}


.required-note {

  color: #64748b;

  font-size: 0.8rem;

  margin-bottom: 12px;

}


.required-note span {

  color: #dc2626;

}


.submit-button {

  width: 100%;

  height: 54px;

  border: none;

  border-radius: 11px;

  background:
    linear-gradient(
      135deg,
      #003366,
      #0052a3
    );

  color: white;

  font-size: 1rem;

  font-weight: 700;

  cursor: pointer;

  transition: 0.25s;

}


.submit-button:hover:not(:disabled) {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(0,51,102,0.20);

}


.submit-button:disabled {

  opacity: 0.7;

  cursor: not-allowed;

}


.arrow {

  margin-left: 8px;

}


/* =========================================
   LOADING
========================================= */

.loading-content {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

}


.spinner {

  width: 18px;

  height: 18px;

  border:
    3px solid
    rgba(255,255,255,0.35);

  border-top-color: white;

  border-radius: 50%;

  animation:
    spin 0.8s linear infinite;

}


@keyframes spin {

  to {

    transform: rotate(360deg);

  }

}


/* =========================================
   EVENT INFO
========================================= */

.event-info {

  align-self: start;

  position: sticky;

  top: 25px;

}


.info-card {

  background: white;

  border-radius: 18px;

  padding: 28px;

  box-shadow:
    0 10px 30px
    rgba(0,0,0,0.08);

  position: sticky;

  top: 20px;

}


.info-icon {

  width: 55px;

  height: 55px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #e8f1fb;

  border-radius: 14px;

  font-size: 25px;

  margin-bottom: 15px;

}


.info-card h3 {

  color: #003366;

  font-size: 1.3rem;

}


.info-card > p {

  color: #64748b;

  font-size: 0.88rem;

  line-height: 1.5;

  margin:
    7px 0 25px;

}


/* =========================================
   INFO ITEM
========================================= */

.info-item {

  display: flex;

  gap: 12px;

  margin-bottom: 20px;

}


.info-item > span {

  font-size: 18px;

}


.info-item strong {

  color: #334155;

  font-size: 0.85rem;

}


.info-item p {

  color: #64748b;

  font-size: 0.82rem;

  margin-top: 3px;

  line-height: 1.4;

}


/* =========================================
   DIVIDER
========================================= */

.info-divider {

  height: 1px;

  background: #e2e8f0;

  margin: 10px 0 20px;

}


/* =========================================
   IMPORTANT NOTICE
========================================= */

.important-notice {

  background: #eff6ff;

  border-radius: 10px;

  padding: 15px;

}


.important-notice strong {

  color: #1d4ed8;

  font-size: 0.85rem;

}


.important-notice p {

  color: #64748b;

  font-size: 0.8rem;

  line-height: 1.5;

  margin-top: 6px;

}


/* =========================================
   SUCCESS
========================================= */

.success-message {

  display: flex;

  align-items: flex-start;

  gap: 20px;

  padding: 30px;

  background: #f0fdf4;

  border:
    1px solid #bbf7d0;

  border-radius: 15px;

}


.success-icon {

  width: 55px;

  height: 55px;

  min-width: 55px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #16a34a;

  color: white;

  border-radius: 50%;

  font-size: 28px;

  font-weight: bold;

}


.success-content h2 {

  color: #166534;

  margin-bottom: 8px;

  font-size: 1.5rem;

}


.success-content > p {

  color: #4b5563;

  line-height: 1.5;

}


.folio-box {

  margin:
    25px 0 15px;

  background: white;

  border:
    2px dashed #22c55e;

  border-radius: 12px;

  padding: 20px;

  text-align: center;

}


.folio-box span {

  display: block;

  color: #64748b;

  font-size: 0.8rem;

  text-transform: uppercase;

  letter-spacing: 1px;

  margin-bottom: 8px;

}


.folio-box strong {

  color: #166534;

  font-size: 1.5rem;

  letter-spacing: 1px;

}


.success-note {

  font-size: 0.85rem;

  color: #64748b !important;

}


.new-register-button {

  margin-top: 20px;

  padding:
    12px 20px;

  border: none;

  border-radius: 9px;

  background: #003366;

  color: white;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

}


.new-register-button:hover {

  background: #0052a3;

}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 900px) {

  .registro-container {

    grid-template-columns: 1fr;

  }


  .event-info {

    position: static;

    order: -1;

  }


  .info-card {

    position: static;

  }

}


@media (max-width: 650px) {

  .registro-header {

    padding:
      25px 20px 70px;

  }


  .header-title h1 {

    font-size: 2rem;

  }


  .registro-card {

    padding:
      25px 20px;

  }


  .form-grid {

    grid-template-columns: 1fr;

    gap: 0;

  }


  .form-grid .form-group {

    margin-bottom: 20px;

  }


  .radio-group {

    flex-direction: column;

    gap: 12px;

  }


  .success-message {

    flex-direction: column;

    padding: 22px;

  }

}

</style>