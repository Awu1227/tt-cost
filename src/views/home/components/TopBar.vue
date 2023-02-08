<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import PopMonth from './PopMonth.vue'
import PopCostTypes from './PopCostTypes.vue'

const popMonthRef = ref(null)

const checkedId = ref(null)
const popMonthVisible = ref(false)
const popCostTypeVisible = ref(false)
const currentTime = ref(dayjs().format('YYYY年MM月'))

const monthToggle = () => {
  popMonthVisible.value = !popMonthVisible.value
}
const costTypeToggle = (e) => {
  popCostTypeVisible.value = !popCostTypeVisible.value
  if (typeof e === 'number') checkedId.value = e
  console.log(checkedId.value)
}
const costTypeReset = () => {
  popCostTypeVisible.value = !popCostTypeVisible.value
  checkedId.value = null
}
const selectMonth = ([year, month]) => {
  currentTime.value = `${year}年${month}月`
}

</script>

<template>
<div class="topbar">
	<div class="topbar-top">记账本</div>
	<div class="topbar-bottom">
		<div class="topbar-bottom-date" @click="monthToggle">{{ currentTime }}<i class="iconfont">&#xe6a6;</i></div>
		<div class="topbar-bottom-filter" @click="costTypeToggle"><i class="iconfont">&#xe6f1;</i>&nbsp;筛选</div>
	</div>
</div>
<PopMonth @toggle="monthToggle" @select="selectMonth" ref="popMonthRef" :show="popMonthVisible"/>
<PopCostTypes @toggle="costTypeToggle" @reset="costTypeReset" :show="popCostTypeVisible"/>
</template>

<style lang="scss" scoped>
.topbar {
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
