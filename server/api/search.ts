export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const response = await $fetch('https://newsapi.org/v2/everything', {
    params: {
      ...query,
      apiKey: config.newsApiKey
    }
  });

  return response;
});
