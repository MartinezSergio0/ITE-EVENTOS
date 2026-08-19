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
        v-for="cat in categorias"
        :key="cat.id"
        class="card"
        :to="`/eventos/${cat.slug}`"
      >
        <span>{{ cat.icono }}</span>

        <h3>{{ cat.nombre }}</h3>

        <p>{{ cat.descripcion }}</p>
      </router-link>

    </div>

  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import { API_URL } from "../../config/api";

const categorias = ref([]);

onMounted(async () => {

  try {

    const response = await fetch(
      `${API_URL}/eventos/categorias/listado`
    );

    if (response.ok) {
      categorias.value = await response.json();
    }

  } catch (e) {
    console.error("Error al cargar categorías:", e);
  }

});

</script>

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