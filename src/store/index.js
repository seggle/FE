import { createStore } from 'vuex'
import { getAuthFromCookie, getUserFromCookie } from '@/utils/cookies'

export default createStore({
  state: {
    userid: getUserFromCookie() || '',
    token: getAuthFromCookie() || ''
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
