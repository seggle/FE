import { createStore } from 'vuex'
import { getAccessFromCookie, getRefreshFromCookie, getUserFromCookie } from '@/utils/cookies'
import api from '@/api/index.js'

export default createStore({
  state: {
    userid: getUserFromCookie() || '',
    accessToken: getAccessFromCookie() || '',
    refreshToken: getRefreshFromCookie() || '',
    usertype: ''
  },
  getters: {
    isLogin (state) {
      return !!state.accessToken && !!state.refreshToken
    },
    isAdmin (state) {
      return state.usertype === 1 || state.usertype === 2
    },
    isSuperAdmin (state) {
      return state.usertype === 2
    }
  },
  mutations: {
    setUserid (state, userid) {
      state.userid = userid
    },
    clearUserid (state) {
      state.userid = ''
    },
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    setRefreshToken (state, refreshToken) {
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
    async getUserType () {
      try {
        const res = await api.getUserInfo(this.state.userid)
        console.log('getUserType: ', res)
        this.commit('setUserType', res.data.privilege)
      } catch (err) {
        console.log('getUserType error: ', err)
      }
    },
    async refreshAccessToken () {
      try {
        const res = await api.refreshAccessToken({
          refresh: this.state.refreshToken
        })
        this.commit('setUserid', res.data.access)
      } catch (err) {
        console.log('refreshAccessToekn error: ', err)
      }
    }
  },
  modules: {
  }
})
