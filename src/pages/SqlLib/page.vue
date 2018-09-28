<template>
  <flash-menu :activeIndex="activeIndex">

    <el-row>
      <el-col :span="8">
        <el-select v-model="database" placeholder="请选择database" @change="schema = '';table = ''">
          <el-option v-for="db in databases" :key="db" :label="db" :value="db"></el-option>
        </el-select>
        <el-select v-model="schema" placeholder="请选择schema" @change="table = ''">
          <el-option v-for="sm in schemas(database)" :key="sm" :label="sm" :value="sm"></el-option>
        </el-select>
        <el-select v-model="table" placeholder="请选择table" @change="getFields(database, schema, table)">
          <el-option v-for="tb in tables(database, schema)" :key="tb" :label="tb" :value="tb"></el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <flash-table :tableData="datas(database, schema, table)" :field="fields(database, schema, table)"></flash-table>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        <el-button type="primary" @click="postText()">执行sql</el-button>
      </el-col>
    </el-row>

  </flash-menu>
</template>

<script>
import FlashTable from '@/components/flash-table'
import FlashMenu from '@/components/flash-menu'
import { mapState, mapGetters, mapActions } from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'SqlLib',
  computed: {
    ...mapState('flashchart/sqllib', [
      'dbsDescript'
    ]),
    ...mapGetters('flashchart/sqllib', [
      'databases',
      'schemas',
      'tables',
      'datas',
      'fields'
    ])
  },
  components: {
    FlashTable,
    FlashMenu
  },
  methods: {
    ...mapActions('flashchart/sqllib', [
      'updateDatabases',
      'updateTableData'
    ]),
    postText: function () {
      this.execSql({ vm: this, textarea: this.textarea })
    },
    getFields: function (database, schema, table) {
      return this.updateTableData({ vm: this, database: database, schema: schema, table: table })
    }
  },
  mounted: function () {
    this.updateDatabases({ vm: this })
  },
  data () {
    return {
      database: '',
      schema: '',
      table: '',
      activeIndex: 'sqllib',
      textarea: '',
      thisTableData: [],
      thisField: []
    }
  }
}
</script>
