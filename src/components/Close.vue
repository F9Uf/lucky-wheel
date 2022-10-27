<template>
  <div
    :class="`
      w-[37.5px] h-[32px] sm:w-[34px] md:w-[45.5px] md:h-[40px]
      leading-7 md:leading-9
      bg-translate text-violet-200 rounded-full border border-violet-200 border-solid
      text-center cursor-pointer
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

