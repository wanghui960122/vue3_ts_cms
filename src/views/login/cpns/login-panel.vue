<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs stretch type="border-card">
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><avatar /></el-icon>账号登录
          </span>
        </template>
        <LoginAccount ref="accountRef" @changeIsKeep="changeIsKeep" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>手机登录
          </span>
        </template>
        <LoginPhone />
      </el-tab-pane>
    </el-tabs>
    <div class="login-control">
      <el-checkbox v-model="keepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login-btn">
      <el-button type="primary" @click="handleLogin">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Avatar, Iphone } from '@element-plus/icons-vue'

import LoginPhone from './login-phone.vue'
import LoginAccount from './login-account.vue'

export default defineComponent({
  components: {
    Avatar,
    Iphone,
    LoginPhone,
    LoginAccount
  },
  setup() {
    let keepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const handleLogin = (): void => {
      accountRef.value?.loginAction(keepPassword.value)
    }
    const changeIsKeep = () => {
      keepPassword.value = true
    }
    return {
      keepPassword,
      handleLogin,
      accountRef,
      changeIsKeep
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  .title {
    text-align: center;
  }
  .login-control {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
  }
  .login-btn {
    display: flex;
    .el-button {
      flex: 1;
    }
  }
}
</style>
