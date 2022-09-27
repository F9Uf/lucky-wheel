<template>
  <div class="w-[500px] h-[500px] bg-neutral-700 rounded-full relative">
    <div :class="`w-[470px] h-[470px] bg-neutral-600 rounded-full ${positionCenterStyle} overflow-hidden`">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="`
          overflow-hidden absolute w-[50%] h-[50%]
          top-0 right-0
          ${calculateItemBg(index)}
        `"
        :style="{
          transform: `
            rotate(${degreePerItem * index}deg)
            skewY(${-(90 - degreePerItem)}deg)
          `,
          transformOrigin: '0% 100%'
        }"
      >
        <div
          class="absolute -left-full w-[200%] h-[200%] text-center pt-5"
          :style="{
            transform: `skewY(${90 - degreePerItem}deg) rotate(${degreePerItem / 2}deg)`
          }"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
    <div :class="`bg-neutral-100 w-8 h-8 rounded-full ${positionCenterStyle}`">
      <div :class="`bg-neutral-700 w-2 h-2 rounded-full ${positionCenterStyle}`"></div>
    </div>
    <Pin />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import Pin from './Pin.vue';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<string[]>,
      default: () => [],
    }
  },
  components: {
    Pin
  },
  setup(props) {
    const positionCenterStyle = computed((): string => "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2")
    const degreePerItem = computed((): number => 360 / props.items.length)

    const calculateItemBg = (index: number): string => {
      const bgColors = [
        'bg-violet-200', 'bg-violet-600', 'bg-violet-400', 'bg-violet-800', 'bg-violet-500', 'bg-violet-700'
      ]

      const bgIndex = index % bgColors.length;

      return bgColors[bgIndex]
    }

    return {
      positionCenterStyle,
      degreePerItem,
      calculateItemBg,
    }
  }
})
</script>
