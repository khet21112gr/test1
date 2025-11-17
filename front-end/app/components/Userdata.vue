<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const loading = ref(false);
const error = ref('');

const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  const userConfirmed = confirm(`Are you sure to delete user ID: ${id}?`);
  if (!userConfirmed) return;
  try {
    const res = await axios.delete(`http://localhost:5000/api/info/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.data.ok) {
      fetchUsers()
      return
    }
  } catch (err) {

  }

}

const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/info/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    users.value = res.data.rows;
    console.log("userdata", users.value)
  } catch (err) {
    error.value = 'Failed to fetch users';
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  fetchUsers();
  console.log(users)
});
</script>
<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4 ">Users List</h2>
    <table class="min-w-full border-collapse border border-gray-300 font-mono text-sm">

      <tbody>
        <tr v-for="user in users" :key="user.id" class="border border-gray-300 hover:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2">{{ user.userid }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.username }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.password }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.role }}</td>

          <!-- <button @click="deleteUser(user.userid)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button> -->
        </tr>

      </tbody>
    </table>

  </div>
  <!-- <div v-if="isEditing" class="fixed inset-0 flex justify-center items-center h-full  ">
    <div class="flex rounded border  h-50 w-50 flex-col ">
    <div class="flex justify-between p-2 font-bold">
      edit
      <div @click="handdleEdit" class="p-2 cursor-pointer hover:bg-slate-200 h-10 rounded font-bold "> close </div>
    </div>
        <div>
               <input v-model="edituser.password" class="bg-gray-200 h-10 w-full "></input>
        </div>
    </div>
  </div> -->
</template>