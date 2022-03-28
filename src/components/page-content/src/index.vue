<template>
  <div style="padding: 20px; border-top: 20px solid #f0f2f5">
    <HYTable
      v-bind="contentConfig"
      :listData="listData"
      :totalCount="totalCount"
      @selectionChange="handelSelectionChange"
      v-model:page="pageInfo"
    >
      <!-- 具名插槽如果不传递 则展示设置的默认内容 -->
      <template #handleHeader>
        <el-button
          @click="handleNewClick"
          v-if="isCreate"
          type="primary"
          size="medium"
          >{{ controlName }}</el-button
        >
      </template>
      <template #status="scope">
        <el-button
          size="mini"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatDate(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatDate(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <el-button
          size="mini"
          type="text"
          :icon="Edit"
          v-if="isUpdate"
          @click="handleEditClick(scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="text"
          :icon="Delete"
          v-if="isDelete"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </HYTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import HYTable from '@/base-ui/table'
import useActions from '@/hooks/useActions'
import useGetters from '@/hooks/useGetters'
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  components: {
    HYTable
  },
  props: {
    contentConfig: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    },
    moduleName: {
      type: String,
      require: true
    },
    controlName: {
      type: String,
      default: '新建用户'
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const { getPageListAction, deletePageDataAction } = useActions(
      props.moduleName as string,
      ['getPageListAction', 'deletePageDataAction']
    )
    const pageInfo = ref({
      pageSize: 10,
      pageCurrent: 1
    })
    const isCreate = usePermission(props.pageName!, 'create')
    const isUpdate = usePermission(props.pageName!, 'update')
    const isDelete = usePermission(props.pageName!, 'delete')
    const isQuery = usePermission(props.pageName!, 'query')
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      getPageListAction({
        pageName: props.pageName,
        moduleName: props.moduleName,
        queryInfo: {
          size: pageInfo.value.pageSize,
          offset: (pageInfo.value.pageCurrent - 1) * pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    const { getPageList, getPageListCount } = useGetters(
      props.moduleName as string,
      ['getPageList', 'getPageListCount']
    )
    const listData = computed(() => getPageList.value(props.pageName))
    const totalCount = computed(() => getPageListCount.value(props.pageName))
    const otherPropSlots = props.contentConfig.propList.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    const handelSelectionChange = (value: any[]) => {
      console.log(value)
    }
    const handleEditClick = (value: any) => {
      emit('editBtnClick', value)
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleDeleteClick = (value: any) => {
      deletePageDataAction({
        pageName: props.pageName,
        moduleName: props.moduleName,
        id: value.id,
        queryInfo: {
          size: pageInfo.value.pageSize,
          offset: (pageInfo.value.pageCurrent - 1) * pageInfo.value.pageSize
        }
      })
    }
    watch(pageInfo.value, () => getPageData())
    return {
      Edit,
      Delete,
      listData,
      handelSelectionChange,
      getPageData,
      totalCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleEditClick,
      handleDeleteClick,
      handleNewClick
    }
  }
})
</script>

<style scoped lang="less"></style>
