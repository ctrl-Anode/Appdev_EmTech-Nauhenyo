<template>
    <div class="admin-messaging">
      <h2>Admin Panel - Messages from Users</h2>
      <ul>
        <li v-for="msg in messages" :key="msg.id">
          <strong>{{ msg.timestamp }}:</strong> {{ msg.message }} - <em>{{ msg.status }}</em>
          <button @click="replyToUser(msg.id)">Reply</button>
        </li>
      </ul>
  
      <h3>Send Notification to Responder</h3>
      <textarea v-model="notificationMessage" placeholder="Enter notification message"></textarea>
      <input v-model="urgency" placeholder="Urgency level" />
      <button @click="sendNotification">Send Notification</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [],
        notificationMessage: '',
        urgency: '',
      };
    },
    methods: {
      async fetchMessages() {
        try {
          const response = await fetch('http://localhost:3000/api/messages');
          const data = await response.json();
          if (data.success) this.messages = data.data;
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      },
      async sendNotification() {
        try {
          const response = await fetch('http://localhost:3000/api/notifications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              adminId: 'admin123',
              responderId: 'responder123',
              message: this.notificationMessage,
              urgency: this.urgency,
            }),
          });
          if (response.ok) {
            this.notificationMessage = '';
            this.urgency = '';
          }
        } catch (error) {
          console.error('Error sending notification:', error);
        }
      },
    },
    mounted() {
      this.fetchMessages();
    },
  };
  </script>
  