<script setup>
import NavBar from './components/NavBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const menu = ['/home', '/cost-statistics', '/user-info']
const show = ref(false)

const router = useRouter()
router.afterEach(() => {
  show.value = menu.includes(router.currentRoute.value.path)
})
</script>

<template>
<router-view></router-view>
<NavBar v-if="show"/>
</template>

<style scoped>
</style>
