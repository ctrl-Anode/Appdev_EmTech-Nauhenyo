<template>
    <div class="user-messaging">
      <h2>Contact Admin</h2>
      <textarea v-model="message" placeholder="Enter your message"></textarea>
      <button @click="sendMessage">Send Message</button>
  
      <h3>Your Messages</h3>
      <ul>
        <li v-for="msg in messages" :key="msg.id">
          <strong>{{ msg.timestamp }}:</strong> {{ msg.message }} - <em>{{ msg.status }}</em>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: '',
        messages: [],
      };
    },
    methods: {
      async sendMessage() {
        try {
          const response = await fetch('http://localhost:3000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'user123', message: this.message }),
          });
          if (response.ok) {
            this.message = '';
            this.fetchMessages();
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      },
      async fetchMessages() {
        try {
          const response = await fetch('http://localhost:3000/api/messages');
          const data = await response.json();
          if (data.success) this.messages = data.data.filter(msg => msg.userId === 'user123');
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      },
    },
    mounted() {
      this.fetchMessages();
    },
  };
  </script>
  