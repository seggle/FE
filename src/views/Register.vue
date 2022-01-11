<template>
<div class="container">
  <h1 id="title">Seggle에 오신 걸 환영합니다</h1>
  <form id="register-form" class="row" @submit.prevent="submitForm">
    <div class="id-form">
      <label for="validationID">아이디</label>
      <input v-model="userID" type="text" class="form-control" id="validationID" required>
    </div>
    <div class="name-form">
      <label for="validationName">이름</label>
      <input v-model="userName" type="text" class="form-control" id="validationName" required>
    </div>
    <div class="email-form">
      <label for="validationEmail">이메일</label>
      <input v-model="userEmail" type="email" class="form-control" id="validationEmail" required>
    </div>
    <div class="password-form">
      <label for="validationPassword">비밀번호</label>
      <input v-model="userPWD" type="password" class="form-control" id="validationPassword" required>
    </div>
    <div class="password-again-form">
      <label for="validationAgainPassword">비밀번호 확인</label>
      <input v-model="userPWDAgain" type="password" class="form-control" id="validationPasswordAgain" required>
    </div>
    <button class="btn" type="submit">가입하기</button>
  </form>
</div>
</template>

<script>
import api from '@/api/index.js'
export default {
  name: 'Register',
  data () {
    return {
      userID: '',
      userName: '',
      userEmail: '',
      userPWD: '',
      userPWDAgain: ''
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          user_id: this.userID,
          user_name: this.userName,
          user_email: this.userEmail,
          user_password: this.userPWD
        }
        const res = await api.registerUser(data)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
    padding: 2rem 3rem;
    max-width: 600px;
  h1 {
    padding: 3rem 0rem;
  }

  form {
    font-size: 1rem;
    label {
      float: left;
      padding: 1rem 0rem;
    }
    .form-control {
      padding: 0.8rem 1rem;
    }
    .btn {
      padding: 0.5rem 1rem;
      margin-top: 2rem;
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
}
</style>
