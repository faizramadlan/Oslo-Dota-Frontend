import Axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useAppStore = defineStore('app', {
  state: () => ({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:4040/',
    heroList: [],
    heroDetail: [],
    meme: [],
    freebies: []
  }),
  actions: {
    handleError(error) {
      console.error(error);
      const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
      });
    },
    async getHeroes() {
      try {
        const { data } = await Axios({
          method: 'get',
          url: this.baseUrl + 'heroes'
        })
        this.heroList = data
      } catch (error) {
        this.handleError(error);
      }
    },
    async getHeroesDetail(heroname) {
      try {
        const { data } = await Axios({
          method: 'get',
          url: this.baseUrl + 'heroes/' + heroname
        })
        this.heroDetail = data
      } catch (error) {
        this.handleError(error);
      }
    },
    async getMemes() {
      try {
        const { data } = await Axios({
          method: 'get',
          url: this.baseUrl + 'memes'
        })
        this.meme = data
      } catch (error) {
        this.handleError(error);
      }
    },
    async getFreebies() {
      try {
        const { data } = await Axios({
          method: 'get',
          url: this.baseUrl + 'freebies'
        })
        this.freebies = data
      } catch (error) {
        this.handleError(error);
      }
    }
  }
})
