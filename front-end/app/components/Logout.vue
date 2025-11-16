<script setup>
const handleClick = () =>{
    localStorage.removeItem("token")
    navigateTo('/')
}
</script>

<template>
    <button
    @click="handleClick"
    class="border border-red-500 bg-red-500 text-white font-bold font-mono rounded-xl p-2 cursor-pointer">
        Log out
    </button>
</template>