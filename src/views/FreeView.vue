<template>
  <section class="min-h-screen bg-stone-900">
    <div class="px-4 py-5 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-3xl font-bold text-white sm:text-4xl">Discounted Games</h2>
        <div class="flex items-center">
          <label for="sort-select" class="mr-2 text-white">Sort by:</label>
          <select
            id="sort-select"
            v-model="sortOption"
            class="mr-2 border rounded-md bg-stone-700 text-white"
          >
            <option value="discount">Discount</option>
            <option value="rating">Rating</option>
          </select>
          <div class="flex items-center mr-2">
            <label for="sort-order-asc" class="mr-2 text-white">Order:</label>
            <div class="flex items-center">
              <input
                type="radio"
                id="sort-order-asc"
                value="asc"
                v-model="sortOrder"
                class="mr-1"
              />
              <label for="sort-order-asc" class="mr-2 text-white">Ascending</label>
              <input
                type="radio"
                id="sort-order-desc"
                value="desc"
                v-model="sortOrder"
                class="mr-1"
              />
              <label for="sort-order-desc" class="text-white">Descending</label>
            </div>
          </div>
          <button
            @click="sortFreebies"
            class="px-4 py-2 bg-stone-700 rounded-md text-white hover:bg-stone-400"
          >
            Sort
          </button>
        </div>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="game in freebies"
          :key="game.title"
          class="flex flex-col justify-between rounded-lg shadow-lg bg-white h-96"
        >
          <img :src="game.thumb" :alt="game.title" class="rounded-t-lg w-full h-56 object-cover" />
          <div class="p-4 flex-grow">
            <h3 class="text-lg font-bold mb-2">{{ game.title }}</h3>
            <div>
              <span class="text-red-600 font-bold">Now : ${{ game.salePrice }}</span
              ><br />
              <span class="line-through">From : ${{ game.normalPrice }}</span
              ><br />
              <span class="font-bold"
                >{{ Math.round(((game.normalPrice - game.salePrice) / game.normalPrice) * 100) }}%
                off</span
              >
              <div class="mt-2 flex items-center">
                <img
                  src="https://store.steampowered.com/favicon.ico"
                  alt="Steam Logo"
                  class="w-4 h-4 mr-2"
                />
                <span class="mr-2">{{ game.steamRatingPercent }}%</span>
                <div class="w-24 h-4 bg-gray-300 rounded-full">
                  <div
                    class="h-4 bg-green-500 rounded-full"
                    :style="{ width: game.steamRatingPercent + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="flex justify-center items-center h-96">
          <i class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAppStore } from '../stores/counter'

export default {
  methods: {
    ...mapActions(useAppStore, ['getFreebies']),
    formatPrice(price) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    },
    async fetchMore() {
      if (this.loading || !this.hasMore) return
      this.loading = true
      await this.getFreebies()
      this.loading = false
    },
    sortFreebies() {
      this.filterGames()
    },
    filterGames() {
      if (this.sortOption === 'discount') {
        this.freebies.sort((a, b) => {
          const discountA = (a.normalPrice - a.salePrice) / a.normalPrice
          const discountB = (b.normalPrice - b.salePrice) / b.normalPrice
          if (this.sortOrder === 'asc') {
            return discountA - discountB
          } else {
            return discountB - discountA
          }
        })
      } else if (this.sortOption === 'rating') {
        if (this.sortOrder === 'asc') {
          this.freebies.sort((a, b) => a.rating - b.rating)
        } else {
          this.freebies.sort((a, b) => b.rating - a.rating)
        }
      }
    }
  },
  computed: {
    ...mapState(useAppStore, ['freebies', 'hasMore'])
  },
  data() {
    return {
      loading: false,
      sortOption: 'discount',
      sortOrder: 'asc'
    }
  },
  created() {
    this.getFreebies()
  }
}
</script>

<style></style>
