<script setup>
import { ref } from 'vue';
import axios from "axios"

const isSignUp = ref(false)

const email = ref("")
const password = ref("")
const comfirmPassword = ref("")

const setRole = ref(false)
const role = ref("")

const error = ref("")
const setError = ref(false)
const success = ref('')
const setSuccess = ref(false)

const handleToggle = () => {
    isSignUp.value = !isSignUp.value
    role.value = ""
    email.value = ""
    password.value = ""
    comfirmPassword.value = ""
    error.value = ""
    setError.value = true
}

const clearError = () => {
    setTimeout(() => {
        error.value = ""
        setError.value = false
    }, 2000);

}

const handleSubmit = async () => {

    // REGISTER
    if (isSignUp.value) {
        if (!email.value.trim() || !password.value.trim() || !comfirmPassword.value.trim() || !role.value.trim()) {
            error.value = "missing input"
            setError.value = true
            clearError()
            return
        }
        if (password.value.length < 6 || comfirmPassword.value.length < 6) {
            error.value = "password must be at least 6"
            setError.value = true
            clearError()
            return
        }

        if (password.value !== comfirmPassword.value) {
            error.value = "password mismatch"
            setError.value = true
            clearError()
            return
        }
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                email: email.value,
                password: password.value,
                role: role.value
            })

            if (!res.data.ok) {
                error.value = res.data.message
                setError.value = true
                clearError()
            } else {
                alert("register success")
                isSignUp.value = false
            }

        } catch (error) {
            error.value = "network error"
            setError.value = true
            clearError()
        }
        return
    }

    // LOGIN
    if (!isSignUp.value) {
        if (!email.value.trim() || !password.value.trim()) {
            error.value = "missing input"
            setError.value = true
            clearError()
            return
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email: email.value,
                password: password.value
            })
            console.log(res)
            if (!res.data.ok) {
                error.value = res.data.message
                setError.value = true
                clearError()
                return
            }

            // save JWT token
            localStorage.setItem("token", res.data.token)
            navigateTo('/main')

        } catch (error) {
            error.value = "network error"
            setError.value = true
            clearError()
        }
    }
}


</script>

<template>
    <div class="flex justify-center  pt-20 ">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
            <p class="font-mono text-3xl font-bold ">{{ isSignUp ? " Register As " : " Login " }}</p>
            <p class="font-mono text-2xl font-bold text-blue-400 " :class="{

                'text-green-500': role.includes('Moderator'),
                'text-blue-400': role.includes('Participant')
            }"> {{ role }}</p>

            <div>
                <label class="block font-mono text-gray-400">email </label>
                <input v-model="email" type="email" class="border-2 rounded font-mono focus:bg-blue-200 p-1 "> </input>
            </div>
            <div>
                <label class="block font-mono text-gray-400">password </label>
                <input v-model="password" type="password" class="border-2 rounded font-mono focus:bg-blue-200 p-1">
                </input>

            </div>
            <div v-if="isSignUp">
                <label class="block font-mono text-gray-400">comfirm password</label>
                <input v-model="comfirmPassword" type="password"
                    class="border-2 font-mono rounded focus:bg-blue-200 p-1">
                </input>
            </div>

            <div v-if="isSignUp" class="flex gap-2 font-mono  ">
                <input type="radio" value="Moderator" class="cursor-pointer" v-model="role">Moderator</input>
                <input type="radio" value="Participant" class="cursor-pointer" v-model="role">Participant</input>
            </div>

            <div class="flex justify-between items-center ">
                <button type="submit"
                    class="border-2 font-bold p-1 rounded-xl font-mono hover:bg-black hover:text-white cursor-pointer">
                    {{ isSignUp ? "Register" : "login" }}
                </button>
                <p @click="handleToggle" class="font-mono text-blue-400 font-bold hover:text-blue-700 cursor-pointer ">
                    {{ isSignUp ? "Login ?" : "Sign Up ?" }}</p>
            </div>
            <div v-if="setError" class="text-red-600 font-mono">
                {{ error }}
            </div>
        </form>

    </div>

</template>