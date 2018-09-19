<template>
  <el-container>

    <el-header>
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
    </el-header>

    <el-container>

      <el-aside>
        <el-select v-model="database" placeholder="请选择database" @change="getTables">
          <el-option v-for="db in databases" :key="db.datname" :label="db.datname" :value="db.datname"></el-option>
        </el-select>

        <el-select v-model="schema" placeholder="请选择schema" @change="getTables">
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

  </el-container>
</template>

<script>
import FlashTable from '@/components/flash-table'
import { mapState, mapGetters, mapActions } from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'

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
    },
    handleSelect: function (key, keyPath) {
      console.log(key, keyPath)
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
