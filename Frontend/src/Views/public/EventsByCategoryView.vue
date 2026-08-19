<template>
  <div class="events-page">

    <!-- BOTÓN REGRESAR -->
    <router-link to="/eventos/categoria" class="back-btn">
      ← Categorías
    </router-link>

    <!-- ENCABEZADO -->
    <section class="header">
      <h1>{{ categoryTitle }}</h1>

      <p>
        Explora los eventos disponibles de esta categoría y consulta toda la
        información antes de realizar tu registro.
      </p>

      <!-- TEMPORAL -->
      <p class="counter">
        Eventos encontrados: {{ filteredEvents.length }}
      </p>
    </section>

    <!-- MENSAJE CUANDO NO HAY EVENTOS -->
    <section
      class="empty"
      v-if="filteredEvents.length === 0"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="Sin eventos"
      />

      <h2>No hay eventos disponibles</h2>

      <p>
        Actualmente no existen eventos registrados para esta categoría.
      </p>
    </section>

    <!-- TARJETAS -->
    <section
      class="grid"
      v-else
    >

      <article
        class="card"
        v-for="event in filteredEvents"
        :key="event.id"
      >

        <!-- Imagen -->
        <div class="image">

          <img
            :src="event.image"
            :alt="event.title"
          />

          <span class="badge">
            {{ categoryTitle }}
          </span>

        </div>

        <!-- Información -->
        <div class="info">

          <h3>{{ event.title }}</h3>

          <p class="description">
            {{ event.description }}
          </p>

          <div class="details">

            <div class="detail">
              <span>📅</span>
              <span>{{ event.date }}</span>
            </div>

            <div class="detail">
              <span>📍</span>
              <span>{{ event.place }}</span>
            </div>

            <div class="detail">
              <span>👥</span>
              <span>{{ event.capacity }} participantes</span>
            </div>

          </div>

          <div class="buttons">

            <!-- ESTA RUTA SÍ FUNCIONARÁ -->
            <router-link
              :to="`/evento/${event.id}`"
              class="btn-primary"
            >
              Más información
            </router-link>

            <a
              v-if="event.website"
              :href="event.website"
              target="_blank"
              class="btn-secondary"
            >
              Sitio oficial
            </a>

          </div>

        </div>

      </article>

    </section>

  </div>
</template>

<script setup>
  import { ref, watchEffect } from "vue";
  import { useRoute } from "vue-router";
  import { API_URL } from "../../config/api";

  const route = useRoute();

  const category = ref(route.params.tipo || "");

  const filteredEvents = ref([]);

  const categoryTitle = ref("Eventos");

  const titulos = {
    academicos: "Eventos Académicos",
    culturales: "Eventos Culturales",
    deportivos: "Eventos Deportivos",
  };

  watchEffect(async () => {

    category.value = route.params.tipo || "";
    categoryTitle.value = titulos[category.value] || "Eventos";

    if (!category.value) {
      filteredEvents.value = [];
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/eventos?categoria=${category.value}`
      );

      if (!response.ok) {
        filteredEvents.value = [];
        return;
      }

      filteredEvents.value = await response.json();

    } catch (e) {
      console.error("Error al cargar eventos:", e);
      filteredEvents.value = [];
    }

  });
</script>

<style scoped>

/* ===========================
   CONTENEDOR PRINCIPAL
=========================== */

.events-page{
  min-height:100vh;
  background:#f5f7fb;
  padding:40px;
}

/* ===========================
   BOTÓN REGRESAR
=========================== */

.back-btn{
  position:fixed;
  top:20px;
  left:20px;
  z-index:100;

  background:#003366;
  color:white;

  text-decoration:none;

  padding:12px 20px;

  border-radius:12px;

  font-weight:600;

  box-shadow:0 10px 20px rgba(0,0,0,.18);

  transition:.3s;
}

.back-btn:hover{

  background:#0055aa;

  transform:translateY(-3px);

}

/* ===========================
   ENCABEZADO
=========================== */

.header{

  text-align:center;

  margin-bottom:50px;

}

.header h1{

  color:#003366;

  font-size:2.7rem;

  margin-bottom:15px;

}

.header p{

  color:#666;

  font-size:1.05rem;

  max-width:700px;

  margin:auto;

}

.counter{

  margin-top:15px;

  color:#003366;

  font-weight:bold;

}

/* ===========================
   GRID
=========================== */

.grid{

  display:grid;

  grid-template-columns:repeat(3,1fr);

  gap:30px;

  max-width:1400px;

  margin:auto;

}

/* ===========================
   TARJETA
=========================== */

.card{

  display:flex;

  flex-direction:column;

  background:white;

  border-radius:20px;

  overflow:hidden;

  height:600px;

  box-shadow:0 10px 30px rgba(0,0,0,.12);

  transition:.3s;

}

.card:hover{

  transform:translateY(-8px);

  box-shadow:0 18px 35px rgba(0,0,0,.18);

}

/* ===========================
   IMAGEN
=========================== */

.image{

  position:relative;

  width:100%;

  height:140px;

}

.image img{

  width:100%;

  height:100%;

  object-fit:cover;

}

/* ===========================
   BADGE
=========================== */

.badge{

  position:absolute;

  top:15px;

  right:15px;

  background:#003366;

  color:white;

  padding:8px 15px;

  border-radius:30px;

  font-size:.85rem;

  font-weight:bold;

}

/* ===========================
   INFORMACIÓN
=========================== */

.info{

  display:flex;

  flex-direction:column;

  flex:1;

  padding:22px;

}

.info h3{

  color:#003366;

  font-size:1.35rem;

  margin-bottom:12px;

}

.description{

  color:#666;

  line-height:1.6;

  margin-bottom:20px;

  min-height:75px;

}

/* ===========================
   DETALLES
=========================== */

.details{

  display:flex;

  flex-direction:column;

  gap:10px;

  margin-bottom:25px;

}

.detail{

  display:flex;

  align-items:center;

  gap:10px;

  color:#555;

  font-size:.95rem;

}

/* ===========================
   BOTONES
=========================== */

.buttons{

  margin-top:auto;

  display:flex;

  gap:12px;

}

.btn-primary{

  flex:1;

  text-align:center;

  background:#003366;

  color:white;

  text-decoration:none;

  padding:12px;

  border-radius:10px;

  font-weight:600;

  transition:.3s;

}

.btn-primary:hover{

  background:#0055aa;

}

.btn-secondary{

  flex:1;

  text-align:center;

  background:white;

  color:#003366;

  border:2px solid #003366;

  text-decoration:none;

  padding:12px;

  border-radius:10px;

  font-weight:600;

  transition:.3s;

}

.btn-secondary:hover{

  background:#003366;

  color:white;

}

/* ===========================
   SIN EVENTOS
=========================== */

.empty{

  display:flex;

  flex-direction:column;

  align-items:center;

  justify-content:center;

  text-align:center;

  padding:80px;

}

.empty img{

  width:180px;

  margin-bottom:20px;

}

.empty h2{

  color:#003366;

  margin-bottom:10px;

}

.empty p{

  color:#666;

}

/* ===========================
   RESPONSIVE
=========================== */

@media (max-width:1200px){

  .grid{

    grid-template-columns:repeat(2,1fr);

  }

}

@media (max-width:768px){

  .events-page{

    padding:90px 20px 30px;

  }

  .grid{

    grid-template-columns:1fr;

  }

  .card{

    height:auto;

  }

  .buttons{

    flex-direction:column;

  }

  .header h1{

    font-size:2rem;

  }

}
</style>