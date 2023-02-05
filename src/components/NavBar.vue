<template>
	<van-tabbar v-model="active" active-color="#AD8B73">
		<van-tabbar-item icon="home-o" @click="routerPush('/home')">首页</van-tabbar-item>
		<van-tabbar-item icon="bar-chart-o" @click="routerPush('/data')">统计</van-tabbar-item>
		<van-tabbar-item icon="manager-o" @click="routerPush('/user')">我的</van-tabbar-item>
	</van-tabbar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const active = ref(0)
const router = useRouter()
const routerPush = path => {
  router.push(path)
}
</script>

<style lang="scss" scoped>

</style>
