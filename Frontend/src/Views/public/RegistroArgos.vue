<template>
  <div class="registro-page">
    <!-- HEADER -->
    <header class="registro-header">

      <div class="header-content">
        <router-link to="/evento/argos" class="back-link">
          ← Regresar al evento
        </router-link>

        <div class="header-title">
          <span class="event-badge">CONGRESO ARGOS</span>
          <h1>Registro de Estudiante</h1>
          <p>
            Completa tus datos y selecciona el taller y la visita
            industrial a los que deseas asistir.
          </p>

        </div>
      
      </div>
    
    </header>


    <main class="registro-container">
    
      <!-- FORMULARIO -->
      <div class="registro-card">

        <!-- MENSAJE DE EXITO -->
       
<!-- MENSAJE DE REGISTRO EXITOSO -->
<div v-if="registroExitoso" class="success-message">

  <div class="success-content">

    <!-- ENCABEZADO -->
    <div class="success-heading">
      <div class="success-icon">✓</div>

      <div>
        <span class="success-label">CONGRESO ARGOS</span>
        <h2>¡Registro completado!</h2>
        <p>
          Tu inscripción se ha realizado correctamente.
          Ya formas parte de nuestro congreso.
        </p>
      </div>
    </div>

    <!-- FOLIO -->
    <!-- <div class="folio-box">
      <span>FOLIO DE REGISTRO</span>
      <strong>{{ folio }}</strong>
      <small>Identificador único de tu inscripción</small>
    </div> -->

    <!-- CREDENCIAL DIGITAL CON QR -->
    <div v-if="qr" class="qr-ticket">

      <div class="qr-ticket-header">
        <div>
          <span class="qr-overline">ACREDITACIÓN DIGITAL</span>
          <h3>Congreso ARGOS</h3>
          <p>Comprobante de inscripción</p>
        </div>

        <div class="qr-ticket-logo">AR</div>
      </div>

      <div class="qr-divider"></div>

      <!-- FOLIO DE INSCRIPCION -->
<div class="qr-folio">
  <span class="qr-folio-label">Tu número de folio</span>
  <strong class="qr-folio-number">{{ folio }}</strong>
</div>

      <div class="qr-image-container">
        <img
          :src="qr"
          alt="Código QR de acreditación del Congreso ARGOS"
          class="qr-image"
        />
      </div>

      <h4>Tu acceso al congreso</h4>

      <p class="qr-instructions">
        Presenta este código QR durante el proceso de
        acreditación para facilitar la identificación
        de tu registro.
      </p>

      <div class="qr-ticket-footer">
        <span>CONGRESO ARGOS</span>
        <span>PARTICIPANTE REGISTRADO</span>
      </div>

      <a
        :href="qr"
        :download="`ARGOS-QR-${folio}.png`"
        class="download-qr-button"
      >
        <span>↓</span>
        Descargar código QR
      </a>

    </div>

    <!-- SI NO HAY QR -->
    <div v-else class="qr-error">
      <p>
        Tu registro fue realizado, pero no se pudo mostrar
        el código QR. Conserva tu folio de registro.
      </p>
    </div>

    <!-- RECOMENDACION -->
    <div class="success-reminder">
      <span class="reminder-icon">ℹ</span>
      <p>
        <strong>Importante:</strong>
        Guarda tu folio y descarga tu código QR.
        Te recomendamos conservarlo en tu dispositivo
        para presentarlo el día del evento.
      </p>
    </div>

    <!-- NUEVO REGISTRO -->
    <button
      class="new-register-button"
      @click="nuevoRegistro"
    >
      Realizar otro registro →
    </button>

  </div>
