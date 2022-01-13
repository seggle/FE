import axios from 'axios'
import store from '../store'

const instance = axios.create({
  baseURL: 'https://df30c447-6ff1-484d-b7bc-273f799bb063.mock.pstmn.io/', // api 서버
  headers: {
    Authorization: store.state.token
  }
})

function registerUser (data) {
  return instance.post('users', data)
}

function loginUser (data) {
  return instance.post('users/login', data)
}

function logoutUser (data) {
  return instance.put('users/logout', data)
}

export default { registerUser, loginUser, logoutUser }
