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
    console.log(to.params.classID)
    const res = await api.getClassUserList(to.params.classID)
    const classList = res.data
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].username === store.state.userid) {
        return next()
      }
    }
    alert('접근 권한이 없습니다.')
    next('/')
  } catch (err) {
    console.log(err)
  }
}

const requireClassAdminAuth = () => async (to, from, next) => {
  try {
    const res = await api.getClassUserList(to.params.classID)
    const classUserList = res.data
    for (const classUser of classUserList) {
      if (classUser.username === store.state.userid && classUser.privilege > 0) {
        return next()
      }
    }
    alert('접근 권한이 없습니다.')
    next(`/class/${to.params.classID}`)
  } catch (err) {
    console.log(err)
  }
}

const requireCompetitionAdminAuth = () => async (to, from, next) => {
  try {
    const res = await api.getCompetitionUserList(to.params.competitionID)
    const competitionUserList = res.data
    for (const competitionUser of competitionUserList) {
      if (competitionUser.username === store.state.userid && competitionUser.privilege > 1) {
        return next()
      }
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
