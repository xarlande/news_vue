const apiUrl = "https://newsapi.org/v2";
const apiKey = "6bd4a18884a9402d81e67a053cbb9cac";

export const useNewsStore = defineStore("StoreForSearch", () => {
  const newsList = ref([]);
  const requestStoreSearch = ref({});
  const loadingNews = ref(false);

  const getNews = (country, query) => {
    if (query) {
      getNewsFetch(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`).then(
        (item) => {
          requestStoreSearch.value = { query };
        }
      );
    } else if (country) {
      getNewsFetch(
        `${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`
      ).then((item) => {
        requestStoreSearch.value = { country };
      });
    }
  };
  const getNewsFetch = async (query) => {
    if (query) {
      fetch(query)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            loadingNews.value = true;
            newsList.value = [];
            const newsData = data.articles;
            for (const item of newsData) {
              destructObj(item);
            }
            setTimeout(() => {
              loadingNews.value = false;
            }, 1000);
          }
        })
        .catch((data) => console.log(`error ${data}`));
    }
  };
  const destructObj = (obj) => {
    const { title, url, urlToImage, publishedAt, description } = obj;
    let [data, timeNoFormat] = publishedAt.split("T");
    const time = timeNoFormat.slice(0, -1);
    newsList.value.push({ title, url, urlToImage, data, time, description });
  };

  return { newsList, loadingNews, requestStoreSearch, getNews };
});
