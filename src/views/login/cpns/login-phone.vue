<template>
  <div>
    <el-form
      :rules="rules"
      :model="ruleForm"
      label-width="65px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" class="item-code">
        <el-input v-model="ruleForm.code"></el-input>
        <el-button type="primary" class="btn-code">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/phone-config'

export default defineComponent({
  components: {},
  setup() {
    let ruleForm = reactive({
      phone: '',
      code: ''
    })
    return {
      ruleForm,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.item-code {
  /deep/ .el-form-item__content {
    display: flex;
    .btn-code {
      width: 100px;
      margin-left: 10px;
    }
  }
}
</style>
