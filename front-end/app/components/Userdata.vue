<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const token = ref(null);
const users = ref([]);
const loading = ref(false);
const error = ref('');

const fetchUsers = async () => {
    token.value = localStorage.getItem("token");
    loading.value = true;
    try {
        const res = await axios.get("http://localhost:5000/api/info/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); // backend endpoint
        users.value = res.data; // สมมุติ backend return array ของ users
    } catch (err) {
        error.value = 'Failed to fetch users';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchUsers();
});
</script>
<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Users List</h2>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <table v-if="users" class="table-auto border-collapse border border-gray-300 w-full">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-2 py-1">ID</th>
          <th class="border px-2 py-1">Username</th>
          <th class="border px-2 py-1">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userid">
          <td class="border px-2 py-1">{{ user.userid }}</td>
          <td class="border px-2 py-1">{{ user.username }}</td>
          <td class="border px-2 py-1">{{ user.role }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>No users found</div>
  </div>
</template>