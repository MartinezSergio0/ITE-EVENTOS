<template>
  <div class="admin-argos">

    <!-- =====================================================
         SIDEBAR
    ====================================================== -->

    <aside
      class="sidebar"
      :class="{ open: sidebarOpen }"
    >

      <!-- LOGO -->
      <div class="sidebar-header">

        <div class="logo">
          AR
        </div>

        <div class="logo-info">
          <strong>ARGOS</strong>
          <span>Administrador</span>
        </div>

      </div>


      <!-- PERFIL -->
      <div class="profile">

        <div class="profile-avatar">
          AR
        </div>

        <div>
          <strong>Administrador</strong>
          <span>Congreso ARGOS</span>
        </div>

      </div>


      <!-- MENU -->
      <nav class="menu">

        <span class="menu-label">
          PRINCIPAL
        </span>

        <button
          :class="{ active: currentSection === 'dashboard' }"
          @click="changeSection('dashboard')"
        >
          <span>📊</span>
          Dashboard
        </button>


        <button
          :class="{ active: currentSection === 'participantes' }"
          @click="changeSection('participantes')"
        >
          <span>👥</span>
          Participantes

          <b class="menu-count">
            {{ participants.length }}
          </b>
        </button>


        <button
          :class="{ active: currentSection === 'comprobantes' }"
          @click="changeSection('comprobantes')"
        >
          <span>💳</span>
          Comprobantes

          <b
            v-if="pendingReceipts > 0"
            class="menu-alert"
          >
            {{ pendingReceipts }}
          </b>
        </button>

        
        <button
          :class="{ active: currentSection === 'asistencia' }"
          @click="changeSection('asistencia')"
        >
          <span>📋</span>
          Pasar lista
        </button>



        <span class="menu-label event-label">
          EVENTO
        </span>


        <button
          :class="{ active: currentSection === 'constancias' }"
          @click="changeSection('constancias')"
        >
          <span>🎓</span>
          Constancias
        </button>

      </nav>


      <!-- PARTE INFERIOR -->
      <div class="sidebar-bottom">

        <button
          class="back-button"
          @click="goBack"
        >
          ← Volver al panel
        </button>

      </div>

    </aside>


    <!-- =====================================================
         CONTENIDO PRINCIPAL
    ====================================================== -->

    <main class="main">

      <!-- HEADER -->

      <header class="topbar">

        <div class="topbar-left">

          <button
            class="mobile-button"
            @click="sidebarOpen = !sidebarOpen"
          >
            ☰
          </button>

          <div>

            <h1>
              {{ sectionTitle }}
            </h1>

            <p>
              Administración del Congreso ARGOS
            </p>

          </div>

        </div>


        <div class="topbar-right">

          <span class="event-active">
            <i></i>
            Evento activo
          </span>

          <div class="user">

            <div class="user-avatar">
              AR
            </div>

            <span>
              Administrador
            </span>

          </div>

        </div>

      </header>


      <!-- =====================================================
           DASHBOARD
      ====================================================== -->

      <section
        v-if="currentSection === 'dashboard'"
        class="page"
      >

        <!-- BUSCADOR DEL DASHBOARD -->
        <div class="filters search-only">
          <input
            v-model="searchDashboard"
            type="search"
            placeholder="🔎 Buscar estudiante por nombre o folio..."
            aria-label="Buscar estudiante por nombre o folio en el dashboard"
          />
        </div>

        <!-- BIENVENIDA -->

        <div class="welcome">

          <div>

            <span>
              CONGRESO ARGOS
            </span>

            <h2>
              Panel de administración
            </h2>

            <p>
              Administra participantes, valida comprobantes
              de pago y genera las constancias del Congreso ARGOS.
            </p>

          </div>

          <div class="welcome-icon">
            🎓
          </div>

        </div>


        <!-- ESTADÍSTICAS -->

        <div class="stats">

          <div class="stat">

            <div class="stat-icon blue">
              👥
            </div>

            <div>
              <span>Participantes</span>
              <strong>{{ participants.length }}</strong>
              <small>Registrados</small>
            </div>

          </div>


          <div class="stat">

            <div class="stat-icon green">
              ✓
            </div>

            <div>
              <span>Pagos aprobados</span>
              <strong>{{ approvedPayments }}</strong>
              <small>Confirmados</small>
            </div>

          </div>


          <div class="stat">

            <div class="stat-icon orange">
              ⏳
            </div>

            <div>
              <span>Por revisar</span>
              <strong>{{ pendingReceipts }}</strong>
              <small>Comprobantes</small>
            </div>

          </div>


          <div class="stat">

            <div class="stat-icon purple">
              🎓
            </div>

            <div>
              <span>Constancias</span>
              <strong>{{ generatedCertificates }}</strong>
              <small>Generadas</small>
            </div>

          </div>

        </div>


        <!-- GRID -->

        <div class="dashboard-grid">

          <!-- COMPROBANTES -->

          <div class="card">

            <div class="card-header">

              <div>
                <h3>
                  Comprobantes pendientes
                </h3>

                <p>
                  Requieren revisión
                </p>
              </div>

              <button
                @click="changeSection('comprobantes')"
              >
                Ver todos →
              </button>

            </div>


            <div
              v-if="pendingParticipants.length"
              class="pending-list"
            >

              <div
                v-for="participant in filteredDashboardPendingParticipants.slice(0, 5)"
                :key="participant.id"
                class="pending"
              >

                <div class="avatar">
                  {{ getInitials(participant.name) }}
                </div>

                <div class="pending-info">

                  <strong>
                    {{ participant.name }}
                  </strong>

                  <span>
                    {{ participant.control }}
                  </span>

                </div>

                <span class="pending-badge">
                  Pendiente
                </span>

              </div>

            </div>


            <div
              v-else
              class="empty"
            >
              ✓
              <p>No hay comprobantes pendientes.</p>
            </div>

          </div>


          <!-- EVENTO -->

          <div class="card">

            <div class="card-header">

              <div>
                <h3>
                  Información del evento
                </h3>

                <p>
                  Congreso ARGOS
                </p>
              </div>

            </div>


            <div class="event-info">

              <div>
                <span>Fecha</span>
                <strong>{{ eventInfo.date }}</strong>
              </div>

              <div>
                <span>Lugar</span>
                <strong>{{ eventInfo.place }}</strong>
              </div>

              <div>
                <span>Cuota</span>
                <strong>{{ eventInfo.cost }}</strong>
              </div>

              <div>
                <span>Capacidad</span>
                <strong>{{ eventInfo.capacity }}</strong>
              </div>

            </div>

          </div>

        </div>


        <!-- PARTICIPANTES RECIENTES -->

        <div class="card">

          <div class="card-header">

            <div>
              <h3>
                Participantes recientes
              </h3>

              <p>
                Últimos registros
              </p>
            </div>

            <button
              @click="changeSection('participantes')"
            >
              Ver participantes →
            </button>

          </div>


          <div class="table-container">

            <table>

              <thead>

                <tr>
                  <th>Participante</th>
                  <th>Control</th>
                  <th>Tipo</th>
                  <th>Pago</th>
                  <th>Asistencia</th>
                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="participant in filteredDashboardParticipants.slice(0, 5)"
                  :key="participant.id"
                >

                  <td>

                    <div class="table-user">

                      <div class="avatar">
                        {{ getInitials(participant.name) }}
                      </div>

                      <div>
                        <strong>
                          {{ participant.name }}
                        </strong>

                        <span>{{ participant.email }}</span>
                        <small class="student-folio">Folio: {{ getStudentFolio(participant) }}</small>
                      </div>

                    </div>

                  </td>


                  <td>
                    {{ participant.control }}
                  </td>


                  <td>
                    <span class="type">
                      {{ participant.type }}
                    </span>
                  </td>


                  <td>

                    <span
                      class="payment"
                      :class="participant.payment"
                    >
                      {{ paymentText(participant.payment) }}
                    </span>

                  </td>


                  <td>

                    <span
                      :class="[
                        'attendance',
                        { present: participant.attended }
                      ]"
                    >
                      {{
                        participant.attended
                          ? '✓ Presente'
                          : 'Sin asistencia'
                      }}
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>


      <!-- =====================================================
           PARTICIPANTES
      ====================================================== -->

        <section
          v-if="currentSection === 'participantes'"
          class="page"
        >
          <div class="section-header">
            <div>
              <h2>Participantes</h2>
              <p>
                Consulta los participantes registrados en ARGOS.
              </p>
            </div>
          </div>

          <!-- FILTROS -->
          <div class="filters">
            <input
              v-model="searchParticipants"
              type="text"
              placeholder="🔎 Buscar estudiante por nombre o folio..."
            />

            <select v-model="paymentFilter">
              <option value="all">Todos los pagos</option>
              <option value="approved">Aprobados</option>
              <option value="pending">Pendientes</option>
              <option value="rejected">Rechazados</option>
            </select>

            <select v-model="typeFilter">
              <option value="all">Todos los tipos</option>
              <option value="Estudiante">Estudiantes</option>
              <option value="Docente">Docentes</option>
              <option value="General">Generales</option>
            </select>
          </div>

          <!-- TABLA -->
          <div class="card">
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Participante</th>
                    <th>Control</th>
                    <th>NSS</th>
                    <th>Taller</th>
                    <th>Visita industrial</th>
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
                    <!-- PARTICIPANTE -->
                    <td>
                      <div class="table-user">
                        <div class="avatar">
                          {{ getInitials(participant.name) }}
                        </div>

                        <div>
                          <strong>{{ participant.name }}</strong>
                          <small class="student-folio">
                            Folio: {{ getStudentFolio(participant) }}
                          </small>
                        </div>
                      </div>
                    </td>

                    <!-- NUMERO DE CONTROL -->
                    <td>
                      {{ participant.control || 'Sin registro' }}
                    </td>

                    <!-- NSS -->
                    <td>
                      {{
                        participant.socialSecurityNumber ||
                        participant.nss ||
                        participant.numeroSeguroSocial ||
                        'Sin NSS'
                      }}
                    </td>

                    <!-- TALLER -->
                    <td>
                      {{ participant.workshop || 'No seleccionado' }}
                    </td>

                    <!-- VISITA INDUSTRIAL -->
                    <td>
                      {{ participant.industrialVisit || 'No seleccionada' }}
                    </td>

                    <!-- TIPO -->
                    <td>
                      {{ participant.type }}
                    </td>

                    <!-- CORREO -->
                    <td>
                      {{ participant.email }}
                    </td>

                    <!-- PAGO -->
                    <td>
                      <span
                        class="payment"
                        :class="participant.payment"
                      >
                        {{ paymentText(participant.payment) }}
                      </span>
                    </td>

                    <!-- ASISTENCIA -->
                    <td>
                      <span
                        :class="[
                          'attendance',
                          { present: participant.attended }
                        ]"
                      >
                        {{
                          participant.attended
                            ? '✓ Presente'
                            : 'Pendiente'
                        }}
                      </span>
                    </td>

                    <!-- ACCIONES -->
                    <td>
                      <button
                        class="view-button"
                        @click="selectedParticipant = participant"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>

                  <!-- SIN RESULTADOS -->
                  <tr v-if="filteredParticipants.length === 0">
                    <td
                      colspan="10"
                      class="empty-table"
                    >
                      No se encontraron participantes.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


      <!-- =====================================================
           COMPROBANTES
      ====================================================== -->

      <section
        v-if="currentSection === 'comprobantes'"
        class="page"
      >

        <div class="section-header">

          <div>

            <h2>
              Comprobantes de pago
            </h2>

            <p>
              Revisa los archivos enviados por los participantes.
            </p>

          </div>

          <div class="receipt-counter">

            <strong>
              {{ searchReceipts.trim() ? filteredPendingParticipants.length : pendingReceipts }}
            </strong>

            pendientes

          </div>

        </div>

        <!-- BUSCADOR DE COMPROBANTES -->
        <div class="filters search-only">
          <input
            v-model="searchReceipts"
            type="search"
            placeholder="🔎 Buscar estudiante por nombre o folio..."
            aria-label="Buscar estudiante por nombre o folio en comprobantes"
          />
        </div>

        <!-- SIN COMPROBANTES -->

        <div
          v-if="filteredPendingParticipants.length === 0"
          class="no-receipts"
        >

          <div>
            ✓
          </div>

          <h3>
            {{ searchReceipts.trim() ? "No se encontraron estudiantes" : "Todo está revisado" }}
          </h3>

          <p>
            {{ searchReceipts.trim() ? "Prueba con otro nombre o folio." : "No existen comprobantes pendientes de revisión." }}
          </p>

        </div>


        <!-- COMPROBANTES -->

        <div
          v-else
          class="receipt-grid"
        >

          <article
            v-for="participant in filteredPendingParticipants"
            :key="participant.id"
            class="receipt-card"
          >

            <!-- HEADER -->

            <div class="receipt-header">

              <div class="avatar">
                {{ getInitials(participant.name) }}
              </div>

              <div>

                <strong>
                  {{ participant.name }}
                </strong>

                <span>Folio: {{ getStudentFolio(participant) }}</span>
                <span>{{ participant.control }}</span>

              </div>

            </div>


            <!-- ARCHIVO -->

            <div class="file-preview">

              <div class="file-icon">
                📄
              </div>

              <strong>
                {{ participant.receiptName }}
              </strong>

              <span>
                Comprobante enviado por el participante
              </span>

              <button
                class="view-file"
                @click="openReceipt(participant)"
              >
                👁 Ver comprobante
              </button>

            </div>


            <!-- INFORMACIÓN -->

            <div class="receipt-info">

              <div>

                <span>
                  Referencia
                </span>

                <strong>
                  {{ participant.reference }}
                </strong>

              </div>


              <div>

                <span>
                  Monto
                </span>

                <strong>
                  {{ eventInfo.cost }}
                </strong>

              </div>


              <div>

                <span>
                  Fecha de envío
                </span>

                <strong>
                  {{ participant.receiptDate }}
                </strong>

              </div>

            </div>


            <!-- ACCIONES -->

            <div class="receipt-actions">

              <button
                class="approve"
                @click="approvePayment(participant)"
              >
                ✓ Aprobar pago
              </button>

              <button
                class="reject"
                @click="rejectPayment(participant)"
              >
                ✕ Rechazar
              </button>

            </div>

          </article>

        </div>


        <!-- HISTORIAL -->

        <div class="card history-card">

          <div class="card-header">

            <div>

              <h3>
                Historial de comprobantes
              </h3>

              <p>
                Comprobantes que ya fueron revisados.
              </p>

            </div>

          </div>


          <div class="table-container">

            <table>

              <thead>

                <tr>
                  <th>Participante</th>
                  <th>Archivo</th>
                  <th>Referencia</th>
                  <th>Estado</th>
                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="participant in filteredReviewedParticipants"
                  :key="participant.id"
                >

                  <td>
                    {{ participant.name }}
                  </td>

                  <td>
                    {{ participant.receiptName }}
                  </td>

                  <td>
                    {{ participant.reference }}
                  </td>

                  <td>

                    <span
                      class="payment"
                      :class="participant.payment"
                    >
                      {{ paymentText(participant.payment) }}
                    </span>

                  </td>

                </tr>


                <tr
                  v-if="filteredReviewedParticipants.length === 0"
                >

                  <td
                    colspan="4"
                    class="empty-table"
                  >
                    Todavía no hay comprobantes revisados.
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>


      
      <!-- =====================================================
           ASISTENCIA
      ====================================================== -->

      <section
        v-if="currentSection === 'asistencia'"
        class="page"
      >

        <div class="section-header">
          <div>
            <h2>Pasar lista</h2>
            <p>
              Registra la asistencia por evento, taller o actividad.
              Con la pistola lectora, escanea el código de cada alumno.
            </p>
          </div>
        </div>

        <!-- CONFIGURACIÓN -->
        <div class="card attendance-config">
          <div class="card-header">
            <div>
              <h3>Configuración de la lista</h3>
              <p>Selecciona la actividad y la fecha de asistencia.</p>
            </div>
          </div>

          <div class="attendance-fields">

            <div>
              <label for="attendanceType">Tipo de actividad</label>
              <select id="attendanceType" v-model="attendanceType">
                <option value="evento">Evento general</option>
                <option value="combinado">Taller / visita a empresa</option>
              </select>
            </div>

            <div>
              <label for="attendanceActivity">Actividad</label>
              <select
                id="attendanceActivity"
                v-model="attendanceActivityId"
                :disabled="attendanceType === 'evento'"
              >
                <option
                  v-for="a in attendanceActivities"
                  :key="a.clave"
                  :value="a.clave"
                >
                  {{ a.nombre }}
                </option>
              </select>
            </div>

            <div>
              <label for="attendanceDate">Fecha</label>
              <input
                id="attendanceDate"
                v-model="attendanceDate"
                type="date"
              />
            </div>

          </div>
        </div>

        <!-- RESUMEN -->
        <div class="attendance-stats">

          <div class="attendance-stat">
            <span>Participantes</span>
            <strong>{{ attendanceParticipants.length }}</strong>
          </div>

          <div class="attendance-stat">
            <span>Presentes</span>
            <strong>{{ attendancePresentCount }}</strong>
          </div>

          <div class="attendance-stat">
            <span>Ausentes</span>
            <strong>{{ attendanceAbsentCount }}</strong>
          </div>

        </div>

        <!-- AVISO DEL ESCÁNER -->
        <div
          v-if="scanFeedback"
          class="scan-feedback"
          :class="scanFeedback.type"
        >
          {{ scanFeedback.text }}
        </div>

        <!-- BUSCADOR / ESCÁNER Y ACCIONES -->
        <div class="filters attendance-filters">

          <input
            ref="attendanceSearchInput"
            v-model="searchAttendance"
            type="text"
            autocomplete="off"
            placeholder="Escanea el código o busca por nombre o folio..."
            aria-label="Escanear código o buscar estudiante por nombre o folio"
            @keydown.enter.prevent="handleScan"
          />

          <button
            type="button"
            class="attendance-secondary"
            @click="markAllPresent"
          >
            Marcar todos presentes
          </button>

          <button
            type="button"
            class="attendance-secondary"
            @click="clearAttendanceMarks"
          >
            Quitar todas
          </button>

        </div>

        <!-- TABLA -->
        <div class="card">

          <div class="card-header">
            <div>
              <h3>{{ attendanceActivityName }}</h3>
              <p>Fecha: {{ attendanceDate || 'Selecciona una fecha' }}</p>
            </div>

            <span class="attendance-total">
              {{ attendancePresentCount }} presentes
            </span>
          </div>

          <div class="table-container">

            <table class="attendance-table">

              <thead>
                <tr>
                  <th>Nombre del estudiante</th>
                  <th>Folio</th>
                  <th>Control</th>
                  <th>Asistencia</th>
                </tr>
              </thead>

              <tbody>

                <tr
                  v-for="participant in filteredAttendanceParticipants"
                  :key="participant.id"
                >

                  <td>
                    <div class="table-user">
                      <div class="avatar">
                        {{ getInitials(participant.name || '') }}
                      </div>

                      <div>
                        <strong>{{ participant.name || 'Sin nombre' }}</strong>
                        <span>{{ participant.email || 'Sin correo' }}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong class="student-folio">
                      {{ getStudentFolio(participant) }}
                    </strong>
                  </td>

                  <td>
                    {{ participant.control && participant.control !== '0' ? participant.control : 'No registrado' }}
                  </td>

                  <td>
                    <button
                      type="button"
                      class="attendance-mark"
                      :class="isPresent(participant) ? 'present-mark' : 'absent-mark'"
                      @click="toggleAttendance(participant)"
                    >
                      {{ isPresent(participant) ? '✓ Presente' : 'Marcar presente' }}
                    </button>
                  </td>

                </tr>

                <tr v-if="filteredAttendanceParticipants.length === 0">
                  <td colspan="4" class="empty-table">
                    {{
                      participants.length === 0
                        ? 'No hay participantes cargados. Revisa la conexión con el backend.'
                        : attendanceParticipants.length === 0
                          ? 'Nadie está inscrito en esta actividad.'
                          : 'No se encontraron estudiantes con esa búsqueda.'
                    }}
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          <!-- GUARDAR -->
          <div class="attendance-footer">

            <span
              v-if="hasUnsavedAttendance"
              class="unsaved"
            >
              Cambios sin guardar:
              {{ attendanceAdds.length }} nuevos,
              {{ attendanceRemovals.length }} quitados.
            </span>

            <span v-else>
              Los cambios se guardan en el sistema al presionar "Guardar lista".
            </span>

            <button
              type="button"
              class="attendance-save"
              :disabled="savingAttendance || !hasUnsavedAttendance"
              @click="saveAttendance"
            >
              {{ savingAttendance ? 'Guardando...' : '💾 Guardar lista' }}
            </button>

          </div>

        </div>

      </section>



      <!-- =====================================================
           CONSTANCIAS
      ====================================================== -->

      <section
        v-if="currentSection === 'constancias'"
        class="page"
      >

        <div class="section-header">

          <div>

            <h2>
              Constancias
            </h2>

            <p>
              Administra la plantilla y genera constancias
              personalizadas para los participantes.
            </p>

          </div>

        </div>

        <!-- BUSCADOR DE CONSTANCIAS -->
        <div class="filters search-only">
          <input
            v-model="searchCertificates"
            type="search"
            placeholder="🔎 Buscar estudiante por nombre o folio..."
            aria-label="Buscar estudiante por nombre o folio en constancias"
          />
        </div>

        <!-- PLANTILLA -->

        <div class="card template-card">

          <div class="card-header">

            <div>

              <h3>
                Plantilla de constancia
              </h3>

              <p>
                Sube el archivo que se utilizará como plantilla.
              </p>

            </div>

            <span
              v-if="certificateTemplate"
              class="template-active"
            >
              ✓ Plantilla cargada
            </span>

          </div>


          <div class="template-content">

            <div class="template-icon">
              📜
            </div>


            <div class="template-info">

              <h3>
                {{
                  certificateTemplate
                    ? certificateTemplate.name
                    : 'No hay plantilla cargada'
                }}
              </h3>

              <p>
                {{
                  certificateTemplate
                    ? 'Esta plantilla será utilizada para generar las constancias.'
                    : 'Selecciona un archivo PDF o DOCX.'
                }}
              </p>


              <label class="upload-button">

                📤

                {{
                  certificateTemplate
                    ? 'Cambiar plantilla'
                    : 'Subir plantilla'
                }}

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  @change="uploadTemplate"
                />

              </label>

            </div>

          </div>

        </div>


        <!-- REGLAS -->

        <div class="info-box">

          <span>💡</span>

          <div>

            <strong>
              ¿Cómo funciona?
            </strong>

            <p>
              El sistema solamente permitirá generar una constancia
              cuando el participante tenga su pago aprobado y
              asistencia registrada.
            </p>

          </div>

        </div>


        <!-- PARTICIPANTES -->

        <div class="card">

          <div class="card-header">

            <div>

              <h3>
                Constancias de participantes
              </h3>

              <p>
                Genera la constancia individual.
              </p>

            </div>

          </div>


          <div class="certificate-list">

            <div
              v-for="participant in filteredCertificateParticipants"
              :key="participant.id"
              class="certificate-row"
            >

              <div class="table-user">

                <div class="avatar">
                  {{ getInitials(participant.name) }}
                </div>

                <div>

                  <strong>
                    {{ participant.name }}
                  </strong>

                  <span>{{ participant.email }}</span>
                  <small class="student-folio">Folio: {{ getStudentFolio(participant) }}</small>

                </div>

              </div>


              <div class="certificate-status">

                <span
                  v-if="canGenerateCertificate(participant)"
                  class="ready"
                >
                  ✓ Puede generar
                </span>

                <span
                  v-else
                  class="not-ready"
                >
                  ⏳ No cumple requisitos
                </span>

              </div>


              <div>

                <button
                  v-if="participant.certificate"
                  class="download-button"
                  @click="downloadCertificate(participant)"
                >
                  📥 Descargar
                </button>


                <button
                  v-else
                  class="generate-button"
                  :disabled="!canGenerateCertificate(participant)"
                  @click="generateCertificate(participant)"
                >
                  🎓 Generar
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>


    <!-- =====================================================
         MODAL PARTICIPANTE
    ====================================================== -->

