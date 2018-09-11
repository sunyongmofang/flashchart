
export default {
  namespaced: true,
  state: { test: 123 },
  getters: {
    get_test (state) { return state.test }
  },
  mutations: {
    increment (state) {
      return state.test++
    }
  },
  actions: {
    increment (context) {
      return context.commit('increment')
    }
  }
}
