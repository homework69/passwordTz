<template>
  <div class="service-list__item">
    <h3 class="service-list__title">
      {{ item.title }}
    </h3>
    <ul class="service-list__password">
      <li
        v-for="(item, index) in item.password"
        :key="index"
        class="service-list__li"
      >
        <div class="service-list__side">
          {{ item }}
          <div class="service-list__btns">
            <button @click="delPassword(index)">
              <img src="@/assets/images/del.svg" alt="" />
            </button>
            <button @click="copyToClipboard(item)">
              <img src="@/assets/images/copy.svg" alt="" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(['item']);

const copyToClipboard = (item) => {
 try {
  navigator.clipboard.writeText(item)
 } catch (error) {
  throw(error)
 }
}

const delPassword = (index) => {
  props.item.password.splice(index, 1 )
} 
</script>

<style lang="scss" scoped></style>
