<template>
  <div class="registro-page">

    <!-- =========================================
         HEADER
    ========================================== -->

    <header class="registro-header">

      <div class="header-content">

        <router-link
          to="/evento/2"
          class="back-link"
        >
          ← Regresar al evento
        </router-link>

        <div class="header-title">

          <span class="event-badge">
            CONGRESO ARGOS
          </span>

          <h1>
            Registro de Participante
          </h1>

          <p>
            Completa el formulario para registrarte
            al Congreso ARGOS.
          </p>

        </div>

      </div>

    </header>


    <!-- =========================================
         CONTENIDO
    ========================================== -->

    <main class="registro-container">


      <!-- =======================================
           FORMULARIO
      ======================================== -->

      <div class="registro-card">


        <!-- =====================================
             REGISTRO EXITOSO
        ====================================== -->

        <div
          v-if="registroExitoso"
          class="success-message"
        >

          <div class="success-icon">
            ✓
          </div>

          <div>

            <h3>
              ¡Registro realizado correctamente!
            </h3>

            <p>
              Tus datos fueron registrados
              correctamente para el Congreso ARGOS.
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


            <!-- EDAD -->

            <div class="form-group">

              <label>
                Edad
                <span>*</span>
              </label>

              <select
                v-model="form.edad"
                required
              >

                <option value="">
                  Selecciona un rango de edad
                </option>

                <option value="Menos de 18 años">
                  Menos de 18 años
                </option>

                <option value="18 a 29 años">
                  18 a 29 años
                </option>

                <option value="30 a 39 años">
                  30 a 39 años
                </option>

                <option value="40 a 49 años">
                  40 a 49 años
                </option>

                <option value="Más de 50 años">
                  Más de 50 años
                </option>

              </select>

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


                <label class="radio-option">

                  <input
                    v-model="form.sexo"
                    type="radio"
                    value="Otro"
                  />

                  <span>
                    Otro
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


            <!-- TELEFONO -->

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
                Carrera / Área de especialización /
                disciplina
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
               TALLA DE PLAYERA
          ==================================== -->

          <section class="form-section">

            <div class="section-header">

              <div class="section-icon">
                👕
              </div>

              <div>

                <h2>
                  Talla de playera
                </h2>

                <p>
                  Selecciona la talla de playera que
                  utilizarás durante el evento.
                </p>

              </div>

            </div>


            <div class="form-group">

              <label>
                Talla de playera
                <span>*</span>
              </label>

              <select
                v-model="form.tallaPlayera"
                required
              >

                <option value="">
                  Selecciona una talla
                </option>

                <option value="CH">
                  CH
                </option>

                <option value="M">
                  M
                </option>

                <option value="G">
                  G
                </option>

                <option value="XL">
                  XL
                </option>

                <option value="XXL">
                  XXL
                </option>

                <option value="XXXL">
                  XXXL
                </option>

              </select>

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
                  Selecciona la opción que corresponda
                  a tu participación.
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

                <option value="Asistente estudiante de Licenciatura">
                  Asistente estudiante de Licenciatura
                </option>

                <option value="Asistente estudiante de Posgrado">
                  Asistente estudiante de Posgrado
                </option>

                <option value="Docente">
                  Docente
                </option>

                <option value="Empresario(a)">
                  Empresario(a)
                </option>

                <option value="Público en general">
                  Público en general
                </option>

                <option value="Ponente">
                  Ponente
                </option>

                <option value="Egresada / Egresado">
                  Egresada / Egresado
                </option>

                <option value="Otro">
                  Otro
                </option>

              </select>

            </div>


            <div
              v-if="form.tipoParticipacion === 'Otro'"
              class="form-group"
            >

              <label>
                Especifica tu participación
                <span>*</span>
              </label>

              <input
                v-model="form.otraParticipacion"
                type="text"
                placeholder="Especifica"
                :required="
                  form.tipoParticipacion === 'Otro'
                "
              />

            </div>

          </section>


          <!-- ===================================
               COMO SE ENTERÓ
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

              </div>

            </div>


            <div class="consent-box">

              <p>
                Autorizo expresamente al Comité
                Organizador del Congreso ARGOS para
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
            Congreso ARGOS
          </h3>

          <p>
            Registro de participantes del
            Congreso ARGOS.
          </p>


          <div class="info-item">

            <span>
              📅
            </span>

            <div>

              <strong>
                Fecha
              </strong>

              <p>
                25 de Octubre
              </p>

            </div>

          </div>


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


          <div class="info-item">

            <span>
              👥
            </span>

            <div>

              <strong>
                Cupo
              </strong>

              <p>
                300 participantes
              </p>

            </div>

          </div>


          <div class="info-divider"></div>


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
} from 'vue'


