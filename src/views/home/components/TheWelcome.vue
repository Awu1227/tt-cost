<script setup>
import { ref } from 'vue'
import PopRecords from './PopRecords.vue'

const popRecordVisible = ref(false)
const togglePopRecordVisible = () => {
  popRecordVisible.value = !popRecordVisible.value
}

</script>

<template>
	<main>
 欢迎来到天天-记账
 <span class="records" @click="togglePopRecordVisible">
	<van-icon name="records" size="20"/>
 </span>
<PopRecords @toggle="togglePopRecordVisible" :show="popRecordVisible"/>
	</main>
</template>

<style lang="scss" scoped>
main {
	height: 100px;
	.records {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 100px;
		right: 40px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #AD8B73;
		color: #fff;
		box-shadow: 0 0 0.26667rem 0 rgb(0 0 0 / 20%);
	}
}
</style>
