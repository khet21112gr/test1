<script setup>
import { ref } from 'vue';
import axios from 'axios';

const meetingName = ref('');
const meetingDesc = ref('');
const meetingDate = ref('');
const meetingTime = ref('');

const error = ref('');
const success = ref('');

// token เก็บใน localStorage
const token = localStorage.getItem('token');

const handleSubmit = async () => {
  if (!meetingName.value || !meetingDate.value || !meetingTime.value) {
    error.value = 'Please fill all required fields';
    return;
  }

  try {
    const datetime = `${meetingDate.value} ${meetingTime.value}`;
    const res = await axios.post(
      'http://localhost:5000/api/meeting',
      {
        mtname: meetingName.value,
        desc: meetingDesc.value,
        date: datetime
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (res.data.ok) {
      success.value = 'Meeting created successfully';
      meetingName.value = '';
      meetingDesc.value = '';
      meetingDate.value = '';
      meetingTime.value = '';
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to create meeting';
  }
};
</script>

<template>
  <div class="max-w-md mx-auto p-4 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">Create Meeting</h2>

    <!-- ข้อความ Error -->
    <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>
    <!-- ข้อความ Success -->
    <div v-if="success" class="text-green-600 mb-2">{{ success }}</div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
      <!-- Meeting Name -->
      <div>
        <label class="block font-mono mb-1">Meeting Name*</label>
        <input
          v-model="meetingName"
          type="text"
          placeholder="Enter meeting name"
          class="border p-2 rounded w-full"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block font-mono mb-1">Description</label>
        <textarea
          v-model="meetingDesc"
          placeholder="Optional description"
          class="border p-2 rounded w-full"
        ></textarea>
      </div>

      <!-- Date -->
      <div>
        <label class="block font-mono mb-1">Date*</label>
        <input
          v-model="meetingDate"
          type="date"
          class="border p-2 rounded w-full"
        />
      </div>

      <!-- Time -->
      <div>
        <label class="block font-mono mb-1">Time*</label>
        <input
          v-model="meetingTime"
          type="time"
          class="border p-2 rounded w-full"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold"
      >
        Create Meeting
      </button>
    </form>
  </div>
</template>