// ========================================
// FORMULARIO
// ========================================

const form = reactive({

  // Datos personales

  apellidoPaterno: '',

  apellidoMaterno: '',

  nombre: '',

  edad: '',

  sexo: '',


  // Contacto

  email: '',

  telefono: '',

  estado: '',


  // Institución

  institucion: '',

  otraInstitucion: '',

  carrera: '',

  otraCarrera: '',


  // Playera

  tallaPlayera: '',


  // Emergencia

  contactoEmergenciaNombre: '',

  contactoEmergenciaTelefono: '',


  // Participación

  tipoParticipacion: '',

  otraParticipacion: '',


  // Difusión

  comoSeEntero: '',

  otroMedio: '',


  // Consentimiento

  consentimiento: false

})


// ========================================
// ESTADOS
// ========================================

const loading = ref(false)

const registroExitoso = ref(false)

const folio = ref('')


// ========================================
// GENERAR FOLIO
// ========================================

function generarFolio() {

  const fecha =
    new Date()

  const año =
    fecha.getFullYear()

  const numero =
    Math.floor(
      100000 +
      Math.random() * 900000
    )

  return `ARGOS-${año}-${numero}`

}


// ========================================
// REGISTRAR
// ========================================

function registrar() {

  loading.value = true


  const nuevoFolio =
    generarFolio()


  const registro = {

    ...form,

    evento:
      'Congreso ARGOS',

    eventoId:
      2,

    folio:
      nuevoFolio,

    estadoRegistro:
      'Registrado',

    fechaRegistro:
      new Date().toISOString()

  }


  // Guardar temporalmente

  localStorage.setItem(

    'registroArgos',

    JSON.stringify(registro)

  )


  localStorage.setItem(

    'folioArgos',

    nuevoFolio

  )


  // Simular registro

  setTimeout(() => {

    loading.value = false

    folio.value =
      nuevoFolio

    registroExitoso.value =
      true

    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    })

  }, 700)

}

</script>


<style scoped>

/* ========================================
   RESET
======================================== */

* {

  margin: 0;

  padding: 0;

  box-sizing: border-box;

}


/* ========================================
   PAGE
======================================== */

.registro-page {

  min-height: 100vh;

  background: #f4f7fb;

  font-family:
    'Segoe UI',
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

}


/* ========================================
   HEADER
======================================== */

.registro-header {

  background:
    linear-gradient(
      135deg,
      #003366,
      #0052a3
    );

  color: white;

  padding:
    35px 20px 85px;

}


.header-content {

  max-width: 1200px;

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
    7px 15px;

  border-radius: 30px;

  font-size: 0.78rem;

  font-weight: 700;

  letter-spacing: 1px;

}


.header-title h1 {

  margin-top: 15px;

  font-size: 2.5rem;

  font-weight: 800;

}


.header-title p {

  margin-top: 8px;

  color:
    rgba(255,255,255,0.85);

  font-size: 1rem;

}


/* ========================================
   CONTAINER
======================================== */

.registro-container {

  max-width: 1200px;

  margin:
    -45px auto 60px;

  padding:
    0 20px;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr) 330px;

  gap: 30px;

  position: relative;

  z-index: 2;

}


