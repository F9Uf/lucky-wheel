<template>
  <div
    :class="`
      w-[45.5px] h-[40px] bg-translate text-violet-200 rounded-full border border-violet-200 border-solid
      text-center leading-9 cursor-pointer
      transition-all relative
      ${disabled ? 'cursor-not-allowed' : 'hover:bg-violet-200 hover:text-neutral-800 active:top-[2px]'}
    `"
  >
    ✕
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      defualt: false,
    }
  },
  setup() {

  },
})
</script>

