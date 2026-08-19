<template>
  <div class="home">

    <!-- MENÚ -->
    <nav class="navbar">
  <div class="logo">
    ITEvent
  </div>

  <div class="menu">
    <router-link to="/">Inicio</router-link>
    <router-link to="/eventos/categoria">Eventos</router-link>
    <router-link to="/sobre">Sobre Nosotros</router-link>

    <router-link to="/login" class="login-btn">
      Iniciar Sesión
    </router-link>
  </div>
</nav>

    <!-- BIENVENIDA -->
    <section
      class="hero"
      :style="{
        backgroundImage: `linear-gradient(rgba(0,51,102,.75), rgba(0,51,102,.75)), url(${fondo})`
      }"
    >
      <div class="hero-content">

        <h1>ITEvent</h1>

        <h2>Portal Oficial de Eventos del Instituto Tecnológico</h2>

        <p>
          Encuentra toda la información sobre congresos,
          conferencias, talleres, actividades culturales
          y eventos deportivos organizados por el instituto.
        </p>

        <router-link to="/eventos/categoria" class="btn">
          Explorar Eventos
        </router-link>

      </div>
    </section>


  </div>
</template>

<script setup>
import fondo from '../../assets/Ite.png'
</script>

<style scoped>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

.home{
  width:100%;
}

/* NAVBAR */


.navbar{
  width:100%;
  height:75px;

  background:#003366;

  display:flex;
  justify-content:space-between;
  align-items:center;

  padding:0 50px;

  position:fixed;
  top:0;
  left:0;
  z-index:100;
}

.logo{
  color:white;
  font-size:2rem;
  font-weight:bold;
  letter-spacing:1px;
}

.menu{
  display:flex;
  align-items:center;
  gap:25px;
}

.menu a{
  color:white;
  text-decoration:none;
  font-size:1rem;
  transition:.3s;
}

.menu a:hover{
  color:#90caf9;
}

.login-btn{
  background:white;
  color:#003366 !important;

  padding:10px 18px;

  border-radius:8px;

  font-weight:bold;

  transition:.3s;
}

.login-btn:hover{
  background:#90caf9;
  color:#003366 !important;
  transform:translateY(-2px);
}

.router-link-active{
  font-weight:bold;
}

/* HERO */

.hero{
  height:100vh;

  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;

  display:flex;
  justify-content:center;
  align-items:center;
}

.hero-content{
  text-align:center;
  color:white;
  max-width:800px;
  padding:20px;
}

.hero-content h1{
  font-size:5rem;
  margin-bottom:15px;
}

.hero-content h2{
  font-size:2rem;
  margin-bottom:20px;
}

.hero-content p{
  font-size:1.2rem;
  line-height:1.8;
}

.btn{
  display:inline-block;
  margin-top:30px;
  padding:15px 30px;

  background:white;
  color:#003366;

  text-decoration:none;
  font-weight:bold;

  border-radius:8px;

  transition:.3s;
}

.btn:hover{
  transform:scale(1.05);
}



</style>