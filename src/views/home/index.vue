<script setup>
import TheWelcome from './components/TheWelcome.vue'
import TopBar from './components/TopBar.vue'
</script>

<template>
  <main>
    <TopBar/>
    <TheWelcome />
  </main>
</template>
<style scoped lang="scss">
main {
  height: 100%;
}
</style>
