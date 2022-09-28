<template>
  <div class="text-white flex flex-col items-center">
    <Wheel
      class="my-7"
      :items="items"
      @spinned="handleSpinned"
    />
    <div class="grid grid-cols-3 gap-4 gap-y-8 w-full px-16 mt-16">
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

export default defineComponent({
  components: {
    Wheel,
    Input,
    Close,
    Button,
    Modal,
  },
  setup() {
    const items = ref<string[]>(['name1', 'name2', 'name3', ''])
    const shouldDisableCloseButton = computed((): boolean => items.value.length <= 4)
    const showModal = ref<boolean>(false);
    const winnerIndex = ref<number>(0);
    const winner = ref<string>('');

    const addItem = () => {
      items.value.push('')
    }

    const removeItem = (index: number) => {
      if (items.value.length <= 4) return
      items.value.splice(index, 1)
    }

    const handleSpinned = (randomIndex: number) => {
      winner.value = items.value[randomIndex]
      winnerIndex.value = randomIndex
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

