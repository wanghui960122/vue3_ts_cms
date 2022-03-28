<template>
  <div>
    <PageContent
      :contentConfig="contentConfig"
      page-name="menu"
      moduleName="system"
      controlName="新建菜单"
    >
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