</div>


        <form
          v-else
          class="registro-form"
          @submit.prevent="registrar"
        >

          <!-- DATOS DEL ESTUDIANTE -->
          <section class="form-section">

            <div class="section-header">
            
              <div class="section-icon">👨‍🎓</div>
            
              <div>
                <h2>Datos del estudiante</h2>
                <p>Ingresa tus datos personales y escolares.</p>
              </div>
            
            </div>


            <div class="form-grid">

              <div class="form-group">
                <label>Nombre(s) <span>*</span></label>
                <input
                  v-model.trim="form.nombre"
                  type="text"
                  maxlength="100"
                  placeholder="Escribe tu nombre"
                  required
                />

              </div>


              <div class="form-group">
                <label>Apellidos <span>*</span></label>
                <input
                  v-model.trim="form.apellidos"
                  type="text"
                  maxlength="120"
                  placeholder="Escribe tus apellidos"
                  required
                />

              </div>

              <div class="form-group">
                <label>Número de control</label>
                <input
                  v-model.trim="form.numeroControl"
                  type="text"
                  maxlength="30"
                  placeholder="Número de control"
                />
              </div>

              <div class="form-group">
                <label>Edad <span>*</span></label>
                <input
                  v-model.number="form.edad"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Tu edad"
                  required
                />
              </div>

              <div class="form-group">
                <label>Sexo <span>*</span></label>
                <select v-model="form.sexo" required>
                  <option value="">Selecciona una opción</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Prefiero no especificar">
                    Prefiero no especificar
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Talla de playera <span>*</span></label>
                <select v-model="form.tallaPlayera" required>
                  <option value="">Selecciona tu talla</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="XXXL">XXXL</option>
                </select>
                <small>Selecciona cuidadosamente tu talla.</small>
              </div>
                 <!-- !!!!!!!!!! -->
                 <!-- LO PUSE PARA PROBAR SI QUIERES CAMBIALO --> 
              <div class="form-group">
                <label>NSS (número de seguro social Facultativo) <span>*</span></label>
                <input
                  v-model.trim="form.nss"
                  type="text"
                  inputmode="numeric"
                  maxlength="11"
                  placeholder="11 dígitos"
                  required
                />
                <div class="aviso-nss">
                  <span class="aviso-icono">ⓘ</span>
                  <p>
                    <strong>Importante:</strong>
                    El número de seguridad social que debes ingresar es el
                    <strong>facultativo</strong>.
                    https://serviciosdigitales.imss.gob.mx/gestionAsegurados-web-externo/vigencia
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- INSTITUCION -->
          <section class="form-section">
            <div class="section-header">
              <div class="section-icon">🏫</div>
              <div>
                <h2>Tecnológico de procedencia</h2>
                <p>Indica la institución donde estudias actualmente.</p>
              </div>
            </div>

            <div class="form-group">
              <label>Institución de procedencia <span>*</span></label>
              <select v-model="form.tecnologico" required>
                <option value="">Selecciona tu tecnológico</option>
                <option value="Instituto Tecnológico de Ensenada">
                  Instituto Tecnológico de Ensenada
                </option>
                <option value="Instituto Tecnológico de Tijuana">
                  Instituto Tecnológico de Tijuana
                </option>
                <option value="Instituto Tecnológico de Mexicali">
                  Instituto Tecnológico de Mexicali
                </option>
                <option value="Instituto Tecnológico de La Paz">
                  Instituto Tecnológico de La Paz
                </option>
                <option value="Otro tecnológico">Otro tecnológico</option>
                <option value="Otra institución">Otra institución</option>
              </select>
            </div>

            <div
              v-if="
                form.tecnologico === 'Otro tecnológico' ||
                form.tecnologico === 'Otra institución'
              "
              class="form-group"
            >
              <label>Nombre de tu institución <span>*</span></label>
              <input
                v-model.trim="form.otroTecnologico"
                type="text"
                maxlength="150"
                placeholder="Escribe el nombre de tu institución"
                required
              />
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label>Carrera <span>*</span></label>
                <input
                  v-model.trim="form.carrera"
                  type="text"
                  maxlength="120"
                  placeholder="Ej. Ingeniería Industrial"
                  required
                />
              </div>

              <div class="form-group">
                <label>Semestre <span>*</span></label>
                <select v-model="form.semestre" required>
                  <option value="">Selecciona tu semestre</option>
                  <option
                    v-for="n in 12"
                    :key="n"
                    :value="String(n)"
                  >
                    {{ n }}° semestre
                  </option>
                </select>
              </div>
            </div>
          </section>

          <!-- CONTACTO -->
          <section class="form-section">
            <div class="section-header">
              <div class="section-icon">📱</div>
              <div>
                <h2>Información de contacto</h2>
                <p>Para comunicarnos contigo sobre el congreso.</p>
              </div>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label>Correo electrónico <span>*</span></label>
                <input
                  v-model.trim="form.email"
                  type="email"
                  maxlength="150"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div class="form-group">
                <label>Teléfono <span>*</span></label>
                <input
                  v-model.trim="form.telefono"
                  type="tel"
                  maxlength="20"
                  placeholder="646 000 0000"
                  required
                />
              </div>
            </div>
          </section>

          <!-- TALLER -->
          <section class="form-section">
            <div class="section-header">
              <div class="section-icon">🛠️</div>
              <div>
                <h2>Selección de taller</h2>
                <p>
                  Selecciona el taller al que deseas asistir el jueves 5
                  de noviembre.
                </p>
              </div>
            </div>

            <div class="schedule-note">
              <strong>Horario de talleres</strong>
              <p>
                Escoge uno de los talleres en uno de los horarios disponibles.
              </p>
              <p>
                Si el taller es durante el turno matutino, tu visita industrial
                deberá ser en el turno vespertino.
              </p>
              <p>
                Si el taller es en horario vespertino, tu visita industrial
                deberá ser en el turno matutino.
              </p>
            </div>

            <div class="form-group">
              <label>Taller al que deseas asistir <span>*</span></label>

              <div class="custom-dropdown">
                <button
                  type="button"
                  class="dropdown-trigger"
                  :class="{
                    'dropdown-active': dropdownAbierto === 'taller'
                  }"
                  @click="toggleDropdown('taller')"
                  :aria-expanded="dropdownAbierto === 'taller'"
                >
                  <span
                    :class="{ 'dropdown-placeholder': !form.taller }"
                  >
                    {{ form.taller || "Selecciona un taller" }}
                  </span>

                  <span
                    class="dropdown-arrow"
                    :class="{ rotated: dropdownAbierto === 'taller' }"
                  >
                    ▼
                  </span>
                </button>

                <div
                  v-if="dropdownAbierto === 'taller'"
                  class="dropdown-menu"
                >
                  <!-- TURNO MATUTINO -->
                  <div class="dropdown-group-title">
                    <span>☀️</span>
                    TURNO MATUTINO
                  </div>

                  <button
                    v-for="taller in talleresMatutinos"
                    :key="taller.id"
                    type="button"
                    class="dropdown-option"
                    :class="{
                      'option-disabled': taller.capacidadDisponible === 0
                    }"
                    :disabled="taller.capacidadDisponible === 0"
                    @click="seleccionarTaller(taller)"
                  >
                    <span class="option-name">
                      {{ taller.nombre }}
                    </span>

                    <span class="option-details">
                      <span>🕒 {{ taller.horario }}</span>
                      <span>Capacidad: {{ taller.capacidad }}</span>
                      <span
                        :class="{ 'option-full': taller.capacidadDisponible === 0 }"
                      >
                        {{
                          taller.capacidadDisponible === 0
                            ? 'Sin cupo'
                            : `Disponibles: ${taller.capacidadDisponible ?? 'Por consultar'}`
                        }}
                      </span>
                    </span>

                    <span
                      v-if="form.taller === taller.nombre"
                      class="option-check"
                    >
                      ✓
                    </span>
                  </button>

                  <!-- TURNO VESPERTINO -->
                  <div class="dropdown-group-title">
                    <span>🌙</span>
                    TURNO VESPERTINO
                  </div>

                  <button
                    v-for="taller in talleresVespertinos"
                    :key="taller.id"
                    type="button"
                    class="dropdown-option"
                    :class="{
                      'option-disabled': taller.capacidadDisponible === 0
                    }"
                    :disabled="taller.capacidadDisponible === 0"
                    @click="seleccionarTaller(taller)"
                  >
                    <span class="option-name">
                      {{ taller.nombre }}
                    </span>

                    <span class="option-details">
                      <span>🕒 {{ taller.horario }}</span>
                      <span>Capacidad: {{ taller.capacidad }}</span>
                      <span
                        :class="{ 'option-full': taller.capacidadDisponible === 0 }"
                      >
                        {{
                          taller.capacidadDisponible === 0
                            ? 'Sin cupo'
                            : `Disponibles: ${taller.capacidadDisponible ?? 'Por consultar'}`
                        }}
                      </span>
                    </span>

                    <span
                      v-if="form.taller === taller.nombre"
                      class="option-check"
                    >
                      ✓
                    </span>
                  </button>
                </div>
              </div>

              <small>
                Los horarios y la capacidad corresponden a cada grupo
                de taller.
              </small>

              <div v-if="mismoTurno" class="error-message turno-error">
                ⚠️ {{ MENSAJE_MISMO_TURNO }}
              </div>
            </div>
          </section>

          <!-- VISITA INDUSTRIAL -->
          <section class="form-section">
            <div class="section-header">
              <div class="section-icon">🏭</div>
              <div>
                <h2>Visita industrial</h2>
                <p>
                  Indica la empresa que te interesa visitar el jueves
                  5 de noviembre.
                </p>
              </div>
            </div>

            <div class="schedule-note">
              <strong>Horario de visitas industriales</strong>
              <p>
                Escoge una de las visitas en uno de los horarios disponibles.
              </p>
              <p>
                Si tu visita industrial es durante el turno matutino,
                el taller deberá ser en el turno vespertino.
              </p>
              <p>
                Si tu visita industrial es en horario vespertino,
                el taller deberá ser en el turno matutino.
              </p>
            </div>

            <div class="form-group">
              <label>Empresa que deseas visitar <span>*</span></label>

              <div class="custom-dropdown">
                <button
                  type="button"
                  class="dropdown-trigger"
                  :class="{
                    'dropdown-active': dropdownAbierto === 'empresa'
                  }"
                  @click="toggleDropdown('empresa')"
                  :aria-expanded="dropdownAbierto === 'empresa'"
                >
                  <span
                    :class="{
                      'dropdown-placeholder': !form.visitaEmpresa
                    }"
                  >
                    {{ form.visitaEmpresa || "Selecciona una empresa" }}
                  </span>

                  <span
                    class="dropdown-arrow"
                    :class="{ rotated: dropdownAbierto === 'empresa' }"
                  >
                    ▼
                  </span>
                </button>

                <div
                  v-if="dropdownAbierto === 'empresa'"
                  class="dropdown-menu"
                >
                  <!-- TURNO MATUTINO -->
                  <div class="dropdown-group-title">
                    <span>☀️</span>
                    TURNO MATUTINO
                  </div>

                  <button
                    v-for="empresa in empresasMatutinas"
                    :key="empresa.id"
                    type="button"
                    class="dropdown-option"
                    :class="{
                      'option-disabled': empresa.capacidadDisponible === 0
                    }"
                    :disabled="empresa.capacidadDisponible === 0"
                    @click="seleccionarEmpresa(empresa)"
                  >
                    <span class="option-name">
                      {{ empresa.nombre }}
                    </span>

                    <span class="option-details">
                      <span>🕒 Salida: {{ empresa.horario }}</span>
                      <span>
                        Capacidad: {{ empresa.capacidad }} personas
                      </span>
                      <span
                        :class="{ 'option-full': empresa.capacidadDisponible === 0 }"
                      >
                        {{
                          empresa.capacidadDisponible === 0
                            ? 'Sin cupo'
                            : `Disponibles: ${empresa.capacidadDisponible ?? 'Por consultar'}`
                        }}
                      </span>
                    </span>

                    <span
                      v-if="form.visitaEmpresa === empresa.nombre"
                      class="option-check"
                    >
                      ✓
                    </span>
                  </button>

                  <!-- TURNO VESPERTINO -->
                  <div class="dropdown-group-title">
                    <span>🌙</span>
                    TURNO VESPERTINO
                  </div>

                  <button
                    v-for="empresa in empresasVespertinas"
                    :key="empresa.id"
                    type="button"
                    class="dropdown-option"
                    :class="{
                      'option-disabled': empresa.capacidadDisponible === 0
                    }"
                    :disabled="empresa.capacidadDisponible === 0"
                    @click="seleccionarEmpresa(empresa)"
                  >
                    <span class="option-name">
                      {{ empresa.nombre }}
                    </span>

                    <span class="option-details">
                      <span>🕒 Salida: {{ empresa.horario }}</span>
                      <span>
                        Capacidad: {{ empresa.capacidad }} personas
                      </span>
                      <span
                        :class="{ 'option-full': empresa.capacidadDisponible === 0 }"
                      >
                        {{
                          empresa.capacidadDisponible === 0
                            ? 'Sin cupo'
                            : `Disponibles: ${empresa.capacidadDisponible ?? 'Por consultar'}`
                        }}
                      </span>
                    </span>

                    <span
                      v-if="form.visitaEmpresa === empresa.nombre"
                      class="option-check"
                    >
                      ✓
                    </span>
                  </button>
                </div>
              </div>

              <small>
                Selecciona la visita industrial correspondiente al turno
                contrario de tu taller.
              </small>

              <div v-if="mismoTurno" class="error-message turno-error">
                ⚠️ {{ MENSAJE_MISMO_TURNO }}
              </div>
            </div>
          </section>

          <!-- PROGRAMA -->
          <section class="form-section">
            <div class="section-header">
              <div class="section-icon">📅</div>
              <div>
                <h2>Programa del congreso</h2>
                <p>Consulta las actividades programadas.</p>
              </div>
            </div>

            <div class="program-day">
              <h3>Martes 3 de noviembre</h3>

              <div class="program-item">
                <span class="program-time">17:00 - 20:00</span>
                <div>
                  <strong>Registro</strong>
                  <p>Recepción y preregistro de participantes.</p>
                </div>
              </div>
            </div>

            <div class="program-day">
              <h3>Miércoles 4 de noviembre</h3>

              <div
                v-for="actividad in programaMiercoles"
                :key="actividad.hora + actividad.nombre"
                class="program-item"
                :class="{ comida: actividad.tipo === 'comida' }"
              >
                <span class="program-time">
                  {{ actividad.hora }}
                </span>

                <div>
                  <strong>{{ actividad.nombre }}</strong>
                  <p v-if="actividad.detalle">
                    {{ actividad.detalle }}
                  </p>
                </div>
              </div>
            </div>

            <div class="program-day">
              <h3>Jueves 5 de noviembre</h3>

              <div class="program-item">
                <span class="program-time">
                  Horarios según programación
                </span>
                <div>
                  <strong>Visitas industriales</strong>
                  <p>Recorridos por empresas participantes.</p>
                </div>
              </div>

              <div class="program-item">
                <span class="program-time">
                  Horarios según programación
                </span>
                <div>
                  <strong>Talleres</strong>
                  <p>Primera parte de las actividades prácticas.</p>
                </div>
              </div>

              <div class="program-item comida">
                <span class="program-time">14:00 - 16:00</span>
                <div>
                  <strong>COMIDA</strong>
                </div>
              </div>

              <div class="program-item">
                <span class="program-time">
                  Horarios según programación
                </span>
                <div>
                  <strong>Talleres</strong>
                  <p>Segunda parte de las actividades prácticas.</p>
                </div>
              </div>

              <div class="program-item">
                <span class="program-time">
                  Horarios según programación
                </span>
                <div>
                  <strong>Visitas industriales</strong>
                  <p>Continuación de los recorridos empresariales.</p>
                </div>
              </div>
            </div>

            <div class="program-day">
              <h3>Viernes 6 de noviembre</h3>

              <div class="program-item">
                <span class="program-time">11:00 - 12:00</span>
                <div>
                  <strong>Conferencia y cierre</strong>
                  <p>MFC. Luis Alberto Barrera Vela. Auditorio.</p>
                </div>
              </div>

              <div class="program-item comida">
                <span class="program-time">14:00 - 16:00</span>
                <div>
                  <strong>COMIDA</strong>
                </div>
              </div>

              <div class="program-item">
                <span class="program-time">18:00 - 19:00</span>
                <div>
                  <strong>Conferencia</strong>
                  <p>Mario Espinoza. Auditorio.</p>
                </div>
              </div>

              <div class="program-item">
                <span class="program-time">19:00 - 20:00</span>
                <div>
                  <strong>Conferencia</strong>
                  <p>Brenda Cardenas. Auditorio.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- CONSENTIMIENTO -->
          <section class="form-section consent-section">
            <div class="section-header">
              <div class="section-icon">🔐</div>
              <div>
                <h2>Consentimiento</h2>
                <p>
                  Confirma que la información proporcionada es correcta.
                </p>
              </div>
            </div>

            <label class="consent-checkbox">
              <input
                v-model="form.consentimiento"
                type="checkbox"
                required
              />
              <span>
                Confirmo que los datos proporcionados son correctos y
                autorizo su uso para gestionar mi participación en el
                Congreso Argos. <strong>*</strong>
              </span>
            </label>
          </section>

          <!-- ERROR -->
          <div v-if="error" class="error-message">
            ⚠️ {{ error }}
          </div>

          <!-- BOTON DE REGISTRO -->
          <div class="submit-area">
            <p class="required-note">
              <span>*</span> Campos obligatorios
            </p>

            <button
              type="submit"
              class="submit-button"
              :disabled="loading"
            >
              <span v-if="!loading">
                Completar registro <span class="arrow">→</span>
              </span>
              <span v-else>Registrando...</span>
            </button>
          </div>
        </form>
      </div>

      <!-- INFORMACION LATERAL -->
      <aside class="event-info">
        <div class="info-card">
          <div class="info-icon">🎓</div>

          <h3>Congreso Argos</h3>
          <p>Consulta el programa y completa tu inscripción.</p>

          <div class="info-item">
            <span>📅</span>
            <div>
              <strong>Fechas</strong>
              <p>3 al 6 de noviembre</p>
            </div>
          </div>

          <div class="info-item">
            <span>🛠️</span>
            <div>
              <strong>Talleres</strong>
              <p>Jueves 5 de noviembre</p>
            </div>
          </div>

          <div class="info-item">
            <span>🏭</span>
            <div>
              <strong>Visitas industriales</strong>
              <p>Jueves 5 de noviembre</p>
            </div>
          </div>

          <div class="info-divider"></div>

          <div class="important-notice">
            <strong>ℹ Información importante</strong>
            <p>
              Revisa tu talla de playera y las opciones de taller y visita
              industrial antes de enviar el formulario. Las empresas
              definitivas deben ser confirmadas por el comité organizador.
            </p>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>


