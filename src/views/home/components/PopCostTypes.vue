<template>
<van-popup
  id="my-popup"
  :show="props.show"
  round
  position="bottom"
  :style="{ height: '54%'}"
	@click-overlay="onClickOverlay"
>
<div class="pop">

<div class="popup-topbar">
  <span @click="onClickOverlay">
    <van-icon name="arrow-left" />筛选
  </span>
  <span @click="onClickReset">
    <van-icon name="replay" />重置
  </span>

</div>
<div class="popup-content" @click="handleTypeClick">
  <div class="popup-content-title">支出分类</div>
  <div class="popup-content-expenditure-box">
    <div v-for="item in expenditureList" :key="item.id" :class="{active: store.typeId === item.id}">{{ item.name }}</div>
  </div>
  <div class="popup-content-title">收入分类</div>
  <div class="popup-content-income-box">
    <div v-for="item in incomeList" :key="item.id">{{ item.name }}</div>
  </div>
</div>
</div>
</van-popup>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useDateStore } from 'stores/dateStore'
import { getTypeList } from '../api/index'
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['toggle', 'reset'])
const store = useDateStore()
const expenditureList = ref([])
const incomeList = ref([])
onMounted(async () => {
  const { data: { list } } = await getTypeList()
  expenditureList.value = list.slice(0, 10)
  incomeList.value = list.slice(10)
})

const onClickOverlay = (e) => {
  emits('toggle', e)
}
const onClickReset = () => {
  emits('reset')
}
const handleTypeClick = e => {
  const name = e.target.innerText
  const id = expenditureList.value.concat(incomeList.value).find(el => el.name === name).id
  onClickOverlay(id)
}
</script>

<style lang="scss" scoped>

.popup-topbar {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  background-color: #fff;
}
.popup-content {
  padding: 0 10px;
  &-title {
    height: 30px;
    line-height: 30px;
    color: rgb(128, 114, 114);
  }
  &-expenditure-box, &-income-box {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin: 10px;
      border-radius: 4px;
      background-color: #f5f5f5;
    }
    .active {
      background-color: #AD8B73;
    }
  }
}
</style>
