<script setup>
import BillList from './components/BillList.vue'
import TopBar from './components/TopBar.vue'
</script>

<template>
  <main>
    <TopBar/>
    <BillList />
  </main>
</template>
<style scoped lang="scss">
main {
  height: 100%;
}
</style>
