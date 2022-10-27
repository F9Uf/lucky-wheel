<template>
  <div
    class="
      w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px]
      text-xs md:text-sm lg:text-base
      bg-neutral-700 rounded-full relative
    "
  >
    <div
      :class="`
        w-[230px] h-[230px] md:w-[320px] md:h-[320px] lg:w-[470px] lg:h-[470px]
        bg-neutral-600 absolute top-1/2 left-1/2 rounded-full overflow-hidden easing-ease
      `"
      :style="{
        transform: `translate(-50%,-50%) rotate(${startDegree}deg)`,
        transitionDuration: `${transitionDuration}s`
      }"
    >
      <template v-if="items.length > 3">
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
      </template>
      <template v-else>
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="`
            item
            ${items.length === 3 ? 'clip-60deg' : ''}
            ${items.length === 1 ? 'h-full': 'h-1/2'}
            overflow-hidden absolute ${calculateItemBg(index)}
            top-0 left-1/2 text-center pt-10
          `"

          :style="{
            transform: `translateX(-50%) rotate(${degreePerItem * index}deg)`,
            transformOrigin: '50% 100%',
          }"
        >
          {{ item }}
        </div>
      </template>
    </div>
    <Pin />
    <Spin
      :is-spinning="isSpinning"
      @spin="handleSpinClick"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'

import Pin from './Pin.vue'
import Spin from './Spin.vue'

import { delayInSecond } from '../../utils/time';

export default defineComponent({
  emits: {
    'spinned': (_: number) => true
  },
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
  setup(props, context) {
    const positionCenterStyle = computed((): string => 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2')
    const degreePerItem = computed((): number => 360 / props.items.length)
    const currentItemIndex = ref<number>(0);
    const isSpinning = ref<boolean>(false);
    const divider = computed((): number => {
      switch (props.items.length) {
        case 1:
        case 2:
          return 0.5
        case 3:
          return 1/3
        default:
          return 2
      }
    });
    const startDegree = ref<number>(-1 * currentItemIndex.value * degreePerItem.value - degreePerItem.value / divider.value)
    const transitionDuration = ref<number>(props.duration)

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

      transitionDuration.value = props.duration

      const previousCurrentItemIndex = currentItemIndex.value
      currentItemIndex.value = Math.floor(Math.random() * props.items.length + 1)
      startDegree.value += 360 * 3 - ((currentItemIndex.value - previousCurrentItemIndex) * degreePerItem.value)

      await delayInSecond(props.duration)

      isSpinning.value = false
      context.emit('spinned', currentItemIndex.value)
    }

    watch(props.items, (items, prevItems) => {
      transitionDuration.value = 0
      startDegree.value = -1 * currentItemIndex.value * degreePerItem.value - degreePerItem.value / divider.value
    })

    return {
      positionCenterStyle,
      degreePerItem,
      startDegree,
      isSpinning,
      currentItemIndex,
      transitionDuration,
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

.item {
  width: 175%;
}

.item.clip-60deg {
  clip-path: polygon(100% 0, 0 0, 50% 100%);
}
</style>
