<template>
  <header class="header">
    <nav class="header__nav">
      <h1 class="header__nav-title">Password Manager</h1>
      <input
        v-if="clickSearch"
        placeholder="Поиск"
        class="header__nav-input"
        type="text"
        v-model="search"
      />
      <button
        v-if="clickSearch"
        @click="(clickSearch = false), (search = '')"
        class="header__nav-search"
      >
        <img src="@/assets/images/clear.svg" alt="" />
      </button>
      <button v-else @click="clickSearch = true" class="header__nav-search">
        <img src="@/assets/images/icon.svg" alt="" />
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
const search = ref('');
const clickSearch = ref(false);
const emit = defineEmits(['setSearch', 'neVal']);

watch(search, (newVal) => {
  emit('setSearch', newVal);
});
</script>

<style lang="scss" scoped>
.header {
  padding: 0 20px;
  background: #f3edf7;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82px;
    &-input {
      border: 1px solid rgb(117, 113, 113);
      outline: none;
      width: 80%;
      padding: 10px;
      border-radius: 15px;
      background: transparent;
      color: black;
      font-size: 16px;
      line-height: 20px;
    }
    &-lang {
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
    }

    &-title {
      font-size: 22px;
      line-height: 28px;
    }
  }
}
</style>
