<template>
  <div>

    <el-select v-model="database" placeholder="请选择" @change="get_value()">
      <el-option v-for="db in databases" :key="db.datname" :label="db.datname" :value="db.datname"></el-option>
    </el-select>

    <el-select v-model="schema" placeholder="请选择" @change="get_value()">
      <el-option v-for="ss in schemas" :key="ss.schema_name" :label="ss.schema_name" :value="ss.schema_name"></el-option>
    </el-select>

    <el-select v-model="table" placeholder="请选择">
      <el-option v-for="tt in tables" :key="tt.name" :label="tt.name" :value="tt.name"></el-option>
    </el-select>

  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import PluginAxios from '@/plugin/axios'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(PluginAxios)
Vue.use(ElementUI)

export default {
  name: 'HelloWorld',
  methods: {
    get_value: function () {
      this.$axios({ method: 'get', url: '/prest/' + this.database + '/' + this.schema }).then(res => {
        this.tables = res.data
      })
    }
  },
  mounted: function () {
    this.$axios({ method: 'get', url: '/prest/databases' }).then(res => {
      this.databases = res.data
    })
    this.$axios({ method: 'get', url: '/prest/schemas' }).then(res => {
      this.schemas = res.data
    })
  },
  data () {
    return {
      databases: [],
      schemas: [],
      tables: [],
      database: '',
      schema: '',
      table: ''
    }
  }
}
</script>
