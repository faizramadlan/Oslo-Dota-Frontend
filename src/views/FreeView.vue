<template>
  <section class="min-h-screen bg-brutal-bg text-brutal-fg pb-20">
    <!-- Premium Header -->
    <div class="bg-brutal-bg border-b-[4px] border-brutal-fg font-mono">
      <div class="px-4 py-10 mx-auto sm:px-6 lg:px-8 max-w-screen-xl">
        <h2 class="text-4xl font-bold text-white tracking-widest mb-4 uppercase drop-shadow-[4px_4px_0_#049cd8]">Freebies</h2>
        <p class="text-stone-300 max-w-2xl text-lg font-jakarta">
          Grab these games while they're 100% off. Discover new adventures without spending a dime.
        </p>
      </div>
    </div>

    <div class="px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-screen-xl">
      <!-- Control Panel -->
      <div class="brutal-card p-6 mb-10 font-mono">
        <div class="flex flex-col md:flex-row gap-5 items-center justify-between">
          <div class="flex items-center w-full md:w-auto">
            <span class="text-brutal-yellow font-bold uppercase mr-4">> SORT_BY:</span>
            <div class="relative w-full md:w-48">
              <select
                id="sort-select"
                v-model="sortOption"
                @change="sortFreebies"
                class="w-full h-12 box-border appearance-none bg-brutal-bg text-brutal-fg border-[3px] border-brutal-fg px-4 focus:outline-none focus:border-brutal-blue font-bold cursor-pointer uppercase shadow-[4px_4px_0_#049cd8]"
              >
                <option value="discount">DISCOUNT</option>
                <option value="rating">RATING</option>
                <option value="date">RELEASE DATE</option>
              </select>
              <div class="absolute top-1/2 right-4 -translate-y-1/2 flex items-center pointer-events-none text-brutal-fg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="3" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="flex items-center w-full md:w-auto">
            <span class="text-brutal-green font-bold uppercase mr-4">> ORDER:</span>
            <div class="flex gap-4">
              <label class="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  value="asc"
                  v-model="sortOrder"
                  @change="sortFreebies"
                  class="sr-only"
                />
                <span class="w-6 h-6 border-[3px] border-brutal-fg group-hover:border-brutal-green flex items-center justify-center mr-2 bg-brutal-bg">
                  <span v-if="sortOrder === 'asc'" class="w-3 h-3 bg-brutal-green"></span>
                </span>
                <span class="font-bold uppercase text-stone-300 group-hover:text-white transition-colors">ASC</span>
              </label>
              
              <label class="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  value="desc"
                  v-model="sortOrder"
                  @change="sortFreebies"
                  class="sr-only"
                />
                <span class="w-6 h-6 border-[3px] border-brutal-fg group-hover:border-brutal-red flex items-center justify-center mr-2 bg-brutal-bg">
                  <span v-if="sortOrder === 'desc'" class="w-3 h-3 bg-brutal-red"></span>
                </span>
                <span class="font-bold uppercase text-stone-300 group-hover:text-white transition-colors">DESC</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Games Grid -->
      <div v-if="freebies.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-jakarta">
        <div
          v-for="game in freebies"
          :key="game.dealID"
          class="brutal-card flex flex-col justify-between bg-brutal-card group"
        >
          <!-- Image Container -->
          <div class="relative border-b-[4px] border-brutal-fg overflow-hidden h-48 bg-stone-900 p-2 flex items-center justify-center">
            <img :src="game.thumb" :alt="game.title" class="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
            <div class="absolute top-0 right-0 bg-brutal-green text-brutal-bg font-bold font-mono px-3 py-1 border-b-[3px] border-l-[3px] border-brutal-fg">
              100% OFF
            </div>
          </div>
          
          <div class="p-5 flex flex-col flex-grow">
            <!-- Title -->
            <h3 class="text-xl font-bold mb-3 text-white uppercase font-mono truncate" :title="game.title">{{ game.title }}</h3>
            
            <!-- Store and Prices -->
            <div class="flex items-center justify-between mb-4">
              <div v-if="getStoreInfo(game.storeID)" class="flex items-center gap-2">
                <img :src="'https://www.cheapshark.com' + getStoreInfo(game.storeID).images.icon" :alt="getStoreInfo(game.storeID).storeName" class="w-6 h-6" />
                <span class="font-mono text-sm text-stone-300">{{ getStoreInfo(game.storeID).storeName }}</span>
              </div>
              <div class="flex items-end gap-3 font-mono ml-auto">
                <span class="text-brutal-green font-bold xl text-xl drop-shadow-[2px_2px_0_#000]">FREE</span>
                <span class="text-stone-400 line-through text-md">${{ game.normalPrice }}</span>
              </div>
            </div>

            <!-- Meta / Steam Info -->
            <div class="flex flex-col gap-2 mt-auto pt-4 border-t-[2px] border-dashed border-stone-600">
              
              <!-- Steam Rating -->
              <div v-if="game.steamRatingPercent > 0" class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img src="https://store.steampowered.com/favicon.ico" alt="Steam" class="w-4 h-4 grayscale" />
                  <span class="text-sm font-bold text-stone-300">{{ game.steamRatingText }}</span>
                </div>
                <span :class="['font-bold font-mono', getRatingColor(game.steamRatingPercent)]">
                  {{ game.steamRatingPercent }}%
                </span>
              </div>
              <div v-else class="text-sm text-stone-500 font-mono italic">
                NO STEAM RATING
              </div>

              <!-- Metacritic -->
              <div class="flex items-center justify-between text-sm">
                <span class="text-stone-400 font-bold uppercase">Metacritic</span>
                <span v-if="game.metacriticScore > 0" class="font-bold font-mono text-brutal-yellow">
                  {{ game.metacriticScore }}
                </span>
                <span v-else class="text-stone-500 font-mono italic">
                  N/A
                </span>
              </div>
              
              <!-- External Links -->
              <div class="flex flex-col gap-2 mt-2">
                <a :href="'https://www.cheapshark.com/redirect?dealID=' + game.dealID" target="_blank" class="w-full bg-brutal-blue text-center py-2 text-md font-bold text-brutal-bg hover:bg-white transition-colors border-[3px] border-brutal-fg shadow-[2px_2px_0_#f2f2f2] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none font-mono">
                  GET DEAL
                </a>
                <div class="flex gap-2">
                  <a v-if="game.steamAppID" :href="'https://store.steampowered.com/app/' + game.steamAppID" target="_blank" class="flex-1 bg-stone-800 text-center py-2 text-xs font-bold text-white hover:bg-stone-700 transition-colors border-[2px] border-transparent hover:border-brutal-fg font-mono">
                    STEAM STORE
                  </a>
                  <a v-if="game.metacriticLink" :href="'https://www.metacritic.com' + game.metacriticLink" target="_blank" class="flex-1 bg-stone-800 text-center py-2 text-xs font-bold text-white hover:bg-stone-700 transition-colors border-[2px] border-transparent hover:border-brutal-fg font-mono">
                    METACRITIC
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="text-brutal-blue font-bold text-2xl font-mono animate-pulse">
          > FETCHING_FREEBIES...
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="!loading && freebies.length === 0" class="brutal-card border-[4px] border-dashed p-16 text-center font-mono flex items-center justify-center">
        <div class="flex flex-col items-center gap-4">
          <span class="text-brutal-red text-4xl font-bold">ERR_NO_DEALS</span>
          <p class="text-stone-300 max-w-md mx-auto">
            > We couldn't find any 100% off deals at the moment. Try again later.
          </p>
          <button @click="fetchMore" class="mt-6 brutal-btn bg-brutal-blue text-brutal-bg px-6 py-2">
            [ RETRY_FETCH ]
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAppStore } from '../stores/counter'
import { CHEAPSHARK_STORES } from '../utils/cheapSharkStores'

