import { createStore } from 'vuex'

export default createStore({
  state: {
    userid: '',
    token: ''
  },
  getters: {
    isLogin (state) {
      return state.userid !== ''
    }
  },
  mutations: {
    setUserid (state, userid) {
      state.userid = userid
    },
    clearUserid (state) {
      state.userid = ''
    },
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
