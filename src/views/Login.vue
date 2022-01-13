<template>
<div class="container">
  <h1 id="title">Seggle</h1>
  <form id="login-form" class="row" @submit.prevent="submitForm">
    <div class="id-form">
      <input v-model="userID" type="text" class="form-control" id="validationID" placeholder="아이디" required>
    </div>
    <div class="password-form">
      <input v-model="userPWD" type="password" class="form-control" id="validationPassword" placeholder="비밀번호" required>
    </div>
    <button class="btn" type="submit">로그인</button>
  </form>
  <div class="info-link">
    <a href="/register" class="link-join">회원가입</a>
    <a href="#" class="link-password">비밀번호 찾기</a>
  </div>
</div>
</template>

<script>
import api from '@/api/index.js'
export default {
  name: 'Login',
  data () {
    return {
      userID: '',
      userPWD: ''
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          user_id: this.userID,
          user_password: this.userPWD
        }
        const res = await api.loginUser(data)
        console.log(res)
        this.$store.commit('setToken', res.data.token)
        this.$store.commit('setUserid', res.data.user.user_id)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
    padding: 10rem 3rem;
    max-width: 500px;
  h1 {
    padding: 3rem 0rem;
  }

  form {
    font-size: 1rem;
    .form-control {
      padding: 1rem 1rem;
    }
    input[type="text"] {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    input[type="password"] {
      margin-bottom: 3rem;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .btn {
      padding: 0.5rem 1rem;
      margin-bottom: 20px;
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  a {
    color: rgba(0,0,0,0.5);
  }
  .link-join {
    float: left;
  }
  .link-password {
    float: right;
  }
}
</style>
