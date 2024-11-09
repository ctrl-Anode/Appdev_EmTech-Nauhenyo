<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-container">
        <img class="logo" :src="require('@/assets/naulogo.png')" alt="Logo" />
      </div>
      <h3>Admin Login</h3>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="department">Department</label>
          <select id="department" v-model="form.department" required>
            <option value="" disabled selected>Select Department</option>
            <option value="bfp">BFP</option>
            <option value="nps">NPS</option>
          </select>
        </div>

        <div class="form-group">
          <input
            type="text"
            id="admin_username"
            v-model="form.admin_username"
            required
            placeholder=" "
          />
          <label for="admin_username">Username</label>
        </div>

        <div class="form-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="admin_password"
            v-model="form.admin_password"
            required
            placeholder=" "
          />
          <label for="admin_password">Password</label>
          <span class="toggle-password" @click="togglePassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </span>
        </div>

        <button type="submit" class="login-button">Login</button>
        <div class="additional-links">
          <p>Don't have an account? <router-link to="/admin_signup">Sign Up</router-link></p>
          <p><router-link to="/forgotpassword">Forgot Password?</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const form = ref({
  department: '',
  admin_username: '',
  admin_password: '',
});

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/admins/login', form.value);
    if (response.data.success) {
      // Store admin details in localStorage for the profile panel
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
      alert('Login successful');
      router.push('/admin_profile'); // Redirect to the admin profile page
    } else {
      alert(response.data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please try again.');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #3498db, #e67e22);
}

.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.logo-container {
  margin-bottom: 3rem;
}

.logo {
  width: 120px;
  height: auto;
}

.login-form {
  width: 100%;
}

.form-group {
  position: relative;
  margin-bottom: 2rem;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, select:focus {
  outline: none;
  border-bottom-color: white;
}

label {
  position: absolute;
  left: 0;
  top: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label {
  top: -1.25rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 2rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.additional-links {
  text-align: center;
  margin-top: 15px;
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
