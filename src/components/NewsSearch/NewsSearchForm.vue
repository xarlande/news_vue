<template>
  <div class="flex justify-center my-3">
    <div
      class="relative flex justify-center flex-col border rounded border-gray-300 p-2 gap-2 shadow"
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

<script setup>
import { computed, ref, toRefs, watch } from "vue";
import { useNewsStore } from "@/stores/getNewsForSearch";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

const store = useNewsStore();
const { getNews } = store;
const { newsList } = toRefs(store);

const country = [
  { id: 1, name: "Україна", value: "ua" },
  { id: 2, name: "США", value: "us" },
  { id: 3, name: "Німеччина", value: "de" },
  { id: 4, name: "Польща", value: "pl" },
];

const searchInput = ref("");
const selectedCountry = ref({});

const dropDownName = computed(() => {
  return Object.keys(selectedCountry.value).length === 0
    ? "Виберіть країну"
    : `Ви обрали країну: ${selectedCountry.value.name}`;
});

watch(newsList, () => {
  searchInput.value = "";
  selectedCountry.value = "";
});
watch(selectedCountry, () => {
  setTimeout(() => {
    getNews(selectedCountry.value.value);
  }, 300);
});
</script>

<style scoped></style>
