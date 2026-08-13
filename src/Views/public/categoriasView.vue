<template>
  <div class="categories">

    <router-link to="/" class="back-btn">
      ← Regresar
    </router-link>

    <h1>Explora nuestros eventos</h1>

    <p class="subtitle">
      Selecciona una categoría para conocer todos los eventos disponibles.
    </p>

    <div class="cards">

      <router-link
        class="card"
        to="/eventos/academicos"
      >
        <span>📚</span>

        <h3>Académicos</h3>

        <p>
          Congresos, conferencias, talleres y actividades de formación.
        </p>
      </router-link>

      <router-link
        class="card"
        to="/eventos/culturales"
      >
        <span>🎭</span>

        <h3>Culturales</h3>

        <p>
          Exposiciones, concursos y actividades artísticas.
        </p>
      </router-link>

      <router-link
        class="card"
        to="/eventos/deportivos"
      >
        <span>🏆</span>

        <h3>Deportivos</h3>

        <p>
          Torneos, competencias y eventos deportivos.
        </p>
      </router-link>

    </div>

  </div>
</template>

<style scoped>

.categories{

min-height:100vh;

background:#f4f6f9;

padding:50px;

}

h1{

text-align:center;

color:#003366;

font-size:2.3rem;

margin-bottom:10px;

}

.subtitle{

text-align:center;

color:#666;

margin-bottom:50px;

}

.cards{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(320px,1fr));

gap:30px;

max-width:1200px;

margin:auto;

}

.card{

background:white;

padding:40px;

border-radius:20px;

text-align:center;

text-decoration:none;

color:inherit;

box-shadow:0 12px 25px rgba(0,0,0,.12);

transition:.3s;

}

.card:hover{

transform:translateY(-8px);

}

.card span{

font-size:70px;

display:block;

margin-bottom:20px;

}

.card h3{

color:#003366;

margin-bottom:15px;

}

.card p{

color:#666;

line-height:1.6;

}

.back-btn{

position:fixed;

top:20px;

left:20px;

background:#003366;

padding:10px 18px;

color:white;

border-radius:10px;

text-decoration:none;

}

</style>