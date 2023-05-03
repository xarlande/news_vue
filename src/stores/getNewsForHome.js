import { defineStore } from "pinia";
const apiUrl = "https://newsapi.org/v2";
const apiKey = "6bd4a18884a9402d81e67a053cbb9cac";
export const useNewsHomePage = defineStore("StoreForHome", {
  state: () => ({
    newsPopular: [],
    newsBusiness: [],
    newsSport: [],
    newsTechnology: [],
  }),
  actions: {
    getAllNews() {
      this.getNews("technology", "newsTechnology");
      this.getNews("business", "newsBusiness");
      this.getNews("sport", "newsSport");
      this.getNews("", "newsPopular");
    },
    getNews(categoryNews, stateKey) {
      fetch(
        `${apiUrl}/top-headlines?country=ua&category=${categoryNews}&apiKey=${apiKey}`
      )
        .then((r) => r.json())
        .then((data) => {
          if (data.status === "ok") {
            this[stateKey] = data.articles;
          }
        })
        .catch((data) => {
          console.log(`error ${data}`);
        });
    },
  },
});
