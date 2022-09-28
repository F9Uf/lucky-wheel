<template>
  <button
    :class="`
      py-3 px-6
      rounded-2xl transition-all
      active:top-[2px]  relative
      ${
        outline ?
          'text-violet-600 border border-solid border-violet-600 hover:bg-violet-100 active:bg-violet-300' :
          'bg-violet-600 hover:bg-violet-400 active:bg-violet-800 text-white'
      }
    `"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    outline: {
      type: Boolean,
      default: false,
    }
  }
})
</script>

