<template>

<div
    v-if="event"
    class="event-detail"
>

    <!-- BOTÓN REGRESAR -->
    <router-link
        :to="`/eventos/${event.category.toLowerCase()}`"
        class="back-btn"
    >
        ← Regresar
    </router-link>

    <!-- HERO -->
    <section class="hero">

        <img
            class="banner"
            :src="event.banner"
            :alt="event.title"
        >

        <div class="overlay">

            <img
                class="logo"
                :src="event.logo"
                :alt="event.title"
            >

            <div>

                <span class="badge">
                    {{ event.category }}
                </span>

                <h1>
                    {{ event.title }}
                </h1>

                <p>
                    {{ event.shortDescription }}
                </p>

            </div>

        </div>

    </section>

    <!-- CONTENIDO -->
    <section class="container">

        <!-- INFORMACIÓN -->
        <div class="left">

            <!-- DESCRIPCIÓN -->
            <div class="card">

                <h2>Descripción</h2>

                <p>
                    {{ event.description }}
                </p>

            </div>

            <!-- ACTIVIDADES -->
            <div class="card">

                <h2>Actividades</h2>

                <ul>

                    <li
                        v-for="activity in event.activities"
                        :key="activity"
                    >
                        {{ activity }}
                    </li>

                </ul>

            </div>

            <!-- CRONOGRAMA -->
            <div class="card">

                <h2>Cronograma</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Hora</th>

                            <th>Actividad</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr
                            v-for="item in event.schedule"
                            :key="item.time"
                        >

                            <td>{{ item.time }}</td>

                            <td>{{ item.activity }}</td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <!-- PONENTES -->
            

        </div>

        <!-- SIDEBAR -->
        <aside class="sidebar">

            <div class="info-card">

                <h3>Información General</h3>

                <p>📅 <strong>Fecha:</strong> {{ event.date }}</p>

                <p>🕘 <strong>Hora:</strong> {{ event.time }}</p>

                <p>📍 <strong>Lugar:</strong> {{ event.place }}</p>

                <p>👥 <strong>Cupo:</strong> {{ event.capacity }}</p>

                <p>💲 <strong>Costo:</strong> {{ event.cost }}</p>

            </div>

            <!-- REGISTRO -->
            <router-link
                class="register-btn"
                :to="event.registerRoute"
            >
                📝 Registrarse
            </router-link>

            <!-- REFERENCIA BANCARIA -->
            <router-link
                v-if="event.tienePago && event.id === 1"
                class="bank-btn"
                to="/referencia-escala"
            >
                🏦 Imprimir referencia bancaria
            </router-link>

            <!-- SUBIR COMPROBANTE -->
            <router-link
                v-if="event.tienePago"
                class="secondary"
                :to="'/subir-comprobante/' + event.id"
            >
                📤 Subir comprobante de pago
            </router-link>

            <!-- CONSTANCIA -->
            <router-link
                class="secondary"
                :to="'/constancia/' + event.id"
            >
                🎓 Consultar constancia
            </router-link>


        </aside>

    </section>

</div>

<!-- EVENTO NO ENCONTRADO -->
<div
    v-else
    class="not-found"
>

    <h1>Evento no encontrado</h1>

    <p>
        El evento que intentas consultar no existe o fue eliminado.
    </p>

    <router-link
        to="/eventos/categoria"
        class="back-home"
    >
        Volver a categorías
    </router-link>

</div>

</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// ID recibido desde la URL
const eventId = Number(route.params.id);

