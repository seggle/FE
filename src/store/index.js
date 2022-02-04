import { createStore } from 'vuex'
import { getUserFromCookie } from '@/utils/cookies'
import { getAccessToken, getRefreshToken, saveUserType, getUsertype } from '@/utils/jwt'
import api from '@/api/index.js'

export default createStore({
  state: {
    userid: getUserFromCookie() || '',
    accessToken: getAccessToken() || '',
    refreshToken: getRefreshToken() || '',
    usertype: getUsertype() || ''
  },
  getters: {
    isLogin (state) {
      return !!state.accessToken
    },
    isAdmin (state) {
      return state.usertype === '0' || state.usertype === '1'
    },
    isSuperAdmin (state) {
      return state.usertype === '0'
    }
  },
  mutations: {
    setUserid (state, userid) {
      state.userid = userid
    },
    clearUserid (state) {
      state.userid = ''
    },
    setToken (state, accessToken, refreshToken) {
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    clearToken (state) {
      state.accessToken = ''
      state.refreshToken = ''
    },
    setUserType (state, usertype) {
      state.usertype = usertype
    },
    clearUserType (state) {
      state.usertype = ''
    }
  },
  actions: {
    getUserType ({ commit }, userName) {
      api.getUserInfo(userName).then(res => {
        commit('setUserType', res.data.privilege)
        saveUserType(res.data.privilege)
      })
    }
  },
  modules: {
  }
})
