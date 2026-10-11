
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
        <div v-if="registroExitoso" class="success-message">
          <div class="success-icon">✓</div>
          <div class="success-content">
            <h2>¡Registro realizado correctamente!</h2>
            <p>Tu información fue enviada para el Congreso Argos.</p>

            <div class="folio-box">
              <span>Folio de registro</span>
              <strong>{{ folio }}</strong>
            </div>

            <p class="success-note">
              Guarda tu folio para consultar posteriormente tu registro.
            </p>

            <button class="new-register-button" @click="nuevoRegistro">
              Realizar otro registro
            </button>
          </div>
    
        </div>

        <form v-else class="registro-form" @submit.prevent="registrar">
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
              v-if="form.tecnologico === 'Otro tecnológico' ||
                    form.tecnologico === 'Otra institución'"
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
                  <option v-for="n in 12" :key="n" :value="String(n)">
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
              <p>11:00 a 14:00 y 16:00 a 19:00.</p>
              <p>La asignación final dependerá del cupo disponible.</p>
            </div>

            <div class="form-group">
              <label>Taller al que deseas asistir <span>*</span></label>
              <select v-model="form.taller" required>
                <option value="">Selecciona un taller</option>
                <option
                  v-for="taller in talleres"
                  :key="taller"
                  :value="taller"
                >
                  {{ taller }}
                </option>
              </select>
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
              <p>09:00 a 14:00 y 16:00 a 20:00.</p>
              <p>
                Las empresas y los horarios definitivos deberán ser
                confirmados por el comité organizador.
              </p>
            </div>

            <div class="form-group">
              <label>Empresa que deseas visitar <span>*</span></label>
              <select v-model="form.visitaEmpresa" required>
                <option value="">Selecciona una opción</option>
                <option
                  v-for="empresa in empresas"
                  :key="empresa"
                  :value="empresa"
                >
                  {{ empresa }}
                </option>
              </select>
              <small>
                Las opciones pendientes de confirmación son provisionales.
              </small>
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
                <span class="program-time">18:00 - 21:00</span>
                <div>
                  <strong>Preregistro</strong>
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
                <span class="program-time">{{ actividad.hora }}</span>
                <div>
                  <strong>{{ actividad.nombre }}</strong>
                  <p v-if="actividad.detalle">{{ actividad.detalle }}</p>
                </div>
              </div>
            </div>

            <div class="program-day">
              <h3>Jueves 5 de noviembre</h3>

              <div class="program-item">
                <span class="program-time">09:00 - 14:00</span>
                <div>
                  <strong>Visitas industriales</strong>
                  <p>Recorridos por empresas participantes.</p>
                </div>
              </div>

              <div class="program-item">
                <span class="program-time">11:00 - 14:00</span>
                <div>
                  <strong>Talleres</strong>
                  <p>Primera parte de las actividades prácticas.</p>
                </div>
              </div>

              <div class="program-item comida">
                <span class="program-time">14:00 - 16:00</span>
                <div><strong>COMIDA</strong></div>
              </div>

              <div class="program-item">
                <span class="program-time">16:00 - 19:00</span>
                <div>
                  <strong>Talleres</strong>
                  <p>Segunda parte de las actividades prácticas.</p>
                </div>
              </div>

              <div class="program-item">
                <span class="program-time">16:00 - 20:00</span>
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
                <div><strong>COMIDA</strong></div>
              </div>

              <div class="program-item">
                <span class="program-time">18:00 - 19:00</span>
                <div><strong>Conferencia Plenimex</strong></div>
              </div>

              <div class="program-item">
                <span class="program-time">19:00 - 20:00</span>
                <div><strong>Conferencia ICU / Hutchinson</strong></div>
              </div>
            </div>
          </section>

          <!-- CONSENTIMIENTO -->
          <section class="form-section consent-section">
            <div class="section-header">
              <div class="section-icon">🔐</div>
              <div>
                <h2>Consentimiento</h2>
                <p>Confirma que la información proporcionada es correcta.</p>
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

          <div v-if="error" class="error-message">
            ⚠️ {{ error }}
          </div>

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
import { reactive, ref } from "vue";
import { API_URL } from "../../config/api";

// IMPORTANTE:
// Cambia este ID por el ID real del evento Argos en tu base de datos.
const eventId = 5;

const talleres = [
  "Taller 1: Diseño de experimentos",
  "Taller 2: Promodel básico",
  "Taller 3: Manufactura aditiva / impresión 3D",
  "Taller 4: Diseño con Solidworks nivel básico",
  "Taller 5: Propiedad Industrial",
  "Taller 6: Corrosión",
  "Taller 7: Seguridad e higiene",
  "Taller 8: Taller de inteligencia artificial (por confirmar)",
  "Taller 9: Taller de moldeo (por confirmar)"
];

// Reemplaza estas opciones provisionales por los nombres reales
// de las empresas cuando el comité organizador los confirme.
const empresas = [
  "Empresa industrial 1 (por confirmar)",
  "Empresa industrial 2 (por confirmar)",
  "Empresa industrial 3 (por confirmar)",
  "Empresa industrial 4 (por confirmar)",
  "No deseo asistir a una visita industrial"
];

const programaMiercoles = [
  {
    hora: "09:00 - 10:00",
    nombre: "Inauguración",
    detalle: "Gimnasio de usos múltiples"
  },
  {
    hora: "10:00 - 11:00",
    nombre: "Conferencia Magna",
    detalle: "Dr. Eduardo Durazo Watanabe"
  },
  {
    hora: "11:00 - 14:00",
    nombre: "Conferencia 2",
    detalle: "Gustavo Montaño"
  },
  {
    hora: "14:00 - 16:00",
    nombre: "COMIDA",
    tipo: "comida"
  },
  {
    hora: "16:00 - 17:00",
    nombre: "Conferencia 3",
    detalle: "Haydee Venegas López"
  },
  {
    hora: "17:00 - 20:00",
    nombre: "Ponencias"
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
    registroExitoso.value = true;

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (e) {
    console.error("Error al registrar:", e);

    error.value =
      e.message || "Ocurrió un error. Intenta nuevamente.";
  } finally {
    loading.value = false;
  }
}

function nuevoRegistro() {
  Object.assign(form, crearFormulario());
  folio.value = "";
  error.value = "";
  registroExitoso.value = false;

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
</style>
