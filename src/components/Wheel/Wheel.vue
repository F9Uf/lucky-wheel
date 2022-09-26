<template>
  <div class="w-[500px] h-[500px] bg-neutral-700 rounded-full relative">
    <div :class="`w-[470px] h-[470px] bg-neutral-600 rounded-full ${positionCenterStyle} overflow-hidden`">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="`item absolute left-1/2 ${calculateItemBg(index)}`"
        :style="{'transform': calculateItemTransform(index)}"
      >
        <div
          class="absolute w-[10%] h-[50%] left-[60px] text-center"
          :style="{'transform': calculateItemContentTransform(index)}"
        >
          {{ item }}
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

    const calculateItemTransform = (index: number): string => {
      const degree = degreePerItem.value * index

      return `rotate(${degree}deg) skewY(${-(90 - degreePerItem.value)}deg)`
    }

    const calculateItemBg = (index: number): string => {
      const bgColors = [
        'bg-violet-200', 'bg-violet-600', 'bg-violet-400', 'bg-violet-800', 'bg-violet-500', 'bg-violet-700'
      ]

      const bgIndex = index % bgColors.length;

      return bgColors[bgIndex]
    }

    const calculateItemContentTransform = (index: number): string => {
      return `skewY(${90 - degreePerItem.value}deg) rotate(295deg)`
    }

    return {
      positionCenterStyle,
      degreePerItem,
      calculateItemTransform,
      calculateItemBg,
      calculateItemContentTransform,
    }
  }
})
</script>

<style scoped>
.item {
  height: 50%;
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	font-family: monospace;
	font-weight: 1000;
	writing-mode: vertical-rl;
  transform-origin: 0% 100%;
}
</style>
