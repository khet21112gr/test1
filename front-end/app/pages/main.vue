<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Logout from '~/components/Logout.vue'

const meetings = ref([])
const loading = ref(false)
const error = ref(null)
const userRole = ref('') // เก็บ role ของผู้ใช้

onMounted(async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token') // ดึง JWT token ที่เก็บไว้
    const res = await axios.get('http://localhost:5000/api/info/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // res.data = { ok: true, user: { email, role }, meetings: [...] }
    if (res.data.ok) {
      userRole.value = res.data.user.role
      meetings.value = res.data.meetings || []
    } else {
      error.value = res.data.message
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    loading.value = false
  }
})
</script>


<template>
  <Logout />

  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl font-mono">
      <h1 class="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Meeting Management System
      </h1>

      <p class="text-gray-600 text-lg leading-relaxed">
        This is the main dashboard.  
        Use the top navigation or sidebar to access your features.  
        Manage meetings, view schedules, and collaborate with participants.
      </p>

      <div class="mt-6 flex gap-3">
        <button
          v-if="userRole === 'Participant'"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold cursor-pointer">
          Join Meeting
        </button>

        <button
          v-if="userRole === 'Moderator'"
          class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold cursor-pointer">
          Create Meeting
        </button>
      </div>

      <div class="mt-4">
        <h2 class="font-bold text-xl mb-2">Your Meetings:</h2>
        <div v-if="loading">Loading...</div>
        <div v-if="error" class="text-red-600">{{ error }}</div>
        <ul v-if="meetings.length">
          <li v-for="m in meetings" :key="m.id">
            {{ m.title }} - {{ m.date }}
          </li>
        </ul>
        <div v-else-if="!loading">No meetings found.</div>
      </div>
    </div>
  </div>
</template>