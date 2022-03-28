<template>
  <div class="login">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '210px' : '60px'">
        <NavMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header>
          <NavHeader @foldChange="foldChange"> </NavHeader>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    let isCollapse = ref(true)
    const foldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      foldChange,
      isCollapse
    }
  }
})
</script>

<style scoped lang="less">
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .page,
  .main-content {
    height: 100%;

    .page-content {
      height: calc(100% - 48px);
      color: #333;
      text-align: center;
      background-color: #f0f2f5;
      .page-info {
        background-color: #fff;
        border-radius: 5px;
      }
    }
    .el-header {
      height: 48px !important;
      display: flex;
      color: #333;
      text-align: center;
      align-items: center;
    }

    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      transition: width 0.3s linear;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
