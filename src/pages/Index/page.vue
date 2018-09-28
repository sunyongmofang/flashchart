<template>
  <flash-menu :activeIndex="activeIndex">
    <h1>首页</h1>
  </flash-menu>
</template>

<script>
import FlashMenu from '@/components/flash-menu'

export default {
  name: 'index',
  components: {
    FlashMenu
  },
  data () {
    return {
      activeIndex: '/'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.non-padding {
  padding: 0;
}
</style>
