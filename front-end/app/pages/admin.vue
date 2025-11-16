<script setup>
import AdminFrom from '~/components/AdminFrom.vue';

const handleClick = () =>{
    navigateTo('/')
}
</script>

<template>
    <button 
    @click="handleClick"
    class="m-10 font-bold font-mono cursor-pointer ">
        back 
    </button>
    <AdminFrom/>
</template>