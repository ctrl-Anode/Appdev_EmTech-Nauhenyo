<template>
  <div>
    <!-- Navbar -->
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
      <h1 class="mb-4">Report an Incident</h1>

      <div class="row">
        <div class="col-md-8">
          <!-- Incident Report Form -->
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="submitReport">
                <!-- Category and Sub-category Dropdown -->
                <div class="form-group">
                  <label for="category">Category of Incident</label>
                  <select v-model="incident.category" @change="updateSubCategories" class="form-select" required>
                    <option v-for="category in categories" :key="category.name" :value="category.name">
                      {{ category.name }}
                    </option>
                  </select>
                </div>

                <div class="form-group" v-if="subCategories.length">
                  <label for="subCategory">Sub-category</label>
                  <select v-model="incident.subCategory" class="form-select" required>
                    <option v-for="subCategory in subCategories" :key="subCategory" :value="subCategory">
                      {{ subCategory }}
                    </option>
                  </select>
                </div>

                <!-- Incident Location -->
                <div class="form-group">
                  <label for="location">Incident Location</label>
                  <input v-model="incident.location" class="form-control" placeholder="Enter location or use GPS" required />
                  <button type="button" class="btn btn-secondary mt-2" @click="getLocation">Use GPS</button>
                </div>

                <!-- Date and Time -->
                <div class="form-group">
                  <label for="date">Date of Incident</label>
                  <input type="date" v-model="incident.date" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="time">Time of Incident</label>
                  <input type="time" v-model="incident.time" class="form-control" required />
                </div>

                <!-- Media Upload -->
                <div class="form-group">
                  <label for="media">Upload Media (JPG, PNG, MP4)</label>
                  <input type="file" @change="handleFileUpload" class="form-control" multiple />
                </div>

                <!-- Additional Details -->
                <div class="form-group">
                  <label for="details">Additional Details</label>
                  <textarea v-model="incident.details" class="form-control" rows="4"></textarea>
                </div>

                <!-- Status for Admins to Update -->
                <div v-if="isAdmin" class="form-group">
                  <label for="status">Status</label>
                  <select v-model="incident.status" class="form-select">
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-danger mt-3"><i class="fas fa-paper-plane"></i> Submit Report</button>
              </form>
            </div>
          </div>
        </div>
        <!-- Important Information and Emergency Contacts -->
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-header bg-info text-white">
              <h5 class="card-title mb-0"><i class="fas fa-info-circle"></i> Important Information</h5>
            </div>
            <div class="card-body">
              <ul class="list-unstyled">
                <li><i class="fas fa-check text-success"></i> Your report will be sent to relevant authorities</li>
                <li><i class="fas fa-check text-success"></i> You can track the status of your report</li>
                <li><i class="fas fa-check text-success"></i> All information is kept confidential</li>
                <li><i class="fas fa-exclamation-triangle text-warning"></i> False reporting is punishable by law</li>
              </ul>
            </div>
          </div>
          <div class="card">
            <div class="card-header bg-success text-white">
              <h5 class="card-title mb-0"><i class="fas fa-phone"></i> Emergency Contacts</h5>
            </div>
            <div class="card-body">
              <p><strong>Police:</strong> 911</p>
              <p><strong>Fire Department:</strong> 912</p>
              <p><strong>Ambulance:</strong> 913</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [
        { name: 'Women Abuse', subCategories: ['Physical abuse', 'Emotional abuse', 'Sexual harassment', 'Domestic violence', 'Economic abuse'] },
        { name: 'Robbery', subCategories: ['Armed robbery', 'Carjacking', 'Home invasion'] },
        { name: 'Accident', subCategories: ['Traffic accident', 'Workplace accident', 'Public place accident', 'Domestic accident'] },
        { name: 'Assault', subCategories: ['Physical assault', 'Sexual assault', 'Verbal assault'] },
        { name: 'Theft', subCategories: ['Grand theft', 'Shoplifting', 'Pickpocketing', 'Identity theft'] },
        { name: 'Cybercrime', subCategories: ['Online fraud', 'Cyberbullying', 'Identity theft', 'Hacking', 'Phishing'] },
        { name: 'Drug-related Crime', subCategories: ['Possession', 'Distribution', 'Manufacturing', 'Trafficking'] },
      ],
      subCategories: [],
      incident: {
        category: '',
        subCategory: '',
        location: '',
        date: '',
        time: '',
        media: [],
        details: '',
        status: 'Pending Review', // Default status
      },
      isAdmin: false, // Set this based on user role
    };
  },
  methods: {
    updateSubCategories() {
      const selectedCategory = this.categories.find(category => category.name === this.incident.category);
      this.subCategories = selectedCategory ? selectedCategory.subCategories : [];
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.incident.location = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    },
    handleFileUpload(event) {
      this.incident.media = Array.from(event.target.files);
    },
    async submitReport() {
      try {
        const response = await axios.post('http://localhost:3000/api/incidents', this.incident);
        alert(`Report submitted! Tracking ID: ${response.data.id}`);
      } catch (error) {
        console.error('Error submitting report:', error);
        alert('Failed to submit report.');
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
</style>
