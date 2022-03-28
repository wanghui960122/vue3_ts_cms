<template>
  <div class="rose-echart">
    <HYEcharts :options="options"></HYEcharts>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import HYEcharts from '@/base-ui/echarts'
import { IDataType } from '../types'
import { EChartsOption } from 'echarts'

const props = defineProps<{
  roseData: IDataType[]
}>()

const options = computed(() => {
  const obj: EChartsOption = {
    // legend: {
    //   top: 'bottom'
    // },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
  return obj
})
</script>

<style scoped></style>
