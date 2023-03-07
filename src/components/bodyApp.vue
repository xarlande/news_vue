<template>
  {{myName}}
</template>

<script>
import {useCounterStore} from "@/stores/counter";
import {toRefs} from "vue";

export default {
  name: 'bodyApp',
  setup(){
    const store = useCounterStore()
    const { myName } = toRefs(store)

    return {
      myName
    }
  }

}
</script>

<style scoped></style>
