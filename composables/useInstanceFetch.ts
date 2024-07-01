import type { UseFetchOptions } from '#app'

export async function useInstanceFetch<T>(
    url: string | (() => string),
    options: UseFetchOptions<T> = {},
) {
    return useFetch(url, {
        ...options,
        $fetch: $instanceFetch,
    })
}
