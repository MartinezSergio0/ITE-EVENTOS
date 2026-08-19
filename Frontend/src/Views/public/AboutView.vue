<template>
  <div>

    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="logo">✦ ITEvent</div>

      <div class="menu">
        <router-link to="/" class="link">Inicio</router-link>
        <router-link to="/eventos/categoria" class="link">Eventos</router-link>
        <!-- <router-link to="/sobre" class="link">Sobre</router-link> -->

        <router-link to="/login" class="login-btn">
          Acceder
        </router-link>
      </div>
    </nav>

    <!-- ABOUT -->
    <div class="about">

      <!-- BOTÓN VOLVER -->
      <router-link to="/" class="back-btn">
        Volver al inicio
      </router-link>

      <!-- HERO -->
      <section class="hero">
        <h1>Sobre <span>ITEvent</span></h1>
        <p>
          Plataforma oficial para centralizar los eventos del instituto de forma clara, moderna y accesible.
        </p>
      </section>

      <!-- CONTENIDO -->
      <section class="content">

        <div class="card">
          <h2>🎯 Nuestra misión</h2>
          <p>
            Conectar a la comunidad estudiantil con los eventos más importantes del instituto.
          </p>
        </div>

        <div class="grid">

          <div class="feature">
            <div class="icon">🎓</div>
            <h3>Académicos</h3>
            <p>Workshops, conferencias y formación especializada.</p>
          </div>

          <div class="feature">
            <div class="icon">🎨</div>
            <h3>Culturales</h3>
            <p>Arte, música, exposiciones y creatividad estudiantil.</p>
          </div>

          <div class="feature">
            <div class="icon">⚽</div>
            <h3>Deportivos</h3>
            <p>Torneos, competencias y actividades físicas.</p>
          </div>

        </div>

      </section>

    </div>

    <!-- CTA BOTONES -->
<section class="cta">
  <h2> Registros disponibles</h2>
  <p>Selecciona el congreso al que deseas registrarte</p>

  <div class="cta-buttons">

    <router-link to="/registro-escala" class="btn escala">
      🎓 Registro ESCALA 2026
    </router-link>

    <router-link to="/registro-argos" class="btn argos">
      🏛 Registro ARGOS
    </router-link>

  </div>
</section>

  </div>
</template>

<script setup>
</script>

<style scoped>

/* ================= NAVBAR ================= */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-weight: bold;
  font-size: 1.4rem;
  color: #38bdf8;
}

.menu {
  display: flex;
  gap: 20px;
  align-items: center;
}

.link {
  color: white;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 8px;
  transition: 0.3s;
}

.link:hover {
  background: rgba(56, 189, 248, 0.2);
}

.router-link-active {
  background: rgba(56, 189, 248, 0.35);
}

.login-btn {
  background: #38bdf8;
  color: black;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;
}

.login-btn:hover {
  transform: scale(1.05);
}

/* ================= PAGE ================= */
.about {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  color: white;
  padding: 40px;
}

/* BACK BUTTON */
.back-btn {
  display: inline-block;
  margin-bottom: 20px;
  color: white;
  text-decoration: none;
  background: rgba(255,255,255,0.1);
  padding: 10px 15px;
  border-radius: 10px;
  transition: 0.3s;
  backdrop-filter: blur(10px);
}

.back-btn:hover {
  background: rgba(56, 189, 248, 0.3);
  transform: translateX(-5px);
}

/* HERO */
.hero {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeDown 0.8s ease;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.hero span {
  color: #38bdf8;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* CONTENT */
.content {
  max-width: 1000px;
  margin: auto;
}

/* CARD */
.card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.feature {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  transition: 0.3s;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.feature:hover {
  transform: scale(1.05);
  background: rgba(56, 189, 248, 0.2);
}

.icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

/* ================= CTA SECTION ================= */
.cta {
  margin-top: 60px;
  text-align: center;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  animation: fadeDown 0.8s ease;
}

.cta h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.cta p {
  opacity: 0.8;
  margin-bottom: 20px;
}

/* BOTONES */
.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
  display: inline-block;
}

/* ESCALA */
.btn.escala {
  background: #38bdf8;
  color: #0f172a;
}

.btn.escala:hover {
  transform: scale(1.05);
  background: #0ea5e9;
}

/* ARGOS */
.btn.argos {
  background: #fbbf24;
  color: #0f172a;
}

.btn.argos:hover {
  transform: scale(1.05);
  background: #f59e0b;
}

/* ANIMATION */
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>