<div
  v-if="selectedParticipant"
  class="modal-overlay"
  @click.self="selectedParticipant = null"
>
  <div class="modal participant-modal">

    <!-- BOTON CERRAR -->
    <button
      class="close"
      @click="selectedParticipant = null"
    >
      ✕
    </button>

    <!-- ENCABEZADO -->
    <div class="participant-modal-header">

      <div class="modal-avatar">
        {{ getInitials(selectedParticipant.name || '') }}
      </div>

      <div class="participant-modal-title">
        <span>CONGRESO ARGOS</span>

        <h2>
          {{ selectedParticipant.name || 'Participante' }}
        </h2>

        <p>
          Folio: {{ getStudentFolio(selectedParticipant) }}
        </p>
      </div>

    </div>

    <div class="participant-modal-divider"></div>

    <!-- INFORMACION COMPLETA -->
    <div class="participant-details-header">
      <h3>Información del participante</h3>

      <p>
        Datos registrados en el sistema.
      </p>
    </div>

   <div
  v-if="selectedParticipantDetails.length"
  class="participant-details-grid"
>

  <div
    v-for="detail in selectedParticipantDetails"
    :key="detail.key"
    class="participant-detail-item"
    :class="{ 'detail-highlight': detail.highlight }"
  >

    <span class="detail-label">
      {{ formatDetailLabel(detail.key) }}
    </span>

    <strong class="detail-value">
      {{ formatDetailValue(detail.value) }}
    </strong>

  </div>