export default {
  data() {
    return {
      loading: false,
      sortOption: 'discount',
      sortOrder: 'desc'
    }
  },
  computed: {
    ...mapState(useAppStore, ['freebies'])
  },
  created() {
    if (this.freebies.length === 0) {
      this.loadData()
    } else {
      this.sortFreebies()
    }
  },
  methods: {
    ...mapActions(useAppStore, ['getFreebies']),
    getStoreInfo(storeID) {
      return CHEAPSHARK_STORES.find(store => store.storeID === storeID)
    },
    async loadData() {
      this.loading = true
      await this.getFreebies()
      this.sortFreebies()
      this.loading = false
    },
    async fetchMore() {
      if (this.loading) return
      this.loading = true
      await this.getFreebies()
      this.sortFreebies()
      this.loading = false
    },
    getRatingColor(percent) {
      if (percent >= 80) return 'text-brutal-green'
      if (percent >= 50) return 'text-brutal-yellow'
      return 'text-brutal-red'
    },
    sortFreebies() {
      if (!this.freebies || this.freebies.length === 0) return

      this.freebies.sort((a, b) => {
        let valA = 0
        let valB = 0
        
        switch (this.sortOption) {
          case 'discount':
            // Since all are 100% off, let's sort by normal price to show biggest savings
            valA = parseFloat(a.normalPrice || 0)
            valB = parseFloat(b.normalPrice || 0)
            break
            
          case 'rating':
            valA = parseInt(a.steamRatingPercent || 0)
            valB = parseInt(b.steamRatingPercent || 0)
            break
            
          case 'date':
            valA = parseInt(a.releaseDate || 0)
            valB = parseInt(b.releaseDate || 0)
            break
        }
        
        if (this.sortOrder === 'asc') {
          return valA - valB
        } else {
          return valB - valA
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
