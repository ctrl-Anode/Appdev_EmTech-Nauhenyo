<template>
    <div class="admin-dashboard">
      <aside class="sidebar">
        <div class="profile-info">
          <h3>{{ admin.fullName }}</h3>
          <p>Department: {{ admin.department }}</p>
          <button @click="logout" class="btn btn-outline-danger mt-3">Logout</button>
        </div>
  
        <nav class="nav-links">
          <ul>
            <li><router-link to="/admin-dashboard">Dashboard</router-link></li>
            <li><router-link to="/manage-reports">Manage Reports</router-link></li>
            <li><router-link to="/analytics">Analytics</router-link></li>
          </ul>
        </nav>
      </aside>
  
      <section class="main-content">
        <h2>Admin Dashboard</h2>
        <p>Welcome, {{ admin.fullName }}!</p>
  
        <!-- Display the content here based on selected menu -->
        <router-view />
      </section>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AdminProfilePanel',
    setup() {
      const router = useRouter();
      const admin = ref({
        fullName: '',
        department: '',
      });
  
      onMounted(() => {
        const storedAdmin = JSON.parse(localStorage.getItem('admin'));
        if (storedAdmin) {
          admin.value = {
            fullName: `${storedAdmin.admin_first_name} ${storedAdmin.admin_middle_name} ${storedAdmin.admin_last_name}`,
            department: storedAdmin.department,
          };
        } else {
          router.push('/login'); // Redirect if no admin data is found
        }
      });
  
      const logout = () => {
        localStorage.removeItem('admin');
        router.push('/login');
      };
  
      return { admin, logout };
    },
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .profile-info h3 {
    margin: 10px 0;
  }
  
  .nav-links ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
  }
  
  .nav-links li {
    margin: 15px 0;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
  }
  
  .nav-links a:hover {
    color: #18bc9c;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    background-color: #ecf0f1;
  }
  </style>
  