import { defineStore } from "pinia";
const apiUrl = "https://newsapi.org/v2";
const apiKey = "6bd4a18884a9402d81e67a053cbb9cac";

export const useNewsStore = defineStore("news", {
  state: () => ({
    newsList: [],
  }),
  actions: {
    getNews(country = "ua", query = "") {
      if (query) {
        this.getNewsFetch(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`);
      } else {
        this.getNewsFetch(
          `${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`
        );
      }
    },
    getNewsFetch(query) {
      fetch(query)
        .then((r) => r.json())
        .then((data) => {
          this.newsList = [];
          const newsData = data.articles;
          for (const item of newsData) {
            this.destructObj(item);
          }
        });
    },
    destructObj(obj) {
      const { title, url, urlToImage, publishedAt, description } = obj;
      let [data, timeNoFormat] = publishedAt.split("T");
      const time = timeNoFormat.slice(0, -1);
      this.newsList.push({ title, url, urlToImage, data, time, description });
    },
  },
  getters: {},
});
