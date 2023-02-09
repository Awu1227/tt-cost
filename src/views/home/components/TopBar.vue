<script setup>
import { ref } from 'vue'
import { useDateStore } from 'stores/dateStore'
import PopMonth from './PopMonth.vue'
import PopCostTypes from './PopCostTypes.vue'

const popMonthRef = ref(null)

const popMonthVisible = ref(false)
const popCostTypeVisible = ref(false)
const store = useDateStore()

const monthToggle = () => {
  popMonthVisible.value = !popMonthVisible.value
}
const costTypeToggle = (e) => {
  popCostTypeVisible.value = !popCostTypeVisible.value
  if (typeof e === 'number') {
    store.$patch({ typeId: e })
  }
}
const costTypeReset = () => {
  popCostTypeVisible.value = !popCostTypeVisible.value
  store.$patch({ typeId: 'all' })
}
const selectMonth = ([year, month]) => {
  // currentTime.value = `${year}年${month}月`
  store.$patch({ date: `${year}年${month}月` })
}

</script>

<template>
<div class="topbar">
	<div class="topbar-top">记账本</div>
	<div class="topbar-bottom">
		<div class="topbar-bottom-date" @click="monthToggle">{{ store.date }}<i class="iconfont">&#xe6a6;</i></div>
		<div class="topbar-bottom-filter" @click="costTypeToggle"><i class="iconfont">&#xe6f1;</i>&nbsp;筛选</div>
	</div>
</div>
<PopMonth @toggle="monthToggle" @select="selectMonth" ref="popMonthRef" :show="popMonthVisible"/>
<PopCostTypes @toggle="costTypeToggle" @reset="costTypeReset" :show="popCostTypeVisible"/>
</template>

<style lang="scss" scoped>
.topbar {
	position: fixed;
	top: 0;
	width: 100%;
	height: 80px;
	padding: 10px 10px 0;
	color: #fff;
	background-color: #AD8B73;
	&-top {
		height: 30px;
		font-size: large;
		font-weight: 800;
	}
	&-bottom {
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
