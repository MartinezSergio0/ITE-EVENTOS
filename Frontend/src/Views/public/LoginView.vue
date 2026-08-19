<template>
  <div class="login-page">

    <!-- FONDO DECORATIVO -->
    <div class="background-circle circle-1"></div>
    <div class="background-circle circle-2"></div>
    <div class="background-circle circle-3"></div>

    <div class="overlay"></div>

    <!-- TARJETA DE LOGIN -->
    <div class="login-card">

      <!-- HEADER -->
      <div class="logo-section">

        <div class="logo-icon">
          IT
        </div>

        <h1>ITEvent</h1>

        <p>
          Portal de Administración de Eventos
        </p>

      </div>


      <!-- MENSAJE DE ERROR -->
      <div
        v-if="errorMessage"
        class="error-message"
      >
        <span class="error-icon">⚠</span>

        <span>
          {{ errorMessage }}
        </span>
      </div>


      <!-- FORMULARIO -->
      <form
        class="form"
        @submit.prevent="login"
      >

        <!-- CORREO -->
        <div class="input-group">

          <label for="email">
            Correo Institucional
          </label>

          <div class="input-wrapper">

            <span class="input-icon">
              ✉
            </span>

            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="admin@ite.edu.mx"
              autocomplete="email"
              required
            />

          </div>

        </div>


        <!-- CONTRASEÑA -->
        <div class="input-group">

          <label for="password">
            Contraseña
          </label>

          <div class="input-wrapper">

            <span class="input-icon">
              🔒
            </span>

            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="********"
              autocomplete="current-password"
              required
            />

            <button
              type="button"
              class="password-button"
              @click="showPassword = !showPassword"
              :aria-label="
                showPassword
                  ? 'Ocultar contraseña'
                  : 'Mostrar contraseña'
              "
            >
              {{ showPassword ? '◉' : '○' }}
            </button>

          </div>

        </div>


        <!-- RECORDAR SESIÓN -->
        <div class="options">

          <label class="remember">

            <input
              v-model="rememberMe"
              type="checkbox"
            />

            <span>
              Recordar sesión
            </span>

          </label>

        </div>


        <!-- BOTÓN LOGIN -->
        <button
          type="submit"
          class="login-button"
          :disabled="loading"
        >

          <span v-if="!loading">
            Iniciar Sesión
          </span>

          <span v-else class="loading-content">
            <span class="spinner"></span>
            Iniciando sesión...
          </span>

        </button>


        <!-- VOLVER -->
        <router-link
          to="/"
          class="back-link"
        >
          ← Volver al inicio
        </router-link>

      </form>


      <!-- INFORMACIÓN -->
      <div class="login-footer">

        <span>
          ITEvent
        </span>

        <span class="separator">
          •
        </span>

        <span>
          Gestión de Eventos
        </span>

      </div>

    </div>

  </div>
</template>


<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


// ========================================
// VARIABLES
// ========================================

const email = ref('')
const password = ref('')

const showPassword = ref(false)

const rememberMe = ref(false)

const loading = ref(false)

const errorMessage = ref('')


// ========================================
// FUNCIÓN LOGIN
// ========================================

