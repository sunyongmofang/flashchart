<template>
  <div>

<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>

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

    <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>

 <el-button type="primary" @click="postText()">主要按钮</el-button>
 <el-button type="primary" @click="getSqlData()">获取sqldata</el-button>

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
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    postText: function () {
      console.log(this.textarea)
      this.$axios.post('/test/test', { sql: this.textarea, test: 123 }).then(res => {
        console.log(res.data)
      })
    },
    getSqlData: function () {
      this.$axios.get('/prest/_QUERIES/sunyong/test').then(res => {
        console.log(res.data)
      })
    },
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
      field: [],
      activeIndex: '1',
      textarea: ''
    }
  }
}
</script>
