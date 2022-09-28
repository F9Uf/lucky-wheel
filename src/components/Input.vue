<template>
  <input
    type="text"
    class="text-gray-200 py-2 px-4 rounded-sm border-solid border-neutral-200 outline-none bg-neutral-600 w-full"
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
