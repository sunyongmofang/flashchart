<template>
  <div>
    {{ databases }}
  </div>
</template>

<script>
import FlashTable from './components/flash-table'
import { mapState } from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'Slice',
  computed: {
    ...mapState('flashchart/dataset', [
      'databases',
      'datas'
    ])
  },
  components: {
    FlashTable
  }
}
</script>

<style scoped>
/*自然间距*/
.native-margin {
  margin-bottom: 20px;
}
</style>
