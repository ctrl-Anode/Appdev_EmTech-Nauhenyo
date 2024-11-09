<template>
    <div>
      <h2>User List</h2>
      <table>
        <thead>
        <tr>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Birthday</th>
          <th>Gender</th>
          <th>Contact Number</th>
          <th>Address</th>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.first_name }}</td>
          <td>{{ user.middle_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.birthday }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.contactNumber }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const users = ref([]);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      users.value = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      users.value = users.value.filter(user => user.id !== id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  onMounted(fetchUsers);
  </script>
  