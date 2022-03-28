<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  height: 100%;
  background: url(../../assets/img/login-bg.svg);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
