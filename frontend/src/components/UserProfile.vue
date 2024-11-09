<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Nau-Henyo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">Home</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/profile">Profile</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <a class="nav-link" href="#" @click="logout">Log Out</a>
            </li>
            <li v-else class="nav-item">
              <router-link class="nav-link" to="/login">Log In</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Profile Content -->
    <div class="container mt-4">
      <h1 class="mb-4">User Profile</h1>
      <div class="row">
        <div class="col-md-4">
          <!-- Profile Info Card -->
          <div class="card">
            <div class="card-body text-center">
              <img src="/api/placeholder/150/150" class="rounded-circle mb-3" alt="Profile picture" />
              <h4>{{ user.fullName }}</h4>
              <p class="text-muted">Member since {{ user.memberSince }}</p>
              <div class="d-grid gap-2">
                <button class="btn btn-primary"><i class="fas fa-edit"></i> Edit Profile</button>
                <button class="btn btn-outline-secondary"><i class="fas fa-key"></i> Change Password</button>
              </div>
            </div>
          </div>

          <!-- Account Stats Card -->
          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Account Statistics</h5>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <span>Total Reports:</span>
                <span class="badge bg-primary">{{ user.totalReports }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Resolved Cases:</span>
                <span class="badge bg-success">{{ user.resolvedCases }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span>Pending Cases:</span>
                <span class="badge bg-warning">{{ user.pendingCases }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Info and Recent Activity Cards -->
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a class="nav-link active" href="#"><i class="fas fa-user"></i> Personal Info</a>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label for="fullName" class="form-label">Full Name</label>
                  <input type="text" class="form-control" id="fullName" v-model="user.fullName" />
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="user.email" />
                  </div>
                  <div class="col">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="phone" v-model="user.contactNumber" />
                  </div>
                </div>
                <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'UserProfile',
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    const user = ref({
      fullName: '',
      email: '',
      contactNumber: '',
      memberSince: '',
      totalReports: 0,
      resolvedCases: 0,
      pendingCases: 0,
    });

    onMounted(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      isLoggedIn.value = !!storedUser;
      if (storedUser) {
        user.value = {
          fullName: `${storedUser.first_name} ${storedUser.middle_name} ${storedUser.last_name}`,
          email: storedUser.email,
          contactNumber: storedUser.contactNumber,
          memberSince: 'October 2023',
          totalReports: 15,
          resolvedCases: 12,
          pendingCases: 3,
        };
      }
    });

    const logout = () => {
      localStorage.removeItem('user');
      isLoggedIn.value = false;
      router.push('/login');
    };

    return { isLoggedIn, logout, user };
  },
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';

/* Add any additional styles for the navbar or profile */
</style>
