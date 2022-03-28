<template>
  <div class="hy-form">
    <div>
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" :inline="true" class="demo-form-inline">
      <el-row>
        <el-col v-bind="colLayout" v-for="item in formItems" :key="item.field">
          <el-form-item
            v-if="!item.isHidden"
            :style="itemStyle"
            :label="item.label"
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                v-bind="item.otherOptions"
                :model-value="modelValue![`${item.field}`]"
                :show-password="item.type === 'password'"
                @update:modelValue="handleValueChange($event, item.field)"
              >
              </el-input>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                v-bind="item.otherOptions"
                :model-value="modelValue![`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
                style="width: 100%"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.label"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </template>
            <template v-else>
              <el-date-picker
                :model-value="modelValue![`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
                style="width: 100%"
                v-bind="item.otherOptions"
              ></el-date-picker>
            </template> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      require: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px', width: '80%' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  components: {},
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 20px;
}
</style>