function login() {

  // Limpiar error anterior
  errorMessage.value = ''

  // Validar campos
  if (!email.value || !password.value) {

    errorMessage.value =
      'Por favor completa todos los campos.'

    return
  }


  // Activar estado de carga
  loading.value = true


  // Simular pequeño proceso de autenticación
  setTimeout(() => {

    // ========================================
    // SUPERADMINISTRADOR
    // ========================================

    if (
      email.value === 'superadmin@ite.edu.mx' &&
      password.value === '1234'
    ) {

      // Guardar información de sesión
      localStorage.setItem(
        'userRole',
        'superadmin'
      )

      localStorage.setItem(
        'userEmail',
        email.value
      )


      localStorage.setItem(
        'userName',
        'Super Administrador'
      )


      // Recordar sesión
      if (rememberMe.value) {

        localStorage.setItem(
          'rememberMe',
          'true'
        )

      }


      // Redireccionar
      router.push('/superadmin')

      return
    }



    // ========================================
    // ADMINISTRADOR
    // ========================================

    if (
      email.value === 'admin@ite.edu.mx' &&
      password.value === '1234'
    ) {

      // Guardar información de sesión
      localStorage.setItem(
        'userRole',
        'admin'
      )

      localStorage.setItem(
        'userEmail',
        email.value
      )


      localStorage.setItem(
        'userName',
        'Administrador'
      )


      // Recordar sesión
      if (rememberMe.value) {

        localStorage.setItem(
          'rememberMe',
          'true'
        )

      }


      // Redireccionar
      router.push('/admin')

      return
    }



    // ========================================
    // CREDENCIALES INCORRECTAS
    // ========================================

    errorMessage.value =
      'El correo o la contraseña son incorrectos.'


    loading.value = false

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
   PÁGINA
======================================== */

.login-page {

  min-height: 100vh;

  width: 100%;

  display: flex;

  justify-content: center;

  align-items: center;

  position: relative;

  overflow: hidden;

  padding: 30px;

  font-family:
    'Segoe UI',
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

  background:
    linear-gradient(
      135deg,
      #001f3f 0%,
      #003f7f 45%,
      #0066cc 100%
    );

}


/* ========================================
   OVERLAY
======================================== */

.overlay {

  position: absolute;

  inset: 0;

  background:
    radial-gradient(
      circle at 20% 80%,
      rgba(255,255,255,0.10),
      transparent 35%
    );

  pointer-events: none;

}


/* ========================================
   CÍRCULOS DECORATIVOS
======================================== */

.background-circle {

  position: absolute;

  border-radius: 50%;

  background:
    rgba(255,255,255,0.08);

  filter: blur(2px);

}


.circle-1 {

  width: 500px;

  height: 500px;

  top: -250px;

  right: -150px;

}


.circle-2 {

  width: 300px;

  height: 300px;

  bottom: -150px;

  left: -100px;

}


.circle-3 {

  width: 150px;

  height: 150px;

  top: 15%;

  left: 15%;

  background:
    rgba(255,255,255,0.05);

}


/* ========================================
   LOGIN CARD
======================================== */

.login-card {

  width: 100%;

  max-width: 430px;

  background:
    rgba(255,255,255,0.97);

  border-radius: 22px;

  padding: 42px;

  position: relative;

  z-index: 10;

  box-shadow:
    0 25px 60px rgba(0,0,0,0.30);

  animation:
    cardAppear 0.5s ease;

}


@keyframes cardAppear {

  from {

    opacity: 0;

    transform:
      translateY(20px)
      scale(0.98);

  }

  to {

    opacity: 1;

    transform:
      translateY(0)
      scale(1);

  }

}


/* ========================================
   LOGO
======================================== */

.logo-section {

  text-align: center;

  margin-bottom: 30px;

}


/* ICONO */

.logo-icon {

  width: 65px;

  height: 65px;

  margin: 0 auto 14px;

  border-radius: 18px;

  display: flex;

  align-items: center;

  justify-content: center;

  background:
    linear-gradient(
      135deg,
      #003366,
      #0066cc
    );

  color: white;

  font-size: 22px;

  font-weight: 800;

  box-shadow:
    0 8px 20px
    rgba(0,51,102,0.25);

}


/* TÍTULO */

.logo-section h1 {

  color: #003366;

  font-size: 2.6rem;

  font-weight: 800;

  letter-spacing: -1px;

  margin-bottom: 5px;

}


/* SUBTÍTULO */

.logo-section p {

  color: #6b7280;

  font-size: 0.95rem;

}


/* ========================================
   ERROR
======================================== */

.error-message {

  display: flex;

  align-items: center;

  gap: 10px;

  background: #fff1f2;

  border: 1px solid #fecdd3;

  color: #be123c;

  padding: 12px 14px;

  border-radius: 10px;

  margin-bottom: 20px;

  font-size: 0.9rem;

  animation:
    errorAppear 0.3s ease;

}


@keyframes errorAppear {

  from {

    opacity: 0;

    transform:
      translateY(-5px);

  }

  to {

    opacity: 1;

    transform:
      translateY(0);

  }

}


.error-icon {

  font-size: 18px;

}


/* ========================================
   FORM
======================================== */

.form {

  display: flex;

  flex-direction: column;

}


/* ========================================
   INPUT GROUP
======================================== */

.input-group {

  margin-bottom: 20px;

}


.input-group label {

  display: block;

  margin-bottom: 8px;

  color: #003366;

  font-size: 0.92rem;

  font-weight: 700;

}


/* ========================================
   INPUT WRAPPER
======================================== */

.input-wrapper {

  position: relative;

  display: flex;

  align-items: center;

}


/* ICONO */

.input-icon {

  position: absolute;

  left: 14px;

  color: #64748b;

  font-size: 16px;

  z-index: 2;

}


/* INPUT */

.input-wrapper input {

  width: 100%;

  height: 50px;

  padding:
    0 45px 0 42px;

  border:
    1px solid #d7dee8;

  border-radius: 11px;

  background: #f8fafc;

  outline: none;

  color: #1e293b;

  font-size: 0.95rem;

  transition:
    0.25s ease;

}


.input-wrapper input::placeholder {

  color: #9ca3af;

}


.input-wrapper input:focus {

  border-color: #0052a3;

  background: white;

  box-shadow:
    0 0 0 4px
    rgba(0,82,163,0.10);

}


/* ========================================
   BOTÓN MOSTRAR CONTRASEÑA
======================================== */

.password-button {

  position: absolute;

  right: 8px;

  width: 35px;

  height: 35px;

  border: none;

  background: transparent;

  color: #64748b;

  cursor: pointer;

  border-radius: 8px;

  font-size: 16px;

  transition: 0.2s;

}


.password-button:hover {

  background: #e8eef5;

  color: #003366;

}


/* ========================================
   OPCIONES
======================================== */

.options {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 22px;

}


.remember {

  display: flex;

  align-items: center;

  gap: 8px;

  color: #64748b;

  font-size: 0.85rem;

  cursor: pointer;

}


.remember input {

  width: 16px;

  height: 16px;

  accent-color: #003366;

  cursor: pointer;

}


/* ========================================
   BOTÓN LOGIN
======================================== */

.login-button {

  width: 100%;

  height: 52px;

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

  transition:
    0.25s ease;

  box-shadow:
    0 8px 18px
    rgba(0,51,102,0.20);

}


.login-button:hover:not(:disabled) {

  background:
    linear-gradient(
      135deg,
      #00264d,
      #00478f
    );

  transform:
    translateY(-2px);

  box-shadow:
    0 12px 25px
    rgba(0,51,102,0.28);

}


.login-button:active:not(:disabled) {

  transform:
    translateY(0);

}


.login-button:disabled {

  opacity: 0.7;

  cursor: not-allowed;

}


/* ========================================
   LOADING
======================================== */

.loading-content {

  display: flex;

  justify-content: center;

  align-items: center;

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
   LINK REGRESAR
======================================== */

.back-link {

  display: block;

  text-align: center;

  margin-top: 20px;

  color: #003366;

  text-decoration: none;

  font-size: 0.9rem;

  font-weight: 600;

  transition: 0.2s;

}


.back-link:hover {

  color: #0052a3;

  text-decoration: underline;

}


/* ========================================
   FOOTER
======================================== */

.login-footer {

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 8px;

  margin-top: 28px;

  padding-top: 20px;

  border-top:
    1px solid #e5e7eb;

  color: #94a3b8;

  font-size: 0.75rem;

}


.separator {

  color: #cbd5e1;

}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 600px) {

  .login-page {

    padding: 20px;

  }


  .login-card {

    padding: 30px 25px;

    border-radius: 18px;

  }


  .logo-section h1 {

    font-size: 2.2rem;

  }

}


@media (max-width: 400px) {

  .login-card {

    padding: 25px 20px;

  }


  .logo-section p {

    font-size: 0.85rem;

  }

}

</style>