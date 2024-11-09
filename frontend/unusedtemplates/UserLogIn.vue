<template>
  <div class="incident-form">
    <h2>Report an Incident</h2>
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
        <button @click="getLocation">Use GPS</button>
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

      <!-- Media Upload -->
      <div class="form-group">
        <label for="media">Upload Media (JPG, PNG, MP4)</label>
        <input type="file" @change="handleFileUpload" multiple />
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
import { db, storage } from '@/firebase'; // Import the updated Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    handleFileUpload(event) {
      this.incident.media = Array.from(event.target.files);
    },
    async submitReport() {
      try {
        // Upload media files
        const mediaUrls = [];
        for (const file of this.incident.media) {
          const storageRef = ref(storage, `incidents/${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          mediaUrls.push(url);
        }

        // Save incident report to Firestore
        const reportRef = await addDoc(collection(db, 'incidents'), {
          ...this.incident,
          media: mediaUrls,
          timestamp: new Date().toISOString(),
        });

        alert(`Report submitted! Your tracking ID: ${reportRef.id}`);
        this.$router.push('/track-report');
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
