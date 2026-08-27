<template>
  <div class="page">

    <div class="header">

      <div>
        <span>CONGRESO ESCALA</span>
        <h1>Participantes</h1>
        <p>
          Consulta y administra las personas registradas.
        </p>
      </div>

      <div class="total">
        {{ filteredParticipants.length }} participantes
      </div>

    </div>


    <!-- FILTROS -->

    <div class="filters">

      <input
        v-model="search"
        type="text"
        placeholder="🔎 Buscar por nombre, correo o control..."
      >

      <select v-model="paymentFilter">

        <option value="all">
          Todos los pagos
        </option>

        <option value="approved">
          Aprobados
        </option>

        <option value="pending">
          Pendientes
        </option>

        <option value="rejected">
          Rechazados
        </option>

      </select>

      <select v-model="typeFilter">

        <option value="all">
          Todos los tipos
        </option>

        <option value="Estudiante">
          Estudiantes
        </option>

        <option value="Docente">
          Docentes
        </option>

        <option value="General">
          Generales
        </option>

      </select>

    </div>


    <!-- TABLA -->

    <div class="panel">

      <div class="table-container">

        <table>

          <thead>

            <tr>
              <th>Participante</th>
              <th>Control</th>
              <th>Tipo</th>
              <th>Correo</th>
              <th>Pago</th>
              <th>Asistencia</th>
              <th></th>
            </tr>

          </thead>

          <tbody>

            <tr
              v-for="participant in filteredParticipants"
              :key="participant.id"
            >

              <td>

                <div class="user">

                  <div class="avatar">
                    {{ initials(participant.name) }}
                  </div>

                  <div>
                    <strong>
                      {{ participant.name }}
                    </strong>

                    <small>
                      {{ participant.reference }}
                    </small>
                  </div>

                </div>

              </td>

              <td>
                {{ participant.control }}
              </td>

              <td>
                {{ participant.type }}
              </td>

              <td>
                {{ participant.email }}
              </td>

              <td>

                <span
                  class="badge"
                  :class="participant.payment"
                >
                  {{ paymentText(participant.payment) }}
                </span>

              </td>

              <td>

                <span
                  :class="[
                    'attendance',
                    participant.attended ? 'present' : ''
                  ]"
                >
                  {{
                    participant.attended
                      ? '✓ Presente'
                      : 'Sin asistencia'
                  }}
                </span>

              </td>

              <td>

                <button
                  class="view-btn"
                  @click="selected = participant"
                >
                  Ver
                </button>

              </td>

            </tr>

            <tr v-if="!filteredParticipants.length">

              <td colspan="7">

                <div class="empty">
                  No se encontraron participantes.
                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>


    <!-- MODAL -->

    <div
      v-if="selected"
      class="overlay"
      @click.self="selected = null"
    >

      <div class="modal">

        <button
          class="close"
          @click="selected = null"
        >
          ✕
        </button>

        <div class="big-avatar">
          {{ initials(selected.name) }}
        </div>

        <h2>{{ selected.name }}</h2>

        <p>{{ selected.control }}</p>

        <div class="data">

          <div>
            <span>Correo</span>
            <strong>{{ selected.email }}</strong>
          </div>

          <div>
            <span>Tipo</span>
            <strong>{{ selected.type }}</strong>
          </div>

          <div>
            <span>Referencia bancaria</span>
            <strong>{{ selected.reference }}</strong>
          </div>

          <div>
            <span>Pago</span>
            <strong>
              {{ paymentText(selected.payment) }}
            </strong>
          </div>

          <div>
            <span>Asistencia</span>
            <strong>
              {{ selected.attended ? "Registrada" : "No registrada" }}
            </strong>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>

import { ref, computed, onMounted } from "vue";

const STORAGE_KEY = "escala_participants";

const participants = ref([]);

const search = ref("");

const paymentFilter = ref("all");

const typeFilter = ref("all");

const selected = ref(null);


