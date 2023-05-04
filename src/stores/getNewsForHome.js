import { defineStore } from "pinia";
import { ref } from "vue";
const apiUrl = "https://newsapi.org/v2";
const apiKey = "6bd4a18884a9402d81e67a053cbb9cac";

export const useNewsHomePage = defineStore("StoreForHome", () => {
  const newsPopular = ref([]);
  const newsBusiness = ref([]);
  const newsSport = ref([]);
  const newsTechnology = ref([]);

  const getAllNews = () => {
    getNews("technology", newsTechnology);
    getNews("business", newsBusiness);
    getNews("sport", newsSport);
    getNews("", newsPopular);
  };
  const getNews = (categoryNews, stateKey) => {
    fetch(
      `${apiUrl}/top-headlines?country=ua&category=${categoryNews}&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          stateKey.value = data.articles;
        }
      })
      .catch((data) => {
        console.log(`error ${data}`);
      });
  };

  return { newsPopular, newsBusiness, newsSport, newsTechnology, getAllNews };
});
