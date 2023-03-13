<template>
  <nav class="flex justify-center my-3">
    <div class="relative flex justify-center flex-col border p-2 gap-2">
      <div class="w-72 flex flex-col">
        <Listbox v-model="selectedPerson">
          <ListboxButton class="border">{{ dropDownName }} </ListboxButton>
          <ListboxOptions class="border my-1 absolute bg-white top-1 inset-x-2">
            <ListboxOption
              v-for="person in country"
              :key="person.id"
              :value="person"
              class="cursor-pointer text-center hover:bg-amber-500"
            >
              {{ person.name }}
            </ListboxOption>
          </ListboxOptions>
        </Listbox>
        <input
          type="text"
          placeholder="Пошук..."
          class="border text-center my-1"
          v-model="searchInput"
          @keyup.enter="getNews(selectedPerson.value, searchInput)"
        />
      </div>

      <div class="flex justify-end">
        <div
          class="global_button"
          @click="getNews(selectedPerson.value, searchInput)"
        >
          Пошук
        </div>
      </div>
    </div>
  </nav>
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
    const { getNews, newsList } = toRefs(store);

    return {
      getNews,
      newsList,
    };
  },
  data: () => ({
    searchInput: "",
    country: [
      { id: 1, name: "Україна", value: "ua" },
      { id: 2, name: "США", value: "us" },
    ],
    selectedPerson: {},
  }),
  computed: {
    dropDownName() {
      return Object.keys(this.selectedPerson).length === 0
        ? "Виберіть країну"
        : `Ви обрали країну: ${this.selectedPerson.name}`;
    },
  },
  watch: {
    newsList() {
      this.searchInput = "";
      this.selectedPerson = {};
    },
  },
};
</script>

<style scoped></style>
