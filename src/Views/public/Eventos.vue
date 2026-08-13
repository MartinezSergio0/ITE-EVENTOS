<template>
  <div class="events">
    <h1>Eventos del Instituto</h1>

<!-- BOTÓN VOLVER -->
      <router-link to="/" class="back-btn">
  Regresar al inicio
</router-link>

    <div class="grid">
      <div
        class="card"
        v-for="(event, i) in events"
        :key="i"
        @click="open(event.link)"
      >
        <img :src="event.image" />
        <div class="info">
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const events = [
  {
    title: "Congreso ESCALA",
    description: "Evento académico internacional",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6buUnFl0TG8KgXO5GMXJmDsC_rOg23D2Aqmie-g9LvSp85jyZABaZfCY&s=10",
    link: "https://sites.google.com/ite.edu.mx/congresoescala-mx"
  },
  {
    title: "Congreso Argos",
    description: "empresas de la industria",
    image: "https://www.tijuana.tecnm.mx//wp-content/uploads/2025/09/Logotipo-ARGOS-2025-b_page-0001.jpg",
    link: "#"
  },
  {
    title: "Carrera",
    description: "Torneos internos",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WNts8I2MnQ6jz57TbcDEcyeaVQkyHdEay5HYWeL1wpI1kdTttF-3uvw&s=10",
    link: "#"
  }
];

function open(link) {
  window.open(link, "_blank");
}
</script>

<style scoped>

.events {
  padding: 30px;
  background: #f4f6f9;
  min-height: 100vh;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #003366;
}

/* BACK BUTTON */
.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;

  display: flex;
  align-items: center;
  gap: 6px;

  padding: 10px 14px;

  background: #003366;
  color: white;
  text-decoration: none;

  border-radius: 12px;

  font-weight: 500;

  box-shadow: 0 8px 20px rgba(0,0,0,0.2);

  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #0055aa;
  transform: translateY(-2px);
}

/* GRID MÁS GRANDE */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
}

/* CARD MÁS GRANDE */
.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  box-shadow: 0 8px 20px rgba(0,0,0,0.12);

  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
}

/* IMAGEN MÁS GRANDE Y PROTAGONISTA */
.card img {
  width: 100%;
  height: 220px;   /* 👈 MÁS ALTA */
  object-fit: cover;
}

/* INFO MÁS ESPACIADA */
.info {
  padding: 18px;
}

.info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #003366;
}

.info p {
  margin-top: 6px;
  color: #666;
  font-size: 0.95rem;
}

</style>