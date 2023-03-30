<template>
  <article
    v-for="(item, idx) in newsList"
    :key="idx"
    class="border border-gray-300 rounded my-5 p-5"
  >
    <img
      v-if="item.urlToImage"
      :src="item.urlToImage"
      class="h-72 mx-auto"
      alt="image"
    />
    <div class="flex flex-col">
      <h2 class="my-3 text-center text-lg">
        {{ item.title }}
      </h2>

      <p v-if="item.description" class="my-3 text-center">
        {{ item.description }}
      </p>

      <div class="flex flex-col md:flex-row justify-between mr-3 gap-2">
        <div class="text-center cursor-default">
          <p>Час публікації: {{ item.time }}</p>
          <p>Дата публікації: {{ item.data }}</p>
        </div>
        <div>
          <a class="global_button" v-bind:href="item.url" target="_blank"
            >Посилання</a
          >
        </div>
      </div>
    </div>
  </article>
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
