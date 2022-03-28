<template>
  <div class="header">
    <div style="height: 30px">
      <el-icon v-if="isFold" size="30" @click="changeIcon"><fold /></el-icon>
      <el-icon v-else size="30" @click="changeIcon"><expand /></el-icon>
    </div>
    <div class="content">
      <div>
        <HYBreadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div>
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import UserInfo from './user-info.vue'
import HYBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import useState from '@/hooks/useState'

export default defineComponent({
  components: {
    Expand,
    Fold,
    UserInfo,
    HYBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    let isFold = ref(true)
    const { userMenus } = useState('userModule', ['userMenus'])
    const route = useRoute()
    let breadcrumbs = computed(() =>
      pathMapBreadcrumbs(userMenus.value, route.path)
    )
    const changeIcon = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      changeIcon,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.el-icon {
  font-size: 30px;
}
.header {
  width: 100%;
  display: flex;
  align-items: center;
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 20px;
  }
}
</style>
