<template>
  <div class="text-white">
    <Wheel :items="items" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Wheel from './components/Wheel';

export default defineComponent({
  components: {
    Wheel,
  },
  setup() {
    const items = ref<string[]>(['name1', 'name2', 'name3', 'name4', 'name5', 'name6', 'name7', 'name8'])

    return {
      items
    }
  },
})
</script>

