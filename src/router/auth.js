import api from '@/api/index.js'
import store from '@/store'

const requireAuth = () => (to, from, next) => {
  if (to.meta.isSuperAdmin && store.getters.isSuperAdmin) {
    return next()
  }
  alert('접근 권한이 없습니다.')
  next('/login')
}

const requireAdminAuth = () => (to, from, next) => {
  if (to.meta.isAdmin && store.getters.isAdmin) {
    return next()
  }
  alert('접근 권한이 없습니다.')
  next('/login')
}

const requireClassAuth = () => async (to, from, next) => {
  try {
    const res = await api.classUserPrivilege(to.params.classID)
    if (res.data.privilege >= 0) {
      return next()
    }
    alert('접근 권한이 없습니다.')
    next('/')
  } catch (err) {
    console.log(err)
  }
}

const requireClassAdminAuth = () => async (to, from, next) => {
  try {
    const res = await api.classUserPrivilege(to.params.classID)
    if (res.data.privilege >= 1) {
      return next()
    }
    alert('접근 권한이 없습니다.')
    next(`/class/${to.params.classID}/class-contest`)
  } catch (err) {
    console.log(err)
  }
}

const requireCompetitionAdminAuth = () => async (to, from, next) => {
  try {
    const res = await api.competitionUserPrivilege(to.params.competitionID)
    if (res.data.privilege >= 1) {
      return next()
    }
    alert('접근 권한이 없습니다.')
    next('/')
  } catch (err) {
    console.log(err)
  }
}

export {
  requireAuth,
  requireAdminAuth,
  requireClassAuth,
  requireClassAdminAuth,
  requireCompetitionAdminAuth
}
