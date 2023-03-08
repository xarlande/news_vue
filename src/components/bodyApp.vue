<template>
  <div class="border bg-amber-500 rounded-2xl inline-block p-2" @click="getNews('us')">click me sempai</div>
  1
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
    clickMe(){
      console.log('ahhhhhh')
    }
  },
  mounted() {
    this.getNews()
  }
}
</script>

<style scoped></style>
