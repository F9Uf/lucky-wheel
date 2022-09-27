<template>
  <div :class="`
  bg-neutral-100 w-16 h-16 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  text-gray-800 text-center flex flex-col justify-center cursor-pointer drop-shadow-xl
    transition-all duration-200
    ${isSpinning ? 'cursor-progress bg-neutral-300 mt-1' : 'active:mt-1 hover:bg-neutral-200'}
  `"
    @click="$emit('spin')"
  >
    <div>
      SPIN
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['spin'],
  props: {
    isSpinning: {
      type: Boolean,
      default: false,
    }
  }
})
</script>
