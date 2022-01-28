import { createStore } from 'vuex'
import { getAuthFromCookie, getUserFromCookie } from '@/utils/cookies'
import api from '@/api/index.js'

export default createStore({
  state: {
    userid: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    usertype: ''
  },
  getters: {
    isLogin (state) {
      return state.userid !== ''
    },
    isAdmin (state) {
      return state.usertype === 0 || state.usertype === 1
    },
    isSuperAdmin (state) {
      return state.usertype === 0
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
    },
    clearToken (state) {
      state.token = ''
    },
    setUserType (state, usertype) {
      state.usertype = usertype
    },
    clearUserType (state) {
      state.usertype = ''
    }
  },
  actions: {
    getUserType () {
      api.getUserInfo().then(res => {
        this.commit('setUserType', res.data.privilege || '')
      })
    }
  },
  modules: {
  }
})
