import { reactive, computed } from 'vue'

// 容器属性配置
export const containerProps = reactive({
  flexDirection: {
    value: 'row',
    options: ['row', 'row-reverse', 'column', 'column-reverse'],
  },
  justifyContent: {
    value: 'flex-start',
    options: [
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
      'space-evenly',
    ],
  },
  alignItems: {
    value: 'stretch',
    options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
  },
})

// 容器样式计算
export const containerStyles = computed(() => {
  return {
    flexDirection: containerProps.flexDirection.value,
    justifyContent: containerProps.justifyContent.value,
    alignItems: containerProps.alignItems.value,
  }
})

export const reset = () => {
  containerProps.flexDirection.value = 'row'
  containerProps.justifyContent.value = 'flex-start'
  containerProps.alignItems.value = 'stretch'
}
