<template>
<van-popup
  id="my-popup"
  round
  position="bottom"
  :style="{ height: '60%'}"
	@click-overlay="onClickOverlay"
>
<div class="pop">
  <div class="pop-topbar">
    <van-icon name="cross" size="30"/>
  </div>
  <div class="pop-checkType" @click="changePayType">
    <span :class="{active: payType === 'expense'}">支出</span>
    <span :class="{active: payType === 'income'}">收入</span>
  </div>
  <div class="pop-record-input">
    <van-field v-model="number" type="number" label="￥" size="large" label-width="10px" class="moneyInput"/>
    <hr>
  </div>
  <div class="pop-type-wrap">
    <div class="pop-type-wrap-body" v-show="payType === 'expense'">
      <div class="pop-type-wrap-body__item" v-for="item in list.slice(0,10)" :key="item.id" @click="bindCheckId(item)">
        <div class="iconfont-wrap" :class="{active: checkTypeId === item.id}">
          <i class="iconfont" :class="iconEnum[item.id].icon"></i>
        </div>
        <span class="text">{{ item.name }}</span>
      </div>
    </div>
    <div class="pop-type-wrap-body" v-show="payType === 'income'">
      <div class="pop-type-wrap-body__item" v-for="item in list.slice(10)" :key="item.id" @click="bindCheckId(item)">
        <div class="iconfont-wrap" :class="{active: checkTypeId === item.id}">
          <i class="iconfont" :class="iconEnum[item.id].icon"></i>
        </div>
        <span class="text">{{ item.name }}</span>
      </div>
    </div>
  </div>
  <div class="pop-otherInfo">
    <van-cell-group inset class="my-remarkInput">
      <van-field v-model="remark" placeholder="添加备注"  />
    </van-cell-group>
    <span class="pop-otherInfo__date" @click="toggleCalendarVisible">{{ computedDate }}</span>
  </div>
    <van-number-keyboard
    :show="show"
    :maxlength="6"
    v-model="number"
    :transition="true"
    theme="custom"
    extra-key="."
    close-button-text="完成"
    @close="onClose"
    />
</div>
<PopCalendar :show="calendarVisible" @toggle="toggleCalendarVisible"/>
</van-popup>
</template>

<script setup>
import typeEnum from 'utils/typeEnum.js'
import { getTypeList, addBill } from '../api/index'
import { ref, onMounted, computed } from 'vue'
import { showSuccessToast } from 'vant'
import dayjs from 'dayjs'
import PopCalendar from './PopCalendar.vue'
const show = ref(true)
const calendarVisible = ref(false)
const remark = ref(null)
const number = ref(null)
const checkTimeStamp = ref(null)
const checkTypeId = ref(1)
const payType = ref('expense')
const checkTypeName = ref('')
const list = ref([])
const iconEnum = ref(typeEnum)
const emits = defineEmits(['toggle'])

const computedDate = computed(() => {
  return checkTimeStamp.value ? dayjs(checkTimeStamp.value).format('M月D日') : '今天'
})
const onClickOverlay = () => {
  number.value = null
  payType.value = 'expense'
  checkTypeId.value = 1
  remark.value = ''
  checkTypeName.value = ''
  checkTimeStamp.value = null
  emits('toggle')
}
const changePayType = (e) => {
  const text = e.target.innerText
  if (text === '支出') {
    payType.value = 'expense'
    checkTypeId.value = 1
  } else {
    payType.value = 'income'
    checkTypeId.value = 11
  }
}

const onClose = async () => {
  if (!number.value) {
    showSuccessToast('请输入具体金额')
    return
  }
  const params = {
    pay_type: payType.value === 'expense' ? 1 : 2,
    type_id: checkTypeId.value,
    amount: Number(number.value).toFixed(2),
    type_name: checkTypeName.value,
    remark: remark.value,
    date: checkTimeStamp.value
  }
  const res = await addBill(params)
  if (res.code === 200) {
    onClickOverlay()
  }
}
const bindCheckId = (item) => {
  checkTypeId.value = item.id
  checkTypeName.value = item.name
}
const toggleCalendarVisible = (timeStamp) => {
  if (typeof timeStamp === 'number') {
    checkTimeStamp.value = timeStamp
  }
  calendarVisible.value = !calendarVisible.value
}
onMounted(async () => {
  const { data } = await getTypeList()
  list.value = data.list
})
</script>

<style lang="scss" scoped>
  .moneyInput {
    color: red;
    font-size: 50px;
    ::v-deep .van-cell__title{
      font-size: 50px;
    }
    ::v-deep #van-field-1-label {
      top: 18px;
      left: -20px;
    }
    ::v-deep .van-field__control{
      padding-left: 22px;
    }
  }
  .my-remarkInput {
    display: inline-block;
    width: 280px;
    ::v-deep .van-cell {
      padding: 0;
    }
    ::v-deep .van-field__control {
      background-color: #f5f5f5;
    }
  }
.pop-topbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 14px;
  height: 40px;
}
.pop-checkType {
  display: flex;
  align-items: center;
  height: 40px;
  span {
    display: inline-block;
    width: 50px;
    height: 28px;
    background-color: #f5f5f5;
    margin-left: 10px;
    text-align: center;
    line-height: 28px;
    border-radius: 4px;
  }
  .active {
      background-color: #AD8B73;
      color: #fff;
    }
}
.pop-record-input {
  padding: 0 10px;
}
.pop-type-wrap {
  display: flex;
  overflow-x: auto;
  height: 80px;
  margin-top: 10px;
  padding: 0 10px 10px;
  &-body {
    display: flex;
    align-items: center;
    &__item {
      width: 60px;
      height: 60px;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .iconfont-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #f5f5f5;
        .iconfont {
          font-size: 20px;
        }
      }
      .active {
          background-color: #AD8B73;
          color: #fff;
        }

    }
  }
}
.pop-otherInfo {
  padding-right: 10px;
  margin-top: 6px;
  display: flex;
  justify-content: space-around;
  &__date{
    display: inline-block;
    width: 60px;
    text-align: center;
    border-radius: 4px;
    background-color: #f5f5f5;
  }
}
</style>
