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
        <h1 class="mb-4">Emergency Dashboard</h1>
        
        <div class="row mb-4">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header bg-danger text-white">
                <h5 class="card-title mb-0"><i class="fas fa-exclamation-circle"></i> Recent Emergencies</h5>
              </div>
              <div class="card-body">
                <div class="list-group">
                  <a v-for="(emergency, index) in recentEmergencies" :key="index" href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{ emergency.title }}</h5>
                      <small class="text-muted">{{ emergency.time }}</small>
                    </div>
                    <p class="mb-1">{{ emergency.description }}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card">
              <div class="card-header bg-warning">
                <h5 class="card-title mb-0"><i class="fas fa-bell"></i> Active Alerts</h5>
              </div>
              <div class="card-body">
                <div v-for="(alert, index) in activeAlerts" :key="index" :class="['alert', alert.type]">
                  <h5><i :class="alert.icon"></i> {{ alert.title }}</h5>
                  <p>{{ alert.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-4" v-for="(summary, index) in summaryData" :key="index">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title"><i :class="summary.icon"></i> {{ summary.title }}</h5>
                <p v-for="(item, index) in summary.details" :key="index" class="card-text">{{ item }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserHome',
    data() {
      return {
        recentEmergencies: [
          { title: 'Fire Incident', time: '3 mins ago', description: 'Barangay San Jose - Fire reported in residential area' },
          { title: 'Robbery', time: '1 hour ago', description: 'Barangay San Pedro - Convenience store robbery' },
        ],
        activeAlerts: [
          { title: 'Flood Warning', description: 'Elevated water levels in Naujan River. Residents in low-lying areas advised to prepare.', icon: 'fas fa-flood', type: 'alert-warning' },
          { title: 'Heavy Rain Advisory', description: 'Expected heavy rainfall in the next 24 hours. Stay vigilant.', icon: 'fas fa-cloud-showers-heavy', type: 'alert-info' },
        ],
        summaryData: [
          {
            title: 'Emergency Hotlines',
            icon: 'fas fa-phone-alt text-danger',
            details: ['Police: 911', 'Fire: 912', 'Ambulance: 913'],
          },
          {
            title: "Today's Statistics",
            icon: 'fas fa-chart-line text-primary',
            details: ['Reported Incidents: 5', 'Resolved Cases: 3', 'Active Alerts: 2'],
          },
          {
            title: 'Emergency Response Teams',
            icon: 'fas fa-users text-success',
            details: ['Police Units Available: 4', 'Fire Trucks Ready: 2', 'Medical Teams On-call: 3'],
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  body {
  margin-top: 0;
  padding-top: 0;
}

  div {
  margin-top: 0;
  padding-top: 0;
}
  </style>
  