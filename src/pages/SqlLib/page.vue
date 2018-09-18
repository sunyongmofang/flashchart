<template>
  <el-container>

    <el-aside>
      <el-select v-model="database" placeholder="请选择database" @change="getTables()">
        <el-option v-for="db in databases" :key="db.datname" :label="db.datname" :value="db.datname"></el-option>
      </el-select>

      <el-select v-model="schema" placeholder="请选择schema" @change="getTables()">
        <el-option v-for="sm in schemas" :key="sm.schema_name" :label="sm.schema_name" :value="sm.schema_name"></el-option>
      </el-select>

      <el-select v-model="table" placeholder="请选择table" @change="getData()">
        <el-option v-for="tb in tables" :key="tb.name" :label="tb.name" :value="tb.name"></el-option>
      </el-select>
    </el-aside>

    <el-main>
      <FlashTable :tableData="tableData" :field="field"></FlashTable>

      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>

      <el-button type="primary" @click="postText()">执行sql</el-button>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import PluginAxios from '@/plugin/axios'
import FlashTable from '@/components/flash-table'
import { mapState, mapGetters, mapActions } from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(PluginAxios)

export default {
  name: 'SqlLib',
  computed: {
    ...mapState('flashchart/test', [
      'databases',
      'schemas',
      'tables',
      'tableData'
    ]),
    ...mapGetters('flashchart/test', [
      'field'
    ])
  },
  components: {
    FlashTable
  },
  methods: {
    ...mapActions('flashchart/test', [
      'setDatabases',
      'setSchemas',
      'setTables',
      'setTableData',
      'execSql'
    ]),
    postText: function () {
      this.execSql({ vm: this, textarea: this.textarea })
    },
    getTables: function () {
      this.setTables({ vm: this, database: this.database, schema: this.schema })
      this.table = ''
    },
    getData: function () {
      this.setTableData({ vm: this, database: this.database, schema: this.schema, table: this.table })
    }
  },
  mounted: function () {
    this.setDatabases({ vm: this })
    this.setSchemas({ vm: this })
  },
  data () {
    return {
      database: '',
      schema: '',
      table: '',
      activeIndex: '1',
      textarea: ''
    }
  }
}
</script>
