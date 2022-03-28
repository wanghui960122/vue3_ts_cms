<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="logo" />
      <h2 class="title" v-show="isCollapse">vue3 + ts</h2>
    </div>
    <div class="menu">
      <el-menu
        active-text-color="#ffd04b"
        :default-active="defaultValue"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :collapse="!isCollapse"
        text-color="#fff"
      >
        <template v-for="item in userMenus" :key="item.id">
          <template v-if="item.type === 1">
            <el-sub-menu :index="`${item.id}`">
              <template #title>
                <el-icon v-if="item.icon">
                  <component :is="item.icon.split('el-icon-')[1]"> </component>
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="subItem in item.children" :key="subItem.id">
                <el-menu-item
                  @click="handleMenuItemClick(subItem)"
                  :index="`${subItem.id}`"
                >
                  <el-icon v-if="subItem.icon">
                    <component :is="subItem.icon.split('el-icon-')[1]">
                    </component>
                  </el-icon>
                  <span>{{ subItem.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else-if="item.type === 2">
            <el-menu-item :index="`${item.id}`">
              <el-icon v-if="item.icon">
                <component :is="item.icon.split('el-icon-')[1]"> </component>
              </el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'
import useState from '@/hooks/useState'

export default defineComponent({
  components: {},
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // 定义变量
    const { userMenus } = useState('userModule', ['userMenus'])
    const route = useRoute()
    const defaultValue = computed(
      () => mapPathToMenu(userMenus.value, route.path).id + ''
    )
    const handleMenuItemClick = (item: any): void => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      defaultValue,
      userMenus,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    height: 28px;
    display: flex;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
}
</style>
