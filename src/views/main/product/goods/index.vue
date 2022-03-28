<template>
  <div>
    <PageContent
      :contentConfig="contentConfig"
      page-name="goods"
      moduleName="product"
      controlName="新建商品"
    >
      <template #image="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :initial-index="1"
        >
        </el-image>
      </template>
      <template #oldPrice="scope"> ￥{{ scope.row.oldPrice }} </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageContent
  },
  setup() {
    return {
      contentConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
