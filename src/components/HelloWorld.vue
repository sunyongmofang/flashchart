<template>
  <div>

    <el-select v-model="database" placeholder="请选择" @change="get_value();increment()">
      <el-option v-for="db in databases" :key="db.datname" :label="db.datname" :value="db.datname"></el-option>
    </el-select>

    <el-select v-model="schema" placeholder="请选择" @change="get_value()">
      <el-option v-for="ss in schemas" :key="ss.schema_name" :label="ss.schema_name" :value="ss.schema_name"></el-option>
    </el-select>

    <el-select v-model="table" placeholder="请选择" @change="get_data()">
      <el-option v-for="tt in tables" :key="tt.name" :label="tt.name" :value="tt.name"></el-option>
    </el-select>

    <div>
      <el-table border :data="tabledata">
        <el-table-column v-for="label in field" :key="label" :prop="label" :label="label"></el-table-column>
      </el-table>
    </div>

    <div>{{ test }}</div>

  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import PluginAxios from '@/plugin/axios'
import 'element-ui/lib/theme-chalk/index.css'
import { mapState } from 'vuex'

Vue.use(PluginAxios)
Vue.use(ElementUI)

export default {
  name: 'HelloWorld',
  computed: {
    ...mapState('flashchart/test', [
      'test'
    ])
  },
  methods: {
    get_value: function () {
      if (this.database && this.schema) {
        let target = [this.database, this.schema]
        this.$axios({ method: 'get', url: '/prest/' + target.join('/') }).then(res => {
          this.tables = res.data
          this.table = ''
        })
      }
    },
    get_data: function () {
      if (this.database && this.schema && this.table) {
        let target = [this.database, this.schema, this.table]
        this.field = []
        this.tabledata = []
        this.$axios({ method: 'get', url: '/prest/' + target.join('/') + '?_page=1&_page_size=10' }).then(res => {
          this.tabledata = res.data
          for (let i in this.tabledata[0]) {
            this.field.push(i)
          }
        })
      }
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
      table: '',
      tabledata: [],
      field: []
    }
  }
}
</script>
