<template>
  <div id="main">
    <el-row :gutter="10">
      <el-col :span="7">
        <HYCard title="分类商品数量(饼图)">
          <PieEcharts :pieData="categoryGoodsCountData"></PieEcharts>
        </HYCard>
      </el-col>
      <el-col :span="10">
        <HYCard title="不同城市商品销量">
          <MapEcharts :mapData="addressGoodsSaleData"></MapEcharts>
        </HYCard>
      </el-col>
      <el-col :span="7">
        <HYCard title="分类商品数量(玫瑰图)">
          <RoseEcharts :roseData="categoryGoodsCountData"></RoseEcharts>
        </HYCard>
      </el-col>
    </el-row>
    <el-row class="content-row" :gutter="10">
      <el-col :span="12">
        <HYCard title="分类商品的销量">
          <LineEcharts v-bind="categoryGoodsSaleData"></LineEcharts>
        </HYCard>
      </el-col>
      <el-col :span="12">
        <HYCard title="分类商品的收藏">
          <BarEcharts v-bind="categoryGoodsFavorData"></BarEcharts>
        </HYCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useActions from '@/hooks/useActions'
import {
  PieEcharts,
  RoseEcharts,
  LineEcharts,
  BarEcharts,
  MapEcharts
} from '@/components/page-echarts'
import HYCard from '@/base-ui/card'
import useState from '@/hooks/useState'

export default defineComponent({
  components: {
    PieEcharts,
    HYCard,
    RoseEcharts,
    LineEcharts,
    BarEcharts,
    MapEcharts
  },
  setup() {
    const { getDashboardDataAction } = useActions('dashboard', [
      'getDashboardDataAction'
    ])
    getDashboardDataAction()
    const {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    } = useState('dashboard', [
      'categoryGoodsCount',
      'categoryGoodsSale',
      'categoryGoodsFavor',
      'addressGoodsSale'
    ])
    const categoryGoodsCountData = computed(() => {
      return categoryGoodsCount.value.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSaleData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSaleData = categoryGoodsSale.value
      for (const item of categoryGoodsSaleData) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavorData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavorData = categoryGoodsFavor.value
      for (const item of categoryGoodsFavorData) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSaleData = computed(() => {
      return addressGoodsSale.value.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCountData,
      categoryGoodsSaleData,
      categoryGoodsFavorData,
      addressGoodsSaleData
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
