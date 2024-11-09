<template>
    <div class="responder-notification">
      <h2>Responder Notifications</h2>
      <ul>
        <li v-for="note in notifications" :key="note.id">
          <strong>{{ note.timestamp }}:</strong> {{ note.message }} - Urgency: {{ note.urgency }}
          <button v-if="!note.acknowledged" @click="acknowledgeNotification(note.id)">
            Acknowledge
          </button>
          <span v-else>Acknowledged</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: [],
      };
    },
    methods: {
      async fetchNotifications() {
        try {
          const response = await fetch('http://localhost:3000/api/notifications');
          const data = await response.json();
          if (data.success) this.notifications = data.data.filter(note => note.responderId === 'responder123');
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      },//${id}
      async acknowledgeNotification(id) {
        try {
          const response = await fetch(`http://localhost:3000/api/notifications/${id}/acknowledge`, {
            method: 'PUT',
          });
          if (response.ok) this.fetchNotifications(); // Refresh notifications
        } catch (error) {
          console.error('Error acknowledging notification:', error);
        }
      },
    },
    mounted() {
      this.fetchNotifications();
    },
  };
  </script>
  