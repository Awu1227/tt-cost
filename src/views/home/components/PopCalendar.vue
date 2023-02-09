<template>
	<van-popup
	:show="props.show"
	position="bottom"
	:style="{height: '46%'}"
	@click-overlay="onClickOverlay"
  >
  <van-calendar :show="props.show" @confirm="onConfirm" :show-confirm="false" :min-date="minDate" :max-date="maxDate"/>
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
const date = ref('')
const minDate = new Date(2021, 0, 1)
const maxDate = new Date()
const emits = defineEmits(['toggle', 'select'])
const onClickOverlay = (date) => {
  emits('toggle', date)
}
const onConfirm = (value) => {
  date.value = Date.parse(value)
  onClickOverlay(date.value)
}
</script>

<style lang="scss" scoped>

</style>