</div>

    <div
      v-else
      class="empty-table"
    >
      No hay información adicional disponible.
    </div>

    <!-- ESTADO DEL REGISTRO -->
    <div class="participant-status-section">

      <h3>Estado del participante</h3>

      <div class="participant-status-grid">

        <div>
          <span>Pago</span>

          <strong
            class="payment"
            :class="selectedParticipant.payment"
          >
            {{ paymentText(selectedParticipant.payment) }}
          </strong>
        </div>

        <div>
          <span>Asistencia</span>

          <strong
            :class="[
              'attendance',
              { present: selectedParticipant.attended }
            ]"
          >
            {{
              selectedParticipant.attended
                ? '✓ Presente'
                : 'No registrada'
            }}
          </strong>
        </div>

        <div>
          <span>Constancia</span>

          <strong>
            {{
              selectedParticipant.certificate
                ? '✓ Generada'
                : 'Pendiente'
            }}
          </strong>
        </div>

      </div>

    </div>

    <!-- CERRAR -->
    <div class="participant-modal-footer">

  <template v-if="!editingParticipant">

    <button
      class="participant-edit-button"
      @click="startEditingParticipant"
    >
      ✏️ Editar participante
    </button>

    <button
      class="participant-close-button"
      @click="selectedParticipant = null"
    >
      Cerrar ficha
    </button>

  </template>

  <template v-else>

    <button
      class="participant-cancel-button"
      @click="cancelEditingParticipant"
    >
      Cancelar
    </button>

    <button
      class="participant-save-button"
      :disabled="savingParticipant"
      @click="saveParticipantChanges"
    >
      {{ savingParticipant ? 'Guardando...' : 'Guardar cambios' }}
    </button>

  </template>

</div>

  </div>
</div>


    <!-- =====================================================
         MODAL COMPROBANTE
    ====================================================== -->

    <div
      v-if="selectedReceipt"
      class="modal-overlay"
      @click.self="selectedReceipt = null"
    >

      <div class="receipt-modal">

        <button
          class="close"
          @click="selectedReceipt = null"
        >
          ✕
        </button>


        <h2>
          Comprobante de pago
        </h2>

        <p>
          {{ selectedReceipt.name }}
        </p>


        <div class="document-viewer">

          <div>
            📄
          </div>

          <strong>
            {{ selectedReceipt.receiptName }}
          </strong>

          <span>
            Vista previa simulada del comprobante
          </span>

        </div>


        <div class="modal-actions">

          <button
            class="approve"
            @click="approvePayment(selectedReceipt)"
          >
            ✓ Aprobar
          </button>

          <button
            class="reject"
            @click="rejectPayment(selectedReceipt)"
          >
            ✕ Rechazar
          </button>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch
} from "vue";

import {
  useRouter,
  useRoute
} from "vue-router";
import { API_URL } from "../config/api";


// =====================================================
// ROUTER
// =====================================================

const router = useRouter();
const route = useRoute();

const EVENTO_ID = 5;


