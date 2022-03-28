<template>
  <div class="line-echart">
    <HYEcharts :options="options"></HYEcharts>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import { EChartsOption } from 'echarts'
import HYEcharts from '@/base-ui/echarts'

const props = withDefaults(
  defineProps<{
    title?: string
    xLabels: string[]
    values: any[]
  }>(),
  {
    title: ''
  }
)

const options = computed(() => {
  const obj: EChartsOption = {
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分别销量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.values
      }
    ]
  }
  return obj
})
</script>

<style scoped></style>