<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { API_URL } from "../../config/api";

// IMPORTANTE:
// Cambia este ID por el ID real del evento Argos en tu base de datos.
const eventId = 5;
const qr = ref("");


const talleres = [
  // TURNO MATUTINO (ID 1 AL 10)
  {
    id: 1,
    nombre: "DISEÑO SOLID WORD BASICO (matutino)",
    horario: "10:00 - 13:00",
    capacidad: 25,
    turno: "Matutino"
  },
  {
    id: 2,
    nombre: "MANUFACTURA ADITIVA (matutino)",
    horario: "10:00 - 13:00",
    capacidad: 25,
    turno: "Matutino"
  },
  {
    id: 3,
    nombre: "DISEÑO DE EXPERIMENTOS (matutino)",
    horario: "10:00 - 13:00",
    capacidad: 25,
    turno: "Matutino"
  },
  {
    id: 4,
    nombre: "CORROCIÓN (matutino)",
    horario: "10:00 - 13:00",
    capacidad: 25,
    turno: "Matutino"
  },
  {
    id: 5,
    nombre: "REDISEÑO DE LA SEGURIDAD E HIGIENE INDUSTRIAL (matutino)",
    horario: "10:00 - 13:00",
    capacidad: 25,
    turno: "Matutino"
  },
  {
    id: 6,
    nombre: "TALLER DE IA (matutino)",
    horario: "10:00 - 13:00",
    capacidad: 25,
    turno: "Matutino"
  },
  {
    id: 7,
    nombre: "ERGONOMIA + IA (matutino)",
    horario: "10:00 - 13:00",
    capacidad: 25,
    turno: "Matutino"
  },
  {
    id: 8,
    nombre: "IMPACTO DE CAMBIOS DE INGENIERIA EN LAS CADENAS DE SUMINISTROS (matutino)",
    horario: "10:00 - 12:00",
    capacidad: 25,
    turno: "Matutino"
  },
  {
    id: 9,
    nombre: "USABILIDAD EN INGENIERIA INDUSTRIAL (matutino)",
    horario: "10:00 - 14:00",
    capacidad: 20,
    turno: "Matutino"
  },
  {
    id: 10,
    nombre: "TALLER DE EXCEL PARA OPTIMIZAR LOS PROCESOS (matutino)",
    horario: "10:00 - 14:00",
    capacidad: 20,
    turno: "Matutino"
  },

  // TURNO VESPERTINO (ID 11 AL 19)
  {
    id: 11,
    nombre: "PROMODEL BASICO (vespertino)",
    horario: "16:00 - 18:00",
    capacidad: 25,
    turno: "Vespertino"
  },
  {
    id: 12,
    nombre: "PROMODEL BASICO (vespertino II)",
    horario: "18:00 - 20:00",
    capacidad: 25,
    turno: "Vespertino"
  },
  {
    id: 13,
    nombre: "DISEÑO SOLID WORD BASICO (vespertino)",
    horario: "16:00 - 19:00",
    capacidad: 25,
    turno: "Vespertino"
  },
  {
    id: 14,
    nombre: "MANUFACTURA ADITIVA (vespertino)",
    horario: "16:00 - 20:00",
    capacidad: 20,
    turno: "Vespertino"
  },
  {
    id: 15,
    nombre: "DISEÑO DE EXPERIMENTOS (vespertino)",
    horario: "16:00 - 19:00",
    capacidad: 25,
    turno: "Vespertino"
  },
  {
    id: 16,
    nombre: "AUTOMATIZACION + IA: DOS FORMAS DE RESOLVER EL PROCESO (vespertino)",
    horario: "16:00 - 19:00",
    capacidad: 16,
    turno: "Vespertino"
  },
  {
    id: 17,
    nombre: "DISEÑO DE TUTORES DE IA PARA ING. INDUSTRIAL (vespertino)",
    horario: "16:00 - 19:00",
    capacidad: 25,
    turno: "Vespertino"
  },
  {
    id: 18,
    nombre: "ERGONOMIA + IA (vespertino)",
    horario: "16:00 - 19:00",
    capacidad: 25,
    turno: "Vespertino"
  },
  {
    id: 19,
    nombre: "TALLER DE METROLOGIA Y CALIBRACION (vespertino)",
    horario: "16:00 - 20:00",
    capacidad: 20,
    turno: "Vespertino"
  }
];


