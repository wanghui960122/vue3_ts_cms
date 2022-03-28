<template>
  <div>
    <PageSearch
      :searchConfig="searchConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryBtnClick"
    />
    <PageContent
      pageName="users"
      :contentConfig="contentConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      moduleName="system"
      controlName="新建用户"
      ref="pageContentRef"
    >
    </PageContent>
    <PageModal
      :title="title"
      :defaultInfo="defaultInfo"
      moduleName="system"
      pageName="users"
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { searchConfig } from './config/search-config'
import { modalConfig } from './config/modal.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { contentConfig } from './config/content.config'
import usePageSearch from '@/hooks/usePageSearch'
import usePageModel from '@/hooks/usePageModel'
import PageModal from '@/components/page-modal'
import useState from '@/hooks/useState'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const title = ref('')
    const { entireDepartment, entireRole } = useState([
      'entireDepartment',
      'entireRole'
    ])

    const newCallback = () => {
      title.value = '新建用户'
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      title.value = '编辑用户'
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    const [pageContentRef, handleResetClick, handleQueryBtnClick] =
      usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModel(newCallback, editCallback)
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = entireDepartment.value.map((item: any) => {
        return { label: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = entireRole.value.map((item: any) => {
        return { label: item.name, value: item.id }
      })
      return modalConfig
    })
    return {
      searchConfig,
      contentConfig,
      handleQueryBtnClick,
      handleResetClick,
      pageContentRef,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo,
      modalConfigRef,
      title
    }
  }
})
</script>

<style scoped lang="less"></style>
