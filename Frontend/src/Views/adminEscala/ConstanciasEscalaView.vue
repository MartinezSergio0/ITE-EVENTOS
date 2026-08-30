<template>

  <div class="page">

    <!-- =========================================
         ENCABEZADO
    ========================================== -->

    <div class="header">

      <div>

        <span>CONGRESO ESCALA</span>

        <h1>
          Constancias
        </h1>

        <p>
          Administra la plantilla que se utilizará
          para generar las constancias del evento.
        </p>

      </div>

    </div>


    <!-- =========================================
         SUBIR PLANTILLA
    ========================================== -->

    <div class="panel template-panel">

      <div class="panel-title">

        <div class="template-icon">
          🎓
        </div>

        <div>

          <h2>
            Plantilla de constancia
          </h2>

          <p>
            Sube el archivo PDF que se utilizará
            como formato para las constancias.
          </p>

        </div>

      </div>


      <!-- INPUT OCULTO -->

      <input
        ref="templateInput"
        type="file"
        accept=".pdf,application/pdf"
        hidden
        @change="handleFile"
      >


      <!-- BOTÓN SUBIR -->

      <button
        class="primary-btn"
        @click="openFileSelector"
      >

        📤

        {{ template ? "Cambiar plantilla" : "Subir plantilla PDF" }}

      </button>


      <!-- =========================================
           ARCHIVO SELECCIONADO
      ========================================== -->

      <div
        v-if="template"
        class="template-success"
      >

        <div class="file-icon">
          📄
        </div>


        <div class="file-info">

          <strong>
            {{ template.name }}
          </strong>

          <small>
            PDF seleccionado correctamente
          </small>

          <small>
            {{ formatFileSize(template.size) }}
          </small>

        </div>


        <button
          class="delete-btn"
          @click="removeTemplate"
        >
          🗑 Eliminar
        </button>

      </div>


      <!-- =========================================
           SIN ARCHIVO
      ========================================== -->

      <div
        v-else
        class="empty-template"
      >

        <div>
          📄
        </div>

        <p>
          Todavía no has subido una plantilla.
        </p>

        <span>
          Formato permitido: PDF
        </span>

      </div>

    </div>


    <!-- =========================================
         INFORMACIÓN
    ========================================== -->

    <div class="panel information-panel">

      <div class="information-icon">
        ℹ️
      </div>

      <div>

        <h3>
          ¿Cómo funcionará?
        </h3>

        <p>
          Esta sección únicamente permite cargar la
          plantilla de constancia del Congreso ESCALA.
          Posteriormente, el sistema utilizará esta
          plantilla para generar las constancias
          personalizadas de los participantes.
        </p>

        <ul>

          <li>
            La plantilla debe estar en formato PDF.
          </li>

          <li>
            Debe contener el diseño oficial de la constancia.
          </li>

          <li>
            El sistema posteriormente podrá colocar
            automáticamente el nombre del participante.
          </li>

          <li>
            La generación y descarga de las constancias
            será conectada posteriormente con el backend.
          </li>

        </ul>

      </div>

    </div>


    <!-- =========================================
         ESTADO
    ========================================== -->

    <div
      v-if="template"
      class="status-card"
    >

      <div class="status-check">
        ✓
      </div>

      <div>

        <strong>
          Plantilla lista
        </strong>

        <span>
          Ya existe un archivo seleccionado para
          utilizarlo como formato de constancia.
        </span>

      </div>

    </div>

  </div>

</template>


<script setup>

import {
  ref
} from "vue";


/* =========================================
   REFERENCIA DEL INPUT
========================================= */

const templateInput = ref(null);


/* =========================================
   PLANTILLA
========================================= */

const template = ref(null);


/* =========================================
   ABRIR SELECTOR DE ARCHIVOS
========================================= */

function openFileSelector() {

  templateInput.value?.click();

}


/* =========================================
   SELECCIONAR ARCHIVO
========================================= */

function handleFile(event) {

  const file = event.target.files?.[0];

  if (!file) {
    return;
  }


  /* -----------------------------------------
     VALIDAR PDF
  ----------------------------------------- */

  const isPDF =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");


  if (!isPDF) {

    alert(
      "Solo puedes seleccionar archivos PDF."
    );

    event.target.value = "";

    return;
  }


  /* -----------------------------------------
     GUARDAR INFORMACIÓN DEL ARCHIVO
  ----------------------------------------- */

  template.value = {

    name: file.name,

    size: file.size,

    type: file.type,

    file: file

  };


  /*
   * IMPORTANTE:
   *
   * Aquí NO se manda todavía al backend.
   *
   * Tu compañero podrá utilizar posteriormente
   * este objeto para enviar el archivo mediante
   * FormData.
   */

}


/* =========================================
   ELIMINAR PLANTILLA
========================================= */

function removeTemplate() {

  template.value = null;


  if (templateInput.value) {

    templateInput.value.value = "";

  }

}


/* =========================================
   FORMATEAR TAMAÑO
========================================= */