// CUPOS 

// { [nombre]: { nombre, capacidad, ocupados, disponibles } }
const cupos = ref({});

function conCupo(item) {
  const cupo = cupos.value[item.nombre];

  if (!cupo) {
    return { ...item, capacidadDisponible: null };
  }

  return {
    ...item,
    capacidad: cupo.capacidad ?? item.capacidad,
    capacidadDisponible: cupo.disponibles
  };
}

async function cargarCupos() {
  try {
    const response = await fetch(
      `${API_URL}/eventos/${eventId}/inscripciones/cupos`
    );

    if (!response.ok) return;

    const data = await response.json();

    cupos.value = Object.fromEntries(
      data.map(cupo => [cupo.nombre, cupo])
    );
  } catch (e) {
    console.error("Error al cargar los cupos:", e);
  }
}

onMounted(cargarCupos);

const talleresMatutinos = computed(() =>
  talleres.filter(taller => taller.turno === "Matutino").map(conCupo)
);

const talleresVespertinos = computed(() =>
  talleres.filter(taller => taller.turno === "Vespertino").map(conCupo)
);



const empresas = [
  // TURNO MATUTINO
  {
    id: 20,
    nombre: "INSTRUMENTOS MUSICALES FENDER S.A. DE C.V. (matutino)",
    horario: "8:30",
    capacidad: 15,
    turno: "Matutino"
  },
  {
    id: 22,
    nombre: "BAJA TACKLE (matutino)",
    horario: "8:30",
    capacidad: 20,
    turno: "Matutino"
  },
  {
    id: 24,
    nombre: "SCHLAGE DE MEXICO S.A. DE C.V. (matutino)",
    horario: "8:30",
    capacidad: 20,
    turno: "Matutino"
  },
  {
    id: 25,
    nombre: "PLENIMEX S.A. DE C.V. (matutino)",
    horario: "9:00",
    capacidad: 20,
    turno: "Matutino"
  },
  {
    id: 26,
    nombre: "GRUPO ZAPATA (matutino)",
    horario: "9:00",
    capacidad: 20,
    turno: "Matutino"
  },
  {
    id: 28,
    nombre: "ZIRCON DE MEXICO S.A. DE C.V. (matutino)",
    horario: "8:00",
    capacidad: 12,
    turno: "Matutino"
  },
  {
    id: 30,
    nombre: "DIALIGHT S.A DE C.V. (matutino)",
    horario: "8:00",
    capacidad: 20,
    turno: "Matutino"
  },
  {
    id: 32,
    nombre: "FABRICAS MONTERREY S.A. DE C.V. (matutino)",
    horario: "8:00",
    capacidad: 30,
    turno: "Matutino"
  },
  {
    id: 34,
    nombre: "CSI EN ENSENADA, S. DE R.L. DE C.V. (matutino)",
    horario: "8:30",
    capacidad: 20,
    turno: "Matutino"
  },
  {
    id: 36,
    nombre: "VINOS KRUGER (matutino)",
    horario: "8:30",
    capacidad: 30,
    turno: "Matutino"
  },
  {
    id: 37,
    nombre: "ICU MEDICAL (matutino)",
    horario: "9:00",
    capacidad: 20,
    turno: "Matutino"
  },
  {
    id: 39,
    nombre: "DOVINTO VINICOLA (matutino)",
    horario: "8:30",
    capacidad: 50,
    turno: "Matutino"
  },
  {
    id: 41,
    nombre: "VINOS BIBAYOFF (matutino)",
    horario: "8:30",
    capacidad: 30,
    turno: "Matutino"
  },
  {
    id: 43,
    nombre: "VINOS PALAFOX (matutino)",
    horario: "9:00",
    capacidad: 30,
    turno: "Matutino"
  },

  // TURNO VESPERTINO
  {
    id: 21,
    nombre: "INSTRUMENTOS MUSICALES FENDER S.A. DE C.V. (vespertino)",
    horario: "13:30",
    capacidad: 15,
    turno: "Vespertino"
  },
  {
    id: 23,
    nombre: "BAJA TACKLE (vespertino)",
    horario: "13:30",
    capacidad: 20,
    turno: "Vespertino"
  },
  {
    id: 27,
    nombre: "GRUPO ZAPATA (vespertino)",
    horario: "14:00",
    capacidad: 20,
    turno: "Vespertino"
  },
  {
    id: 29,
    nombre: "ZIRCON DE MEXICO S.A. DE C.V. (vespertino)",
    horario: "12:15",
    capacidad: 12,
    turno: "Vespertino"
  },
  {
    id: 31,
    nombre: "DIALIGHT S.A DE C.V. (vespertino)",
    horario: "12:15",
    capacidad: 20,
    turno: "Vespertino"
  },
  {
    id: 33,
    nombre: "FABRICAS MONTERREY S.A. DE C.V. (vespertino)",
    horario: "12:15",
    capacidad: 30,
    turno: "Vespertino"
  },
  {
    id: 35,
    nombre: "CSI EN ENSENADA, S. DE R.L. DE C.V. (vespertino)",
    horario: "13:30",
    capacidad: 20,
    turno: "Vespertino"
  },
  {
    id: 38,
    nombre: "ICU MEDICAL (vespertino)",
    horario: "14:00",
    capacidad: 20,
    turno: "Vespertino"
  },
  {
    id: 40,
    nombre: "DOVINTO VINICOLA (vespertino)",
    horario: "13:30",
    capacidad: 50,
    turno: "Vespertino"
  },
  {
    id: 42,
    nombre: "VINOS BIBAYOFF (vespertino)",
    horario: "13:30",
    capacidad: 30,
    turno: "Vespertino"
  },
  {
    id: 44,
    nombre: "VINOS PALAFOX (vespertino)",
    horario: "13:00",
    capacidad: 30,
    turno: "Vespertino"
  }
];

