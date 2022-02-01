<template>
<div class="container">
  <h1 id="title">Seggle</h1>
  <form id="login-form" class="row" :class="{ 'was-validated': validated }" @submit.prevent="handleLogin" novalidate>
    <div class="id-form">
      <input v-model="userID" type="text" class="form-control" placeholder="아이디" required>
      <div class="invalid-feedback">아이디를 입력하세요.</div>
    </div>
    <div class="password-form">
      <input v-model="password" type="password" class="form-control" placeholder="비밀번호" required>
      <div class="invalid-feedback">비밀번호를 입력하세요.</div>
    </div>
    <button class="btn" type="submit">로그인</button>
  </form>
  <div class="info-link">
    <a href="/register" class="link-join">회원가입</a>
    <a href="/find-password" class="link-password">비밀번호 찾기</a>
  </div>
</div>
</template>

<script>
import api from '@/api/index.js'
import { saveAuthToCookie, saveUserToCookie } from '@/utils/cookies.js'
export default {
  name: 'Login',
  data () {
    return {
      userID: '',
      password: '',
      validated: false
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          username: this.userID,
          password: this.password
        }
        const res = await api.loginUser(data)
        // 위에 로그 보고 밑에 형태 고쳐야함->일단 로그인 되게는 만들어놓기는 했는데 수정필요
        this.$store.commit('setToken', res.data.access)
        this.$store.commit('setUserid', this.userID)
        saveAuthToCookie(res.data.access)
        saveUserToCookie(this.userID)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    handleLogin () {
      if (this.userID !== '' && this.password !== '') {
        this.submitForm()
      } else {
        this.validated = true
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
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .password-form {
      margin-bottom: 3rem;
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