// =====================================================
// SIDEBAR
// =====================================================

const sidebarOpen = ref(false);

// =====================================================
// INFORMACION EVENTO
// =====================================================

const eventInfo = ref({
  date: "",
  place: "",
  cost: "",
  capacity: ""
});

// =====================================================
// SECCIÓN
// =====================================================

const currentSection = ref("dashboard");


function syncSectionWithRoute(path) {
  if (path.endsWith("/participantes")) {
    currentSection.value = "participantes";
  } else if (path.endsWith("/comprobantes")) {
    currentSection.value = "comprobantes";
  } else if (path.endsWith("/asistencia")) {
    currentSection.value = "asistencia";
  } else if (path.endsWith("/constancias")) {
    currentSection.value = "constancias";
  } else {
    currentSection.value = "dashboard";
  }
}


watch(() => route.path, syncSectionWithRoute, { immediate: true });


// =====================================================
// FILTROS
// =====================================================

const searchDashboard = ref("");
const searchParticipants = ref("");
const searchReceipts = ref("");
const searchCertificates = ref("");

const paymentFilter = ref("all");

const typeFilter = ref("all");


// =====================================================
// MODALES
// =====================================================

const selectedParticipant = ref(null);

const selectedReceipt = ref(null);


// =====================================================
// EDICION DE PARTICIPANTE
// =====================================================

const editingParticipant = ref(false);
const savingParticipant = ref(false);

const participantForm = ref({
  name: "",
  control: "",
  email: "",
  socialSecurityNumber: "",
  workshop: "",
  industrialVisit: ""
});

function startEditingParticipant() {
  if (!selectedParticipant.value) return;

  participantForm.value = {
    name: selectedParticipant.value.name || "",
    control: selectedParticipant.value.control || "",
    email: selectedParticipant.value.email || "",
    socialSecurityNumber:
      selectedParticipant.value.socialSecurityNumber ||
      selectedParticipant.value.nss ||
      selectedParticipant.value.numeroSeguroSocial ||
      "",
    workshop: selectedParticipant.value.workshop || "",
    industrialVisit: selectedParticipant.value.industrialVisit || ""
  };

  editingParticipant.value = true;
}

function cancelEditingParticipant() {
  editingParticipant.value = false;
}

// =====================================================
// INFORMACION COMPLETA DEL PARTICIPANTE
// =====================================================

// Obtener todos los campos que devuelve el backend.
// Se excluyen credenciales y datos internos de autenticacion.

const selectedParticipantDetails = computed(() => {

  if (!selectedParticipant.value) {
    return [];
  }

  const excludedFields = [
    "id",
    "receiptname",
    "receipturl",
    "receiptdate",
    "paymentreference",
    "reference",
    "certificate",
    "constancia"
  ];

  return Object.entries(selectedParticipant.value)
    .filter(([key]) => {
      const normalizedKey = key
        .toLowerCase()
        .replace(/[_-]/g, "");

      return !excludedFields.includes(normalizedKey);
    })
    .map(([key, value]) => ({
      key,
      value,
      highlight: [
        "workshop",
        "industrialvisit"
      ].includes(
        key.toLowerCase().replace(/[_-]/g, "")
      )
    }));

});


// Convertir nombres de campos a etiquetas legibles.
function formatDetailLabel(key) {

  const labels = {
    name: "Nombre completo",
    nombre: "Nombre",
    fullName: "Nombre completo",
    nombreCompleto: "Nombre completo",
    email: "Correo electrónico",
    correo: "Correo electrónico",
    control: "Número de control",
    controlNumber: "Número de control",
    nss: "Número de Seguro Social (NSS)",
    socialSecurityNumber: "Número de Seguro Social (NSS)",
    numeroSeguroSocial: "Número de Seguro Social (NSS)",
    workshop: "Taller seleccionado",
    industrialVisit: "Visita industrial",
    type: "Tipo de participante",
    payment: "Estado del pago",
    reference: "Referencia de pago",
    attended: "Asistencia",
    certificate: "Constancia",
    folio: "Folio de inscripción",
    phone: "Teléfono",
    telefono: "Teléfono",
    institution: "Institución",
    institucion: "Institución",
    career: "Carrera",
    carrera: "Carrera",
    semester: "Semestre",
    semestre: "Semestre"
  };

  return labels[key] ||
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/^./, letter => letter.toUpperCase());

}


// Mostrar correctamente valores simples, arreglos y objetos.
function formatDetailValue(value) {

  if (value === null || value === undefined || value === "") {
    return "No proporcionado";
  }

  if (typeof value === "boolean") {
    return value ? "Sí" : "No";
  }

  if (Array.isArray(value)) {
    return value.length
      ? value.map(item =>
          typeof item === "object"
            ? JSON.stringify(item)
            : String(item)
        ).join(", ")
      : "Sin registros";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);

}

// =====================================================
// PLANTILLA
// =====================================================

const certificateTemplate = ref(null);


// =====================================================
// PARTICIPANTES
// =====================================================

const participants = ref([]);




// =====================================================
// ASISTENCIA
// =====================================================

const attendanceOptions = ref({ evento: null, talleres: [], actividades: [] });
const attendanceType = ref("evento");
const attendanceActivityId = ref(null);
const attendanceDate = ref(new Date().toLocaleDateString("en-CA"));
const searchAttendance = ref("");
const attendanceSearchInput = ref(null);
const savingAttendance = ref(false);

const attendanceMarks = ref({});
const savedPresentes = ref([]);

const scanFeedback = ref(null);
let scanFeedbackTimer = null;

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
}

// Une talleres y visitas a empresas en una sola lista.
// Se usa una clave compuesta para evitar conflictos si dos IDs coinciden.
const attendanceActivities = computed(() => {
  const talleres = (attendanceOptions.value.talleres || []).map(a => ({
    ...a,
    tipo: "taller",
    clave: `taller:${a.id}`
  }));

  const actividades = (attendanceOptions.value.actividades || []).map(a => ({
    ...a,
    tipo: "actividad",
    clave: `actividad:${a.id}`
  }));

  return [...talleres, ...actividades];
});

// Actividad elegida en el segundo desplegable.
const selectedAttendanceActivity = computed(() =>
  attendanceActivities.value.find(a => a.clave === attendanceActivityId.value) || null
);

// El backend sigue recibiendo los tipos originales: evento, taller o actividad.
const attendanceBackendType = computed(() => {
  if (attendanceType.value === "evento") return "evento";
  return selectedAttendanceActivity.value?.tipo ?? null;
});

const attendanceActivityName = computed(() => {
  if (attendanceType.value === "evento") return "Congreso ARGOS";
  return selectedAttendanceActivity.value?.nombre ?? "Selecciona una actividad";
});

// Quien aparece en la lista.
const attendanceParticipants = computed(() => {
  const nombre = attendanceActivityName.value;

  if (attendanceBackendType.value === "taller") {
    return participants.value.filter(p => p.workshop === nombre || p.industrialVisit === nombre);
  }

  if (attendanceBackendType.value === "actividad") {
    const inscritos = participants.value.filter(p => p.industrialVisit === nombre);
    return inscritos.length ? inscritos : participants.value;
  }

  return participants.value;
});

const filteredAttendanceParticipants = computed(() =>
  attendanceParticipants.value.filter(p =>
    matchesStudentSearch(p, searchAttendance.value)
  )
);

function isPresent(participant) {
  return Boolean(attendanceMarks.value[String(participant.id)]);
}

const attendancePresentCount = computed(() =>
  attendanceParticipants.value.filter(isPresent).length
);

const attendanceAbsentCount = computed(() =>
  attendanceParticipants.value.length - attendancePresentCount.value
);

// Cambios respecto a lo guardado
const attendanceAdds = computed(() =>
  Object.keys(attendanceMarks.value).filter(
    folio => !savedPresentes.value.includes(folio)
  )
);

const attendanceRemovals = computed(() =>
  savedPresentes.value.filter(folio => !attendanceMarks.value[folio])
);

const hasUnsavedAttendance = computed(() =>
  attendanceAdds.value.length > 0 || attendanceRemovals.value.length > 0
);

async function cargarOpcionesAsistencia() {
  try {
    const response = await fetch(
      `${API_URL}/eventos/${EVENTO_ID}/inscripciones/admin/asistencia/opciones`,
      { headers: authHeaders() }
    );
    if (response.ok) attendanceOptions.value = await response.json();
  } catch (e) {
    console.error("Error al cargar las actividades:", e);
  }
}

async function cargarAsistencia() {
  attendanceMarks.value = {};
  savedPresentes.value = [];

  if (!attendanceDate.value) return;

  const tipoReal = attendanceBackendType.value;
  if (attendanceType.value !== "evento" && (!attendanceActivityId.value || !tipoReal)) return;

  const params = new URLSearchParams({
    tipo: tipoReal,
    fecha: attendanceDate.value
  });

  if (tipoReal !== "evento") {
    params.set("actividadId", String(selectedAttendanceActivity.value.id));
  }

  try {
    const response = await fetch(
      `${API_URL}/eventos/${EVENTO_ID}/inscripciones/admin/asistencia?${params}`,
      { headers: authHeaders() }
    );
    if (!response.ok) return;

    const data = await response.json();
    savedPresentes.value = data.presentes;
    attendanceMarks.value = Object.fromEntries(
      data.presentes.map(folio => [folio, true])
    );
  } catch (e) {
    console.error("Error al cargar la asistencia:", e);
  }
}

// Al cambiar entre evento general y la lista combinada, selecciona la primera actividad.
watch(attendanceType, () => {
  attendanceActivityId.value =
    attendanceType.value === "combinado"
      ? attendanceActivities.value[0]?.clave ?? null
      : null;
});

