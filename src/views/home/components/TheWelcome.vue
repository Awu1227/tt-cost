<script setup>
import { ref, onMounted, watch } from 'vue'
import dayjs from 'dayjs'
import iconEnum from 'utils/typeEnum'
import { useDateStore } from 'stores/dateStore'
import { getBillList } from '../api/index'
import PopRecords from './PopRecords.vue'

const loading = ref(false)
const billList = ref([])

const popRecordVisible = ref(false)
const togglePopRecordVisible = () => {
  popRecordVisible.value = !popRecordVisible.value
}

const onRefresh = () => {
  getList()
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const store = useDateStore()

watch([() => store.date, () => store.typeId], () => {
  getList()
})

onMounted(() => {
  getList()
})
const calucatorSum = (arr, type) => {
  return arr.filter(el => el.pay_type === type).reduce((prev, cur) => { return parseFloat(prev) + parseFloat(cur?.amount) }, 0)
}
const getList = async () => {
  const date = store.date.replace('年', '-').replace('月', '')
  const params = {
    date,
    type_id: store.typeId,
    page: 1,
    page_size: 5
  }
  const res = await getBillList(params)
  const list = res.data.list.map(item => {
    const date = item.date
    item.date = dayjs(date).format('M月D日')
    return item
  })
  billList.value = list
}

</script>

<template>
	<van-pull-refresh v-model="loading" @refresh="onRefresh" class="main" success-text="刷新成功">
	<div class="list-card" v-for="item in billList" :key="item.date">
		<div class="list-card-topbar">
			<div class="list-card-date">{{ item.date }}</div>
			<div class="list-card-type">
				<span>支 {{ calucatorSum(item.bills, 1).toFixed(2) }}</span>&nbsp;
				<span>收 {{ calucatorSum(item.bills, 2).toFixed(2)}}</span>
			</div>
		</div>
		<div class="list-card-detail" v-for="detail in item.bills" :key="detail.id" >
			<div class="list-card-detail-desc">
				<div class="iconfont-wrap">
					<i class="iconfont" :class="iconEnum[detail.type_id].icon"></i>
				</div>
				<span>{{ detail.type_name }}</span>
			</div>
			<span >
				<van-icon name="minus" v-show="detail.pay_type === 1" size="small"/>
				<van-icon name="plus" v-show="detail.pay_type === 2" size="small"/>
				{{ detail.amount }}
			</span>
		</div>
	</div>
 <span class="records" @click="togglePopRecordVisible">
	<van-icon name="records" size="20"/>
 </span>
<PopRecords @toggle="togglePopRecordVisible" :show="popRecordVisible"/>
	</van-pull-refresh>
</template>

<style lang="scss" scoped>
.main {
	// height: 100px;
	padding: 0 20px;
	.list-card {
		border-radius: 8px;
		background-color: #fff;
		margin-top: 20px;
		padding: 10px;
		&-topbar {
			display: flex;
			justify-content: space-between;
			height: 30px;
			color: grey;
		}
		&-detail {
			height: 40px;
			margin-bottom: 10px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&-desc {
				display: flex;
				align-items: center;
				line-height: 40px;
				.iconfont-wrap {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30px;
					height: 30px;
					border-radius: 50%;
					background-color: #AD8B73;
					color: #fff;
					.iconfont {
						height: 40px;
						font-size: 20px;
					}
      }
				span {
					margin-left: 10px;
				}
			}
		}
	}
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
