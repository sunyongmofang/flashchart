<template>
  <div>

    <el-row>
      <el-col :span="8">
        <el-select v-model="database" placeholder="请选择database" @change="changeParams">
          <el-option v-for="db in databaseList" :key="db" :label="db" :value="db"></el-option>
        </el-select>
        <el-select v-model="schema" placeholder="请选择schema" @change="changeParams">
          <el-option v-for="sm in schemaList" :key="sm" :label="sm" :value="sm"></el-option>
        </el-select>
        <el-select v-model="table" placeholder="请选择table" @change="changeParams">
          <el-option v-for="tb in tableList" :key="tb" :label="tb" :value="tb"></el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-input type="textarea" :rows="4" placeholder="请输入查询sql" v-model="params['sql']"></el-input>
        <div v-for="param in analyText" :key="param">
          <el-input placeholder="请输入参数" v-model="params[param]">
            <template slot="prepend">{{ param }}</template>
          </el-input>
        </div>
        <el-button type="primary" @click="postText()">执行sql</el-button>
        <flash-table :tableData="datas" :field="fieldList"></flash-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import FlashTable from '@/components/flash-table'
import { mapState, mapGetters, mapActions } from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'

const reg = /"\{{2}\.\w+\}{2}"/g
const creg = reg.compile(reg)

export default {
  name: 'SqlLib',
  computed: {
    ...mapState('flashchart/dataset', [
      'datas'
    ]),
    ...mapGetters('flashchart/dataset', [
      'databaseList',
      'schemaList',
      'tableList',
      'fieldList'
    ]),
    analyText: function () {
      if (this.params.sql && this.params.sql.match(creg)) {
        return this.params.sql.match(creg).map((item) => item.replace(/"{{./g, '').replace(/}}"/g, ''))
      } else {
        return []
      }
    }
  },
  components: {
    FlashTable
  },
  methods: {
    ...mapActions('flashchart/dataset', [
      'updateDatabases',
      'analyParams',
      'execSql'
    ]),
    postText: function () {
      this.params.filename = 'sqllib'
      this.execSql({ vm: this, params: this.params })
    },
    changeParams: function (param) {
      if (this.database === param) {
        this.schema = ''
        this.table = ''
      } else if (this.schema === param) {
        this.table = ''
      }
      this.analyParams({ vm: this, database: this.database, schema: this.schema, table: this.table })
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
      params: {}
    }
  }
}
</script>
