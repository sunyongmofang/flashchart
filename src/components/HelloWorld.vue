<template>
  <div id="{{ thiz_id }}">

  </div>
</template>

<script>
import G2 from '@antv/g2'
import Vue from 'vue'
import PluginAxios from '@/plugin/axios'

Vue.use(PluginAxios)

export default {
  name: 'HelloWorld',
  mounted: function () {
    this.$nextTick(function () {
      this.$axios({ method: 'get', url: '/g2linechart' }).then(res => {
        var chart = new G2.Chart(res.data.chart)
        this.chart = chart
        chart.source(res.data.data)
        chart.scale(res.data.scale)
        chart.tooltip(res.data.tooltip)
        chart.line().position(res.data.position)
        chart.point().position(res.data.position).size(res.data.size).shape(res.data.shape).style(res.data.style)
        chart.render()
      })
    })
  },
  data () {
    return {
      thiz_id: 'app',
      chart: null
    }
  }
}
</script>
