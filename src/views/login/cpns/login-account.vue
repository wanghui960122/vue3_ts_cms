<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="formRef"
      label-width="65px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'
import { ElForm } from 'element-plus'
import useActions from '@/hooks/useActions'

export default defineComponent({
  components: {},
  emits: ['changeIsKeep'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const ruleForm = reactive({
      account: '',
      password: ''
    })
    if (localCache.getCache('account')) {
      ruleForm.account = localCache.getCache('account')
    }
    if (localCache.getCache('password')) {
      ruleForm.password = localCache.getCache('password')
      emit('changeIsKeep')
    }
    const { accountLoginAction } = useActions('userModule', [
      'accountLoginAction'
    ])
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid): void | boolean => {
        if (valid) {
          localCache.setCache('account', ruleForm.account)
          if (isKeepPassword) {
            localCache.setCache('password', ruleForm.password)
          } else {
            localCache.deleteCache('password')
          }
          accountLoginAction({ ...ruleForm })
        } else {
          return false
        }
      })
    }

    return {
      ruleForm,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped lang="less"></style>
