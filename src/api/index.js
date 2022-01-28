import axios from 'axios'
import { setInterceptors } from './interceptors'

function createInstance () {
  const instance = axios.create({
    baseURL: 'https://efca6327-0540-445e-91df-2230fa4c20a4.mock.pstmn.io/' // api 서버
  })
  return setInterceptors(instance)
}

const instance = createInstance()

function registerUser (data) {
  return instance.post('users', data)
}

function loginUser (data) {
  return instance.post('users/login', data)
}

function logoutUser (data) {
  return instance.put('users/logout', data)
}

function checkUserIDorEmail (data) {
  return instance.post('check-userid-or-email', data)
}

function findPassword (data) {
  return instance.post('users/password', data)
}

function resetPassword (username, data) {
  return instance.patch(`users/${username}`, data)
}
export default {
  registerUser,
  loginUser,
  logoutUser,
  checkUserIDorEmail,
  findPassword,
  resetPassword
}
