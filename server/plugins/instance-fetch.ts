import { ofetch } from 'ofetch'

export default defineNitroPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const configureFetch = () => {
        globalThis.$instanceFetch = ofetch.create({
            baseURL: config.public.baseUrl,
        })
    }

    configureFetch()
})
