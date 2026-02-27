<template>
  <aside class="fixed inset-y-0 left-0 bg-brutal-bg border-r-[4px] border-brutal-fg w-64 hidden md:flex flex-col z-50 transition-all duration-300 font-mono">
    <div class="h-[68px] flex items-center px-6 border-b-[4px] border-brutal-fg bg-brutal-card">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="w-8 h-8 bg-brutal-blue border-[2px] border-brutal-fg flex items-center justify-center text-white font-pixel text-xs shadow-[2px_2px_0_#f2f2f2]">
          O
        </div>
        <span class="text-xl font-bold text-white uppercase tracking-widest">Oslo Dota</span>
      </RouterLink>
    </div>

    <nav class="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-3">
      <RouterLink
        to="/"
        class="flex items-center gap-3 px-4 py-3 text-stone-400 font-bold transition-all hover:text-brutal-fg hover:bg-brutal-card group brutal-border border-brutal-bg hover:border-brutal-fg"
        active-class="bg-brutal-card !text-brutal-fg border-brutal-fg !shadow-[4px_4px_0_#f2f2f2] -translate-x-[2px] -translate-y-[2px]"
      >
        <span class="text-brutal-blue font-pixel text-[10px]">></span>
        HOME
      </RouterLink>

      <RouterLink
        to="/heroes"
        class="flex items-center gap-3 px-4 py-3 text-stone-400 font-bold transition-all hover:text-brutal-fg hover:bg-brutal-card group brutal-border border-brutal-bg hover:border-brutal-fg"
        active-class="bg-brutal-card !text-brutal-fg border-brutal-fg !shadow-[4px_4px_0_#f2f2f2] -translate-x-[2px] -translate-y-[2px]"
      >
        <span class="text-brutal-blue font-pixel text-[10px]">></span>
        ROSTER
      </RouterLink>

      <div class="mt-8 mb-2 px-4 pixel-text text-stone-500">
        // COMM
      </div>

      <RouterLink
        to="/freebies"
        class="flex items-center gap-3 px-4 py-3 text-stone-400 font-bold transition-all hover:text-brutal-fg hover:bg-brutal-card group brutal-border border-brutal-bg hover:border-brutal-fg"
        active-class="bg-brutal-card !text-brutal-fg border-brutal-fg !shadow-[4px_4px_0_#f2f2f2] -translate-x-[2px] -translate-y-[2px]"
      >
        <span class="text-brutal-green font-pixel text-[10px]">></span>
        FREE GAMES
      </RouterLink>
    </nav>

    <div class="p-4 border-t-[4px] border-brutal-fg bg-brutal-card">
      <div class="mt-4 flex flex-col gap-3">
        <!-- Auth removed -->
      </div>
    </div>
  </aside>

  <!-- Mobile Header (Visible only on small screens) -->
  <header class="md:hidden fixed top-0 inset-x-0 h-16 bg-stone-900 border-b border-stone-800 z-50 flex items-center justify-between px-4">
    <RouterLink to="/" class="flex items-center gap-2">
      <div class="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/30">
        O
      </div>
      <span class="text-lg font-bold text-white">Oslo</span>
    </RouterLink>
    <div class="flex items-center gap-4">
      <RouterLink to="/heroes" class="text-stone-300 hover:text-white">Heroes</RouterLink>
    </div>
  </header>
</template>

<script>
export default {
  // Authentication removed
}
</script>

<style scoped>
/* Scoped modifications specific to Sidebar if necessary */
</style>