// Cuando llegan las opciones desde el backend, establece una selección inicial.
watch(attendanceOptions, () => {
  if (attendanceType.value === "combinado" &&
      !attendanceActivities.value.some(a => a.clave === attendanceActivityId.value)) {
    attendanceActivityId.value = attendanceActivities.value[0]?.clave ?? null;
  }
});

watch(
  [attendanceType, attendanceActivityId, attendanceDate],
  cargarAsistencia,
  { immediate: true }
);

function toggleAttendance(participant) {
  const marks = { ...attendanceMarks.value };
  const key = String(participant.id);

  if (marks[key]) delete marks[key];
  else marks[key] = true;

  attendanceMarks.value = marks;
}

function markAllPresent() {
  const marks = { ...attendanceMarks.value };
  attendanceParticipants.value.forEach(p => {
    marks[String(p.id)] = true;
  });
  attendanceMarks.value = marks;
}

function clearAttendanceMarks() {
  if (!confirm("Se quitarán todas las asistencias de esta lista al guardar. ¿Continuar?")) {
    return;
  }
  attendanceMarks.value = {};
}

// Pistola 

function showScanFeedback(type, text) {
  scanFeedback.value = { type, text };
  clearTimeout(scanFeedbackTimer);
  scanFeedbackTimer = setTimeout(() => {
    scanFeedback.value = null;
  }, 3500);
}

// si pistola escribe el folio y manda Enter (se debe probar o algo :c)
function handleScan() {
  const code = searchAttendance.value.trim();
  if (!code) return;

  const buscado = code.toLowerCase();
  const mismoFolio = p => getStudentFolio(p).toLowerCase() === buscado;

  const enLista = attendanceParticipants.value.find(mismoFolio);

  if (enLista) {
    if (isPresent(enLista)) {
      showScanFeedback("warn", `${enLista.name} ya estaba registrado.`);
    } else {
      attendanceMarks.value = {
        ...attendanceMarks.value,
        [String(enLista.id)]: true
      };
      showScanFeedback("ok", `✓ ${enLista.name}`);
    }
    searchAttendance.value = "";
    return;
  }

  const existe = participants.value.find(mismoFolio);

  if (existe) {
    showScanFeedback(
      "warn",
      `${existe.name} no está inscrito en esta actividad.`
    );
    searchAttendance.value = "";
    return;
  }

  // para detextar si es un folio
  if (/^\d{6,}$/.test(code)) {
    showScanFeedback("error", `Folio ${code} no encontrado.`);
    searchAttendance.value = "";
  }
}

async function saveAttendance() {
  if (!attendanceDate.value) {
    alert("Selecciona la fecha de la asistencia.");
    return;
  }

  const tipoReal = attendanceBackendType.value;

  if (attendanceType.value !== "evento" &&
      (!attendanceActivityId.value || !selectedAttendanceActivity.value || !tipoReal)) {
    alert("Selecciona la actividad.");
    return;
  }

  if (!hasUnsavedAttendance.value) return;

  savingAttendance.value = true;

  try {
    const response = await fetch(
      `${API_URL}/eventos/${EVENTO_ID}/inscripciones/admin/asistencia`,
      {
        method: "PUT",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: tipoReal,
          actividadId: tipoReal === "evento"
            ? undefined
            : selectedAttendanceActivity.value.id,
          fecha: attendanceDate.value,
          agregar: attendanceAdds.value,
          quitar: attendanceRemovals.value
        })
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      alert(err.message || "No se pudo guardar la lista.");
      return;
    }

    await cargarAsistencia();
    await cargarParticipantes();

    showScanFeedback("ok", "Lista guardada correctamente.");
  } catch (e) {
    console.error("Error al guardar la asistencia:", e);
    alert("Ocurrió un error al guardar la lista.");
  } finally {
    savingAttendance.value = false;
  }
}

// cerrar la pestaña con cambios sin guardar
function warnUnsavedAttendance(event) {
  if (hasUnsavedAttendance.value) {
    event.preventDefault();
    event.returnValue = "";
  }
}

onMounted(() => window.addEventListener("beforeunload", warnUnsavedAttendance));
onBeforeUnmount(() => window.removeEventListener("beforeunload", warnUnsavedAttendance));


// =====================================================
// ESTADÍSTICAS
// =====================================================

const approvedPayments = computed(() => {

  return participants.value.filter(
    participant =>
      participant.payment === "approved"
  ).length;

});


const pendingParticipants = computed(() => {

  return participants.value.filter(
    participant =>
      participant.payment === "pending"
  );

});


const pendingReceipts = computed(() => {

  return pendingParticipants.value.length;

});


const reviewedParticipants = computed(() => {

  return participants.value.filter(
    participant =>
      participant.payment !== "pending"
  );

});


const generatedCertificates = computed(() => {

  return participants.value.filter(
    participant =>
      participant.certificate
  ).length;

});


// =====================================================
// FILTRAR PARTICIPANTES
// =====================================================

function getStudentFolio(participant) {
  return String(
    participant?.folio ??
    participant?.folioRegistro ??
    participant?.folio_registro ??
    participant?.folioInscripcion ??
    participant?.folio_inscripcion ??
    participant?.registrationFolio ??
    participant?.registration_folio ??
    participant?.inscription?.folio ??
    participant?.inscripcion?.folio ??
    participant?.reference ??
    participant?.control ??
    participant?.id ??
    ""
  );
}

function matchesStudentSearch(participant, query) {
  const text = String(query || "").trim().toLocaleLowerCase();
  if (!text) return true;

  const name = String(
    participant?.name ??
    participant?.nombre ??
    participant?.student?.name ??
    participant?.studentName ??
    participant?.fullName ??
    participant?.nombreCompleto ??
    participant?.usuario?.nombre ??
    ""
  ).toLocaleLowerCase();

  const folio = getStudentFolio(participant).toLocaleLowerCase();
  return name.includes(text) || folio.includes(text);
}

const filteredDashboardParticipants = computed(() =>
  participants.value.filter(p => matchesStudentSearch(p, searchDashboard.value))
);

const filteredDashboardPendingParticipants = computed(() =>
  filteredDashboardParticipants.value.filter(p => p.payment === "pending")
);

const filteredPendingParticipants = computed(() =>
  pendingParticipants.value.filter(p => matchesStudentSearch(p, searchReceipts.value))
);

const filteredReviewedParticipants = computed(() =>
  reviewedParticipants.value.filter(p => matchesStudentSearch(p, searchReceipts.value))
);

const filteredCertificateParticipants = computed(() =>
  participants.value.filter(p => matchesStudentSearch(p, searchCertificates.value))
);

const filteredParticipants = computed(() => {
  return participants.value.filter(participant => {
    const matchesSearch = matchesStudentSearch(participant, searchParticipants.value);
    const matchesPayment = paymentFilter.value === "all" || participant.payment === paymentFilter.value;
    const matchesType = typeFilter.value === "all" || participant.type === typeFilter.value;
    return matchesSearch && matchesPayment && matchesType;
  });
});


// =====================================================
// TITULO
// =====================================================

const sectionTitle = computed(() => {

  const titles = {

    dashboard:
      "Dashboard",

    participantes:
      "Participantes",

    comprobantes:
      "Comprobantes de pago",
    
    asistencia: 
      "Pasar lista",

    constancias:
      "Constancias"

  };

  return titles[currentSection.value];

});


// =====================================================
// CAMBIAR SECCIÓN
// =====================================================

function changeSection(section) {

  currentSection.value =
    section;

  sidebarOpen.value =
    false;


  const routes = {

    dashboard:
      "/admin/argos",

    participantes:
      "/admin/argos/participantes",

    comprobantes:
      "/admin/argos/comprobantes",

    asistencia: 
      "/admin/argos/asistencia",

    constancias:
      "/admin/argos/constancias"

  };


  if (routes[section]) {

    router.push(
      routes[section]
    );

  }

}


// =====================================================
// INICIALES
// =====================================================

function getInitials(name) {

  return name

    .split(" ")

    .filter(Boolean)

    .slice(0, 2)

    .map(word =>
      word.charAt(0)
    )

    .join("")

    .toUpperCase();

}


// =====================================================
// TEXTO PAGO
// =====================================================

function paymentText(status) {

  if (status === "approved") {
    return "Aprobado";
  }

  if (status === "pending") {
    return "Pendiente";
  }

  if (status === "rejected") {
    return "Rechazado";
  }

  return status;

}


// =====================================================
// ABRIR COMPROBANTE
// =====================================================

function openReceipt(participant) {

  selectedReceipt.value =
    participant;

}


// =====================================================
// APROBAR
// =====================================================

async function approvePayment(participant) {

  if (!EVENTO_ID) {
    alert("Configura el ID real del evento ARGOS antes de aprobar pagos.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/eventos/${EVENTO_ID}/inscripciones/admin/${participant.id}/aprobar`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      alert("No se pudo aprobar el pago. Revisa el backend e intenta de nuevo.");
      return;
    }

    participant.payment = "approved";
    selectedReceipt.value = null;
    alert(`El pago de ${participant.name} fue aprobado correctamente.`);
  } catch (error) {
    console.error("Error al aprobar el pago:", error);
    alert("Ocurrió un error al aprobar el pago.");
  }
}


// =====================================================
// RECHAZAR
// =====================================================

