<template>
  <div class="bg-stone-900 min-h-screen flex flex-col justify-center items-center p-8">
    <h1 class="text-4xl font-bold text-white mb-8">What meme are you today?</h1>
    <div class="w-96 h-96 flex justify-center items-center">
      <img
        class="rounded-lg shadow-lg border-2 border-gray-800 max-w-full max-h-full"
        :src="meme.url"
        alt="meme"
        style="max-width: 100%; height: auto"
      />
    </div>
    <button class="mt-8 py-2 px-4 rounded-lg shadow-md bg-gray-800 text-white" @click="getMemes">
      Generate New Meme
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAppStore } from '../stores/counter'

export default {
  methods: {
    ...mapActions(useAppStore, ['getMemes'])
  },
  computed: {
    ...mapState(useAppStore, ['meme'])
  },
  created() {
    this.getMemes()
  }
}
</script>

<style>
img {
  /* object-fit: contain; */
}
</style>
