<template>
  <div class="wrapper">
    <Navbar @setSearch="filterSearch"/>
    <main>
      <Service :filterServices="filterServices"/>
   
    </main>
    <Modal
    v-show="isModalOpen"
    :isModal="isModal"
    />
    <button class="add-service" @click="(isModalOpen = true), (edit = false)">
      <img src="@/assets/images/edit.svg" alt="" />
    </button>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Service from '@/components/service/Service.vue';
import Modal from '@/components/Modal.vue';
import { ref, computed } from 'vue';

import { useService } from '@/store/serviceItem.js'
const store = useService()
const service = store.service 


const searchService = ref('')
const isModalOpen = ref(false);
const edit = ref(false);

const filterSearch = (val) => {
  searchService.value = val
}

const filterServices = computed(() => {
  return searchService.value ? store.service.filter(el => el.title.toLowerCase().includes(searchService.value.toLowerCase())) : store.service
})

const isModal = (value) => {
  isModalOpen.value = value
}
</script>

<style lang="scss" scoped>
.add-service {
  border-radius: 16px;
  background: black;
  width: 56px;
  height: 56px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
    0px 4px 8px 3px rgba(0, 0, 0, 0.15);
    & img{
      width: auto;
      height: auto;
    }
}
</style>
