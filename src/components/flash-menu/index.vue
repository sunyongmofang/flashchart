<template>
  <el-container>
    <el-header class="non-padding">
      <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="boardlist">看板</el-menu-item>
        <el-menu-item index="slicelist">图表管理</el-menu-item>
        <el-menu-item index="sqllib">sql实验室</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <slot/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'flash-menu',
  props: {
    activeIndex: {
      type: String,
      required: false,
      default: 'board'
    }
  }
}
</script>

<style scoped>
.non-padding {
  padding: 0;
}
</style>
