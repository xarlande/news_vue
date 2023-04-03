<template>
  <div class="flex justify-center my-3">
    <div
      class="relative flex justify-center flex-col border rounded border-gray-300 p-2 gap-2 shadow-md"
    >
      <div class="w-72 flex flex-col">
        <Listbox v-model="selectedCountry">
          <ListboxButton class="border rounded border-gray-300"
            >{{ dropDownName }}
          </ListboxButton>
          <ListboxOptions
            class="border rounded border-gray-300 my-1 absolute top-1 inset-x-2"
          >
            <ListboxOption
              v-for="person in country"
              :key="person.id"
              :value="person"
              class="cursor-pointer text-center hover:bg-blue-400 hover:text-white"
            >
              {{ person.name }}
            </ListboxOption>
          </ListboxOptions>
        </Listbox>
        <input
          type="text"
          placeholder="Пошук..."
          class="border rounded border-gray-300 text-center my-1"
          v-model="searchInput"
          @keyup.enter="getNews(selectedCountry.value, searchInput)"
        />
      </div>

      <div class="flex justify-end">
        <button
          class="global_button"
          @click="getNews(selectedCountry.value, searchInput)"
        >
          Пошук
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { useNewsStore } from "@/stores/getNews";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

export default {
  name: "searchNews",
  components: {
    ListboxOptions,
    ListboxOption,
    ListboxButton,
    Listbox,
  },
  setup() {
    const store = useNewsStore();
    const { getNews, newsList, loadingNews } = toRefs(store);

    return {
      getNews,
      newsList,
      loadingNews,
    };
  },
  data: () => ({
    searchInput: "",
    country: [
      { id: 1, name: "Україна", value: "ua" },
      { id: 2, name: "США", value: "us" },
      { id: 3, name: "Німеччина", value: "de" },
      { id: 4, name: "Польща", value: "pl" },
    ],
    selectedCountry: {},
  }),
  computed: {
    dropDownName() {
      return Object.keys(this.selectedCountry).length === 0
        ? "Виберіть країну"
        : `Ви обрали країну: ${this.selectedCountry.name}`;
    },
  },
  watch: {
    newsList() {
      this.searchInput = "";
      this.selectedCountry = {};
    },
    selectedCountry() {
      setTimeout(() => {
        this.getNews(this.selectedCountry.value);
      }, 300);
    },
  },
};
</script>

<style scoped></style>