/* ========================================
   CARD
======================================== */

.registro-card {

  background: white;

  border-radius: 18px;

  padding: 40px;

  box-shadow:
    0 12px 35px
    rgba(0,0,0,0.08);

}


/* ========================================
   SECTIONS
======================================== */

.form-section {

  padding-bottom: 35px;

  margin-bottom: 35px;

  border-bottom:
    1px solid #e5eaf0;

}


.form-section:last-of-type {

  border-bottom: none;

  margin-bottom: 10px;

}


/* ========================================
   SECTION HEADER
======================================== */

.section-header {

  display: flex;

  align-items: flex-start;

  gap: 15px;

  margin-bottom: 25px;

}


.section-icon {

  min-width: 48px;

  width: 48px;

  height: 48px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #e8f1fb;

  border-radius: 13px;

  font-size: 21px;

}


.section-header h2 {

  color: #003366;

  font-size: 1.35rem;

  font-weight: 750;

}


.section-header p {

  color: #64748b;

  font-size: 0.88rem;

  line-height: 1.5;

  margin-top: 4px;

}


/* ========================================
   PRIVACY
======================================== */

.privacy-intro {

  background: #f8fafc;

  border-left:
    4px solid #0052a3;

  padding:
    15px 17px;

  border-radius:
    0 10px 10px 0;

  margin-bottom: 25px;

}


.privacy-intro p {

  color: #64748b;

  font-size: 0.86rem;

  line-height: 1.6;

}


/* ========================================
   GRID
======================================== */

.form-grid {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 20px;

}


/* ========================================
   FORM GROUP
======================================== */

.form-group {

  margin-bottom: 20px;

}


.form-group label {

  display: block;

  margin-bottom: 8px;

  color: #334155;

  font-size: 0.9rem;

  font-weight: 650;

}


.form-group label span {

  color: #dc2626;

  margin-left: 2px;

}


/* ========================================
   INPUTS
======================================== */

.form-group input,
.form-group select {

  width: 100%;

  min-height: 49px;

  padding:
    12px 14px;

  border:
    1px solid #d7dee8;

  border-radius: 10px;

  background: #f8fafc;

  color: #1e293b;

  outline: none;

  font-family: inherit;

  font-size: 0.93rem;

  transition: 0.2s;

}


.form-group input::placeholder {

  color: #9ca3af;

}


.form-group input:focus,
.form-group select:focus {

  border-color: #0052a3;

  background: white;

  box-shadow:
    0 0 0 3px
    rgba(0,82,163,0.10);

}


/* ========================================
   RADIO
======================================== */

.radio-group {

  display: flex;

  flex-wrap: wrap;

  gap: 12px;

}


.radio-option {

  display: flex;

  align-items: center;

  gap: 8px;

  padding:
    11px 15px;

  border:
    1px solid #d7dee8;

  border-radius: 10px;

  background: #f8fafc;

  cursor: pointer;

  color: #475569;

  font-size: 0.9rem;

  transition: 0.2s;

}


.radio-option:hover {

  border-color: #0052a3;

  background: #f1f6fc;

}


.radio-option input {

  width: 16px;

  height: 16px;

  accent-color: #003366;

}


/* ========================================
   CONSENT
======================================== */

.consent-box {

  background: #f8fafc;

  border:
    1px solid #e2e8f0;

  border-radius: 12px;

  padding: 20px;

  margin-bottom: 18px;

}


.consent-box p {

  color: #64748b;

  font-size: 0.84rem;

  line-height: 1.65;

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

  color: #334155;

  font-size: 0.9rem;

  line-height: 1.5;

}


.consent-checkbox input {

  width: 18px;

  height: 18px;

  margin-top: 2px;

  accent-color: #003366;

  cursor: pointer;

}


.consent-checkbox strong {

  color: #dc2626;

}


/* ========================================
   SUBMIT
======================================== */

