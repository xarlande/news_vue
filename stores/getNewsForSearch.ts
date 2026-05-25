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
      loadingNews.value = false;
    }
  };

  const getNewsFetch = async (url: string, params: Record<string, string>) => {
    try {
      const data = await $fetch<NewsResponse>(url, { params });

      if (data.status === "ok") {
        const dateFormatter = new Intl.DateTimeFormat("uk-UA", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        const timeFormatter = new Intl.DateTimeFormat("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
        });

        newsList.value = data.articles.map((item) => {
          const dateObj = new Date(item.publishedAt);
          return {
            title: item.title,
            url: item.url,
            urlToImage: item.urlToImage,
            description: item.description,
            data: dateFormatter.format(dateObj),
            time: timeFormatter.format(dateObj),
          };
        });
      }
    } catch (error) {
      console.error(`Fetch error:`, error);
    }
  };

  return { newsList, loadingNews, requestStoreSearch, getNews };
});
