<template>
  <div>
    <div ref="echartsRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { EChartsOption } from 'echarts'
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import useEchart from '../hooks/useEchart'
const echartsRef = ref<HTMLElement>()
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

onMounted(() => {
  const { setOptions } = useEchart(echartsRef.value as HTMLElement)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="less"></style>