async function rejectPayment(participant) {

  if (!EVENTO_ID) {
    alert("Configura el ID real del evento ARGOS antes de rechazar pagos.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/eventos/${EVENTO_ID}/inscripciones/admin/${participant.id}/rechazar`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      alert("No se pudo rechazar el comprobante. Revisa el backend e intenta de nuevo.");
      return;
    }

    participant.payment = "rejected";
    selectedReceipt.value = null;
    alert(`El comprobante de ${participant.name} fue rechazado.`);
  } catch (error) {
    console.error("Error al rechazar el comprobante:", error);
    alert("Ocurrió un error al rechazar el comprobante.");
  }
}


// =====================================================
// SUBIR PLANTILLA
// =====================================================

function uploadTemplate(event) {

  const file =
    event.target.files[0];

  if (!file) {
    return;
  }


  const allowedTypes = [

    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

  ];


  if (!allowedTypes.includes(file.type)) {

    alert(
      "Solo se permiten archivos PDF o Word."
    );

    return;

  }


  certificateTemplate.value = {

    name: file.name,

    size: file.size,

    type: file.type

  };


  localStorage.setItem(

    "argos_certificate_template",

    JSON.stringify(
      certificateTemplate.value
    )

  );


  alert(
    "Plantilla cargada correctamente."
  );

}


// =====================================================
// CONSTANCIA
// =====================================================

function canGenerateCertificate(participant) {

  return (

    certificateTemplate.value &&

    participant.payment ===
      "approved" &&

    participant.attended ===
      true

  );

}


// =====================================================
// GENERAR CONSTANCIA
// =====================================================

function generateCertificate(participant) {

  if (
    !canGenerateCertificate(
      participant
    )
  ) {

    alert(
      "El participante no cumple los requisitos."
    );

    return;

  }


  participant.certificate =
    true;


  alert(
    `Constancia generada para ${participant.name}.`
  );

}


// =====================================================
// DESCARGAR
// =====================================================

function downloadCertificate(participant) {

  const content = `

CONGRESO ARGOS

CONSTANCIA DE PARTICIPACIÓN

Se hace constar que:

${participant.name}

participó en el Congreso ARGOS.

Instituto Tecnológico de Ensenada

Fecha: ${eventInfo.value.date || "Por confirmar"}

Folio:
ARGOS-${getStudentFolio(participant)}

`;


  const blob =
    new Blob(

      [content],

      {
        type:
          "text/plain"
      }

    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    `Constancia_${participant.name.replaceAll(" ", "_")}.txt`;


  link.click();


  URL.revokeObjectURL(
    url
  );

}


// =====================================================
// VOLVER
// =====================================================

function goBack() {

  router.push("/admin");

}


// =====================================================
// CARGAR DATOS
// =====================================================

onMounted(async () => {

  const savedTemplate = localStorage.getItem("argos_certificate_template");

  if (savedTemplate) {
    certificateTemplate.value = JSON.parse(savedTemplate);
  }

  await cargarParticipantes();
  await cargarEvento();
  await cargarOpcionesAsistencia();

});


async function cargarParticipantes() {

  if (!EVENTO_ID) {
    console.error("Configura VITE_ARGOS_EVENT_ID con el ID real del evento ARGOS.");
    return;
  }

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/eventos/${EVENTO_ID}/inscripciones/admin/participantes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    if (response.ok) {
      participants.value = await response.json();
    }

  } catch (e) {
    console.error("Error al cargar participantes:", e);
  }

}

async function cargarEvento() {

  if (!EVENTO_ID) return;

  try {

    const response = await fetch(`${API_URL}/eventos/${EVENTO_ID}`);

    if (response.ok) {

      const data = await response.json();

      eventInfo.value = {
        date: data.date,
        place: data.place,
        cost: data.cost,
        capacity: data.capacity
      };

    }

  } catch (e) {
    console.error("Error al cargar el evento:", e);
  }

}

</script>


<style scoped>

/* =====================================================
   RESET
===================================================== */

* {
  box-sizing: border-box;
}


.admin-argos {

  min-height: 100vh;

  display: flex;

  background: #f4f7fb;

  color: #263238;

  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif;

}


/* =====================================================
   SIDEBAR
===================================================== */

.sidebar {

  width: 270px;

  min-height: 100vh;

  background:
    linear-gradient(
      180deg,
      #003366,
      #005b96
    );

  color: white;

  position: fixed;

  left: 0;

  top: 0;

  bottom: 0;

  z-index: 1000;

  display: flex;

  flex-direction: column;

}


.sidebar-header {

  padding: 24px 20px;

  display: flex;

  align-items: center;

  gap: 12px;

  border-bottom:
    1px solid
    rgba(255,255,255,.12);

}


.logo {

  width: 48px;

  height: 48px;

  border-radius: 13px;

  background: white;

  color: #003366;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 900;

}


.logo-info {

  display: flex;

  flex-direction: column;

}


.logo-info strong {

  font-size: 17px;

}


.logo-info span {

  font-size: 11px;

  opacity: .65;

}


/* =====================================================
   PROFILE
===================================================== */

.profile {

  margin: 20px;

  padding: 14px;

  background:
    rgba(255,255,255,.09);

  border-radius: 14px;

  display: flex;

  align-items: center;

  gap: 11px;

}


.profile > div:last-child {

  display: flex;

  flex-direction: column;

}


.profile strong {

  font-size: 13px;

}


.profile span {

  font-size: 10px;

  opacity: .65;

}


.profile-avatar {

  width: 40px;

  height: 40px;

  border-radius: 50%;

  background: #1976d2;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: bold;

}


/* =====================================================
   MENU
===================================================== */

.menu {

  padding: 0 12px;

  flex: 1;

}


.menu-label {

  display: block;

  padding:
    15px
    12px
    8px;

  font-size: 10px;

  letter-spacing: 1.5px;

  opacity: .45;

}


.event-label {

  margin-top: 10px;

}


.menu button {

  width: 100%;

  border: none;

  background: transparent;

  color: white;

  padding: 13px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  gap: 12px;

  cursor: pointer;

  margin-bottom: 4px;

  font-size: 13px;

  text-align: left;

}


.menu button:hover {

  background:
    rgba(255,255,255,.1);

}


.menu button.active {

  background: white;

  color: #003366;

  font-weight: 700;

}


.menu-count {

  margin-left: auto;

  font-size: 10px;

  opacity: .6;

}


.menu-alert {

  margin-left: auto;

  background: #ef5350;

  color: white;

  width: 22px;

  height: 22px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 10px;

}


/* =====================================================
   SIDEBAR BOTTOM
===================================================== */

.sidebar-bottom {

  padding: 18px;

}


.back-button {

  width: 100%;

  padding: 12px;

  background:
    rgba(255,255,255,.08);

  border:
    1px solid
    rgba(255,255,255,.15);

  color: white;

  border-radius: 10px;

  cursor: pointer;

}


/* =====================================================
   MAIN
===================================================== */

.main {

  margin-left: 270px;

  width: calc(100% - 270px);

  min-height: 100vh;

}


/* =====================================================
   TOPBAR
===================================================== */

.topbar {

  height: 80px;

  background: white;

  border-bottom:
    1px solid #e6ebf0;

  padding: 0 35px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  position: sticky;

  top: 0;

  z-index: 100;

}


.topbar-left {

  display: flex;

  align-items: center;

}


.topbar h1 {

  margin: 0;

  color: #003366;

  font-size: 22px;

}


.topbar p {

  margin: 3px 0 0;

  color: #90a4ae;

  font-size: 12px;

}


.topbar-right {

  display: flex;

  align-items: center;

  gap: 25px;

}


.event-active {

  color: #2e7d32;

  font-size: 12px;

  font-weight: 600;

}


.event-active i {

  width: 8px;

  height: 8px;

  background: #43a047;

  display: inline-block;

  border-radius: 50%;

  margin-right: 5px;

}


.user {

  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 13px;

}


.user-avatar {

  width: 35px;

  height: 35px;

  border-radius: 50%;

  background: #e3f2fd;

  color: #0066b3;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: bold;

}


.mobile-button {

  display: none;

}


/* =====================================================
   PAGE
===================================================== */

.page {

  padding: 35px;

  max-width: 1600px;

  margin: auto;

}


/* =====================================================
   WELCOME
===================================================== */

.welcome {

  padding: 35px;

  border-radius: 20px;

  background:
    linear-gradient(
      110deg,
      #003366,
      #0066b3
    );

  color: white;

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;

}


.welcome span {

  font-size: 10px;

  letter-spacing: 2px;

  opacity: .7;

}


.welcome h2 {

  font-size: 28px;

  margin: 10px 0;

}


.welcome p {

  max-width: 650px;

  margin: 0;

  line-height: 1.6;

  opacity: .85;

}


.welcome-icon {

  font-size: 80px;

}


/* =====================================================
   STATS
===================================================== */

.stats {

  display: grid;

  grid-template-columns:
    repeat(4,1fr);

  gap: 18px;

  margin-bottom: 25px;

}


.stat {

  background: white;

  border-radius: 16px;

  padding: 20px;

  display: flex;

  align-items: center;

  gap: 14px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.04);

}


.stat-icon {

  width: 52px;

  height: 52px;

  border-radius: 14px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 22px;

}


.stat-icon.blue {

  background: #e3f2fd;

}


.stat-icon.green {

  background: #e8f5e9;

}


.stat-icon.orange {

  background: #fff3e0;

}


.stat-icon.purple {

  background: #f3e5f5;

}


.stat span {

  display: block;

  color: #78909c;

  font-size: 11px;

}


.stat strong {

  display: block;

  font-size: 27px;

  color: #263238;

  margin: 3px 0;

}


.stat small {

  color: #90a4ae;

  font-size: 9px;

}


/* =====================================================
   DASHBOARD GRID
===================================================== */

.dashboard-grid {

  display: grid;

  grid-template-columns:
    1.4fr 1fr;

  gap: 20px;

  margin-bottom: 20px;

}


