<template>
	<div class="topbar">
		{{ type }}
	</div>
	<main>
		<lottie-animation
		id="lottie"
		:animationData="lottie"
		:loop="true"
		:speed="1"
		ref="anim"
		>
	</lottie-animation>
	<van-form @submit="onSubmit" class="my-form">
	<!-- <van-form @submit="onSubmit"> -->
  <van-cell-group inset >
    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
		<van-field
			center
			clearable
			label="验证码"
			palceholder="输入验证码"
			v-show="type === '注册'"
			v-model="verify"
		>
		<template #button>
			<VueImgVerify ref="verifyRef" />
		</template>
	</van-field>
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      {{ type }}
    </van-button>
		<p class="toRegisterText" @click="changeType()">{{ tipInfo }}</p>
  </div>
</van-form>
	</main>
</template>

<script setup>
import VueImgVerify from '@/components/VueImageVerify.vue'
import lottie from '@/assets/lottie.json'
import { login, register } from './api/index'
import { onMounted, ref, computed } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'

const type = ref('登录')
const anim = ref()
const username = ref('')
const password = ref('')
const verify = ref('')
const verifyRef = ref(null)

const tipInfo = computed(() => {
  return type.value === '登录' ? '没有账号？前往注册' : '前往登录'
})

const onSubmit = async values => {
  try {
    if (type.value === '登录') {
      console.log('submit', values)
      const { data } = await login(values)
      localStorage.setItem('token', data.token)
      showSuccessToast('登录成功')
      window.location.href = '/'
    } else {
      if (verifyRef.value.imgCode.toLowerCase() !== verify.value.toLowerCase()) {
        showFailToast('验证码错误')
        return
      }
      await register(values)
      showSuccessToast('注册成功')
      type.value = '登录'
    }
  } catch (error) {
    console.error(error)
  }
}

const changeType = () => {
  type.value = type.value === '登录' ? '注册' : '登录'
}

onMounted(() => {
  anim.value.play()
})
</script>

<style lang="scss" scoped>
.topbar {
	width: 100%;
	height: 60px;
	text-align: center;
	background-color: #AD8B73;
	line-height: 60px;
	font-size: 20px;
	font-weight: 400;
}
main {
	display: flex;
	text-align: center;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	background-color: #f5f5f5;
	height: 100%;
	padding: 1px;
	.my-form {
		width: 400px;
	}
	#lottie {
		width: 200px;
		margin-bottom: 20px;
	}
	.toRegisterText {
		text-align: center;
      margin: 10px 0;
      color: var(--link-color);
      font-size: 14px;
	}
}
</style>