const empresasMatutinas = computed(() =>
  empresas.filter(empresa => empresa.turno === "Matutino").map(conCupo)
);

const empresasVespertinas = computed(() =>
  empresas.filter(empresa => empresa.turno === "Vespertino").map(conCupo)
);


const programaMiercoles = [
  {
    hora: "08:00 - 9:00",
    nombre: "Registro",
    detalle: "Recepción y preregistro de participantes."
  },
  {
    hora: "09:00 - 10:00",
    nombre: "Inauguración",
    detalle: "Gimnasio de usos múltiples"
  },
  {
    hora: "10:00 - 11:00",
    nombre: "Conferencia Magna",
    detalle: "Dr. Eduardo Durazo Watanabe - Gimnasio"
  },
  {
    hora: "11:00 - 12:00",
    nombre: "Conferencia 2",
    detalle: "Gustavo Montaño - Gimnasio"
  },
  {
    hora: "14:00 - 16:00",
    nombre: "COMIDA",
    tipo: "comida"
  },
  {
    hora: "16:00 - 17:00",
    nombre: "Conferencia 3",
    detalle: "Haydee Venegas López - Gimnasio"
  },
  {
    hora: "17:00 - 20:00",
    nombre: "Ponencias - Aulas 600"
  },
  {
    hora: "20:00 - 21:00",
    nombre: "Rompehielos para alumnos"
  }
];

function crearFormulario() {
  return {
    nombre: "",
    apellidos: "",
    numeroControl: "",
    nss: "",
    edad: "",
    sexo: "",
    tallaPlayera: "",
    tecnologico: "",
    otroTecnologico: "",
    carrera: "",
    semestre: "",
    email: "",
    telefono: "",
    taller: "",
    visitaEmpresa: "",
    consentimiento: false
  };
}

const form = reactive(crearFormulario());

// ==========================================
// REGLA: taller y visita en turnos distintos
// ==========================================

const MENSAJE_MISMO_TURNO =
  "El taller y la visita industrial no pueden estar en el mismo turno. " +
  "Si tu taller es matutino, elige una visita vespertina, y viceversa.";

// true cuando ya elige taller y visita y los dos son del mismo turno
const mismoTurno = computed(() => {
  const taller = talleres.find(t => t.nombre === form.taller);
  const empresa = empresas.find(e => e.nombre === form.visitaEmpresa);

  return Boolean(taller && empresa && taller.turno === empresa.turno);
});

// ==========================================
// LISTAS DESPLEGABLES PERSONALIZADAS
// ==========================================

// Indica lista está abierta
const dropdownAbierto = ref("");

// Abrir o cerrar una lista desplegable
function toggleDropdown(tipo) {
  if (dropdownAbierto.value === tipo) {
    dropdownAbierto.value = "";
  } else {
    dropdownAbierto.value = tipo;
    cargarCupos();
  }
}

// Seleccionar un taller
function seleccionarTaller(taller) {
  form.taller = taller.nombre;
  dropdownAbierto.value = "";
}

// Seleccionar una visita industrial
function seleccionarEmpresa(empresa) {
  form.visitaEmpresa = empresa.nombre;
  dropdownAbierto.value = "";
}

// Cerrar las listas desplegables
function cerrarDropdown() {
  dropdownAbierto.value = "";
}

const loading = ref(false);
const registroExitoso = ref(false);
const folio = ref("");
const error = ref("");

