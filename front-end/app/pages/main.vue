<script setup>
import { onMounted } from 'vue';

const token = localStorage.getItem("token")
if(!token){
    navigateTo('/')
}
const fetchdata = async () =>{

}
onMounted(()=>{


})
</script>

<template>

</template>