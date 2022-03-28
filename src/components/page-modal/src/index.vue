<template>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      destroy-on-close
      :title="title"
      width="30%"
      center
    >
      <HYForm v-bind="modalConfig" v-model="formData"></HYForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HYForm from '@/base-ui/form'
import useActions from '@/hooks/useActions'

export default defineComponent({
  components: {
    HYForm
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    modalConfig: {
      type: Object,
      default: () => ({})
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      default: ''
    },
    moduleName: {
      type: String,
      default: ''
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { createPageDataAction, editPageDataAction } = useActions(
      props.moduleName,
      ['createPageDataAction', 'editPageDataAction']
    )
    const centerDialogVisible = ref(false)
    const formData = ref<any>({})
    const handleNewData = () => {
      centerDialogVisible.value = true
    }
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    const handleConfirmClick = () => {
      centerDialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        console.log('编辑用户')
        editPageDataAction({
          pageName: props.pageName,
          moduleName: props.moduleName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log('新建用户')
        createPageDataAction({
          pageName: props.pageName,
          moduleName: props.moduleName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      centerDialogVisible,
      handleNewData,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped lang="less"></style>
