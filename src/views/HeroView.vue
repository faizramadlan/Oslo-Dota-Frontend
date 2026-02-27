<template>
  <section class="min-h-screen bg-brutal-bg text-brutal-fg pb-20">
    <!-- Premium Header -->
    <div class="bg-brutal-bg border-b-[4px] border-brutal-fg font-mono">
      <div class="px-4 py-10 mx-auto sm:px-6 lg:px-8 max-w-screen-xl">
        <h2 class="text-4xl font-bold text-white tracking-widest mb-4 uppercase drop-shadow-[4px_4px_0_#049cd8]">Roster Index</h2>
        <p class="text-stone-300 max-w-2xl text-lg font-jakarta">
          Filter and sort through the entire Dota 2 hero pool. Find your perfect match based on attributes, winrates, or base damage.
        </p>
      </div>
    </div>

    <div class="px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-screen-xl">
      <!-- Control Panel -->
      <div class="brutal-card p-6 mb-10 font-mono">
        <div class="flex flex-col lg:flex-row gap-5 justify-between items-center">
          
          <!-- Search & Randomizer -->
          <div class="flex flex-col md:flex-row w-full gap-5 items-start">
            
            <!-- Unified Search Input Group -->
            <div class="flex flex-1 shadow-[4px_4px_0_#f2f2f2] group h-14 box-border">
              <span class="bg-brutal-fg text-brutal-bg font-bold flex items-center justify-center px-4 border-[3px] border-r-0 border-brutal-fg transition-colors group-focus-within:bg-brutal-blue">
                >
              </span>
              <input
                id="search"
                type="text"
                v-model="searchTerm"
                placeholder="SEARCH_ROSTER"
                class="w-full h-full bg-brutal-bg text-brutal-fg border-[3px] border-brutal-fg px-4 focus:outline-none focus:bg-stone-800 font-bold placeholder-stone-500 uppercase"
              />
            </div>
            
            <button
              @click="selectRandomHero"
              class="brutal-btn bg-brutal-yellow text-brutal-bg px-8 font-bold whitespace-nowrap h-14 box-border flex items-center justify-center shadow-[4px_4px_0_#f2f2f2] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              title="Pick a random hero from the current view"
            >
              RANDOMIZE >>
            </button>
          </div>

          <!-- Filters & Sort -->
          <div class="flex flex-col xl:flex-row w-full gap-5 items-center justify-between">
            <!-- Attribute Filter -->
            <div class="flex flex-nowrap items-center justify-center gap-3">
              <button
                v-for="attr in attributes"
                :key="attr.id"
                @click="selectedAttribute = attr.id"
                :title="attr.label"
                :class="[
                  'p-2 sm:p-3 font-bold uppercase transition-all border-[3px] flex items-center justify-center min-w-[3.5rem] h-14 box-border',
                  selectedAttribute === attr.id
                    ? `${attr.bgClass} text-white translate-x-[2px] border-transparent shadow-[4px_4px_0_#f2f2f2] opacity-100`
                    : 'bg-brutal-bg text-stone-400 hover:text-white border-brutal-fg hover:bg-stone-800 shadow-[4px_4px_0_#f2f2f2]'
                ]"
              >
                <img v-if="attr.icon" :src="attr.icon" :alt="attr.label" class="w-8 h-8 drop-shadow-md" />
                <span v-else class="px-2">{{ attr.label }}</span>
              </button>
            </div>

            <!-- Sort Dropdown -->
            <div class="w-full sm:w-80 xl:w-64 relative mt-2 xl:mt-0">
              <select
                v-model="sortBy"
                class="w-full h-14 box-border appearance-none bg-brutal-bg text-brutal-fg border-[3px] border-brutal-fg py-3 pl-4 pr-10 focus:outline-none focus:border-brutal-blue font-bold cursor-pointer uppercase shadow-[4px_4px_0_#049cd8]"
              >
                <option value="name">A-Z NAME</option>
                <option value="winrate_desc">HIGH WINRATE</option>
                <option value="winrate_asc">LOW WINRATE</option>
                <option value="damage_desc">MAX DAMAGE</option>
              </select>
              <div class="absolute top-1/2 right-4 -translate-y-1/2 flex items-center pointer-events-none text-brutal-fg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Hero Grid -->
      <div v-if="filteredAndSortedHeroes.length > 0">
        <!-- Results count -->
        <div class="text-stone-400 text-sm mb-6 flex items-center justify-between">
          <span>Showing {{ filteredAndSortedHeroes.length }} heroes</span>
        </div>

        <ul class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <Card v-for="hero in filteredAndSortedHeroes" :key="hero.id" :data="hero" />
        </ul>
      </div>

      <!-- Empty State -->
      <div v-else class="brutal-card border-[4px] border-dashed p-16 text-center font-mono flex items-center justify-center">
        <div class="flex flex-col items-center gap-4">
          <span class="text-brutal-red text-4xl font-bold">ERR_NOT_FOUND</span>
          <p class="text-stone-300 max-w-md mx-auto">
            > We couldn't find any heroes matching "{{ searchTerm }}" in the selected attribute category. 
          </p>
          <button @click="resetFilters" class="mt-6 brutal-btn bg-brutal-blue text-brutal-bg px-6 py-2">
            [ RESET_FILTERS ]
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import Card from '../components/Card.vue'
import { mapState, mapActions } from 'pinia'
import { useAppStore } from '../stores/counter'

