import axios from 'axios'

const instance = axios.create({
  baseURL: '' // api 서버
})

function loginUser (data) {
  return instance.post('/users/login', data)
}

export default { loginUser }