function loadParticipants() {

  const saved = localStorage.getItem(STORAGE_KEY);

  participants.value = saved
    ? JSON.parse(saved)
    : [];

}


const filteredParticipants = computed(() => {

  const text = search.value.toLowerCase().trim();

  return participants.value.filter(participant => {

    const matchesSearch =
      participant.name
        .toLowerCase()
        .includes(text)
      ||
      participant.email
        .toLowerCase()
        .includes(text)
      ||
      participant.control
        .toLowerCase()
        .includes(text);

    const matchesPayment =
      paymentFilter.value === "all"
      ||
      participant.payment === paymentFilter.value;

    const matchesType =
      typeFilter.value === "all"
      ||
      participant.type === typeFilter.value;

    return (
      matchesSearch &&
      matchesPayment &&
      matchesType
    );

  });

});


function initials(name) {

  return name
    .split(" ")
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();

}


function paymentText(payment) {

  if (payment === "approved") {
    return "Aprobado";
  }

  if (payment === "pending") {
    return "Pendiente";
  }

  return "Rechazado";

}


onMounted(loadParticipants);

</script>

<style scoped>

.page {
  padding: 35px;
  background: #f4f7fb;
  min-height: calc(100vh - 80px);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.header span {
  color: #0066b3;
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 800;
}

h1 {
  margin: 5px 0;
  color: #003366;
}

.header p {
  color: #78909c;
  margin: 0;
}

.total {
  background: white;
  color: #003366;
  font-weight: 700;
  padding: 12px 18px;
  border-radius: 12px;
}

.filters {
  background: white;
  padding: 20px;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.filters input,
.filters select {
  padding: 13px;
  border: 1px solid #dfe5eb;
  border-radius: 9px;
  outline: none;
}

.filters input:focus,
.filters select:focus {
  border-color: #0066b3;
}

.panel {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,.05);
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

th {
  background: #f8fafc;
  color: #78909c;
  font-size: 10px;
  text-transform: uppercase;
  text-align: left;
  padding: 15px 20px;
}

td {
  padding: 15px 20px;
  border-bottom: 1px solid #edf0f3;
  font-size: 12px;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user div:last-child {
  display: flex;
  flex-direction: column;
}

.user small {
  color: #90a4ae;
  font-size: 9px;
}

.avatar,
.big-avatar {
  border-radius: 50%;
  background: #e3f2fd;
  color: #0066b3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.avatar {
  width: 38px;
  height: 38px;
  font-size: 11px;
}

.badge {
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
}

.badge.approved {
  background: #e8f5e9;
  color: #2e7d32;
}

.badge.pending {
  background: #fff3e0;
  color: #ef6c00;
}

.badge.rejected {
  background: #ffebee;
  color: #c62828;
}

.attendance {
  color: #90a4ae;
}

.attendance.present {
  color: #2e7d32;
  font-weight: 600;
}

.view-btn {
  border: none;
  background: #e3f2fd;
  color: #0066b3;
  padding: 8px 13px;
  border-radius: 8px;
  cursor: pointer;
}

.empty {
  text-align: center;
  padding: 50px;
  color: #90a4ae;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal {
  background: white;
  width: 100%;
  max-width: 480px;
  border-radius: 20px;
  padding: 35px;
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
  background: #f1f3f5;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}

.big-avatar {
  width: 75px;
  height: 75px;
  margin: auto;
  font-size: 22px;
}

.modal h2 {
  color: #003366;
  margin-bottom: 4px;
}

.modal > p {
  color: #90a4ae;
}

.data {
  text-align: left;
  margin-top: 25px;
  display: grid;
  gap: 10px;
}

.data div {
  background: #f7f9fb;
  padding: 12px;
  border-radius: 9px;
}

.data span {
  display: block;
  color: #90a4ae;
  font-size: 9px;
  margin-bottom: 4px;
}

.data strong {
  font-size: 12px;
}

@media(max-width:700px) {

  .page {
    padding: 20px 15px;
  }

  .header {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .filters {
    grid-template-columns: 1fr;
  }

}

</style>