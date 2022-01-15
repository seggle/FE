import axios from 'axios'
import { setInterceptors } from './interceptors'

function createInstance () {
  const instance = axios.create({
    baseURL: 'https://df30c447-6ff1-484d-b7bc-273f799bb063.mock.pstmn.io/' // api 서버
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
  return instance.post('find-password', data)
}

export default { registerUser, loginUser, logoutUser, checkUserIDorEmail, findPassword }
