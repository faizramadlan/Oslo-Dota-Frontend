<script setup>
import { Analytics } from '@vercel/analytics/vue';
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <Analytics />
  <div class="flex min-h-screen">
    <Sidebar />
    
    <!-- Main Content wrapper: Pad left on desktop for sidebar, pad top on mobile for header -->
    <main class="flex-1 w-full md:pl-64 pt-16 md:pt-0 min-h-screen transition-all duration-300">
      <router-view />
    </main>
  </div>
</template>

<style></style>