// Base de datos temporal (después vendrá de la API)
const events = [

  // =====================================================
  // CONGRESO ESCALA
  // =====================================================

  {
    id: 1,

    category: "academicos",

    title: "Congreso ESCALA",

    shortDescription:
      "Congreso Internacional de Investigación e Innovación.",

    description:
      "El Congreso ESCALA reúne estudiantes, docentes e investigadores para compartir conocimientos, resultados de investigación, innovación tecnológica y experiencias académicas mediante conferencias magistrales, talleres, concursos y presentación de proyectos.",

    banner:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600",

    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6buUnFl0TG8KgXO5GMXJmDsC_rOg23D2Aqmie-g9LvSp85jyZABaZfCY&s=10",

    date: "10 al 12 de Septiembre",

    time: "09:00 a.m.",

    place: "Instituto Tecnológico de Ensenada",

    capacity: "500 participantes",

    cost: "$700 MXN",

    organizer: "Departamento de Sistemas",

    // ==========================
    // ENLACES DEL SISTEMA
    // ==========================

    registerRoute: "/registro-escala",

    convocatoria:
      "https://itevent.mx/documentos/convocatoria-escala.pdf",

    programa:
      "https://itevent.mx/documentos/programa-escala.pdf",

    reciboBanco:
      "https://itevent.mx/escala/referencia-bancaria",

    tienePago: true,

    // ==========================

    activities: [

      "Conferencia Magistral",

      "Talleres Especializados",

      "Presentación de Proyectos",

      "Concursos Académicos",

      "Networking",

      "Exposición Tecnológica"

    ],

    schedule: [

      {
        time: "09:00",
        activity: "Ceremonia de inauguración"
      },

      {
        time: "10:30",
        activity: "Conferencia Magistral"
      },

      {
        time: "13:00",
        activity: "Talleres"
      },

      {
        time: "16:00",
        activity: "Presentación de proyectos"
      }

    ],



  },

  // =====================================================
  // CONGRESO ARGOS
  // =====================================================

  {

    id: 2,

    category: "academicos",

    title: "Congreso ARGOS",

    shortDescription:
      "Encuentro entre estudiantes y empresas.",

    description:
      "El Congreso ARGOS fortalece la relación entre la industria y los estudiantes mediante conferencias, networking, bolsa de trabajo, talleres y actividades enfocadas al desarrollo profesional.",

    banner:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600",

    logo:
      "https://www.tijuana.tecnm.mx/wp-content/uploads/2025/09/Logotipo-ARGOS-2025-b_page-0001.jpg",

    date: "25 de Octubre",

    time: "08:30 a.m.",

    place: "Centro de Información",

    capacity: "300 participantes",

    cost: "Gratuito",

    organizer: "Instituto Tecnológico de Ensenada",

    // ==========================

    registerRoute: "/registro-argos",

    convocatoria:
      "https://itevent.mx/documentos/convocatoria-argos.pdf",

    programa:
      "https://itevent.mx/documentos/programa-argos.pdf",

    reciboBanco: "",

    tienePago: false,

    // ==========================

    activities: [

      "Conferencias",

      "Networking",

      "Bolsa de Trabajo",

      "Visitas Industriales"

    ],

    schedule: [

      {
        time: "09:00",
        activity: "Registro"
      },

      {
        time: "10:00",
        activity: "Conferencia Principal"
      },

      {
        time: "12:00",
        activity: "Networking"
      },

      {
        time: "14:00",
        activity: "Bolsa de Trabajo"
      }

    ],

   

  },
    // =====================================================
  // CARRERA ATLÉTICA
  // =====================================================

  {

    id: 3,

    category: "deportivos",

    title: "Carrera Atlética",

    shortDescription:
      "Competencia deportiva institucional.",

    description:
      "Evento deportivo organizado para fomentar la actividad física, la convivencia y el trabajo en equipo entre estudiantes, docentes y personal del Instituto.",

    banner:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1600",

    logo:
      "https://cdn-icons-png.flaticon.com/512/857/857455.png",

    date: "15 de Noviembre",

    time: "07:00 a.m.",

    place: "Unidad Deportiva",

    capacity: "1000 participantes",

    cost: "$150 MXN",

    organizer: "Departamento de Actividades Extraescolares",

    // ==========================
    // ENLACES DEL SISTEMA
    // ==========================

    registerRoute: "/registro-carrera",

    convocatoria:
      "https://itevent.mx/documentos/convocatoria-carrera.pdf",

    programa:
      "https://itevent.mx/documentos/programa-carrera.pdf",

    reciboBanco:
      "https://itevent.mx/carrera/referencia-bancaria",

    tienePago: true,

    // ==========================

    activities: [

      "Carrera de 5 km",

      "Carrera de 10 km",

      "Premiación",

      "Activación física"

    ],

    schedule: [

      {

        time: "07:00",

        activity: "Registro"

      },

      {

        time: "08:00",

        activity: "Inicio de la carrera"

      },

      {

        time: "10:00",

        activity: "Premiación"

      }

    ],

  }

];

