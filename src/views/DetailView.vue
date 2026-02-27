<template>
  <section v-if="heroDetail.id" class="min-h-screen bg-brutal-bg text-brutal-fg pb-20 font-jakarta">
    <!-- Hero Banner Header -->
    <div class="relative w-full h-[30vh] md:h-[35vh] bg-brutal-bg border-b-[4px] border-brutal-fg flex items-end">
       <!-- Retro grid background pattern -->
       <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(#f2f2f2 1px, transparent 1px), linear-gradient(90deg, #f2f2f2 1px, transparent 1px); background-size: 40px 40px;"></div>

       <div class="absolute bottom-0 left-0 w-full px-4 md:px-10 py-6 flex items-end gap-4 md:gap-8 z-10 font-mono max-w-screen-xl mx-auto">
         <!-- Hero Image brutal frame -->
         <div class="w-24 h-24 md:w-40 md:h-40 border-[4px] border-brutal-fg bg-stone-900 shadow-[6px_6px_0_#049cd8] relative z-20 shrink-0 flex items-center justify-center p-2">
            <img :src="heroDetail.img" class="w-full h-full object-contain contrast-125" :alt="heroDetail.localized_name" />
         </div>
         
         <div class="pb-2 bg-brutal-bg p-3 md:p-5 border-[4px] border-brutal-fg shadow-[6px_6px_0_#e52521] w-full mt-auto">
            <h1 class="text-2xl md:text-5xl font-black uppercase tracking-widest text-brutal-fg drop-shadow-[2px_2px_0_#43b047]">
              {{ heroDetail.localized_name }}
            </h1>
            <div class="flex flex-wrap gap-2 mt-3">
               <span class="pixel-text bg-brutal-fg text-brutal-bg px-2 py-1">{{ attributeName }}</span>
               <span class="pixel-text bg-brutal-blue text-brutal-bg px-2 py-1">{{ heroDetail.attack_type }}</span>
               <span v-for="role in heroDetail.roles" :key="role" class="pixel-text bg-brutal-card border-[2px] border-brutal-fg px-2 py-1 text-stone-300">
                 {{ role }}
               </span>
            </div>
         </div>
       </div>
    </div>

    <!-- Main Content Grid -->
    <div class="max-w-screen-xl mx-auto px-4 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 font-mono">
      
      <!-- Left Column: Analytics -->
      <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8 self-start">
        
        <!-- Winrate Brutal Card -->
        <div class="brutal-card p-6 border-[4px]">
           <div class="pixel-text text-brutal-yellow mb-6">> WINRATE_ANALYTICS</div>
           
           <!-- Pro Winrate -->
           <div class="mb-8">
              <div class="flex justify-between mb-2">
                 <span class="font-bold text-sm tracking-widest">PRO CIRCUIT</span>
                 <span class="font-bold" :class="proWinrateClass">{{ formattedProWinrate }}%</span>
              </div>
              <div class="h-5 w-full border-[3px] border-brutal-fg bg-brutal-bg p-0.5 relative">
                 <div class="h-full transition-all duration-1000 ease-out" :class="proWinrateBarColor" :style="`width: ${formattedProWinrate}%`"></div>
              </div>
              <p class="pixel-text text-stone-500 mt-2 text-right">MATCHES: {{ (heroDetail['pro_pick'] || 0).toLocaleString() }}</p>
           </div>

           <!-- High Rank Divine -->
           <div>
              <div class="flex justify-between mb-2">
                 <span class="font-bold text-sm text-brutal-blue tracking-widest">DIVINE BRACKET</span>
                 <span class="font-bold" :class="divineWinrateClass">{{ formattedDivineWinrate }}%</span>
              </div>
              <div class="h-5 w-full border-[3px] border-brutal-fg bg-brutal-bg p-0.5 relative">
                 <div class="h-full transition-all duration-1000 ease-out" :class="divineWinrateBarColor" :style="`width: ${formattedDivineWinrate}%`"></div>
              </div>
              <p class="pixel-text text-stone-500 mt-2 text-right">MATCHES: {{ (heroDetail['7_pick'] || 0).toLocaleString() }}</p>
           </div>
        </div>

        <!-- Combat Stats -->
        <div class="brutal-card p-6 border-[4px]">
           <div class="pixel-text text-brutal-red mb-6">> COMBAT_PARAMETERS</div>
           <div class="grid grid-cols-2 gap-4">
             <div class="border-[3px] border-brutal-fg p-3 text-center bg-brutal-bg hover:bg-brutal-fg hover:text-brutal-bg transition-colors">
               <div class="pixel-text mb-2 text-stone-400">DAMAGE</div>
               <div class="text-xl font-bold">{{ heroDetail.base_attack_min }} - {{ heroDetail.base_attack_max }}</div>
             </div>
             <div class="border-[3px] border-brutal-fg p-3 text-center bg-brutal-bg hover:bg-brutal-fg hover:text-brutal-bg transition-colors">
               <div class="pixel-text mb-2 text-stone-400">RANGE</div>
               <div class="text-xl font-bold">{{ heroDetail.attack_range }}</div>
             </div>
             <div class="border-[3px] border-brutal-fg p-3 text-center bg-brutal-bg hover:bg-brutal-fg hover:text-brutal-bg transition-colors">
               <div class="pixel-text mb-2 text-stone-400">SPEED</div>
               <div class="text-xl font-bold">{{ heroDetail.move_speed }}</div>
             </div>
             <div class="border-[3px] border-brutal-fg p-3 text-center bg-brutal-bg hover:bg-brutal-fg hover:text-brutal-bg transition-colors">
               <div class="pixel-text mb-2 text-stone-400">ARMOR</div>
               <div class="text-xl font-bold">{{ (heroDetail.base_armor || 0).toFixed(1) }}</div>
             </div>
           </div>
        </div>
      </div>

      <!-- Right Column: Extrapolated Meta -->
      <div class="lg:col-span-8 space-y-8">
        
        <!-- Optimal Builds from OpenDota -->
        <div class="brutal-card p-6 border-[4px]">
           <div class="pixel-text text-brutal-green mb-6">> OPTIMAL_ITEM_BUILD</div>
           <div v-if="loadingExtras" class="py-10 text-center animate-pulse pixel-text">FETCHING OPEN_DOTA RESOURCES...</div>
           <div v-else-if="itemPopularity" class="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div class="border-[3px] border-brutal-fg p-4 bg-brutal-bg transition hover:-translate-y-1 hover:shadow-[4px_4px_0_#fbd000]">
                 <div class="pixel-text text-brutal-yellow border-b-[3px] border-brutal-fg pb-2 mb-4">EARLY_GAME</div>
                 <div class="flex flex-wrap gap-2">
                    <img v-for="item in topEarlyGame" :key="item.id" :src="getItemImage(item.id) || '/favicon.ico'" :alt="item.id" class="w-12 h-9 border-[2px] border-brutal-fg object-cover bg-stone-800" :title="`Picked ${item.count} times`"/>
                 </div>
              </div>

              <div class="border-[3px] border-brutal-fg p-4 bg-brutal-bg transition hover:-translate-y-1 hover:shadow-[4px_4px_0_#049cd8]">
                 <div class="pixel-text text-brutal-blue border-b-[3px] border-brutal-fg pb-2 mb-4">MID_GAME</div>
                 <div class="flex flex-wrap gap-2">
                    <img v-for="item in topMidGame" :key="item.id" :src="getItemImage(item.id) || '/favicon.ico'" :alt="item.id" class="w-12 h-9 border-[2px] border-brutal-fg object-cover bg-stone-800" :title="`Picked ${item.count} times`"/>
                 </div>
              </div>

              <div class="border-[3px] border-brutal-fg p-4 bg-brutal-bg transition hover:-translate-y-1 hover:shadow-[4px_4px_0_#e52521]">
                 <div class="pixel-text text-brutal-red border-b-[3px] border-brutal-fg pb-2 mb-4">LATE_GAME</div>
                 <div class="flex flex-wrap gap-2">
                    <img v-for="item in topLateGame" :key="item.id" :src="getItemImage(item.id) || '/favicon.ico'" :alt="item.id" class="w-12 h-9 border-[2px] border-brutal-fg object-cover bg-stone-800" :title="`Picked ${item.count} times`"/>
                 </div>
              </div>
           </div>
        </div>

        <!-- Hero Matchups -->
        <div class="brutal-card p-6 border-[4px]">
           <div class="pixel-text text-brutal-blue mb-6">> HERO_MATCHUPS</div>
           <div v-if="loadingExtras" class="py-10 text-center animate-pulse pixel-text">CALCULATING ALGORITHMS...</div>
           <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
             
              <!-- Strong Against -->
              <div class="flex flex-col">
                 <div class="bg-brutal-green text-brutal-bg font-bold p-2 text-center border-[3px] border-brutal-fg border-b-0">STRONG AGAINST</div>
                 <div class="border-[3px] border-brutal-fg bg-brutal-bg flex flex-col h-full">
                    <RouterLink v-for="match in strongAgainst" :key="match.hero_id" :to="`/heroes/${match.hero.localized_name}`" class="flex items-center gap-4 p-3 border-b-[3px] last:border-b-0 border-brutal-fg hover:bg-brutal-card transition-colors">
                       <img :src="match.hero.img" class="w-12 h-12 object-cover border-[3px] border-brutal-fg bg-black grayscale group-hover:grayscale-0" />
                       <div class="flex-1">
                          <div class="font-bold uppercase text-sm mb-1">{{ match.hero.localized_name }}</div>
                          <div class="pixel-text bg-brutal-green/20 text-brutal-green px-1 mt-1 inline-block">+{{ match.winrate }}% WIN</div>
                       </div>
                    </RouterLink>
                 </div>
              </div>

              <!-- Countered By -->
              <div class="flex flex-col">
                 <div class="bg-brutal-red text-brutal-bg font-bold p-2 text-center border-[3px] border-brutal-fg border-b-0">COUNTERED BY</div>
                 <div class="border-[3px] border-brutal-fg bg-brutal-bg flex flex-col h-full">
                    <RouterLink v-for="match in counterPicks" :key="match.hero_id" :to="`/heroes/${match.hero.localized_name}`" class="flex items-center gap-4 p-3 border-b-[3px] last:border-b-0 border-brutal-fg hover:bg-brutal-card transition-colors">
                       <img :src="match.hero.img" class="w-12 h-12 object-cover border-[3px] border-brutal-fg bg-black grayscale group-hover:grayscale-0" />
                       <div class="flex-1">
                          <div class="font-bold uppercase text-sm mb-1">{{ match.hero.localized_name }}</div>
                          <!-- Enemy Winrate (our loss rate) -->
                          <div class="pixel-text bg-brutal-red/20 text-brutal-red px-1 mt-1 inline-block">{{ match.winrate }}% LOSS</div>
                       </div>
                    </RouterLink>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Loading State -->
  <section v-else class="min-h-screen bg-brutal-bg flex flex-col items-center justify-center font-mono text-brutal-fg">
    <div class="w-16 h-16 border-[4px] border-brutal-fg border-t-brutal-blue bg-brutal-card animate-spin mb-6 shadow-[4px_4px_0_#f2f2f2]"></div>
    <p class="text-stone-300 font-bold animate-pulse pixel-text">AWAITING SYSTEM DATASTREAM...</p>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAppStore } from '../stores/counter'
import axios from 'axios'

export default {
  data() {
    return {
      itemPopularity: null,
      itemConstants: null,
      matchups: [],
      loadingExtras: true
    }
  },
  watch: {
    // When the route path changes to another hero, immediately reset the local array structures
    '$route.params.heroname': {
      immediate: true,
      handler(newHeroname) {
         if (newHeroname) {
            // Null out the main store
            useAppStore().heroDetail = {}
            // Null out local components
            this.itemPopularity = null
            this.matchups = []
            this.loadingExtras = true
            this.getHeroesDetail(newHeroname)
         }
      }
    },
    // When heroDetail is fully loaded with an ID from the store, fetch the OpenDota specific endpoints
    'heroDetail.id': {
      handler(newId) {
        if (newId) {
          this.fetchExtraData(newId)
        }
      }
    }
  },
  computed: {
    ...mapState(useAppStore, ['heroDetail', 'heroList']),
    
    // Dynamic Class/Label Handlers for Attributes
    attributeName() {
      if (!this.heroDetail) return ''
      if (this.heroDetail.primary_attr === 'str') return 'STRENGTH'
      if (this.heroDetail.primary_attr === 'agi') return 'AGILITY'
      if (this.heroDetail.primary_attr === 'int') return 'INTELLIGENCE'
      return 'UNIVERSAL'
    },

    // WINRATE: Pro Circuit
    rawProWinrate() {
      if (!this.heroDetail || !this.heroDetail.pro_pick) return 0
      return (this.heroDetail.pro_win / this.heroDetail.pro_pick) * 100
    },
    formattedProWinrate() {
      return this.rawProWinrate.toFixed(1)
    },
    proWinrateClass() {
      return this.rawProWinrate >= 50 ? 'text-brutal-green' : 'text-brutal-red'
    },
    proWinrateBarColor() {
      if (this.rawProWinrate >= 55) return 'bg-brutal-blue'
      if (this.rawProWinrate >= 50) return 'bg-brutal-green'
      if (this.rawProWinrate >= 45) return 'bg-brutal-yellow'
      return 'bg-brutal-red'
    },

    // WINRATE: Divine Bracket (7_win / 7_pick)
    rawDivineWinrate() {
      if (!this.heroDetail || !this.heroDetail['7_pick']) return 0
      return (this.heroDetail['7_win'] / this.heroDetail['7_pick']) * 100
    },
    formattedDivineWinrate() {
      return this.rawDivineWinrate.toFixed(1)
    },
    divineWinrateClass() {
      return this.rawDivineWinrate >= 50 ? 'text-brutal-green' : 'text-brutal-red'
    },
    divineWinrateBarColor() {
      if (this.rawDivineWinrate >= 55) return 'bg-brutal-blue'
      if (this.rawDivineWinrate >= 50) return 'bg-brutal-green'
      if (this.rawDivineWinrate >= 45) return 'bg-brutal-yellow'
      return 'bg-brutal-red'
    },

    // HELPER: Map ItemConstants by ID for rapid lookup
    itemsById() {
      if (!this.itemConstants) return {}
      const map = {}
      for (const key in this.itemConstants) {
         map[this.itemConstants[key].id] = this.itemConstants[key]
      }
      return map
    },

    // ITEM POPULARITY ARRAYS (Top 10)
    topEarlyGame() {
       return this.sortPopularItems('early_game_items')
    },
    topMidGame() {
       return this.sortPopularItems('mid_game_items')
    },
    topLateGame() {
       return this.sortPopularItems('late_game_items')
    },

    // HERO MATCHUPS (Top 4)
    strongAgainst() {
       if (!this.matchups.length || !this.heroList.length) return []
       // sort by winrate descending (wins / games_played)
       const sorted = [...this.matchups]
         .filter(m => m.games_played > 20) // Filter out pure statistical noise
         .sort((a,b) => (b.wins/b.games_played) - (a.wins/a.games_played))
       
       return sorted.slice(0, 4).map(m => {
          const hero = this.heroList.find(h => h.id === m.hero_id)
          return { ...m, hero, winrate: ((m.wins/m.games_played)*100).toFixed(1) }
       }).filter(m => m.hero)
    },
    counterPicks() {
       if (!this.matchups.length || !this.heroList.length) return []
       // sort by winrate ascending
       const sorted = [...this.matchups]
         .filter(m => m.games_played > 20)
         .sort((a,b) => (a.wins/a.games_played) - (b.wins/b.games_played))
         
       return sorted.slice(0, 4).map(m => {
          const hero = this.heroList.find(h => h.id === m.hero_id)
          // Display the enemy's winrate against us instead of our pathetic winrate against them
          return { ...m, hero, winrate: ((1 - (m.wins/m.games_played))*100).toFixed(1) }
       }).filter(m => m.hero)
    }
  },
  methods: {
    ...mapActions(useAppStore, ['getHeroesDetail', 'getHeroes']),
    
    async fetchExtraData(heroId) {
      this.loadingExtras = true;
      try {
        const [popRes, itemsRes, matchRes] = await Promise.all([
           axios.get(`https://api.opendota.com/api/heroes/${heroId}/itemPopularity`),
           axios.get(`https://api.opendota.com/api/constants/items`),
           axios.get(`https://api.opendota.com/api/heroes/${heroId}/matchups`)
        ])
        this.itemPopularity = popRes.data
        this.itemConstants = itemsRes.data
        this.matchups = matchRes.data
      } catch (error) {
        console.error("Failed fetching extra hero data from OpenDota", error)
      } finally {
        this.loadingExtras = false;
      }
    },

    sortPopularItems(tierKey) {
       if (!this.itemPopularity || !this.itemPopularity[tierKey]) return []
       
       const tierData = this.itemPopularity[tierKey]
       // Convert { itemId: count } object into a sorted array of objects to guarantee UI sort order
       return Object.entries(tierData)
         .map(([id, count]) => ({ id, count }))
         .sort((a,b) => b.count - a.count)
         .slice(0, 10)
    },

    getItemImage(itemId) {
      if (!this.itemConstants) return ''
      const item = this.itemsById[itemId]
      if (item && item.img) return `https://cdn.cloudflare.steamstatic.com${item.img}`
      return '' // Fallback image handled in template
    }
  },
  created() {
    // Rely on the watcher to trigger getHeroesDetail, just ensure the list is present
    if (this.heroList.length === 0) {
      this.getHeroes()
    }
  }
}
</script>
