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
    const classList = res.data
    console.log(classList)
    for (let i = 0; i < classList.length; i++) {
      if (
        classList[i].username === store.state.userid &&
                classList[i].privilege > 0
      ) {
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
    let res
    if (to.params.problemType === 'general') {
      res = await api.getCompetitionTAList(to.params.problemID)
      const competitionList = res.data

      for (let i = 0; i < competitionList.length; i++) {
        if (
          competitionList[i].username === store.state.userid &&
                    competitionList[i].privilege > 0
        ) {
          return next()
        }
      }
      alert('접근 권한이 없습니다.')
      next('/')
    } else {
      return next()
    }
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
