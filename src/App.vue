<template>
  <div class="text-white flex flex-col items-center">
    <Wheel
      class="my-7"
      :items="items"
    />
    <div class="grid grid-cols-3 gap-4 gap-y-8 w-full px-16 mt-16">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex justify-between"
      >
        <Input v-model="items[index]" />
        <Close
          class="ml-2"
          :disabled="shouldDisableCloseButton"
          @click="removeItem(index)"
        />
      </div>
    </div>
    <div class="text-center mt-8">
      <Button @click="addItem">Add</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import Wheel from './components/Wheel';
import Input from './components/Input.vue';
import Close from './components/Close.vue';
import Button from './components/Button.vue';

export default defineComponent({
  components: {
    Wheel,
    Input,
    Close,
    Button,
  },
  setup() {
    const items = ref<string[]>(['name1', 'name2', 'name3', ''])
    const shouldDisableCloseButton = computed((): boolean => items.value.length <= 4)

    const addItem = () => {
      items.value.push('')
    }

    const removeItem = (index: number) => {
      if (items.value.length <= 4) return
      items.value.splice(index, 1)
    }

    return {
      items,
      shouldDisableCloseButton,
      addItem,
      removeItem,
    }
  },
})
</script>

