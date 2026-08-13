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
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

/* ============================
   CATEGORÍA DESDE LA URL
============================ */

const category = computed(() => route.params.tipo || "");

/* ============================
   EVENTOS (TEMPORALES)
============================ */

const events = [
  {
    id: 1,
    category: "academicos",
    title: "Congreso ESCALA",
    description:
      "Congreso internacional enfocado en investigación, innovación y desarrollo tecnológico.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6buUnFl0TG8KgXO5GMXJmDsC_rOg23D2Aqmie-g9LvSp85jyZABaZfCY&s=10",
    date: "10 al 12 de Septiembre",
    place: "Instituto Tecnológico de Ensenada",
    capacity: 500,
    website: "https://sites.google.com/ite.edu.mx/congresoescala-mx"
  },

  {
    id: 2,
    category: "academicos",
    title: "Congreso ARGOS",
    description:
      "Encuentro académico entre estudiantes y empresas de la industria.",
    image:
      "https://www.tijuana.tecnm.mx/wp-content/uploads/2025/09/Logotipo-ARGOS-2025-b_page-0001.jpg",
    date: "25 de Octubre",
    place: "Centro de Información",
    capacity: 300,
    website: ""
  },

  {
    id: 3,
    category: "deportivos",
    title: "Carrera Atlética",
    description:
      "Competencia deportiva entre estudiantes de las diferentes carreras.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WNts8I2MnQ6jz57TbcDEcyeaVQkyHdEay5HYWeL1wpI1kdTttF-3uvw&s=10",
    date: "15 de Noviembre",
    place: "Unidad Deportiva",
    capacity: 150,
    website: ""
  },

  {
    id: 4,
    category: "deportivos",
    title: "Torneo de Fútbol",
    description:
      "Carrera recreativa para toda la comunidad tecnológica.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900",
    date: "20 de Noviembre",
    place: "Pista Atlética",
    capacity: 250,
    website: ""
  },

  {
    id: 5,
    category: "culturales",
    title: "Festival Cultural",
    description:
      "Presentaciones artísticas, música, danza y exposiciones.",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900",
    date: "3 de Octubre",
    place: "Auditorio",
    capacity: 400,
    website: ""
  },

  {
    id: 6,
    category: "culturales",
    title: "Concurso de Altares",
    description:
      "Concurso institucional para preservar las tradiciones mexicanas.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=900",
    date: "31 de Octubre",
    place: "Explanada Principal",
    capacity: 200,
    website: ""
  }
];

/* ============================
   FILTRAR EVENTOS
============================ */

const filteredEvents = computed(() => {

  return events.filter(event =>

    event.category === category.value

  );

});

/* ============================
   TÍTULO
============================ */

const categoryTitle = computed(() => {

  switch (category.value) {

    case "academicos":
      return "Eventos Académicos";

    case "culturales":
      return "Eventos Culturales";

    case "deportivos":
      return "Eventos Deportivos";

    default:
      return "Eventos";

  }

});

/* ============================
   DEBUG (BORRAR DESPUÉS)
============================ */

console.log("Ruta:", route.fullPath);
console.log("Tipo:", category.value);
console.log("Eventos:", filteredEvents.value);

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