<template>
	<van-popup
	:show="props.show"
	position="bottom"
	:style="{height: '46%'}"
	@click-overlay="onClickOverlay"
  >
  <van-calendar :show="props.show" @confirm="onConfirm" :show-confirm="false" />
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
