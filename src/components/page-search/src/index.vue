<template>
  <div>
    <HYForm v-bind="searchConfig" v-model="formData">
      <template #header>
        <h1>高级搜索</h1>
      </template>
      <template #footer>
        <div style="text-align: right; padding: 10px 20px">
          <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button :icon="Search" type="primary" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </HYForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import HYForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    HYForm
  },
  emits: ['queryBtnClick', 'resetBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchConfig?.formItems ?? []
    const formOriginData: any = {}
    Object.keys(formItems)
    formItems.forEach((item: any) => {
      formOriginData[`${item.field}`] = ''
    })
    let formData = ref(formOriginData)
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      Refresh,
      Search,
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less"></style>
