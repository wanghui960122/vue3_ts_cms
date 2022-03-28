<template>
  <div>
    <div
      style="
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <slot name="header">
        <h3>{{ title }}</h3>
        <div>
          <slot name="handleHeader"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showColumnSelect"
        type="selection"
        align="center"
        width="60"
      >
      </el-table-column>
      <el-table-column
        v-if="showColumnIndex"
        type="index"
        align="center"
        label="序号"
        width="60"
      >
      </el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column show-overflow-tooltip v-bind="item" align="center">
          <template #default="scope">
            <!-- 不设置具名插槽内容，则使用默认值 -->
            <slot :name="(item as any).slotName" :row="scope.row">
              {{ scope.row[(item as any).prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <slot name="footer" v-if="showFooter">
      <div style="text-align: right; margin-top: 10px">
        <el-pagination
          background
          v-model:currentPage="page!.pageCurrent"
          :page-sizes="[5, 10, 15, 20]"
          v-model:page-size="page!.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    propList: {
      type: Array,
      default: () => []
    },
    showColumnIndex: {
      type: Boolean,
      default: false
    },
    showColumnSelect: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    totalCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any[]) => {
      emit('selectionChange', value)
    }
    return {
      handleSelectionChange
    }
  }
})
</script>

<style scoped lang="less"></style>
