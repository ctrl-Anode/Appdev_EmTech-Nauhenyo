<template>
  <div class="admin-role-container">
    <div class="logo-container">
      <img src="@/assets/naulogo.png" alt="Company Logo" class="logo">
    </div>
    <form class="role-selection-form">
      <h1>Select Your Admin Role</h1>
      <div class="button-container">
        <button 
          type="button"
          @click="selectBFPRole"
          class="role-button">
          BFP Admin
        </button>
        <button 
          type="button"
          @click="selectNPSRole"
          class="role-button">
          NPS Admin
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AdminRoleSelector',
  methods: {
    selectBFPRole() {
      this.$router.push({ name: 'BfpAdminLogin' });
    },
    selectNPSRole() {
      this.$router.push({ name: 'NpsAdminLogin' });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.admin-role-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #3498db, #e67e22);
  font-family: 'Poppins', sans-serif;
}

.logo-container {
  position: absolute;
  top: 20px;
  text-align: center;
  width: 100%;
}

.logo {
  max-width: 150px;
  height: auto;
}

.role-selection-form {
  background-color: rgba(255, 255, 255, 0.6); /* Increase transparency */
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Softer shadow */
  text-align: center;
  max-width: 400px;
  width: 90%;
}

h1 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.8rem;
}

.button-container {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.role-button {
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.role-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.role-button.selected {
  background-color: #4CAF50;
  color: white;
}

@media (max-width: 600px) {
  .button-container {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
