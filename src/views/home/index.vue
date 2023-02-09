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
  overflow: hidden;
  height: 100%;
  padding-top: 80px;
  padding-bottom: 30px;
}
</style>
