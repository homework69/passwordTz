<template>
    <section class="service">
        <div class="container">
           <h2 class="service__title">
            All service
           </h2>
           <div class="service-list">
            <serviceItem 
            v-for="(item,index) in filterServices"
            :key="index"
            :item="item"
            />
           </div>
       
        </div>
    </section>
</template>

<script setup>
import serviceItem from './ServiceItem.vue';
import { useService } from '@/store/serviceItem.js'
const props = defineProps(['filterServices'])

const store = useService()
const service = store.service 






</script>

<style lang="scss" scoped>

</style>