// ====================================
// BUSCAR EVENTO
// ====================================

const event = computed(() => {

  return events.find(e => e.id === eventId);

});

// ====================================
// FUNCIONES
// ====================================

// Imprimir referencia bancaria
function imprimirRecibo() {

  if (event.value?.reciboBanco) {

    window.open(event.value.reciboBanco, "_blank");

  }

}

// Descargar programa
function descargarPrograma() {

  if (event.value?.programa) {

    window.open(event.value.programa, "_blank");

  }

}

</script>


<style scoped>

/* =====================================
   RESET
===================================== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

.event-detail{
    min-height:100vh;
    background:#f4f7fb;
    font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
}

/* =====================================
   BOTÓN REGRESAR
===================================== */

.back-btn{

    position:fixed;

    top:20px;

    left:20px;

    z-index:999;

    background:#003366;

    color:#fff;

    text-decoration:none;

    padding:12px 22px;

    border-radius:12px;

    font-weight:600;

    transition:.3s;

    box-shadow:0 8px 20px rgba(0,0,0,.20);

}

.back-btn:hover{

    background:#0055aa;

    transform:translateY(-3px);

}

/* =====================================
   HERO
===================================== */

.hero{

    position:relative;

    height:520px;

    overflow:hidden;

}

.banner{

    width:100%;

    height:100%;

    object-fit:cover;

    filter:brightness(.40);

}

.overlay{

    position:absolute;

    inset:0;

    display:flex;

    align-items:center;

    gap:45px;

    max-width:1400px;

    margin:auto;

    padding:0 40px;

    color:white;

}

.logo{

    width:170px;

    height:170px;

    background:white;

    border-radius:20px;

    object-fit:contain;

    padding:18px;

    box-shadow:0 15px 35px rgba(0,0,0,.35);

}

.badge{

    display:inline-block;

    background:#0055aa;

    color:white;

    padding:8px 20px;

    border-radius:30px;

    font-weight:bold;

    margin-bottom:20px;

}

.overlay h1{

    font-size:3rem;

    margin-bottom:18px;

}

.overlay p{

    max-width:700px;

    font-size:1.15rem;

    line-height:1.8;

}

/* =====================================
   CONTENEDOR
===================================== */

.container{

    max-width:1400px;

    margin:auto;

    display:grid;

    grid-template-columns:2fr 1fr;

    gap:35px;

    padding:50px 30px;

}

/* =====================================
   CARDS
===================================== */

.card{

    background:white;

    border-radius:18px;

    padding:30px;

    margin-bottom:30px;

    box-shadow:0 10px 25px rgba(0,0,0,.08);

}

.card h2{

    color:#003366;

    margin-bottom:18px;

    font-size:1.6rem;

}

.card p{

    color:#555;

    line-height:1.9;

}

.card ul{

    padding-left:20px;

}

.card li{

    margin-bottom:12px;

    color:#555;

    line-height:1.7;

}

/* =====================================
   TABLA
===================================== */

table{

    width:100%;

    border-collapse:collapse;

    overflow:hidden;

    border-radius:12px;

}

thead{

    background:#003366;

    color:white;

}

th{

    padding:14px;

}

td{

    padding:14px;

    border-bottom:1px solid #ddd;

}

tbody tr:hover{

    background:#f3f7ff;

}

/* =====================================
   PONENTES
===================================== */

.speakers{

    display:grid;

    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));

    gap:25px;

}

.speaker{

    text-align:center;

    padding:20px;

    border-radius:15px;

    background:#fafafa;

    transition:.3s;

}

