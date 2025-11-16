<script>
</script>

<template>
 <div class="flex justify-center  pt-20 ">
        <form class="flex flex-col gap-3">
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
            <div class="flex justify-between items-center ">
                <button
                    class="border-2 font-bold p-1 rounded-xl font-mono hover:bg-black hover:text-white cursor-pointer">
               login
                </button>
             
            </div>
        </form>
        </div>
</template>