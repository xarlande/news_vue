export default defineCachedEventHandler(
  async (event) => {
    const runtimeConfig = useRuntimeConfig();
    const query = getQuery(event);

    if (!query.q) {
      return { status: "error", message: 'Query parameter "q" is required' };
    }

    const resp = await $instanceFetch("/everything", {
      params: {
        apiKey: runtimeConfig.apiKey,
        ...query,
      },
    });

    return resp;
  },
  {
    maxAge: 60 * 5, // 5 minutes cache for searches
    name: "everything",
    getKey: (event) => {
      const query = getQuery(event);
      return `everything-${query.q}`;
    },
  },
);
