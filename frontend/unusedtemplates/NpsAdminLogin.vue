<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-container">
        <img class="logo" :src="require('@/assets/naulogo.png')" alt="Logo" />
      </div>
      <h3>Admin Login</h3>

      <form @submit.prevent="handleLogin" class="login-form">

        <div class="form-group">
          
  <select
    id="department"
    v-model="department"
    required
  >
    <option value="" disabled selected>Select Department</option>
    <option value="bfp">BFP</option>
    <option value="nps">NPS</option>
  </select>
</div>
        <div class="form-group">
          <input
            type="text"
            id="admin_username"
            v-model="admin_username"
            required
            placeholder=" "
          />
          <label for="admin_username">Username</label>
        </div>

        <div class="form-group">
          <input
            :type="showPassword ? 'text' : 'admin_password'"
            id="admin_password"
            v-model="admin_password"
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

<script>
import axios from 'axios';
import { } from 'vue-router';

export default {
  name: 'BfpAdminLogin',
  data() {
    return {
      department: '',
      admin_username: '',
      admin_password: '',
      showPassword: false,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/admins/login', {
          department: this.department,
          admin_username: this.admin_username,
          admin_password: this.admin_password,
        });

        if (response.data.success) {
          alert('Login successful!');
          // Redirect based on department
          if (this.department === 'bfp') {
            this.$router.push('/admin_fire_report');
          } else if (this.department === 'nps') {
            this.$router.push('/admin_crime_report');
          }
        } else {
          alert('Invalid login credentials.');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
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
  background: rgba(255, 255, 255, 0.1); /* Added transparency */
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

input {
   width: 90%; /* Reduced width of input fields */
  padding: 0.75rem;
  margin: 0 auto; /* Center the input fields */
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
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

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset;
  transition: background-color 5000s ease-in-out 0s;
}

input::placeholder {
  color: transparent;
}

input:-webkit-autofill {
  caret-color: white;
}

@media screen and (max-width: 600px) {
  .login-box {
    max-width: 90%;
    padding: 1.5rem;
  }
  
  .logo {
    width: 80px;
  }

  .login-button {
    margin-top: 1.5rem;
  }
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
