<template>
<van-popup
  :show="props.show"
  round
  position="bottom"
  :style="{ height: '30%' }"
	@click-overlay="onClickOverlay"
>支出分类</van-popup>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['toggle'])

const onClickOverlay = () => {
  emits('toggle')
}
</script>

<style lang="scss" scoped>

</style>
