import { ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useDateStore = defineStore('dateStore', () => {
  const date = ref(dayjs().format('YYYY年MM月'))
  const typeId = ref('all')
  return { date, typeId }
})