/* =====================================================
   CARD
===================================================== */

.card {

  background: white;

  border-radius: 18px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

  overflow: hidden;

  margin-bottom: 20px;

}


.card-header {

  padding: 20px 24px;

  border-bottom:
    1px solid #edf0f3;

  display: flex;

  justify-content: space-between;

  align-items: center;

}


.card-header h3 {

  margin: 0 0 4px;

  color: #003366;

  font-size: 16px;

}


.card-header p {

  margin: 0;

  color: #90a4ae;

  font-size: 11px;

}


.card-header button {

  border: none;

  background: none;

  color: #0066b3;

  font-weight: 600;

  cursor: pointer;

}


/* =====================================================
   PENDING
===================================================== */

.pending-list {

  padding: 10px 22px;

}


.pending {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 13px 0;

  border-bottom:
    1px solid #edf0f3;

}


.avatar {

  width: 38px;

  height: 38px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #e3f2fd;

  color: #0066b3;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 10px;

  font-weight: bold;

}


.pending-info {

  display: flex;

  flex-direction: column;

  flex: 1;

}


.pending-info strong {

  font-size: 12px;

}


.pending-info span {

  color: #90a4ae;

  font-size: 10px;

}


.pending-badge {

  background: #fff3e0;

  color: #ef6c00;

  padding: 5px 9px;

  border-radius: 15px;

  font-size: 9px;

}


/* =====================================================
   EVENT INFO
===================================================== */

.event-info {

  padding: 10px 24px;

}


.event-info div {

  padding: 14px 0;

  border-bottom:
    1px solid #edf0f3;

}


.event-info span {

  display: block;

  color: #90a4ae;

  font-size: 10px;

  margin-bottom: 4px;

}


.event-info strong {

  color: #37474f;

  font-size: 12px;

}


/* =====================================================
   TABLE
===================================================== */

.table-container {

  overflow-x: auto;

}


table {

  width: 100%;

  border-collapse: collapse;

  min-width: 800px;

}


th {

  background: #f8fafc;

  color: #78909c;

  padding: 14px 20px;

  text-align: left;

  font-size: 9px;

  text-transform: uppercase;

}


td {

  padding: 14px 20px;

  border-bottom:
    1px solid #edf0f3;

  font-size: 12px;

}


.table-user {

  display: flex;

  align-items: center;

  gap: 10px;

}


.table-user div:last-child {

  display: flex;

  flex-direction: column;

}


.table-user span {

  color: #90a4ae;

  font-size: 9px;

  margin-top: 2px;

}


.type {

  background: #f1f5f8;

  color: #546e7a;

  padding: 5px 8px;

  border-radius: 12px;

  font-size: 9px;

}


.payment {

  padding: 5px 9px;

  border-radius: 15px;

  font-size: 9px;

  font-weight: 600;

}


.payment.approved {

  background: #e8f5e9;

  color: #2e7d32;

}


.payment.pending {

  background: #fff3e0;

  color: #ef6c00;

}


.payment.rejected {

  background: #ffebee;

  color: #c62828;

}


.attendance {

  color: #90a4ae;

  font-size: 10px;

}


.attendance.present {

  color: #2e7d32;

  font-weight: 600;

}


.view-button {

  border: none;

  background: #e3f2fd;

  color: #0066b3;

  padding: 7px 12px;

  border-radius: 8px;

  cursor: pointer;

}


/* =====================================================
   SECTION HEADER
===================================================== */

.section-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 25px;

}


.section-header h2 {

  margin: 0 0 5px;

  color: #003366;

}


.section-header p {

  margin: 0;

  color: #78909c;

  font-size: 13px;

}


/* =====================================================
   FILTERS
===================================================== */

.search-only {
  margin-bottom: 18px;
}

.student-folio {
  display: block;
  margin-top: 3px;
  color: #64748b;
  font-size: 12px;
  font-weight: 500;
}

.filters {

  display: grid;

  grid-template-columns:
    2fr 1fr 1fr;

  gap: 12px;

  background: white;

  padding: 18px;

  border-radius: 16px;

  margin-bottom: 20px;

}


.filters input,
.filters select {

  border:
    1px solid #dfe5eb;

  border-radius: 9px;

  padding: 12px;

  outline: none;

}


.filters input:focus,
.filters select:focus {

  border-color: #0066b3;

}


/* =====================================================
   RECEIPTS
===================================================== */

.receipt-counter {

  background: #fff3e0;

  color: #ef6c00;

  padding: 10px 15px;

  border-radius: 10px;

  font-size: 11px;

}


.receipt-counter strong {

  font-size: 18px;

  margin-right: 4px;

}


.receipt-grid {

  display: grid;

  grid-template-columns:
    repeat(3,1fr);

  gap: 20px;

}


.receipt-card {

  background: white;

  border-radius: 18px;

  padding: 20px;

  box-shadow:
    0 5px 20px
    rgba(0,0,0,.05);

}


.receipt-header {

  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 15px;

}


.receipt-header > div:last-child {

  display: flex;

  flex-direction: column;

}


.receipt-header span {

  color: #90a4ae;

  font-size: 10px;

}


/* =====================================================
   FILE PREVIEW
===================================================== */

.file-preview {

  height: 190px;

  border:
    2px dashed #dce4eb;

  border-radius: 14px;

  background: #f8fafc;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  padding: 20px;

}


.file-icon {

  font-size: 48px;

  margin-bottom: 10px;

}


.file-preview strong {

  font-size: 12px;

  color: #37474f;

  word-break: break-word;

}


.file-preview span {

  color: #90a4ae;

  font-size: 9px;

  margin: 5px 0 12px;

}


.view-file {

  border: none;

  background: #e3f2fd;

  color: #0066b3;

  padding: 8px 12px;

  border-radius: 8px;

  cursor: pointer;

  font-size: 10px;

}


/* =====================================================
   RECEIPT INFO
===================================================== */

.receipt-info {

  display: grid;

  gap: 10px;

  margin: 15px 0;

}


.receipt-info div {

  background: #f8fafc;

  padding: 10px;

  border-radius: 8px;

}


.receipt-info span {

  display: block;

  color: #90a4ae;

  font-size: 9px;

}


.receipt-info strong {

  font-size: 11px;

}


/* =====================================================
   ACTIONS
===================================================== */

.receipt-actions {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 8px;

}


.approve,
.reject {

  border: none;

  padding: 10px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;

}


.approve {

  background: #e8f5e9;

  color: #2e7d32;

}


.reject {

  background: #ffebee;

  color: #c62828;

}


/* =====================================================
   EMPTY
===================================================== */

.empty {

  padding: 35px;

  text-align: center;

  color: #78909c;

}


.empty p {

  margin: 8px 0 0;

}


.empty-table {

  text-align: center;

  padding: 40px;

  color: #90a4ae;

}


.no-receipts {

  background: white;

  border-radius: 18px;

  padding: 70px 20px;

  text-align: center;

  margin-bottom: 25px;

}


.no-receipts > div {

  width: 70px;

  height: 70px;

  background: #e8f5e9;

  color: #2e7d32;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 35px;

  margin: auto;

}


.no-receipts h3 {

  color: #003366;

  margin-bottom: 5px;

}


.no-receipts p {

  color: #90a4ae;

}


/* =====================================================
   ASISTENCIA
===================================================== */

.attendance-config {
  margin-bottom: 20px;
}

.attendance-fields {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  padding: 22px;
}

.attendance-fields > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attendance-fields label {
  color: #37474f;
  font-size: 12px;
  font-weight: 600;
}

.attendance-fields select,
.attendance-fields input {
  width: 100%;
  min-width: 0;
  padding: 12px;
  border: 1px solid #dfe5eb;
  border-radius: 9px;
  background: white;
  color: #263238;
  outline: none;
}

.attendance-fields select:focus,
.attendance-fields input:focus {
  border-color: #0066b3;
}

/* ESTADÍSTICAS DE ASISTENCIA */

.attendance-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.attendance-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border-radius: 14px;
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, .04);
}

.attendance-stat span {
  color: #78909c;
  font-size: 12px;
}

.attendance-stat strong {
  color: #003366;
  font-size: 27px;
}

/* FILTROS */

.attendance-filters {
  grid-template-columns: minmax(180px, 2fr) 1fr 1fr;
  align-items: center;
}

.attendance-secondary {
  padding: 12px;
  border: 1px solid #dfe5eb;
  border-radius: 9px;
  background: #f8fafc;
  color: #003366;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.attendance-secondary:hover {
  background: #e3f2fd;
}

.attendance-total {
  padding: 8px 12px;
  border-radius: 20px;
  background: #e8f5e9;
  color: #2e7d32;
  font-size: 12px;
  font-weight: 700;
}

/* ACCIONES DE ASISTENCIA */

.attendance-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.attendance-mark {
  min-width: 130px;
  padding: 9px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.present-mark {
  background: #e8f5e9;
  color: #2e7d32;
  border-color: #a5d6a7;
}

.absent-mark {
  background: #f1f5f8;
  color: #546e7a;
  border-color: #dfe5eb;
}

.absent-mark:hover {
  background: #e3f2fd;
  color: #0066b3;
}

/* MENSAJES DEL ESCÁNER */

.scan-feedback {
  padding: 14px 18px;
  border-radius: 12px;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 600;
}

.scan-feedback.ok {
  background: #e8f5e9;
  color: #2e7d32;
}

.scan-feedback.warn {
  background: #fff3e0;
  color: #ef6c00;
}

.scan-feedback.error {
  background: #ffebee;
  color: #c62828;
}

/* PIE Y GUARDADO */

.attendance-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-top: 1px solid #edf0f3;
}

