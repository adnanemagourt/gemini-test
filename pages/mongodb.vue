<template>
    <div>
      <h1>MongoDB Page</h1>
  
      <!-- Form to insert data -->
      <form @submit.prevent="insertData">
        <input v-model="newData.name" placeholder="Enter name" required />
        <input v-model="newData.age" placeholder="Enter age" type="number" required />
        <button type="submit">Insert Data</button>
      </form>
  
      <!-- Display data from MongoDB -->
      <div>
        <h2>Data in MongoDB:</h2>
        <ul>
          <li v-for="item in data" :key="item._id">
            {{ item.name }} (Age: {{ item.age }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  const newData = ref({ name: '', age: null });
  const data = ref([]);
  
  // Fetch data from MongoDB
  async function fetchData() {
    const response = await $fetch('/api/data');
    data.value = response;
  }
  
  // Insert data into MongoDB
  async function insertData() {
    await $fetch('/api/data', {
      method: 'POST',
      body: newData.value,
    });
    newData.value = { name: '', age: null }; // Clear form
    await fetchData(); // Refresh data
  }
  
  // Fetch data on page load
  onMounted(fetchData);
  </script>
  
  <style>
  input {
    margin-right: 10px;
    padding: 5px;
  }
  
  button {
    padding: 5px 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
  </style>