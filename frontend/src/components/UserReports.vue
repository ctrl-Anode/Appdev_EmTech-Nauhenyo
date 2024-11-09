<template>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
    />
  
    <div class="my-reports">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <router-link to="/" class="navbar-brand">Nau-Henyo</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="/home"><i class="fas fa-home"></i> Home</a></li>
              <li class="nav-item"><a class="nav-link" href="/incident"><i class="fas fa-exclamation-triangle"></i> Report Incident</a></li>
              <li class="nav-item"><a class="nav-link" href="/cases"><i class="fas fa-history"></i> My Reports</a></li>
              <li class="nav-item"><a class="nav-link active" href="/maps"><i class="fas fa-map-marked-alt"></i> Map</a></li>
              <li class="nav-item"><a class="nav-link" href="/statistic"><i class="fas fa-chart-bar"></i> Statistics</a></li>
              <li class="nav-item"><a class="nav-link" href="/message"><i class="fas fa-envelope"></i> Messages</a></li>
              <li class="nav-item"><a class="nav-link" href="/profile"><i class="fas fa-user"></i> Profile</a></li>
            </ul>
          </div>
        </div>
      </nav>
  
      <!-- Main Content -->
      <div class="container mt-4">
        <h1 class="mb-4">My Reports</h1>
        <div class="row mb-4">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <!-- Filter & Search -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <button class="btn btn-outline-secondary me-2">All Reports</button>
                    <button class="btn btn-outline-primary me-2">Active</button>
                    <button class="btn btn-outline-success me-2">Resolved</button>
                    <button class="btn btn-outline-danger">Closed</button>
                  </div>
                  <div class="input-group w-25">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search reports..."
                      v-model="searchQuery"
                    />
                    <button class="btn btn-outline-secondary" type="button">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
  
                <!-- Reports Table -->
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Report ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="report in filteredReports" :key="report.id">
                        <td>{{ report.id }}</td>
                        <td>{{ report.date }}</td>
                        <td><span :class="['badge', report.typeClass]">{{ report.type }}</span></td>
                        <td>{{ report.location }}</td>
                        <td><span :class="['badge', report.statusClass]">{{ report.status }}</span></td>
                        <td>
                          <button class="btn btn-sm btn-info me-1"><i class="fas fa-eye"></i></button>
                          <button class="btn btn-sm btn-primary me-1"><i class="fas fa-edit"></i></button>
                          <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
  
                <!-- Pagination -->
                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
                    </li>
                    <li
                      v-for="page in totalPages"
                      :key="page"
                      class="page-item"
                      :class="{ active: currentPage === page }"
                    >
                      <button class="page-link" @click="changePage(page)">{{ page }}</button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name :  'UserReports',

    data() {
      return {
        searchQuery: "",
        reports: [
          { id: "#12345", date: "2024-10-05", type: "Fire", location: "Barangay San Jose", status: "In Progress", typeClass: "bg-danger", statusClass: "bg-warning" },
          { id: "#12344", date: "2024-10-03", type: "Crime", location: "Barangay San Pedro", status: "Resolved", typeClass: "bg-primary", statusClass: "bg-success" },
        ],
        currentPage: 1,
        reportsPerPage: 5,
      };
    },
    computed: {
      filteredReports() {
        return this.reports.filter((report) =>
          report.id.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      totalPages() {
        return Math.ceil(this.filteredReports.length / this.reportsPerPage);
      },
    },
    methods: {
      changePage(page) {
        if (page > 0 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .table-responsive {
    margin-top: 1rem;
  }
  
  .pagination .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }
  
  .btn-outline-secondary .fas {
    margin-left: 4px;
  }
  </style>
  