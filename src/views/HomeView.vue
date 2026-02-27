<template>
  <section class="bg-brutal-bg text-brutal-fg mx-auto min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 font-mono">
    <div class="mx-auto max-w-screen-xl px-4 py-16">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="text-5xl font-bold mb-6 tracking-widest text-brutal-blue uppercase drop-shadow-[4px_4px_0_#f2f2f2]">
          OSLO DOTA
        </h1>
        <p class="text-lg text-stone-300 mb-10 max-w-2xl mx-auto font-jakarta">
          HIGH-PERFORMANCE COMPANION TERMINAL FOR DOTA 2 METRICS, BUILDS, AND MATCHUPS.
        </p>

        <div class="flex flex-wrap justify-center gap-6">
          <RouterLink
            to="/heroes"
            class="brutal-btn bg-brutal-blue text-brutal-bg px-8 py-3.5 text-lg"
          >
            [ EXPLORE HEROES ]
          </RouterLink>

          <RouterLink
            to="/register"
            class="brutal-btn bg-brutal-bg text-brutal-fg px-8 py-3.5 text-lg"
          >
            SYS_REGISTER
          </RouterLink>
        </div>
      </div>

      <!-- Hero Meta Analytics Section -->
      <div v-if="heroList.length > 0" class="mt-20 border-t-[4px] border-brutal-fg pt-16">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold tracking-widest text-white sm:text-4xl uppercase drop-shadow-[3px_3px_0_#e52521]">
            CURRENT META
          </h2>
          <p class="mt-4 text-stone-400 pixel-text">> DISCOVER HIGH ELO STANDINGS</p>
        </div>

        <!-- Rank Filters -->
        <div class="flex flex-wrap justify-center gap-4 mb-10">
          <button
            v-for="rank in ranks"
            :key="rank.id"
            @click="selectedRank = rank.id"
            :class="[
              'brutal-btn px-4 py-2 text-sm transition-colors',
              selectedRank === rank.id
                ? 'bg-brutal-green text-brutal-bg !translate-x-[-2px] !translate-y-[-2px] !shadow-[6px_6px_0_#f2f2f2]'
                : 'bg-brutal-card text-brutal-fg'
            ]"
          >
            {{ rank.label }}
          </button>
        </div>

        <!-- Meta Results Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto min-h-[16rem] font-jakarta">
          <!-- Most Picked Card -->
          <div v-if="mostPicked" class="brutal-card flex flex-col md:flex-row">
            <div class="md:w-1/3 border-b-[4px] md:border-b-0 md:border-r-[4px] border-brutal-fg bg-stone-900 flex items-center justify-center p-4">
              <img :src="mostPicked.img" :alt="mostPicked.localized_name" class="h-full w-full object-contain aspect-video md:aspect-auto transition-transform hover:scale-110" />
            </div>
            <div class="p-6 md:w-2/3 flex flex-col justify-center bg-brutal-card">
              <div class="pixel-text text-brutal-green mb-2">> MOST_PICKED</div>
              <h3 class="text-2xl font-bold text-white mb-2 uppercase">{{ mostPicked.localized_name }}</h3>
              <p class="text-stone-300 text-sm font-mono">
                Dominating the <strong class="text-brutal-yellow">{{ currentRankLabel }}</strong> bracket with 
                <span class="text-white font-bold bg-brutal-blue px-1">{{ (mostPicked[selectedRankPickKey] || 0).toLocaleString() }}</span> picks.
              </p>
            </div>
          </div>
          <div v-else class="brutal-card border-dashed flex items-center justify-center p-6 text-center text-stone-400 md:col-start-1 h-[14rem] md:h-auto">
             <div class="flex flex-col items-center gap-4 font-mono">
               <span class="text-brutal-red text-4xl font-bold">ERR_NO_DATA</span>
               <p>> NO VERIFIED PICK DATA FOR THIS BRACKET.</p>
             </div>
          </div>

          <!-- Most Banned Card (Pro Only Note) -->
          <div v-if="mostBanned" class="brutal-card flex flex-col md:flex-row relative">
            <div class="md:w-1/3 border-b-[4px] md:border-b-0 md:border-r-[4px] border-brutal-fg bg-stone-900 flex items-center justify-center p-4">
              <img :src="mostBanned.img" :alt="mostBanned.localized_name" class="h-full w-full object-contain aspect-video md:aspect-auto grayscale transition-transform hover:scale-110" />
            </div>
            <div class="p-6 md:w-2/3 flex flex-col justify-center bg-brutal-card">
              <div class="pixel-text text-brutal-red mb-2 flex flex-col gap-1 items-start">
                > MOST_BANNED
                <span class="bg-brutal-fg text-brutal-bg px-1 py-0.5 mt-1 border-[2px] border-brutal-bg" title="Ban data is PRO Circuit only.">PRO_ONLY</span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2 uppercase">{{ mostBanned.localized_name }}</h3>
              <p class="text-stone-300 text-sm font-mono">
                Feared in the Pro Circuit with 
                <span class="text-white font-bold bg-brutal-red px-1">{{ (mostBanned.pro_ban || 0).toLocaleString() }}</span> bans.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAppStore } from '../stores/counter'

export default {
  data() {
    return {
      selectedRank: 'pro',
      ranks: [
        { id: '1', label: '1 - Herald' },
        { id: '2', label: '2 - Guardian' },
        { id: '3', label: '3 - Crusader' },
        { id: '4', label: '4 - Archon' },
        { id: '5', label: '5 - Legend' },
        { id: '6', label: '6 - Ancient' },
        { id: '7', label: '7 - Divine' },
        { id: '8', label: '8 - Immortal' },
        { id: 'pro', label: 'Pro Circuit' }
      ]
    }
  },
  computed: {
    ...mapState(useAppStore, ['heroList']),
    currentRankLabel() {
      const rank = this.ranks.find((r) => r.id === this.selectedRank)
      return rank ? rank.label : 'Select Rank'
    },
    selectedRankPickKey() {
      return this.selectedRank === 'pro' ? 'pro_pick' : `${this.selectedRank}_pick`
    },
    mostPicked() {
      if (!this.heroList || this.heroList.length === 0) return null
      
      const key = this.selectedRankPickKey
      
      // Check if max picks for this rank is 0. If so, return null to show the fallback UI.
      const hasData = this.heroList.some(h => (h[key] || 0) > 0)
      if (!hasData) return null

      // Sort heroes descending by the selected rank's pick count
      const sorted = [...this.heroList].sort((a, b) => {
        const aCount = a[key] || 0
        const bCount = b[key] || 0
        return bCount - aCount
      })
      
      return sorted[0]
    },
    mostBanned() {
      if (!this.heroList || this.heroList.length === 0) return null
      
      // Ban data is only available for pro matches
      const sorted = [...this.heroList].sort((a, b) => {
        const aCount = a.pro_ban || 0
        const bCount = b.pro_ban || 0
        return bCount - aCount
      })
      
      return sorted[0]
    }
  },
  created() {
    if (this.heroList.length === 0) {
      this.getHeroes()
    }
  },
  methods: {
    ...mapActions(useAppStore, ['getHeroes'])
  }
}
</script>

<style></style>
