<template>
  <div
    class="backdrop w-screen h-screen absolute top-0 overflow-hidden"
    @click.self="$emit('close')"
  >
    <div class="
      bg-white min-w-[250px] w-1/3 absolute top-1/2 left-1/2
      transform -translate-x-1/2 -translate-y-1/2
      p-10 rounded-lg text-center
    ">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['close']
})
</script>


<style scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
