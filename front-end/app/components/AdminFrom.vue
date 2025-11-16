<script setup>
import { ref } from 'vue';
import axios from 'axios';
const username = ref("")
const password = ref("")

const error = ref('')
const setError = ref(false)

const clearError = () => {
  setTimeout(() => {
    error.value = ""
    setError.value = false
  }, 2000);
}

const handleSubmit =  async () =>{
    if(!username.value.trim() || !password.value.trim()){
        setError.value = true
        error.value = "missing input"
        clearError()
        return
    }
    try{
        const res = await axios.post("http://localhost:5000/api/admin",{
            adminname : username.value,
            password : password.value
        })
        if(res.data.ok){
            localStorage.setItem("token",res.data.token)
            navigateTo("/adminpanel")
        }
    }catch(error){
        alert("something went wrong")
    }
}
 

</script>

<template>
 <div class="flex justify-center  pt-20 ">
        <form 
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-3">
            <p class="font-mono text-3xl font-bold "> Admin </p>

            <div>
                <label class="block font-mono text-gray-400">username </label> 
                <input 
                v-model="username"
                type="text" class="border-2 rounded focus:bg-blue-200 p-1 "> </input>
            </div>
            <div>
                <label class="block font-mono text-gray-400">password </label>
                <input 
                v-model="password"
                type="password" class="border-2 rounded focus:bg-blue-200 p-1"> </input>

            </div>
            <div v-if="setError" class="text-red-600 font-mono ">
                        {{ error }}
            </div>
            <div class="flex justify-between items-center ">
                <button
                type="submit"
                    class="border-2 font-bold p-1 rounded-xl font-mono hover:bg-black hover:text-white cursor-pointer">
               login
                </button>
             
            </div>
        </form>
        </div>
</template>