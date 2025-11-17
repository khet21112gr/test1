<script setup>
import createmeeting from '~/components/createmeeting.vue';
import Logout from '~/components/Logout.vue';
definePageMeta({ 
  middleware : "mode-auth"
});
</script>

<template>
<div class="flex border-b p-2 justify-between items-center border-slate-200  shadow-md">
  <p class="font-mono font-bold text-2xl text-green-500">
     MODERATER PANEL
  </p>
  <logout/>
</div>
<div>
  <createmeeting/>
</div>
</template>