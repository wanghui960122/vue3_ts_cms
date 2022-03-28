<template>
  <div>
    <HYEcharts :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import HYEcharts from '@/base-ui/echarts'
import type { EChartsOption } from 'echarts'
import { IDataType } from '../types'

export default defineComponent({
  props: {
    pieData: {
      type: Array as PropType<IDataType[]>,
      require: true
    }
  },
  components: {
    HYEcharts
  },
  setup(props) {
    const options = computed(() => {
      const obj: EChartsOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      return obj
    })
    return {
      options
    }
  }
})
</script>

<style scoped lang="less"></style>
