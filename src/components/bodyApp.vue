<template>
  <div class="max-w-3xl mx-auto">
    <div
      class="border bg-amber-500 rounded-2xl inline-block p-2 cursor-pointer"
      @click="getNews('us')"
    >
      click me sempai
    </div>
    <div v-for="(item, idx) in newsList" :key="idx">
      <div class="border my-2 flex flex-col p-2">
        {{ item.title }}
        <div class="flex justify-end mr-3">
          <a v-bind:href="item.url" class="inline-block hover:text-amber-500 active:text-amber-600"
            >Link</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter'
import { toRefs } from 'vue'

export default {
  name: 'bodyApp',
  setup() {
    const store = useCounterStore()
    const { newsList, getNews } = toRefs(store)

    return {
      newsList,
      getNews
    }
  },
  methods: {

  },
  mounted() {
    this.getNews()
  }
}
</script>

<style scoped></style>
