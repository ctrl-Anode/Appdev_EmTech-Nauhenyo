<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#">Nau-Henyo</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="/home"><i class="fas fa-home"></i> Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/fire_report"><i class="fas fa-exclamation-triangle"></i> Report Fire Incident</a></li>
            <li class="nav-item"><a class="nav-link" href="/report_crime"><i class="fas fa-exclamation-triangle"></i> Report Crime</a></li>
            <li class="nav-item"><a class="nav-link" href="/cases"><i class="fas fa-history"></i> My Reports</a></li>
            <li class="nav-item"><a class="nav-link active" href="/maps"><i class="fas fa-map-marked-alt"></i> Map</a></li>
            <li class="nav-item"><a class="nav-link" href="/statistic"><i class="fas fa-chart-bar"></i> Statistics</a></li>
            <li class="nav-item"><a class="nav-link" href="/message"><i class="fas fa-envelope"></i> Messages</a></li>
            <li class="nav-item"><a class="nav-link" href="/profile"><i class="fas fa-user"></i> Profile</a></li>
            </ul>
          </div>
        </div>
      </nav>
  
      <div class="container mt-4">
        <h1 class="mb-4">Incident Map</h1>
        
        <div class="row mb-4">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body p-0 position-relative">
                <div id="map-container">
                  <!-- Placeholder for the map -->
                  <img src="/api/placeholder/800/600" class="img-fluid w-100 h-100" alt="Map placeholder">
                </div>
  
                <div class="map-overlay">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Filter Incidents</h5>
                      <div class="mb-2">
                        <div class="form-check" v-for="(filter, index) in filters" :key="index">
                          <input class="form-check-input" type="checkbox" v-model="filter.selected" :id="filter.id">
                          <label class="form-check-label" :for="filter.id">
                            <i :class="filter.iconClass"></i> {{ filter.label }}
                          </label>
                        </div>
                      </div>
                      <div class="mb-2">
                        <label for="timeRange" class="form-label">Time Range</label>
                        <select class="form-select" v-model="selectedTimeRange" id="timeRange">
                          <option v-for="option in timeRangeOptions" :key="option" :value="option">{{ option }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">Recent Incidents</h5>
              </div>
              <div class="card-body">
                <div class="list-group">
                  <a v-for="incident in filteredIncidents" :key="incident.id" href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1"><i :class="incident.iconClass"></i> {{ incident.title }}</h5>
                      <small class="text-muted">{{ incident.time }}</small>
                    </div>
                    <p class="mb-1">{{ incident.location }}</p>
                    <small class="text-muted">Status: {{ incident.status }}</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'IncidentMapping',
    data() {
      return {
        filters: [
          { id: 'crimesCheck', label: 'Crimes', iconClass: 'fas fa-exclamation-triangle text-danger', selected: true },
          { id: 'firesCheck', label: 'Fires', iconClass: 'fas fa-fire text-warning', selected: true },
          { id: 'medicalCheck', label: 'Medical', iconClass: 'fas fa-ambulance text-info', selected: true },
        ],
        timeRangeOptions: ['Last 24 hours', 'Last 7 days', 'Last 30 days', 'All time'],
        selectedTimeRange: 'Last 24 hours',
        incidents: [
          {
            id: 1,
            title: 'Fire Incident',
            iconClass: 'fas fa-fire text-warning',
            time: '3 hours ago',
            location: 'Barangay San Jose - Residential fire',
            status: 'In progress',
            category: 'Fires',
          },
          {
            id: 2,
            title: 'Robbery',
            iconClass: 'fas fa-exclamation-triangle text-danger',
            time: '5 hours ago',
            location: 'Barangay San Pedro - Convenience store',
            status: 'Under investigation',
            category: 'Crimes',
          },
        ],
      };
    },
    computed: {
      filteredIncidents() {
        return this.incidents.filter((incident) =>
          this.filters.some((filter) => filter.selected && incident.category === filter.label)
        );
      },
    },
  };
  </script>
  
  <style scoped>
  #map-container {
    height: 600px;
    background-color: #e9ecef;
    border-radius: 4px;
  }
  .map-overlay {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
  </style>
  