async function registrar() {
  error.value = "";

  if (!form.nombre.trim() || !form.apellidos.trim()) {
    error.value = "Escribe tu nombre y apellidos.";
    return;
  }

  if (!/^\d{11}$/.test(form.nss.replace(/[\s-]/g, ""))) {
    error.value = "El NSS debe tener exactamente 11 dígitos.";
    return;
  }

  if (!form.tecnologico) {
    error.value = "Selecciona tu tecnológico de procedencia.";
    return;
  }

  if (
    ["Otro tecnológico", "Otra institución"].includes(form.tecnologico) &&
    !form.otroTecnologico.trim()
  ) {
    error.value = "Escribe el nombre de tu institución.";
    return;
  }

  if (!form.taller) {
    error.value = "Selecciona el taller al que deseas asistir.";
    return;
  }

  if (!form.visitaEmpresa) {
    error.value = "Selecciona una opción de visita industrial.";
    return;
  }

  if (mismoTurno.value) {
    error.value = MENSAJE_MISMO_TURNO;
    return;
  }

  if (!form.consentimiento) {
    error.value = "Debes aceptar el consentimiento para continuar.";
    return;
  }

  loading.value = true;

  try {
    const response = await fetch(
      `${API_URL}/eventos/${eventId}/inscripciones`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          apellidoPaterno: form.apellidos.trim(),   // todos los apellidos juntos
          numeroControl: form.numeroControl.trim(),
          nss: form.nss.replace(/[\s-]/g, ""),
          edad: Number(form.edad),
          sexo: form.sexo,
          tallaPlayera: form.tallaPlayera,
          institucion:
            form.tecnologico === "Otro tecnológico" ||
            form.tecnologico === "Otra institución"
              ? form.otroTecnologico.trim()
              : form.tecnologico,
          carrera: form.carrera.trim(),
          semestre: form.semestre,
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          taller: form.taller,
          visitaEmpresa: form.visitaEmpresa,
          consentimiento: form.consentimiento
        })
      }
    );

    if (!response.ok) {
      let errorData = {};

      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      }

      throw new Error(
        errorData.message || "No se pudo completar el registro."
      );
    }

    const data = await response.json();

    if (!data.folio) {
      throw new Error(
        "El servidor no devolvió un folio. Revisa la respuesta del backend."
      );
    }

    folio.value = data.folio;
    qr.value = data.qr || `${API_URL}/eventos/${eventId}/inscripciones/qr/${data.folio}`;
    registroExitoso.value = true;

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (e) {
    console.error("Error al registrar:", e);

    error.value =
      e.message || "Ocurrió un error. Intenta nuevamente.";

    await cargarCupos();

    if (cupos.value[form.taller]?.disponibles === 0) {
      form.taller = "";
    }

    if (cupos.value[form.visitaEmpresa]?.disponibles === 0) {
      form.visitaEmpresa = "";
    }
  } finally {
    loading.value = false;
  }
}

function nuevoRegistro() {
  Object.assign(form, crearFormulario());
  folio.value = "";
  error.value = "";
  registroExitoso.value = false;

  cargarCupos();

  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.registro-page {
  min-height: 100vh;
  background: #f4f7fb;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #334155;
}

.registro-header {
  background: linear-gradient(135deg, #003366, #0052a3);
  color: white;
  padding: 35px 20px 80px;
}

.header-content {
  max-width: 1150px;
  margin: auto;
}

.back-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
}

.back-link:hover {
  text-decoration: underline;
}

.header-title {
  margin-top: 30px;
}

.event-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 7px 14px;
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
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.registro-container {
  max-width: 1150px;
  margin: -45px auto 50px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 310px;
  gap: 30px;
  position: relative;
  z-index: 2;
  align-items: start;
}

.registro-card,
.info-card {
  background: white;
  border-radius: 18px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  min-width: 0;
}

.form-section {
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e2e8f0;
}

.form-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: flex-start;
  gap: 15px;
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
  font-size: 1.3rem;
  margin-bottom: 5px;
}

.section-header p {
  color: #64748b;
  font-size: 0.88rem;
  line-height: 1.5;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
  min-width: 0;
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

.form-group label span,
.required-note span,
.consent-checkbox strong {
  color: #dc2626;
}

.form-group input,
.form-group select {
  width: 100%;
  min-width: 0;
  min-height: 48px;
  padding: 10px 14px;
  border: 1px solid #d7dee8;
  border-radius: 10px;
  background: #f8fafc;
  outline: none;
  font-size: 0.93rem;
  color: #334155;
  transition: 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0052a3;
  background: white;
  box-shadow: 0 0 0 3px rgba(0, 82, 163, 0.1);
}

.form-group small {
  display: block;
  color: #64748b;
  font-size: 0.78rem;
  line-height: 1.5;
  margin-top: 7px;
}

.schedule-note {
  background: #eff6ff;
  border-left: 4px solid #0052a3;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 0 10px 10px 0;
}

.schedule-note strong {
  color: #003366;
}

.schedule-note p {
  color: #475569;
  margin-top: 5px;
  font-size: 0.87rem;
  line-height: 1.5;
}

.program-day {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 18px;
  background: #fff;
}

.program-day:last-child {
  margin-bottom: 0;
}

.program-day h3 {
  color: #003366;
  font-size: 1.05rem;
  margin-bottom: 15px;
}

.program-item {
  display: grid;
  grid-template-columns: 115px minmax(0, 1fr);
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid #edf0f5;
}

.program-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.program-time {
  color: #0052a3;
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 1.6;
}

.program-item strong {
  color: #334155;
  font-size: 0.9rem;
}

.program-item p {
  color: #64748b;
  font-size: 0.82rem;
  line-height: 1.5;
  margin-top: 4px;
}

.program-item.comida {
  background: #fff7ed;
  border-radius: 8px;
  padding: 12px;
  margin: 5px 0;
}

.program-item.comida strong {
  color: #9a3412;
}

.consent-section {
  padding-bottom: 15px;
}

.consent-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.6;
}

.consent-checkbox input {
  width: 18px;
  height: 18px;
  min-width: 18px;
  margin-top: 3px;
  accent-color: #0052a3;
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 14px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.turno-error {
  margin-top: 14px;
  margin-bottom: 0;
}

.submit-area {
  margin-top: 25px;
}

.required-note {
  color: #64748b;
  font-size: 0.8rem;
  margin-bottom: 12px;
}

.submit-button {
  width: 100%;
  min-height: 54px;
  padding: 12px;
  border: none;
  border-radius: 11px;
  background: linear-gradient(135deg, #003366, #0052a3);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 51, 102, 0.2);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.arrow {
  margin-left: 8px;
}

.event-info {
  position: sticky;
  top: 25px;
}

.info-card {
  padding: 25px;
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
  margin: 7px 0 25px;
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
  color: #334155;
  font-size: 0.85rem;
}

.info-item p {
  color: #64748b;
  font-size: 0.82rem;
  margin-top: 3px;
  line-height: 1.5;
}

.info-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 10px 0 20px;
}

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
  line-height: 1.6;
  margin-top: 6px;
}

.success-message {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 15px;
}

.success-icon {
  width: 50px;
  height: 50px;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #16a34a;
  color: white;
  border-radius: 50%;
  font-size: 27px;
  font-weight: bold;
}

.success-content {
  min-width: 0;
  width: 100%;
}

.success-content h2 {
  color: #166534;
  margin-bottom: 8px;
  font-size: 1.4rem;
}

.success-content > p {
  color: #4b5563;
  line-height: 1.6;
}

.folio-box {
  margin: 25px 0 15px;
  background: white;
  border: 2px dashed #22c55e;
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
  font-size: 1.3rem;
  overflow-wrap: anywhere;
}

.success-note {
  font-size: 0.85rem;
  color: #64748b !important;
}

