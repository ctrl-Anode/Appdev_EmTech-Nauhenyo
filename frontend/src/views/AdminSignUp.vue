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
            <label for="admin_first_name">First Name</label>
            <input id="admin_first_name" v-model="form.admin_first_name" type="text" required>
          </div>
          <div class="form-group third-width">
            <label for="admin_middle_name">Middle Name</label>
            <input id="admin_middle_name" v-model="form.admin_middle_name" type="text" required>
          </div>
          <div class="form-group third-width">
            <label for="admin_last_name">Last Name</label>
            <input id="admin_last_name" v-model="form.admin_last_name" type="text" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group half-width">
          <label for="admin_username">UserName</label>
          <input id="admin_username" v-model="form.admin_username" type="text" required>
        </div>
  
        <div class="form-group half-width">
            <label for="department">Department</label>
            <select id="department" v-model="form.department" required>
              <option value="bfp">BFP</option>
              <option value="nps">NPS</option>
            </select>
          </div>

        </div>

        <div class="form-group">
          <label for="admin_email">Email</label>
          <input id="admin_email" v-model="form.admin_email" type="email" required placeholder="">
        </div>
  
        <div class="form-row">
  <!-- Password Field -->
  <div class="form-group half-width">
    <label for="admin_password">Password</label>
    <div class="password-input">
      <input 
        id="admin_password" 
        v-model="form.admin_password" 
        :type="adminPassword ? 'text' : 'password'" 
        required
      >
      <button type="button" @click="adminPassword = !adminPassword" class="toggle-password">
        <EyeIcon v-if="adminPassword" />
        <EyeOffIcon v-else />
      </button>
    </div>
  </div>

  <!-- Confirm Password Field -->
  <div class="form-group half-width">
    <label for="admin_confirm">Confirm Password</label>
    <div class="password-input">
      <input 
        id="admin_confirm" 
        v-model="form.admin_confirm" 
        :type="adminConfirmPassword ? 'text' : 'password'" 
        required
      >
      <button type="button" @click="adminConfirmPassword = !adminConfirmPassword" class="toggle-password">
        <EyeIcon v-if="adminConfirmPassword" />
        <EyeOffIcon v-else />
      </button>
    </div>
  </div>
</div>

  
        <button type="submit" class="submit-button">Sign Up</button>
        <div class="additional-links">
          <p>Already have an account? <router-link to="/role">Log In</router-link></p>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const form = ref({
  admin_first_name: '',
  admin_middle_name: '',
  admin_last_name: '',
  admin_username: '',
  department: '',
  admin_email: '',
  admin_password: '',
  admin_confirm: '',
});

const adminPassword = ref(false);
const adminConfirmPassword = ref(false);

const handleSubmit = async () => {
  if (form.value.admin_password !== form.value.admin_confirm) {
    alert("Passwords do not match");
    return;
  }

  try {
    await axios.post('http://localhost:3000/api/admins', form.value);
    alert('Admin created successfully');
    router.push('/role');
  } catch (error) {
    console.error("Error creating admin:", error);
    alert("Failed to create admin");
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
  