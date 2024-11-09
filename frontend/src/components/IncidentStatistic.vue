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
        <h1 class="mb-4">Incident Statistics</h1>
  
        <!-- Filter & Export Options -->
        <div class="row mb-4">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <button class="btn btn-outline-secondary me-2">This Week</button>
                    <button class="btn btn-outline-primary me-2">This Month</button>
                    <button class="btn btn-outline-success me-2">This Year</button>
                    <button class="btn btn-outline-info">Custom Range</button>
                  </div>
                  <div class="btn-group">
                    <button class="btn btn-outline-secondary"><i class="fas fa-download"></i> Export</button>
                    <button class="btn btn-outline-secondary"><i class="fas fa-print"></i> Print</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Statistics Cards -->
        <div class="row mb-4">
          <StatisticsCard title="Total Incidents" value="248" description="15% increase from last month" color="danger" icon="exclamation-circle" />
          <StatisticsCard title="Pending" value="42" description="8 resolved today" color="warning" icon="clock" />
          <StatisticsCard title="Resolved" value="185" description="90% resolution rate" color="success" icon="check-circle" />
          <StatisticsCard title="Active Response Teams" value="12" description="3 teams currently deployed" color="info" icon="users" />
        </div>
  
        <!-- Incident Trends and Types -->
        <div class="row mb-4">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">Incident Trends</h5>
              </div>
              <div class="card-body">
                <img src="/api/placeholder/800/400" class="img-fluid" alt="Line graph placeholder">
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">Incident Types</h5>
              </div>
              <div class="card-body">
                <img src="/api/placeholder/400/400" class="img-fluid" alt="Pie chart placeholder">
              </div>
            </div>
          </div>
        </div>
  
        <!-- Incident Location and Response Time -->
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">Incidents by Location</h5>
              </div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Barangay</th>
                      <th>Incidents</th>
                      <th>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="location in locationData" :key="location.name">
                      <td>{{ location.name }}</td>
                      <td>{{ location.incidents }}</td>
                      <td :class="{'text-danger': location.change > 0, 'text-success': location.change < 0}">
                        {{ location.change }}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">Response Time Analysis</h5>
              </div>
              <div class="card-body">
                <img src="/api/placeholder/400/250" class="img-fluid" alt="Bar graph placeholder">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import StatisticsCard from '@/components/IncidentStatistic.vue';
  
  export default {
    name: 'IncidentStatistic',
    components: {
      StatisticsCard
    },
    data() {
      return {
        locationData: [
          { name: 'San Jose', incidents: 45, change: 12 },
          { name: 'San Pedro', incidents: 38, change: -8 },
          { name: 'San Juan', incidents: 32, change: 5 }
        ]
      };
    },
    mounted() {
      // Fetch statistics data from backend
      fetch('/api/statistics')
        .then(response => response.json())
        .then(/*data =>*/ {
          // Process data here
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 2rem;
  }
  </style>
  