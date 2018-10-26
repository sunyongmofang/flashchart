<template>
  <flash-table :tableData="datas"></flash-table>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import FlashTable from './components/flash-table'

export default {
  name: 'BoardList',
  mounted: function () {
    this.getBoardList()
  },
  methods: {
    getBoardList: function () {
      this.$axios({ method: 'get', url: '/get_slicelist' }).then(res => {
        this.datas = res.data
      })
    }
  },
  components: {
    FlashTable
  },
  data () {
    return {
      datas: []
    }
  }
}
</script>

<style scoped>
/*自然间距*/
.native-margin {
  margin-bottom: 20px;
}
</style>
