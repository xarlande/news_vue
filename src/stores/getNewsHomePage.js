import { defineStore } from "pinia";
const apiUrl = "https://newsapi.org/v2";
const apiKey = "6bd4a18884a9402d81e67a053cbb9cac";

export const useNewsHomePage = defineStore("HomeNews", {
  state: () => ({
    newsPopular: [],
    newsBusiness: [],
    newsSport: [],
    newsTechnology: [],
  }),
  actions: {
    getAllNews() {
      this.getNewsTechnology();
      this.getNewsBusiness();
      this.getNewsSport();
      this.getNewsPopular();
    },
    getNewsTechnology() {
      fetch(
        `${apiUrl}/top-headlines?country=ua&category=technology&apiKey=${apiKey}`
      )
        .then((r) => r.json())
        .then((data) => {
          this.newsTechnology = data.articles;
          console.log(`Technology: ${data.articles}`);
        });
    },
    getNewsSport() {
      fetch(
        `${apiUrl}/top-headlines?country=ua&category=technology&apiKey=${apiKey}`
      )
        .then((r) => r.json())
        .then((data) => {
          this.newsSport = data.articles;
          console.log(`Sport: ${data.articles}`);
        });
    },
    getNewsBusiness() {
      fetch(
        `${apiUrl}/top-headlines?country=ua&category=technology&apiKey=${apiKey}`
      )
        .then((r) => r.json())
        .then((data) => {
          this.newsBusiness = data.articles;
          console.log(`Business: ${data.articles}`);
        });
    },
    getNewsPopular() {
      fetch(
        `${apiUrl}/top-headlines?country=ua&category=technology&apiKey=${apiKey}`
      )
        .then((r) => r.json())
        .then((data) => {
          this.newsPopular = data.articles;
          console.log(`Popular: ${data.articles}`);
        });
    },
  },
});
