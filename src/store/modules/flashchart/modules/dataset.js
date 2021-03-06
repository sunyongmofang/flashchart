export default {
  namespaced: true,
  state: {
    databases: [],
    schemas: [],
    tables: [],
    datas: [],
    params: {
      database: '',
      schema: '',
      table: '',
      sql: ''
    }
  },
  getters: {
    databaseList: (state) => {
      return state.databases.map((item) => item.database)
    },
    schemaList: (state) => {
      return state.schemas.map((item) => item.schema)
    },
    tableList: (state) => {
      return state.tables.map((item) => item.table)
    }
  },
  mutations: {
    setDatabases (state, { databases }) {
      state.databases = databases
    },
    setSchemas (state, { database }) {
      state.schemas = state.databases.find((item) => item.database === database).schemas
    },
    setTables (state, { schema }) {
      state.tables = state.schemas.find((item) => item.schema === schema).tables
    },
    setDatas (state, { table }) {
      state.datas = state.tables.find((item) => item.table === table).datas
    },
    setData2Database (state, { table, datas }) {
      state.tables.find((item) => item.table === table).datas = datas
    }
  },
  actions: {
    updateDatabases ({ commit }, { vm }) {
      vm.$axios({ method: 'get', url: '/get_databases' }).then(res => {
        commit('setDatabases', { databases: res.data })
      })
    },
    analyParams ({ commit }, { vm, database, schema, table }) {
      if (database) {
        commit('setSchemas', { database })
      }
      if (schema) {
        commit('setTables', { schema })
      }
      if (database && schema && table) {
        vm.$axios({ method: 'get', url: '/get_datas', params: { database, schema, table } }).then(res => {
          commit('setData2Database', { table, datas: res.data })
          commit('setDatas', { table })
        })
      }
    },
    async execSql ({ commit, state }, { vm, params }) {
      let postSqlFile, execsqlData
      postSqlFile = await vm.$axios({ method: 'post', url: '/post_filename', params })
      if (postSqlFile.status === 200) {
        execsqlData = await vm.$axios({ method: 'get', url: '/get_execsql', params })
      }
      state.datas = execsqlData ? execsqlData.data : []
    }
  }
}
