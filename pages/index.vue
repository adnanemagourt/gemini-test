<template>
    <div>
      <h1>AI Chat</h1>
      <div class="chat-container">
        <div v-for="(message, index) in messages" :key="index" :class="message.role">
          <strong>{{ message.role }}:</strong> {{ message.content }}
        </div>
      </div>
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInput: '',
        messages: []
      }
    },
    methods: {
      async sendMessage() {
        if (!this.userInput.trim()) return;
  
        // Add user message to the chat
        this.messages.push({ role: 'user', content: this.userInput });
  
        // Send the message to the API
        try {
          const response = await $fetch('/api/generate-content', {
            method: 'POST',
            body: {prompt: this.userInput}
          });
          console.log(response)
          // Add AI response to the chat
          this.messages.push({ role: 'ai', content: response });
        } catch (error) {
          console.error('Error sending message:', error);
          this.messages.push({ role: 'ai', content: 'Sorry, something went wrong.' });
        }
  
        // Clear the input field
        this.userInput = '';
      }
    }
  }
  </script>
  
  <style>
  .chat-container {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 300px;
    overflow-y: auto;
  }
  
  .user {
    color: blue;
  }
  
  .ai {
    color: green;
  }
  
  input {
    width: 80%;
    padding: 10px;
    margin-right: 10px;
  }
  
  button {
    padding: 10px;
  }
  </style>