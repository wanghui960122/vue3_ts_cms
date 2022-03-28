<template>
  <div class="not-found"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.not-found {
  height: 100%;
  background: url(../../assets/img/not-found.jpeg) no-repeat;
  background-size: 100% 100%;
}
</style>
