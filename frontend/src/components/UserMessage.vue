<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#">Nau-Henyo</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="/home"><i class="fas fa-home"></i> Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/fire_report"><i class="fas fa-exclamation-triangle"></i> Report Fire Incident</a></li>
            <li class="nav-item"><a class="nav-link" href="/report_crime"><i class="fas fa-exclamation-triangle"></i> Report Crime</a></li>
            <li class="nav-item"><a class="nav-link" href="/cases"><i class="fas fa-history"></i> My Reports</a></li>
            <li class="nav-item"><a class="nav-link active" href="/maps"><i class="fas fa-map-marked-alt"></i> Map</a></li>
            <li class="nav-item"><a class="nav-link" href="/statistic"><i class="fas fa-chart-bar"></i> Statistics</a></li>
            <li class="nav-item"><a class="nav-link" href="/message"><i class="fas fa-envelope"></i> Messages</a></li>
            <li class="nav-item"><a class="nav-link" href="/profile"><i class="fas fa-user"></i> Profile</a></li>
            </ul>
          </div>
        </div>
      </nav>
  
      <div class="container mt-4">
        <h1 class="mb-4">Messages</h1>
  
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="searchQuery" placeholder="Search conversations...">
                  <button class="btn btn-outline-secondary" type="button" @click="searchConversations"><i class="fas fa-search"></i></button>
                </div>
                <div class="list-group">
                  <a v-for="conversation in conversations" :key="conversation.id" href="#" class="list-group-item list-group-item-action" @click="selectConversation(conversation)">
                    <div class="d-flex w-100 justify-content-between">
                      <h6 class="mb-1">{{ conversation.name }}</h6>
                      <small>{{ conversation.time }}</small>
                    </div>
                    <small>{{ conversation.lastMessage }}</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
  
          <div class="col-md-8">
            <div class="card chat-container">
              <div class="card-header">
                <h5 class="mb-0">{{ selectedConversation.name }}</h5>
              </div>
              <div class="card-body message-list">
                <div v-for="(message, index) in selectedConversation.messages" :key="index" :class="['message', { 'message-sent': message.sent, 'message-received': !message.sent }]">
                  <div :class="{ 'message-sent': message.sent, 'message-received': !message.sent }">
                    <p class="mb-0">{{ message.text }}</p>
                    <small :class="message.sent ? 'text-white-50' : 'text-muted'">{{ message.time }}</small>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <form @submit.prevent="sendMessage">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="newMessage" placeholder="Type your message...">
                    <button class="btn btn-primary" type="submit"><i class="fas fa-paper-plane"></i> Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserMessage',
    data() {
      return {
        searchQuery: '',
        conversations: [
          {
            id: 1,
            name: 'Officer John Smith',
            time: '3 mins ago',
            lastMessage: "Thanks for your report. We'll investigate...",
            messages: [
              { text: "Hello, I'm Officer Smith. I've been assigned to your case #12345 regarding the incident you reported.", time: '10:30 AM', sent: false },
              { text: "Thank you, Officer Smith. Is there any update on the investigation?", time: '10:32 AM', sent: true },
              { text: "Yes, we've identified some leads and are actively investigating. Could you provide any additional details about what you witnessed?", time: '10:35 AM', sent: false },
            ],
          },
          {
            id: 2,
            name: 'Fire Dept. Dispatch',
            time: '2 hours ago',
            lastMessage: 'Fire has been contained. Our team is...',
            messages: [],
          },
          {
            id: 3,
            name: 'Emergency Response',
            time: '1 day ago',
            lastMessage: 'Your emergency alert has been received...',
            messages: [],
          },
        ],
        selectedConversation: {},
        newMessage: '',
      };
    },
    methods: {
      selectConversation(conversation) {
        this.selectedConversation = conversation;
      },
      sendMessage() {
        if (this.newMessage.trim()) {
          this.selectedConversation.messages.push({
            text: this.newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sent: true,
          });
          this.newMessage = '';
        }
      },
      searchConversations() {
        console.log(`Searching for: ${this.searchQuery}`);
        // Implement search logic here
      },
    },
    mounted() {
      this.selectedConversation = this.conversations[0];
    },
  };
  </script>
  
  <style scoped>
  .chat-container {
    height: 600px;
  }
  .message-list {
    height: 500px;
    overflow-y: auto;
  }
  .message {
    margin-bottom: 15px;
  }
  .message-sent {
    background-color: #007bff;
    color: white;
    border-radius: 15px 15px 0 15px;
    padding: 10px;
    max-width: 70%;
    margin-left: auto;
  }
  .message-received {
    background-color: #e9ecef;
    border-radius: 15px 15px 15px 0;
    padding: 10px;
    max-width: 70%;
  }
  </style>
  