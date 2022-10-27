<template>
  <input
    type="text"
    class="
      py-0 px-2 h-8 md:py-2 md:px-4 md:h-10
      text-gray-200 rounded-sm border-solid border-neutral-200 outline-none bg-neutral-600 w-full
    "
    :value="modelValue"
    @input="onInputChange($event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits:['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  setup(_, context) {
    const onInputChange = (event: Event) => {
      context.emit('update:modelValue', (event.target as HTMLInputElement).value)
    }

    return {
      onInputChange
    }
  }
})
</script>
