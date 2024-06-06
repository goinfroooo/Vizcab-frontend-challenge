<template>
  <div class="w-100 h-100 ">
    <router-view v-slot="{ Component }">
        <component :is="Component"/>
    </router-view>
  </div>
</template>

<script setup lang="ts">
  import "https://kit.fontawesome.com/14273d579a.js";

</script>

<style scoped lang="scss">

</style>
