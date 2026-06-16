<script setup lang="ts">
import NavigationSidebar from "@/components/NavigationSidebar.vue";
</script>

<template>
  <section class="flex min-h-screen">
    <NavigationSidebar />
    <div class="flex-1 flex justify-center items-center">
      <RouterView />
    </div>
  </section>
</template>
