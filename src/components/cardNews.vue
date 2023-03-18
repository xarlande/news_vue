<template>
  <div
    v-for="(item, idx) in newsList"
    :key="idx"
    class="border border-gray-300 rounded my-5 flex p-5 flex-col"
  >
    <img
      v-if="item.urlToImage"
      :src="item.urlToImage"
      class="h-72 mx-auto"
      alt="image"
    />
    <div class="flex flex-col">
      <div class="my-3 text-center text-lg">
        {{ item.title }}
      </div>

      <div v-if="item.description" class="my-3 text-center">
        {{ item.description }}
      </div>

      <div class="flex flex-col md:flex-row justify-between mr-3 gap-2">
        <div class="text-center cursor-default">
          <div>Час публікації: {{ item.time }}</div>
          <div>Дата публікації: {{ item.data }}</div>
        </div>
        <div class="flex justify-end">
          <a class="global_button" v-bind:href="item.url" target="_blank"
            >Посилання</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/getNews";
import { toRefs } from "vue";

export default {
  name: "cardNews",
  setup() {
    const store = useNewsStore();
    const { newsList } = toRefs(store);

    return {
      newsList,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