.attendance-footer > span {
  color: #78909c;
  font-size: 11px;
  line-height: 1.5;
}

.attendance-footer .unsaved {
  color: #ef6c00;
  font-weight: 600;
}

.attendance-save {
  flex-shrink: 0;
  padding: 12px 18px;
  border: none;
  border-radius: 9px;
  background: #003366;
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.attendance-save:hover {
  background: #005b96;
}

.attendance-save:disabled {
  background: #cfd8dc;
  color: #78909c;
  cursor: not-allowed;
}

/* TABLA */

.attendance-table {
  min-width: 850px;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .attendance-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .attendance-fields {
    grid-template-columns: 1fr;
  }

  .attendance-filters {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .attendance-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .attendance-save {
    width: 100%;
  }

  .attendance-stats {
    gap: 10px;
  }

  .attendance-stat {
    padding: 15px;
  }
}


/* =====================================================
   CONSTANCIAS
===================================================== */

.template-content {

  padding: 30px;

  display: flex;

  align-items: center;

  gap: 25px;

}


.template-icon {

  width: 80px;

  height: 80px;

  border-radius: 18px;

  background: #e3f2fd;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 40px;

}


.template-info h3 {

  margin: 0 0 5px;

  color: #003366;

}


.template-info p {

  color: #78909c;

  font-size: 12px;

}


.template-active {

  background: #e8f5e9;

  color: #2e7d32;

  padding: 7px 10px;

  border-radius: 15px;

  font-size: 10px;

}


.upload-button {

  display: inline-block;

  background:
    linear-gradient(
      90deg,
      #003366,
      #0066b3
    );

  color: white;

  padding: 10px 15px;

  border-radius: 9px;

  cursor: pointer;

  font-size: 11px;

  font-weight: 600;

}


.info-box {

  display: flex;

  align-items: flex-start;

  gap: 12px;

  background: #e3f2fd;

  color: #37474f;

  padding: 18px;

  border-radius: 14px;

  margin-bottom: 20px;

}


.info-box > span {

  font-size: 22px;

}


.info-box strong {

  color: #003366;

}


.info-box p {

  margin: 5px 0 0;

  font-size: 11px;

  line-height: 1.5;

}


.certificate-list {

  padding: 5px 20px;

}


.certificate-row {

  padding: 15px 0;

  border-bottom:
    1px solid #edf0f3;

  display: grid;

  grid-template-columns:
    1.5fr 1fr auto;

  align-items: center;

  gap: 20px;

}


.ready {

  background: #e8f5e9;

  color: #2e7d32;

  padding: 6px 10px;

  border-radius: 15px;

  font-size: 9px;

}


.not-ready {

  background: #fff3e0;

  color: #ef6c00;

  padding: 6px 10px;

  border-radius: 15px;

  font-size: 9px;

}


.generate-button,
.download-button {

  border: none;

  padding: 9px 12px;

  border-radius: 8px;

  cursor: pointer;

  font-size: 10px;

  font-weight: 600;

}


.generate-button {

  background: #003366;

  color: white;

}


.generate-button:disabled {

  background: #cfd8dc;

  color: #78909c;

  cursor: not-allowed;

}


.download-button {

  background: #e8f5e9;

  color: #2e7d32;

}


/* =====================================================
   MODAL
===================================================== */

.modal-overlay {

  position: fixed;

  inset: 0;

  background:
    rgba(0,0,0,.55);

  z-index: 3000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

}


.modal,
.receipt-modal {

  background: white;

  border-radius: 20px;

  width: 100%;

  max-width: 480px;

  padding: 30px;

  position: relative;

}


.close {

  position: absolute;

  top: 15px;

  right: 15px;

  width: 32px;

  height: 32px;

  border: none;

  border-radius: 50%;

  cursor: pointer;

}


.modal-avatar {

  width: 75px;

  height: 75px;

  border-radius: 50%;

  background: #e3f2fd;

  color: #0066b3;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 23px;

  font-weight: bold;

  margin: auto;

}


.modal h2 {

  text-align: center;

  color: #003366;

  margin-bottom: 3px;

}


.modal > p {

  text-align: center;

  color: #90a4ae;

}


.modal-data {

  display: grid;

  gap: 10px;

  margin-top: 20px;

}


.modal-data div {

  background: #f8fafc;

  padding: 11px;

  border-radius: 8px;

}


.modal-data span {

  display: block;

  color: #90a4ae;

  font-size: 9px;

  margin-bottom: 4px;

}


.modal-data strong {

  font-size: 11px;

}


.document-viewer {

  height: 250px;

  background: #f5f7fa;

  border-radius: 14px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  margin: 20px 0;

}


.document-viewer div {

  font-size: 65px;

}


.document-viewer strong {

  margin-top: 10px;

}


.document-viewer span {

  color: #90a4ae;

  font-size: 10px;

}


.modal-actions {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 10px;

}


/* =====================================================
   MODAL COMPLETO DEL PARTICIPANTE
===================================================== */

.participant-modal {
  width: 100%;
  max-width: 850px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
}

.participant-modal-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 35px;
}

.participant-modal-header .modal-avatar {
  flex-shrink: 0;
  margin: 0;
}

.participant-modal-title {
  min-width: 0;
}

.participant-modal-title > span {
  color: #0066b3;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.participant-modal-title h2 {
  text-align: left;
  margin: 5px 0;
  font-size: 23px;
  overflow-wrap: anywhere;
}

.participant-modal-title p {
  text-align: left;
  margin: 0;
  color: #78909c;
  font-size: 12px;
}

.participant-modal-divider {
  height: 1px;
  background: #edf0f3;
  margin: 25px 0;
}

.participant-details-header h3,
.participant-status-section h3 {
  color: #003366;
  font-size: 15px;
  margin: 0 0 5px;
}

.participant-details-header p {
  color: #90a4ae;
  font-size: 11px;
  margin: 0 0 18px;
}

.participant-details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.participant-detail-item {
  min-width: 0;
  padding: 13px;
  border: 1px solid #edf0f3;
  background: #f8fafc;
  border-radius: 10px;
}

.participant-detail-item span {
  display: block;
  color: #78909c;
  font-size: 10px;
  margin-bottom: 7px;
}

.participant-detail-item strong {
  display: block;
  color: #263238;
  font-size: 12px;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.participant-status-section {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #edf0f3;
}

.participant-status-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 15px;
}

.participant-status-grid > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  padding: 13px;
  background: #f8fafc;
  border-radius: 10px;
}

.participant-status-grid span {
  color: #78909c;
  font-size: 10px;
}

.participant-status-grid strong {
  font-size: 11px;
}

.participant-modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}

.participant-close-button {
  padding: 11px 22px;
  border: none;
  border-radius: 9px;
  background: #003366;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.participant-close-button:hover {
  background: #005b96;
}

/* DESTACAR TALLER Y VISITA INDUSTRIAL */

.detail-highlight {
  grid-column: 1 / -1;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-left: 5px solid #2563eb;
  border-radius: 12px;
  padding: 18px;
}

.detail-highlight .detail-label {
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

.detail-highlight .detail-value {
  color: #1e3a8a;
  font-size: 17px;
  font-weight: 800;
}


.participant-modal-footer {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 25px;
}

.participant-edit-button,
.participant-close-button,
.participant-cancel-button,
.participant-save-button {
  padding: 11px 18px;
  border: none;
  border-radius: 9px;
  font-weight: 600;
  cursor: pointer;
}

.participant-edit-button {
  background: #e3f2fd;
  color: #0066b3;
}

.participant-close-button {
  background: #003366;
  color: white;
}

.participant-cancel-button {
  background: #f1f5f9;
  color: #475569;
}

.participant-save-button {
  background: #15803d;
  color: white;
}

.participant-save-button:disabled {
  opacity: .6;
  cursor: not-allowed;
}

@media(max-width: 600px) {
  .participant-modal {
    padding: 22px 16px;
    max-height: 92vh;
  }

  .participant-details-grid {
    grid-template-columns: 1fr;
  }

  .participant-status-grid {
    grid-template-columns: 1fr;
  }

  .participant-modal-header {
    align-items: flex-start;
  }

  .participant-modal-title h2 {
    font-size: 18px;
  }
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media(max-width:1200px) {

  .stats {

    grid-template-columns:
      repeat(2,1fr);

  }

  .receipt-grid {

    grid-template-columns:
      repeat(2,1fr);

  }

}


@media(max-width:900px) {

  .sidebar {

    transform:
      translateX(-100%);

    transition: .3s;

  }


  .sidebar.open {

    transform:
      translateX(0);

  }


  .main {

    margin-left: 0;

    width: 100%;

  }


  .mobile-button {

    display: block;

    border: none;

    background: transparent;

    font-size: 22px;

    margin-right: 15px;

    cursor: pointer;

  }


  .dashboard-grid {

    grid-template-columns: 1fr;

  }


  .topbar {

    padding: 0 20px;

  }

}


@media(max-width:650px) {

  .page {

    padding: 20px 15px;

  }


  .stats {

    grid-template-columns: 1fr;

  }


  .receipt-grid {

    grid-template-columns: 1fr;

  }


  .filters {

    grid-template-columns: 1fr;

  }


  .section-header {

    flex-direction: column;

    align-items: flex-start;

    gap: 12px;

  }


  .topbar-right {

    display: none;

  }


  .welcome {

    padding: 25px;

  }


  .welcome-icon {

    display: none;

  }


  .welcome h2 {

    font-size: 22px;

  }


  .template-content {

    flex-direction: column;

    align-items: flex-start;

  }


  .certificate-row {

    grid-template-columns: 1fr;

    gap: 10px;

  }

}

</style>