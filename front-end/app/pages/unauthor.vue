<script setup>

const hanndleclick = () => {
    navigateTo('/')
}
</script>

<template>
    <div class="flex justify-center ">
        <p class="font-mono text-7xl font-bold">
             CAN NOT ACCESS 
        </p>
        <button
        @click="hanndleclick"
        class="rounded border-2 cursor-pointer"
        >
             login
        </button>
    </div>
    
</template>