<template>
  <div
    class="text-white text-center my-6 text-5xl"
  >
    <span class=" text-violet-400 p-0 m-0">L</span>ucky <span class=" text-violet-400 p-0 m-0">W</span>heel
    <span class=" text-violet-200 p-0 m-0">!</span>
  </div>
  <div class="text-white flex flex-col items-center my-6 overflow-x-hidden">
    <Wheel
      class="my-7"
      :items="items"
      @spinned="handleSpinned"
    />
    <div class="
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 gap-y-8 w-full
      px-4 md:px-10 lg:px-16 mt-16
    ">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex justify-between"
      >
        <Input v-model="items[index]" />
        <Close
          class="ml-2"
          :disabled="shouldDisableCloseButton"
          @click="removeItem(index)"
        />
      </div>
    </div>
    <div class="text-center mt-8">
      <Button @click="addItem">Add</Button>
    </div>
  </div>
  <Modal
    v-if="showModal"
    @close="handleCloseModal"
  >
    <div>
      <span class="mr-2 text-xl">
        {{ winner }} !
      </span>
      🥳🎉🎉
    </div>
    <div class="mt-12">
      <Button
        v-if="!shouldDisableCloseButton"
        class="mr-4"
        @click="handleRemoveItemOnModal"
      >
        Remove this item
      </Button>
      <Button @click="onCloseModal" outline>Close</Button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import Wheel from './components/Wheel';
import Input from './components/Input.vue';
import Close from './components/Close.vue';
import Button from './components/Button.vue';
import Modal from './components/Modal.vue';

const MINIMUM_ITEM = 1

export default defineComponent({
  components: {
    Wheel,
    Input,
    Close,
    Button,
    Modal,
  },
  setup() {
    const items = ref<string[]>(['name1', 'name2', 'name3'])
    const shouldDisableCloseButton = computed((): boolean => items.value.length <= MINIMUM_ITEM)
    const showModal = ref<boolean>(false);
    const winnerIndex = ref<number>(0);
    const winner = ref<string>('');

    const addItem = () => {
      items.value.push('')
    }

    const removeItem = (index: number) => {
      if (items.value.length <= MINIMUM_ITEM) return
      items.value.splice(index, 1)
    }

    const handleSpinned = (randomIndex: number) => {
      const itemsLength = items.value.length; // Total items
      const isFirstItem = randomIndex === itemsLength; // If randomIndex === itemsLength then the winning item is the first one in the items array
      winner.value = isFirstItem ? items.value[0] : items.value[randomIndex];
      winnerIndex.value = isFirstItem ? 0 : randomIndex;
      showModal.value = true
    }

    const handleCloseModal = () => {
      showModal.value = false
    }

    const onCloseModal = () => {
      showModal.value = false
    }

    const handleRemoveItemOnModal = () => {
      removeItem(winnerIndex.value)
      showModal.value = false
    }

    return {
      items,
      shouldDisableCloseButton,
      showModal,
      winner,
      addItem,
      removeItem,
      handleSpinned,
      handleCloseModal,
      onCloseModal,
      handleRemoveItemOnModal,
    }
  },
})
</script>

