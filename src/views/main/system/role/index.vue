<template>
  <div>
    <PageSearch :searchConfig="searchConfig" />
    <PageContent
      :contentConfig="contentConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      moduleName="system"
      controlName="新建角色"
    >
    </PageContent>
    <PageModal
      ref="pageModalRef"
      :title="title"
      pageName="role"
      :otherInfo="otherInfo"
      moduleName="system"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="entireMenu"
          node-key="id"
          @check="handleCheckChange"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
        />
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { ElTree } from 'element-plus'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { contentConfig } from './config/content.conifg'
import { searchConfig } from './config/search-config'
import { modalConfig } from './config/modal.config'

import usePageModel from '@/hooks/usePageModel'
import useState from '@/hooks/useState'

import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    const title = ref('')
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const { entireMenu } = useState(['entireMenu'])
    const newCallback = () => {
      title.value = '新建角色'
    }
    const editCallback = (item: any) => {
      title.value = '编辑角色'
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModel(newCallback, editCallback)
    return {
      PageContent,
      contentConfig,
      searchConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      title,
      entireMenu,
      elTreeRef,
      handleCheckChange,
      otherInfo
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
