<template>
  <div class="incident-form">
    <h2>Report a Fire Incident</h2>
    <form @submit.prevent="submitReport">
      <!-- Category and Sub-category Dropdown -->
      <div class="form-group">
        <label for="category">Category of Incident</label>
        <select v-model="incident.category" @change="updateSubCategories" required>
          <option v-for="category in categories" :key="category.name" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="subCategories.length">
        <label for="subCategory">Sub-category</label>
        <select v-model="incident.subCategory" required>
          <option v-for="subCategory in subCategories" :key="subCategory" :value="subCategory">
            {{ subCategory }}
          </option>
        </select>
      </div>

      <!-- Incident Location -->
      <div class="form-group">
        <label for="location">Incident Location</label>
        <input v-model="incident.location" placeholder="Enter location or use GPS" required />
        <button type="button" @click="getLocation">Use GPS</button>
      </div>

      <!-- Date and Time -->
      <div class="form-group">
        <label for="date">Date of Incident</label>
        <input type="date" v-model="incident.date" required />
      </div>
      <div class="form-group">
        <label for="time">Time of Incident</label>
        <input type="time" v-model="incident.time" required />
      </div>

      <!-- Additional Details -->
      <div class="form-group">
        <label for="details">Additional Details</label>
        <textarea v-model="incident.details"></textarea>
      </div>

      <button type="submit">Submit Report</button>
    </form>
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
      },
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
          headers: {
            'Content-Type': 'application/json',
          },
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
.incident-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}
.form-group {
  margin-bottom: 15px;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
