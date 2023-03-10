import { defineStore } from 'pinia'
const apiUrl = 'https://newsapi.org/v2'
const apiKey = '6bd4a18884a9402d81e67a053cbb9cac'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    newsList: []
  }),
  actions: {
    getNews(country = 'ua') {
      fetch(`${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`)
        .then((r) => r.json())
        .then((data) => {
          console.log(data)
          this.newsList = data.articles
        })
    }
  },
  getters: {}
})
