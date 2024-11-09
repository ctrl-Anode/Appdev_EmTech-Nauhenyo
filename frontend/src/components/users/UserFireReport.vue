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
      <h1 class="mb-4">Report a Fire Incident</h1>

      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="submitReport">
                <!-- Category and Sub-category Dropdown -->
                <div class="mb-3">
                  <label for="category" class="form-label">Category of Incident</label>
                  <select class="form-select" v-model="incident.category" @change="updateSubCategories" id="category" required>
                    <option value="" disabled>Select category</option>
                    <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
                  </select>
                </div>

                <div class="mb-3" v-if="subCategories.length">
                  <label for="subCategory" class="form-label">Sub-category</label>
                  <select class="form-select" v-model="incident.subCategory" id="subCategory" required>
                    <option value="" disabled>Select sub-category</option>
                    <option v-for="subCategory in subCategories" :key="subCategory" :value="subCategory">{{ subCategory }}</option>
                  </select>
                </div>

                <!-- Location, Date, Time -->
                <div class="mb-3">
                  <label for="location" class="form-label">Incident Location</label>
                  <input type="text" class="form-control" v-model="incident.location" id="location" placeholder="Enter location or use GPS" required />
                  <button type="button" class="btn btn-secondary mt-2" @click="getLocation">Use GPS</button>
                </div>

                <div class="mb-3">
                  <label for="date" class="form-label">Date of Incident</label>
                  <input type="date" class="form-control" v-model="incident.date" id="date" required />
                </div>

                <div class="mb-3">
                  <label for="time" class="form-label">Time of Incident</label>
                  <input type="time" class="form-control" v-model="incident.time" id="time" required />
                </div>

                <!-- Additional Details -->
                <div class="mb-3">
                  <label for="details" class="form-label">Additional Details</label>
                  <textarea class="form-control" v-model="incident.details" id="details" rows="4"></textarea>
                </div>

                <!-- Status for Admins to Update -->
                <div v-if="isAdmin" class="mb-3">
                  <label for="status" class="form-label">Status</label>
                  <select v-model="incident.status" class="form-select">
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-danger"><i class="fas fa-paper-plane"></i> Submit Report</button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-header bg-info text-white">
              <h5 class="card-title mb-0"><i class="fas fa-info-circle"></i> Important Information</h5>
            </div>
            <div class="card-body">
              <ul class="list-unstyled">
                <li><i class="fas fa-check text-success"></i> Your report will be immediately sent to relevant authorities</li>
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
export default {
  data() {
    return {
      categories: [
        { name: 'Building Fire', subCategories: ['Residential', 'Commercial', 'Industrial'] },
        { name: 'Forest Fire', subCategories: ['Wildfire', 'Controlled burn', 'Rekindled fire'] },
        { name: 'Vehicle Fire', subCategories: ['Car fire', 'Truck fire', 'Other vehicle'] }
      ],
      subCategories: [],
      incident: {
        category: '',
        subCategory: '',
        location: '',
        date: '',
        time: '',
        details: '',
        status: 'Pending Review', // Default status for new reports
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
    async submitReport() {
      try {
        const response = await fetch('http://localhost:3000/api/fire_incidents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.incident),
        });
        const result = await response.json();
        if (response.ok) {
          alert(`Report submitted! Your tracking ID: ${result.id}`);
          this.$router.push('/track-report');
        } else {
          throw new Error(result.message || 'Failed to submit report');
        }
      } catch (error) {
        console.error('Error submitting report:', error);
        alert('Failed to submit report. Please try again.');
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