function formatFileSize(bytes) {

  if (!bytes) {
    return "0 KB";
  }


  const kb = bytes / 1024;


  if (kb < 1024) {

    return `${kb.toFixed(1)} KB`;

  }


  const mb = kb / 1024;

  return `${mb.toFixed(2)} MB`;

}

</script>


<style scoped>

/* =========================================
   GENERAL
========================================= */

.page {

  padding: 35px;

  background: #f4f7fb;

  min-height: calc(100vh - 80px);

}


/* =========================================
   HEADER
========================================= */

.header {

  margin-bottom: 25px;

}

.header span {

  color: #0066b3;

  font-size: 11px;

  letter-spacing: 2px;

  font-weight: 800;

}

.header h1 {

  color: #003366;

  margin: 5px 0;

  font-size: 28px;

}

.header p {

  color: #78909c;

  margin: 0;

  font-size: 14px;

}


/* =========================================
   PANEL
========================================= */

.panel {

  background: white;

  border-radius: 18px;

  margin-bottom: 25px;

  box-shadow:
    0 5px 20px rgba(0,0,0,.05);

}


/* =========================================
   PLANTILLA
========================================= */

.template-panel {

  padding: 30px;

}

.panel-title {

  display: flex;

  align-items: center;

  gap: 15px;

  margin-bottom: 25px;

}

.template-icon {

  width: 60px;

  height: 60px;

  border-radius: 15px;

  background: #e3f2fd;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 28px;

}

.panel-title h2 {

  margin: 0 0 5px;

  color: #003366;

  font-size: 19px;

}

.panel-title p {

  margin: 0;

  color: #90a4ae;

  font-size: 12px;

}


/* =========================================
   BOTÓN PRINCIPAL
========================================= */

.primary-btn {

  border: none;

  background:
    linear-gradient(
      90deg,
      #003366,
      #0066b3
    );

  color: white;

  padding: 13px 20px;

  border-radius: 10px;

  cursor: pointer;

  font-weight: 600;

  font-size: 13px;

  transition: .25s;

}

.primary-btn:hover {

  transform: translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(0,80,150,.25);

}


/* =========================================
   ARCHIVO CARGADO
========================================= */

.template-success {

  margin-top: 20px;

  background: #e8f5e9;

  border: 1px solid #c8e6c9;

  padding: 18px;

  border-radius: 12px;

  display: flex;

  align-items: center;

  gap: 15px;

}

.file-icon {

  width: 45px;

  height: 45px;

  border-radius: 10px;

  background: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 22px;

}

.file-info {

  flex: 1;

  display: flex;

  flex-direction: column;

  gap: 3px;

}

.file-info strong {

  color: #263238;

  font-size: 13px;

  word-break: break-word;

}

.file-info small {

  color: #78909c;

  font-size: 10px;

}


/* =========================================
   ELIMINAR
========================================= */

.delete-btn {

  border: none;

  background: #ffebee;

  color: #c62828;

  padding: 9px 13px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;

  font-size: 11px;

}

.delete-btn:hover {

  background: #ffcdd2;

}


/* =========================================
   SIN PLANTILLA
========================================= */

.empty-template {

  margin-top: 20px;

  padding: 35px;

  border: 2px dashed #dfe5eb;

  border-radius: 12px;

  text-align: center;

}

.empty-template div {

  font-size: 40px;

  margin-bottom: 10px;

}

.empty-template p {

  color: #546e7a;

  margin: 5px 0;

  font-size: 13px;

}

.empty-template span {

  color: #90a4ae;

  font-size: 11px;

}


/* =========================================
   INFORMACIÓN
========================================= */

.information-panel {

  padding: 25px;

  display: flex;

  gap: 18px;

}

.information-icon {

  font-size: 25px;

  flex-shrink: 0;

}

.information-panel h3 {

  margin: 0 0 8px;

  color: #003366;

  font-size: 16px;

}

.information-panel p {

  color: #607d8b;

  font-size: 12px;

  line-height: 1.6;

  margin: 0 0 12px;

}

.information-panel ul {

  margin: 0;

  padding-left: 20px;

  color: #78909c;

  font-size: 11px;

  line-height: 1.8;

}


/* =========================================
   STATUS
========================================= */

.status-card {

  background: white;

  border-radius: 15px;

  padding: 20px 25px;

  display: flex;

  align-items: center;

  gap: 15px;

  box-shadow:
    0 5px 20px rgba(0,0,0,.05);

}

.status-check {

  width: 42px;

  height: 42px;

  border-radius: 50%;

  background: #e8f5e9;

  color: #2e7d32;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: bold;

  font-size: 20px;

}

.status-card div:last-child {

  display: flex;

  flex-direction: column;

  gap: 3px;

}

.status-card strong {

  color: #263238;

  font-size: 13px;

}

.status-card span {

  color: #90a4ae;

  font-size: 11px;

}


/* =========================================
   RESPONSIVE
========================================= */

@media(max-width:700px) {

  .page {

    padding: 20px 15px;

  }


  .template-success {

    align-items: flex-start;

    flex-wrap: wrap;

  }


  .delete-btn {

    width: 100%;

  }


  .information-panel {

    flex-direction: column;

  }

}

</style>

