<template>
  <div class="signup-container">
    <!-- Logo Image at the top center -->
    <div class="logo-container">
      <img src="@/assets/naulogo.png" alt="Logo" class="logo">
    </div>

    <!-- Form with the title inside -->
    <form @submit.prevent="handleSubmit" class="signup-form">
      <h1>Sign Up</h1>
      <div class="form-row">
        <div class="form-group third-width">
          <label for="first_name">First Name</label>
          <input id="first-name" v-model="form.first_name" type="text" required>
        </div>
        <div class="form-group third-width">
          <label for="middle_name">Middle Name</label>
          <input id="middle_name" v-model="form.middle_name" type="text" required>
        </div>
        <div class="form-group third-width">
          <label for="last_name">Last Name</label>
          <input id="last_name" v-model="form.last_name" type="text_name" required>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group third-width">
          <label for="birthday">Birthday</label>
          <input id="birthday" v-model="form.birthday" type="date" required>
        </div>

        <div class="form-group third-width">
          <label for="gender">Gender</label>
          <select id="gender" v-model="form.gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group third-width">
          <label for="contactNumber">Contact Number</label>
          <input id="contactNumber" v-model="form.contactNumber" type="tel" required>
        </div>
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <div class="address-input">
          <input id="address" v-model="form.address" type="text" required>
          <button type="button" @click="showMap = true" class="map-button">
            <MapPinIcon />
          </button>
        </div>
      </div>

      <div class="form-group">
        <label for="username">UserName</label>
        <input id="username" v-model="form.username" type="text" required>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required placeholder="">
      </div>

      <div class="form-row">
        <!-- Password Field -->
        <div class="form-group half-width">
          <label for="password">Password</label>
          <div class="password-input">
            <input 
              id="password" 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              required
            >
            <button type="button" @click="showPassword = !showPassword" class="toggle-password">
              <EyeIcon v-if="showPassword" />
              <EyeOffIcon v-else />
            </button>
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div class="form-group half-width">
          <label for="confirm">Confirm Password</label>
          <div class="password-input">
            <input 
              id="confirm" 
              v-model="form.confirm" 
              :type="showConfirmPassword ? 'text' : 'password'" 
              required
            >
            <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="toggle-password">
              <EyeIcon v-if="showConfirmPassword" />
              <EyeOffIcon v-else />
            </button>
          </div>
        </div>
      </div>

      <button type="submit" class="submit-button">Sign Up</button>

      <div class="additional-links">
        <p>Already have an account? <router-link to="/login">Log In</router-link></p>
      </div>
    </form>

    <div v-if="showMap" class="modal">
      <div class="modal-content">
        <button @click="showMap = false" class="close-button">
          <XIcon />
        </button>
        <h2>Select Location in the Philippines</h2>
        <div class="map-placeholder">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Blank_map_of_the_Philippines.svg/800px-Blank_map_of_the_Philippines.svg.png" alt="Map of the Philippines">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';

const router = useRouter();
const form = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  username: '',
  email: '',
  birthday: '',
  gender: '',
  contactNumber: '',
  address: '',
  password: '',
  confirm: '',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showMap = ref(false);

const handleSubmit = async () => {
  try {
    await axios.post('http://localhost:3000/api/users', form.value);
    alert('User signed up successfully');
    router.push('/login');
  } catch (error) {
    console.error('Error signing up:', error);
    alert('Error signing up. Please try again.');
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap'); /* Import Poppins font */

* {
  font-family: 'Poppins', sans-serif; /* Apply Poppins font to all elements */
}

/* Apply the background color to the entire viewport */


.signup-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 100px; /* Adjust logo size as needed */
}

.signup-form {
  background-color: rgba(249, 249, 249, 0.9); /* Semi-transparent form background */
  padding: 30px; /* Increased padding for more space inside the form */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: left; /* Align text inside the form to the left */
}

h1 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.half-width {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  text-align: left;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.address-input, .password-input {
  position: relative;
}

.map-button, .toggle-password {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #062654;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #f58e08;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.map-placeholder {
  width: 100%;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-placeholder img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.additional-links {
  text-align: center;
  margin-top: 15px;
}

.additional-links p {
  margin: 5px 0;
  color: #333;
}

.additional-links a {
  color: #062654;
  font-weight: bold;
  text-decoration: none;
}

.additional-links a:hover {
  color: #f58e08;
}
</style>
