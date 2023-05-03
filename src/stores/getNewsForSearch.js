import { defineStore } from "pinia";
const apiUrl = "https://newsapi.org/v2";
const apiKey = "6bd4a18884a9402d81e67a053cbb9cac";

export const useNewsStore = defineStore("StoreForSearch", {
  state: () => ({
    newsList: [],
    requestStoreSearch: {},
    loadingNews: false,
  }),
  actions: {
    getNews(country, query) {
      if (query) {
        this.requestStoreSearch = { query };
        this.getNewsFetch(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`);
        return;
      }
      if (country) {
        this.requestStoreSearch = { country };
        this.getNewsFetch(
          `${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`
        );
      }
    },
    getNewsFetch(query) {
      if (query) {
        fetch(query, { method: "GET" })
          .then((r) => r.json())
          .then((data) => {
            if (data.status === "ok") {
              this.loadingNews = true;
              this.newsList = [];
              const newsData = data.articles;
              for (const item of newsData) {
                this.destructObj(item);
              }
              setTimeout(() => {
                this.loadingNews = false;
              }, 1000);
            }
          })
          .catch((data) => {
            console.log(`error ${data}`);
          });
      }
    },
    destructObj(obj) {
      const { title, url, urlToImage, publishedAt, description } = obj;
      let [data, timeNoFormat] = publishedAt.split("T");
      const time = timeNoFormat.slice(0, -1);
      this.newsList.push({ title, url, urlToImage, data, time, description });
    },
  },
});