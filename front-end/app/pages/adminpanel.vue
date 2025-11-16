<script setup>
import Logout from '~/components/Logout.vue';
import Userdata from '~/components/Userdata.vue';
definePageMeta({
  middleware: "auth-admin"
});
</script>

<template>
    <div>
        <div class="flex justify-between border-b p-2 border-slate-200 shadow-md ">
            <div class="m-2 font-mono font-bold ">
                ADMIN PANEL
            </div>
                <Logout/> 
        </div>
        <Userdata/>
    </div>

</template>