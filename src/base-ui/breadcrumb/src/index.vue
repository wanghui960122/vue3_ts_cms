<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :to="{ path: item.path }"
        :key="item.name"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../index'

export default defineComponent({
  components: {},
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
