<template>
  <div>

    <el-row>
      <el-col :span="6">
        <el-form label-width="90px" label-position="right">
          <el-form-item label="database">
            <el-select v-model="params.database" placeholder="请选择database" @change="changeParams">
              <el-option v-for="db in databaseList" :key="db" :label="db" :value="db"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="schema">
            <el-select v-model="params.schema" placeholder="请选择schema" @change="changeParams">
              <el-option v-for="sm in schemaList" :key="sm" :label="sm" :value="sm"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="table">
            <el-select v-model="params.table" placeholder="请选择table" @change="changeParams">
              <el-option v-for="tb in tableList" :key="tb" :label="tb" :value="tb"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="18">
        <el-input type="textarea" :rows="4" placeholder="请输入查询sql" v-model="params.sql" class="native-margin"/>
        <div v-for="param in analyText" :key="param" class="native-margin">
          <el-input placeholder="请输入参数" v-model="params[param]">
            <template slot="prepend">{{ param }}</template>
          </el-input>
        </div>
        <el-button type="primary" @click="postText()" class="native-margin">执行sql</el-button>
        <el-button type="primary" @click="createSlice" class="native-margin">创建图表</el-button>
        <flash-table :tableData="datas"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import FlashTable from './components/flash-table'
import { mapState, mapGetters, mapActions } from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'

// 查找形如`"{{.xxxxx}}"`到字符串
const reg = /"\{{2}\.\w+\}{2}"/g
// 编译正则表达式
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
      'tableList'
    ]),
    /**
     * @description 实时监听sql语句，并动态匹配生成变量字段
     */
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
    /**
     * @description 提交数据，执行sql语句
     */
    postText: function () {
      this.params.filename = 'sqllib'
      this.execSql({ vm: this, params: this.params })
    },
    createSlice: function () {
      this.$prompt('请输入图表名称', '创建图表', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: '你的图表名是: ' + value
        })
      })
    },
    /**
     * @description 接收组件数据库相关字段变得，并动态改变computed中的数据
     * @param {String} 数据库信息变动监听
     */
    changeParams: function (param) {
      if (this.params.database === param) {
        this.params.schema = ''
        this.params.table = ''
      } else if (this.params.schema === param) {
        this.params.table = ''
      }
      this.analyParams({ vm: this, database: this.params.database, schema: this.params.schema, table: this.params.table })
    }
  },
  mounted: function () {
    // 初始化dataset.js中的数据
    this.updateDatabases({ vm: this })
  },
  data () {
    return {
      params: {}
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
