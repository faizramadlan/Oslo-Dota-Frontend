<template>
  <li>
    <RouterLink :to="'/heroes/' + data.localized_name" class="group flex flex-col h-full brutal-card p-2 bg-brutal-bg font-jakarta hover:-translate-y-1 hover:shadow-[4px_4px_0_#049cd8] transition-all">
      <div class="w-full aspect-[4/3] border-[3px] border-brutal-fg overflow-hidden relative bg-stone-900 flex items-center justify-center p-2 shrink-0">
        <img
          :src="data.img"
          :alt="data.localized_name"
          class="w-full h-full object-contain transition duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
      </div>
      
      <!-- Always Visible Hero Name Background Block -->
      <div class="w-full mt-2 p-2 bg-brutal-bg border-[3px] border-brutal-fg flex items-center justify-center text-center flex-1 group-hover:bg-brutal-fg group-hover:text-brutal-bg transition-colors">
        <h3 class="text-xs sm:text-sm font-bold tracking-wide uppercase line-clamp-2 text-white group-hover:text-brutal-bg">
          {{ data.localized_name }}
        </h3>
      </div>
    </RouterLink>
  </li>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* Removed old CSS overrides, using Tailwind entirely for better predictability */
</style>