.speaker:hover{

    transform:translateY(-5px);

    box-shadow:0 10px 20px rgba(0,0,0,.10);

}

.speaker img{

    width:120px;

    height:120px;

    object-fit:cover;

    border-radius:50%;

    border:4px solid #0055aa;

    margin-bottom:15px;

}

.speaker h4{

    color:#003366;

    margin-bottom:8px;

}

.speaker p{

    color:#666;

    font-size:.9rem;

}

/* =====================================
   SIDEBAR
===================================== */

.sidebar{

    position:sticky;

    top:90px;

    height:max-content;

}

.info-card{

    background:white;

    border-radius:18px;

    padding:30px;

    box-shadow:0 10px 25px rgba(0,0,0,.08);

    margin-bottom:25px;

}

.info-card h3{

    color:#003366;

    margin-bottom:20px;

}

.info-card p{

    color:#555;

    margin-bottom:15px;

    line-height:1.7;

}

/* =====================================
   BOTONES
===================================== */

.register-btn{

    display:block;

    width:100%;

    text-align:center;

    text-decoration:none;

    background:linear-gradient(90deg,#003366,#0055aa);

    color:white;

    padding:16px;

    border-radius:12px;

    font-size:1rem;

    font-weight:bold;

    margin-bottom:15px;

    transition:.3s;

}

.register-btn:hover{

    transform:translateY(-3px);

    box-shadow:0 12px 25px rgba(0,85,170,.35);

}

/* BOTÓN REFERENCIA BANCARIA */

.bank-btn {
    width: 100%;
    border: none;
    background: linear-gradient(135deg, #2e7d32, #43a047);
    color: #fff;
    padding: 16px 20px;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 15px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    box-shadow: 0 6px 15px rgba(46, 125, 50, 0.25);

    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        background 0.25s ease;
}

.bank-btn:hover {
    background: linear-gradient(135deg, #1b5e20, #2e7d32);
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(46, 125, 50, 0.35);
}

.bank-btn:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba(46, 125, 50, 0.25);
}

.bank-btn:focus-visible {
    outline: 3px solid rgba(76, 175, 80, 0.35);
    outline-offset: 3px;
}

/* BOTONES SECUNDARIOS */

.secondary{

    width:100%;

    display:block;

    text-align:center;

    text-decoration:none;

    border:none;

    background:#eef3fb;

    color:#003366;

    padding:15px;

    border-radius:12px;

    font-size:.95rem;

    font-weight:600;

    cursor:pointer;

    margin-bottom:12px;

    transition:.3s;

}

.secondary:hover{

    background:#003366;

    color:white;

}

/* =====================================
   EVENTO NO ENCONTRADO
===================================== */

.not-found{

    min-height:100vh;

    display:flex;

    flex-direction:column;

    justify-content:center;

    align-items:center;

    text-align:center;

    padding:40px;

}

.not-found h1{

    color:#003366;

    font-size:3rem;

    margin-bottom:20px;

}

.not-found p{

    color:#666;

    margin-bottom:30px;

    max-width:600px;

}

.back-home{

    background:#003366;

    color:white;

    text-decoration:none;

    padding:15px 28px;

    border-radius:12px;

    transition:.3s;

}

.back-home:hover{

    background:#0055aa;

}

/* =====================================
   RESPONSIVE
===================================== */

@media(max-width:1100px){

.container{

grid-template-columns:1fr;

}

.sidebar{

position:relative;

top:0;

}

.overlay{

flex-direction:column;

justify-content:center;

text-align:center;

padding:40px;

}

.logo{

width:140px;

height:140px;

}

.overlay h1{

font-size:2.3rem;

}

}

@media(max-width:768px){

.hero{

height:650px;

}

.overlay{

padding:30px 20px;

}

.overlay h1{

font-size:2rem;

}

.overlay p{

font-size:1rem;

}

.container{

padding:30px 15px;

}

.card{

padding:22px;

}

.back-btn{

top:15px;

left:15px;

padding:10px 16px;

font-size:.9rem;

}

.speakers{

grid-template-columns:1fr;

}

}

</style>