.submit-area {

  margin-top: 30px;

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

  min-height: 54px;

  border: none;

  border-radius: 11px;

  background:
    linear-gradient(
      135deg,
      #003366,
      #0052a3
    );

  color: white;

  font-family: inherit;

  font-size: 1rem;

  font-weight: 700;

  cursor: pointer;

  transition: 0.25s;

  box-shadow:
    0 7px 18px
    rgba(0,51,102,0.18);

}


.submit-button:hover:not(:disabled) {

  transform:
    translateY(-2px);

  box-shadow:
    0 10px 25px
    rgba(0,51,102,0.25);

}


.submit-button:disabled {

  opacity: 0.7;

  cursor: not-allowed;

}


/* ========================================
   LOADING
======================================== */

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
    2px solid
    rgba(255,255,255,0.35);

  border-top-color: white;

  border-radius: 50%;

  animation:
    spin 0.7s linear infinite;

}


@keyframes spin {

  to {

    transform:
      rotate(360deg);

  }

}


/* ========================================
   EVENT INFO
======================================== */

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
    0 12px 35px
    rgba(0,0,0,0.08);

}


.info-icon {

  width: 58px;

  height: 58px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #e8f1fb;

  border-radius: 15px;

  font-size: 26px;

  margin-bottom: 16px;

}


.info-card h3 {

  color: #003366;

  font-size: 1.3rem;

  font-weight: 750;

}


.info-card > p {

  color: #64748b;

  font-size: 0.87rem;

  line-height: 1.55;

  margin:
    7px 0 25px;

}


.info-item {

  display: flex;

  gap: 12px;

  margin-bottom: 20px;

}


.info-item > span {

  font-size: 18px;

}


.info-item strong {

  display: block;

  color: #334155;

  font-size: 0.84rem;

}


.info-item p {

  color: #64748b;

  font-size: 0.82rem;

  margin-top: 3px;

  line-height: 1.4;

}


.info-divider {

  height: 1px;

  background: #e5eaf0;

  margin:
    20px 0;

}


.important-notice {

  padding: 15px;

  border-radius: 11px;

  background: #eff6ff;

  border:
    1px solid #dbeafe;

}


.important-notice strong {

  display: block;

  color: #1d4ed8;

  font-size: 0.85rem;

  margin-bottom: 5px;

}


.important-notice p {

  color: #475569;

  font-size: 0.78rem;

  line-height: 1.5;

}


/* ========================================
   SUCCESS
======================================== */

.success-message {

  display: flex;

  align-items: flex-start;

  gap: 20px;

  padding: 25px;

  background: #f0fdf4;

  border:
    1px solid #bbf7d0;

  border-radius: 15px;

}


.success-icon {

  min-width: 48px;

  width: 48px;

  height: 48px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #16a34a;

  color: white;

  border-radius: 50%;

  font-size: 24px;

  font-weight: 700;

}


.success-message h3 {

  color: #166534;

  font-size: 1.25rem;

  margin-bottom: 6px;

}


.success-message p {

  color: #4b5563;

  font-size: 0.9rem;

  line-height: 1.5;

}


.folio-box {

  display: flex;

  flex-direction: column;

  gap: 4px;

  margin:
    18px 0;

  padding: 15px;

  background: white;

  border:
    1px solid #bbf7d0;

  border-radius: 10px;

}


.folio-box span {

  color: #64748b;

  font-size: 0.78rem;

}


.folio-box strong {

  color: #166534;

  font-size: 1.3rem;

  letter-spacing: 1px;

}


.success-note {

  font-size: 0.8rem !important;

  color: #64748b !important;

}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 900px) {

  .registro-container {

    grid-template-columns: 1fr;

  }


  .event-info {

    position: static;

    order: -1;

  }

}


@media (max-width: 650px) {

  .registro-header {

    padding:
      25px 20px 75px;

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


  .radio-group {

    flex-direction: column;

  }


  .radio-option {

    width: 100%;

  }


  .success-message {

    flex-direction: column;

  }

}

</style>