<template>
  <div class="login-container">
    <div class="logo-container">
      <img src="@/assets/naulogo.png" alt="Logo" class="logo" />
    </div>

    <form @submit.prevent="handleLogin" class="login-form">
      <h1>Log In</h1>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-input">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
          />
          <button type="button" @click="showPassword = !showPassword" class="toggle-password">
            <EyeIcon v-if="showPassword" />
            <EyeOffIcon v-else />
          </button>
        </div>
      </div>

      <button type="submit" class="submit-button">Log In</button>

      <div class="additional-links">
        <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
        <p><router-link to="/forgotpassword">Forgot Password?</router-link></p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';

const router = useRouter();
const form = ref({
  email: '',
  password: '',
});
const showPassword = ref(false);

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', form.value);
    if (response.data.success) {
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Login successful');
      router.push('/home'); // Redirect to the home page
    } else {
      alert(response.data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Login failed. Please try again.');
  }
};
</script>


<style scoped>
/* Similar styles as the Sign-Up form for consistency */
.login-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 100px;
}

.login-form {
  background-color: rgba(249, 249, 249, 0.9);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

h1 {
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.password-input {
  position: relative;
}

.toggle-password {
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
