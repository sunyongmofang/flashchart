export default {
  namespaced: true,
  state: {
    dbsDescript: []
  },
  getters: {
    databases: (state) => {
      let dbs = state.dbsDescript.map((item, index, thiz) => item.database)
      return dbs
    },
    schemas: (state) => (database) => {
      if (!database) {
        return []
      }
      let schemas = state.dbsDescript.find((item, index, thiz) => item.database === database).schemas
      let sch = schemas.map((item, index, thiz) => item.schema)
      return sch
    },
    tables: (state) => (database, schema) => {
      if (!database || !schema) {
        return []
      }
      let schemas = state.dbsDescript.find((item, index, thiz) => item.database === database).schemas
      let tables = schemas.find((item, index, thiz) => item.schema === schema).tables
      let tbs = tables.map((item, index, thiz) => item.table)
      return tbs
    },
    datas: (state) => (database, schema, table) => {
      if (!database || !schema || !table) {
        return []
      }
      let schemas = state.dbsDescript.find((item, index, thiz) => item.database === database).schemas
      let tables = schemas.find((item, index, thiz) => item.schema === schema).tables
      let datas = tables.find((item, index, thiz) => item.table === table).datas
      return datas
    },
    fields: (state) => (database, schema, table) => {
      if (!database || !schema || !table) {
        return []
      }
      let schemas = state.dbsDescript.find((item, index, thiz) => item.database === database).schemas
      let tables = schemas.find((item, index, thiz) => item.schema === schema).tables
      let datas = tables.find((item, index, thiz) => item.table === table).datas
      if (datas.length <= 0) {
        return []
      }
      let fd = []
      for (let i in datas[0]) {
        fd.push(i)
      }
      return fd
    }
  },
  mutations: {
    setDbsDescript (state, payload) {
      state.dbsDescript = payload
    },
    setTableData (state, { database, schema, table, datas }) {
      if (database || schema || table) {
        let schemas = state.dbsDescript.find((item, index, thiz) => item.database === database).schemas
        let tables = schemas.find((item, index, thiz) => item.schema === schema).tables
        tables.find((item, index, thiz) => item.table === table).datas = datas
      }
    }
  },
  actions: {
    updateDatabases ({ commit }, { vm }) {
      vm.$axios({ method: 'get', url: '/db_descript' }).then(res => {
        commit('setDbsDescript', res.data.dbsDescript)
      })
    },
    updateTableData ({ commit }, { vm, database, schema, table }) {
      vm.$axios({ method: 'get', url: '/db_getdata' }).then(res => {
        commit('setTableData', { database: database, schema: schema, table: table, datas: res.data })
      })
    }
  }
}
