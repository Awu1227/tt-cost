<template>
	<van-popup
	:show="props.show"
	position="bottom"
	:style="{height: '46%'}"
	@click-overlay="onClickOverlay"
	>
	<van-date-picker
      v-model="curretDate"
      title="选择年月"
      :columns-type = "['year', 'month']"
			:min-date="minDate"
			:max-date="maxDate"
      :formatter="formatter"
			@confirm="chooseMonth"
			@cancel="cancelChose"
    />
	</van-popup>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['toggle', 'select'])
const onClickOverlay = () => {
  emits('toggle')
}

const curretDate = ref(['2023', '02'])
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(Date.now())

const chooseMonth = (val) => {
  emits('toggle')
  emits('select', val.selectedValues)
}
const cancelChose = () => {
  emits('toggle')
}

const formatter = (type, option) => {
  if (type === 'year') {
    option.text += '年'
  }
  if (type === 'month') {
    option.text += '月'
  }
  return option
}
</script>

<style lang="scss" scoped>

</style>