.new-register-button {
  margin-top: 20px;
  padding: 12px 20px;
  border: none;
  border-radius: 9px;
  background: #003366;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.new-register-button:hover {
  background: #0052a3;
}


/* ==========================================
   MEJORA VISUAL DE LOS SELECTORES
========================================== */

/* Apariencia general de las listas */
.form-group select {
  width: 100%;
  min-height: 52px;
  padding: 12px 42px 12px 15px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background-color: #f8fafc;
  color: #334155;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
}

/* Cuando se selecciona una lista */
.form-group select:focus {
  border-color: #2563eb;
  background-color: #ffffff;
  outline: none;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

/* Cuando pasas el mouse sobre el selector */
.form-group select:hover {
  border-color: #3b82f6;
  background-color: #ffffff;
}

/* Opciones de los selectores */
.form-group select option {
  padding: 12px;
  background-color: #ffffff;
  color: #334155;
  font-size: 14px;
  line-height: 2;
}

/* Títulos de los grupos: matutino y vespertino */
.form-group select optgroup {
  background-color: #eaf2fc;
  color: #003366;
  font-weight: 700;
  font-size: 14px;
}

/* Opciones deshabilitadas */
.form-group select option:disabled {
  color: #94a3b8;
  background-color: #f1f5f9;
}

/* ==========================================
   MEJORA VISUAL DE LAS SECCIONES
========================================== */

.form-section {
  padding: 28px;
  margin-bottom: 28px;
  background: #ffffff;
  border: 1px solid #e8edf4;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.035);
}

/* Encabezados de cada sección */
.section-header {
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #edf0f5;
}

/* Iconos de las secciones */
.section-icon {
  background: linear-gradient(135deg, #e0edff, #eff6ff);
  color: #003366;
  box-shadow: 0 3px 8px rgba(0, 51, 102, 0.08);
}

/* Etiquetas */
.form-group label {
  margin-bottom: 10px;
  font-size: 0.92rem;
  color: #1e293b;
}

/* Espacio entre los campos */
.form-grid {
  column-gap: 22px;
  row-gap: 24px;
}

/* ==========================================
   NOTAS DE HORARIOS
========================================== */

.schedule-note {
  background: linear-gradient(135deg, #eff6ff, #f8fbff);
  border: 1px solid #dbeafe;
  border-left: 5px solid #2563eb;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 24px;
}

.schedule-note strong {
  display: block;
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: #003366;
}

.schedule-note p {
  line-height: 1.7;
  margin-top: 7px;
}

/* ==========================================
   MEJORA DE LAS TARJETAS DEL PROGRAMA
========================================== */

.program-day {
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
  transition: box-shadow 0.2s ease;
}

.program-day:hover {
  box-shadow: 0 5px 16px rgba(15, 23, 42, 0.06);
}

.program-day h3 {
  padding-bottom: 10px;
  border-bottom: 2px solid #eaf2fc;
}

/* ==========================================
   LISTAS DESPLEGABLES PERSONALIZADAS
========================================== */

.custom-dropdown {
  position: relative;
  width: 100%;
}

.dropdown-trigger {
  width: 100%;
  min-height: 54px;
  padding: 13px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border: 1px solid #d7dee8;
  border-radius: 12px;
  background: #f8fafc;
  color: #334155;
  font-size: 0.92rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-trigger:hover,
.dropdown-trigger.dropdown-active {
  border-color: #0052a3;
  background: white;
  box-shadow: 0 0 0 3px rgba(0, 82, 163, 0.09);
}

.dropdown-placeholder {
  color: #94a3b8;
}

.dropdown-arrow {
  flex-shrink: 0;
  color: #0052a3;
  font-size: 12px;
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  max-height: 380px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  background: white;
  border: 1px solid #dbe3ed;
  border-radius: 14px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16);
  z-index: 100;
}

.dropdown-group-title {
  position: sticky;
  top: -10px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 13px 12px;
  margin: 0 -10px 8px;
  background: #eaf2fc;
  border-bottom: 1px solid #d5e5f8;
  color: #003366;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.6px;
}

.dropdown-option {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 14px 38px 14px 13px;
  margin-bottom: 7px;
  border: 1px solid #e5eaf1;
  border-radius: 10px;
  background: white;
  color: #334155;
  text-align: left;
  cursor: pointer;
  transition: all 0.18s ease;
}

.dropdown-option:hover {
  background: #f0f6ff;
  border-color: #93bce9;
}

/* Taller o visita sin cupo */
.option-disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background: #f1f5f9;
}

.option-disabled:hover {
  background: #f1f5f9;
  border-color: #e5eaf1;
}

.option-full {
  color: #b91c1c;
  font-weight: 700;
}

.option-name {
  display: block;
  color: #003366;
  font-size: 0.86rem;
  font-weight: 700;
  line-height: 1.5;
}

.option-details {
  display: flex;
  flex-wrap: wrap;
  gap: 7px 14px;
  margin-top: 8px;
  color: #64748b;
  font-size: 0.76rem;
  line-height: 1.5;
}

.option-check {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #15803d;
  font-size: 20px;
  font-weight: bold;
}

.dropdown-menu::-webkit-scrollbar {
  width: 7px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: #b8cbe0;
  border-radius: 10px;
}

/* MENSAJE DEL SEGURO FACULTATIVO */

.aviso-nss {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 10px;
  padding: 12px 15px;
  background: #eff6ff;
  border-left: 4px solid #0052a3;
  border-radius: 8px;
}

.aviso-icono {
  color: #0052a3;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.3;
}

.aviso-nss p {
  margin: 0;
  color: #334155;
  font-size: 13px;
  line-height: 1.6;
}

.aviso-nss strong {
  color: #003366;
  font-weight: 700;
}

/* ==========================================
   ACREDITACION DIGITAL - CONGRESO ARGOS
========================================== */

.success-message {
  display: block;
  width: 100%;
  padding: 35px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
}

.success-content {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}

/* ENCABEZADO */

.success-heading {
  display: flex;
  align-items: center;
  gap: 17px;
  margin-bottom: 28px;
}

.success-icon {
  width: 55px;
  height: 55px;
  min-width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8f5ee;
  color: #15803d;
  border: 1px solid #bbf7d0;
  border-radius: 50%;
  font-size: 27px;
  font-weight: 700;
}

.success-label {
  color: #0052a3;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.success-content h2 {
  color: #003366;
  font-size: 1.65rem;
  margin: 5px 0;
}

.success-heading p {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* FOLIO */

.folio-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 22px;
  margin: 0 0 25px;
  background: #ffffff;
  border: 1px solid #dbe5f0;
  border-radius: 14px;
  text-align: center;
}

.folio-box span {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.folio-box strong {
  color: #003366;
  font-size: 1.7rem;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.folio-box small {
  color: #94a3b8;
  font-size: 0.78rem;
}

/* TARJETA DEL QR */

.qr-ticket {
  width: 100%;
  padding: 25px;
  background: #ffffff;
  border: 1px solid #dce5ef;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.07);
  text-align: center;
}

/* CABECERA DEL PASE */

.qr-ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.qr-overline {
  color: #0052a3;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.qr-ticket-header h3 {
  color: #003366;
  font-size: 1.3rem;
  margin: 5px 0;
}

.qr-ticket-header p {
  color: #64748b;
  font-size: 0.82rem;
}

.qr-ticket-logo {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #003366;
  color: white;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 1px;
}

/* SEPARADOR */

.qr-divider {
  height: 1px;
  margin: 20px 0;
  background: #e2e8f0;
}

/* IMAGEN QR */

.qr-image-container {
  width: 245px;
  height: 245px;
  max-width: 100%;
  margin: 0 auto 18px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
}

.qr-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* TEXTO DEL QR */

.qr-ticket h4 {
  color: #003366;
  font-size: 1.05rem;
  margin-bottom: 8px;
}

.qr-instructions {
  max-width: 390px;
  margin: 0 auto;
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.6;
}

/* PIE DE TARJETA */

.qr-ticket-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 22px;
  padding-top: 15px;
  border-top: 1px dashed #cbd5e1;
  color: #64748b;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.8px;
}

/* DESCARGAR QR */

.download-qr-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 50px;
  margin-top: 20px;
  padding: 12px 18px;
  background: #003366;
  color: #ffffff;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.download-qr-button:hover {
  background: #0052a3;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 51, 102, 0.18);
}

.download-qr-button span {
  font-size: 1.3rem;
}

/* RECORDATORIO */

.success-reminder {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 22px;
  padding: 15px;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  border-radius: 11px;
}

.reminder-icon {
  color: #0052a3;
  font-size: 1.1rem;
  font-weight: 800;
}

.success-reminder p {
  color: #475569;
  font-size: 0.82rem;
  line-height: 1.6;
}

.success-reminder strong {
  color: #003366;
}

/* ERROR QR */

.qr-error {
  padding: 18px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 10px;
  color: #9a3412;
  font-size: 0.88rem;
  line-height: 1.5;
}

/* NUEVO REGISTRO */

.new-register-button {
  width: 100%;
  min-height: 48px;
  margin-top: 22px;
  padding: 12px 20px;
  background: #ffffff;
  color: #003366;
  border: 1px solid #003366;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.new-register-button:hover {
  background: #003366;
  color: #ffffff;
}

/* RESPONSIVE */

@media (max-width: 600px) {
  .success-message {
    padding: 18px;
  }

  .success-heading {
    align-items: flex-start;
    gap: 12px;
  }

  .success-content h2 {
    font-size: 1.3rem;
  }

  .qr-ticket {
    padding: 18px;
  }

  .qr-image-container {
    width: 220px;
    height: 220px;
  }

  .qr-ticket-footer {
    font-size: 0.55rem;
  }

  .folio-box strong {
    font-size: 1.35rem;
  }
}


@media (max-width: 600px) {
  .dropdown-menu {
    max-height: 320px;
  }

  .dropdown-option {
    padding: 13px 35px 13px 10px;
  }

  .option-name {
    font-size: 0.82rem;
  }

  .option-details {
    font-size: 0.72rem;
  }
}


@media (max-width: 900px) {
  .registro-container {
    grid-template-columns: minmax(0, 1fr);
  }

  .event-info {
    position: static;
    order: -1;
  }
}

@media (max-width: 600px) {
  .registro-header {
    padding: 25px 18px 70px;
  }

  .header-title h1 {
    font-size: 2rem;
  }

  .registro-container {
    padding: 0 12px;
    gap: 18px;
  }

  .registro-card,
  .info-card {
    padding: 20px 16px;
  }

  .form-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .program-day {
    padding: 12px;
  }

  .program-item {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .success-message {
    flex-direction: column;
    padding: 20px;
  }
}


/* ==========================================
   DISENO PREMIUM - CREDENCIAL QR ARGOS
   Solo modifica apariencia visual
========================================== */

.qr-ticket {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
  padding: 30px;
  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(217, 189, 130, 0.16),
      transparent 35%
    ),
    linear-gradient(145deg, #0b1d36, #102d50 65%, #0b1d36);
  border: 1px solid rgba(217, 189, 130, 0.45);
  border-radius: 22px;
  box-shadow:
    0 20px 45px rgba(0, 20, 45, 0.20),
    inset 0 1px 0 rgba(255,255,255,0.10);
  text-align: center;
}

/* Detalle dorado superior */
.qr-ticket::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(
    90deg,
    #9b793e,
    #f3dfad,
    #b38b4b,
    #f3dfad
  );
}

/* ENCABEZADO */

.qr-ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  text-align: left;
}

.qr-overline {
  color: #e3c88e;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.qr-ticket-header h3 {
  color: #ffffff;
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin: 7px 0;
}

.qr-ticket-header p {
  color: #cbd5e1;
  font-size: 0.85rem;
}

.qr-ticket-logo {
  width: 58px;
  height: 58px;
  min-width: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #f0d9a5, #b18a4d);
  color: #0b1d36;
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 15px;
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* SEPARADOR */

.qr-divider {
  height: 1px;
  margin: 24px 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(217,189,130,0.8),
    transparent
  );
}

/* CONTENEDOR DEL CODIGO QR */

.qr-image-container {
  position: relative;
  width: 275px;
  height: 275px;
  max-width: 100%;
  margin: 0 auto 23px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 4px solid #e3c88e;
  border-radius: 20px;
  box-shadow:
    0 12px 30px rgba(0,0,0,0.25),
    0 0 0 7px rgba(217,189,130,0.10);
}

/* IMPORTANTE: no alterar el patron del QR */

.qr-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #ffffff;
  image-rendering: auto;
}

