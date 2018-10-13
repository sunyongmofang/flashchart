<template>
  <flash-menu :activeIndex="activeIndex">
    <router-view/>
  </flash-menu>
</template>

<script>
import FlashMenu from '@/components/flash-menu'

export default {
  components: {
    FlashMenu
  },
  data () {
    return {
      activeIndex: 'board'
    }
  }
}
</script>
