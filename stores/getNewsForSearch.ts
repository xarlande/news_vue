import { defineStore } from "pinia";

interface NewsItem {
  title: string;
  url: string;
  urlToImage: string;
  data: string;
  time: string;
  description: string;
}

interface NewsArticle {
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  description: string;
}

interface NewsResponse {
  status: string;
  articles: NewsArticle[];
}

export const useNewsStore = defineStore("StoreForSearch", () => {
  const newsList = ref<NewsItem[]>([]);
  const requestStoreSearch = ref<{ query?: string; country?: string }>({});
  const loadingNews = ref(false);

  const getNews = async (country?: string, query?: string) => {
    loadingNews.value = true;
    try {
      if (query) {
        requestStoreSearch.value = { query };
        await getNewsFetch(`/api/everything`, { q: query });
      } else if (country) {
        requestStoreSearch.value = { country };
        await getNewsFetch(`/api/top-headlines`, { country });
      }
    } finally {
      // Keep loading for at least 500ms for better UX if it was too fast
      setTimeout(() => {
        loadingNews.value = false;
      }, 500);
    }
  };

  const getNewsFetch = async (url: string, params: Record<string, string>) => {
    try {
      const data = await $fetch<NewsResponse>(url, { params });

      if (data.status === "ok") {
        newsList.value = [];
        const newsData = data.articles;
        for (const item of newsData) {
          destructObj(item);
        }
      }
    } catch (error) {
      console.error(`Fetch error:`, error);
    }
  };

  const destructObj = (obj: NewsArticle) => {
    const { title, url, urlToImage, publishedAt, description } = obj;
    const [data, timeNoFormat] = publishedAt.split("T");
    const time = timeNoFormat ? timeNoFormat.slice(0, -1) : "";
    newsList.value.push({ title, url, urlToImage, data, time, description });
  };

  return { newsList, loadingNews, requestStoreSearch, getNews };
});