/* TITULO E INSTRUCCIONES */

.qr-ticket h4 {
  color: #f0d9a5;
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: 0.4px;
}

.qr-instructions {
  max-width: 390px;
  margin: 0 auto;
  color: #d0dae7;
  font-size: 0.88rem;
  line-height: 1.7;
}

/* PIE DE CREDENCIAL */

.qr-ticket-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 25px;
  padding-top: 18px;
  border-top: 1px dashed rgba(217,189,130,0.55);
  color: #e3c88e;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 1px;
}

/* BOTON DE DESCARGA */

.download-qr-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 54px;
  margin-top: 24px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #f0d9a5, #c49b5c);
  color: #0b1d36;
  border: 1px solid #f3dfad;
  border-radius: 12px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.3px;
  box-shadow: 0 7px 18px rgba(0,0,0,0.18);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.download-qr-button:hover {
  background: linear-gradient(135deg, #f7e8c3, #d9bd82);
  color: #0b1d36;
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.25);
}

.download-qr-button span {
  font-size: 1.3rem;
}

/* ==========================================
   FOLIO DESTACADO - CREDENCIAL ARGOS
   Solo mejora su visibilidad
========================================== */

.qr-folio {
  margin: 20px auto;
  padding: 16px 20px;
  max-width: 350px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(227, 200, 142, 0.65);
  border-radius: 14px;
  text-align: center;
}

.qr-folio-label {
  display: block;
  margin-bottom: 7px;
  color: #e3c88e;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.qr-folio-number {
  display: block;
  color: #ffffff;
  font-size: 1.65rem;
  font-weight: 900;
  letter-spacing: 2px;
  overflow-wrap: anywhere;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}
/* RESPONSIVE */

@media (max-width: 600px) {
  .qr-ticket {
    padding: 20px 15px;
    border-radius: 17px;
  }

  .qr-ticket-header h3 {
    font-size: 1.25rem;
  }

  .qr-ticket-logo {
    width: 48px;
    height: 48px;
    min-width: 48px;
  }

  .qr-image-container {
    width: 235px;
    height: 235px;
    padding: 12px;
  }

  .qr-ticket-footer {
    font-size: 0.56rem;
  }
}


</style>