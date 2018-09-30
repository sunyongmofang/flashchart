<template>
  <el-container>
    <el-header class="non-padding">
      <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="sqllib">sql实验室</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="non-padding">
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
      default: '/'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.non-padding {
  padding: 0;
}
.el-header {
  margin-bottom: 20px;
}
</style>
