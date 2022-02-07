const ACCESS_TOKEN = 'access'
const REFRESH_TOKEN = 'refresh'

function getAccessToken () {
  return window.localStorage.getItem(ACCESS_TOKEN)
}

function getRefreshToken () {
  return window.localStorage.getItem(REFRESH_TOKEN)
}

function saveAcessToken (token) {
  window.localStorage.setItem(ACCESS_TOKEN, token)
}

function saveRefreshToken (token) {
  window.localStorage.setItem(REFRESH_TOKEN, token)
}

function saveUserType (usertype) {
  window.localStorage.setItem('UserType', usertype)
}

function getUsertype () {
  return window.localStorage.getItem('UserType')
}

function destroyToken () {
  window.localStorage.removeItem(ACCESS_TOKEN)
  window.localStorage.removeItem(REFRESH_TOKEN)
  window.localStorage.removeItem('UserType')
}

export {
  getAccessToken,
  getRefreshToken,
  saveAcessToken,
  saveRefreshToken,
  destroyToken,
  saveUserType,
  getUsertype
}
