export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()

    const query = getQuery(event)

    const country = query.country
    const category = query.category


    const resp = await $instanceFetch('/top-headlines', {
        params: {
            apiKey: runtimeConfig.public.apiKey,
            country,
            category
        }
    })

    return resp
})