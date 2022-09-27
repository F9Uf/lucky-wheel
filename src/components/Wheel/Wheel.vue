<template>
  <div class="w-[500px] h-[500px] bg-neutral-700 rounded-full relative">
    <div
      :class="`w-[470px] h-[470px] bg-neutral-600 absolute top-1/2 left-1/2 rounded-full overflow-hidden easing-ease`"
      :style="{
        transform: `translate(-50%,-50%) rotate(${startDegree}deg)`,
        transitionDuration: `${duration}s`
      }"
    >
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
    <Pin />
    <Spin
      :is-spinning="isSpinning"
      @spin="handleSpinClick"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'

import Pin from './Pin.vue'
import Spin from './Spin.vue'

import { delayInSecond } from '../../utils/time';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    duration: {
      type: Number,
      default: 5,
    }
  },
  components: {
    Pin,
    Spin
  },
  setup(props) {
    const positionCenterStyle = computed((): string => 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2')
    const degreePerItem = computed((): number => 360 / props.items.length)
    const currentItemIndex = ref<number>(0);
    const isSpinning = ref<boolean>(false);
    const startDegree = ref<number>(-1 * currentItemIndex.value * degreePerItem.value - degreePerItem.value / 2)

    const calculateItemBg = (index: number): string => {
      const bgColors = [
        'bg-violet-200', 'bg-violet-600', 'bg-violet-400', 'bg-violet-800', 'bg-violet-500', 'bg-violet-700'
      ]

      const bgIndex = index % bgColors.length;

      return bgColors[bgIndex]
    }

    const handleSpinClick = async () => {
      if (isSpinning.value) return

      isSpinning.value = true

      const previousCurrentItemIndex = currentItemIndex.value
      currentItemIndex.value = Math.floor(Math.random() * props.items.length + 1)
      startDegree.value += 360 * 2 - ((currentItemIndex.value - previousCurrentItemIndex) * degreePerItem.value)

      await delayInSecond(props.duration)

      isSpinning.value = false
    }

    return {
      positionCenterStyle,
      degreePerItem,
      startDegree,
      isSpinning,
      currentItemIndex,
      calculateItemBg,
      handleSpinClick,
    }
  }
})
</script>

<style scoped>
.easing-ease {
  transition: transform cubic-bezier(0.65, 0, 0.35, 1);
}
</style>
