<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          src="
        https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        &nbsp;
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="CircleClose" @click="handleExitClick"
            >退出登录
          </el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { CircleClose } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {},
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.userModule.userInfo.name)
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      CircleClose,
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