export default {
  components: {
    Card
  },
  data() {
    return {
      searchTerm: '',
      selectedAttribute: 'all',
      sortBy: 'name',
      attributes: [
        { id: 'all', label: 'ALL', bgClass: 'bg-brutal-fg !text-brutal-bg', icon: '' },
        { id: 'str', label: 'STR', bgClass: 'bg-brutal-red', icon: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png' },
        { id: 'agi', label: 'AGI', bgClass: 'bg-brutal-green', icon: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png' },
        { id: 'int', label: 'INT', bgClass: 'bg-brutal-blue', icon: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png' },
        { id: 'all_attr', label: 'UNI', bgClass: 'bg-brutal-yellow !text-brutal-bg', icon: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_universal.png' }
      ]
    }
  },
  computed: {
    ...mapState(useAppStore, ['heroList']),
    filteredAndSortedHeroes() {
      if (!this.heroList || this.heroList.length === 0) return []

      // 1. Filter
      let result = this.heroList.filter(hero => {
        // Text Search
        const cleanSearch = this.searchTerm.toLowerCase().replace(/[^a-z0-9]/g, '')
        const cleanName = hero.localized_name.toLowerCase().replace(/[^a-z0-9]/g, '')
        const matchesSearch = cleanName.includes(cleanSearch)
        
        // Attribute Filter
        let matchesAttr = true
        if (this.selectedAttribute !== 'all') {
          // OpenDota API sets Universal to 'all' in "primary_attr"
          const targetAttr = this.selectedAttribute === 'all_attr' ? 'all' : this.selectedAttribute
          matchesAttr = hero.primary_attr === targetAttr
        }

        return matchesSearch && matchesAttr
      })

      // 2. Sort
      result = result.sort((a, b) => {
        if (this.sortBy === 'name') {
          return a.localized_name.localeCompare(b.localized_name)
        } 
        else if (this.sortBy === 'winrate_desc' || this.sortBy === 'winrate_asc') {
          // Calculate Pro Winrate
          const calcWR = (hero) => {
            if (!hero.pro_pick || hero.pro_pick === 0) return 0
            return (hero.pro_win / hero.pro_pick) * 100
          }
          const wrA = calcWR(a)
          const wrB = calcWR(b)
          
          if (this.sortBy === 'winrate_desc') return wrB - wrA
          return wrA - wrB
        }
        else if (this.sortBy === 'damage_desc') {
          // Total Max Damage = base max attack + base primary attribute
          const calcDmg = (hero) => {
            let baseMax = Number(hero.base_attack_max) || 0
            // The API uses 'all' for Universal attribute, which gives 0.6 damage per point of ALL stats.
            let attrDmg = 0
            if (hero.primary_attr === 'all') {
               attrDmg = Math.floor((hero.base_str + hero.base_agi + hero.base_int) * 0.6)
            } else {
               attrDmg = Number(hero['base_' + hero.primary_attr]) || 0
            }
            return baseMax + attrDmg
          }
          
          return calcDmg(b) - calcDmg(a)
        }
        return 0
      })

      return result
    }
  },
  created() {
    if (this.heroList.length === 0) {
      this.getHeroes()
    }
  },
  methods: {
    ...mapActions(useAppStore, ['getHeroes']),
    selectRandomHero() {
      if (this.filteredAndSortedHeroes.length === 0) return
      
      const index = Math.floor(Math.random() * this.filteredAndSortedHeroes.length)
      const hero = this.filteredAndSortedHeroes[index]
      this.$router.push(`/heroes/${hero.localized_name}`)
    },
    resetFilters() {
      this.searchTerm = ''
      this.selectedAttribute = 'all'
      this.sortBy = 'name'
    }
  }
}
</script>

<style scoped>
/* Scoped overrides if necessary */
</style>
