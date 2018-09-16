
export default {
  namespaced: true,
  state: {
    databases: [],
    schemas: [],
    tables: [],
    tableData: []
  },
  getters: {
    field: state => {
      let tmpField = []
      for (let i in state.tableData[0]) {
        tmpField.push(i)
      }
      return tmpField
    }
  },
  mutations: {
    setDatabases (state, payload) { state.databases = payload },
    setSchemas (state, payload) { state.schemas = payload },
    setTables (state, payload) { state.tables = payload },
    setTableData (state, payload) { state.tableData = payload }
  },
  actions: {
    setDatabases ({ commit }, { vm }) {
      vm.$axios({ method: 'get', url: '/prest/databases' }).then(res => {
        commit('setDatabases', res.data)
      })
    },
    setSchemas ({ commit }, { vm }) {
      vm.$axios({ method: 'get', url: '/prest/schemas' }).then(res => {
        commit('setSchemas', res.data)
      })
    },
    setTables ({ commit, state }, { vm, database, schema }) {
      if (database && schema) {
        let target = [database, schema]
        vm.$axios({ method: 'get', url: '/prest/' + target.join('/') }).then(res => {
          commit('setTables', res.data)
        })
      }
    },
    setTableData ({ commit, state }, { vm, database, schema, table }) {
      if (database && schema && table) {
        let target = [database, schema, table]
        vm.$axios({ method: 'get', url: '/prest/' + target.join('/') + '?_page=1&_page_size=10' }).then(res => {
          commit('setTableData', res.data)
        })
      }
    },
    execSql ({ commit, state }, { vm, textarea }) {
      vm.$axios.post('/test/test', { sql: textarea }).then(res => {
        vm.$axios.get('/prest/_QUERIES/sunyong/' + res.data).then(resp => {
          commit('setTableData', resp.data)
        })
      })
    }
  }
}
