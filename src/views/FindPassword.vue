<template>
<div class="container">
  <h1 id="title">비밀번호 찾기</h1>
  <form id="find-password-form"
        class="row"
        :class="{ 'was-validated': validated }"
        @submit.prevent="handleFindPassword" novalidate>
    <div class="email-form">
      <label for="email">이메일</label>
      <input v-model="this.useremail"
            type="email"
            id="email"
            class="form-control"
            :class="{'is-invalid': invalidEmail }"
            @blur="checkUserEmail" @focus="invalidEmail = false"
            required>
      <div class="invalid-feedback">
        {{ this.feedback }}
      </div>
    </div>
    <button class="btn" type="submit">메일전송</button>
  </form>
</div>
</template>

<script>
import api from '@/api/index.js'
import validator from '@/utils/validators.js'
export default {
  name: 'FindPassword',
  data () {
    return {
      userID: this.$store.state.userid,
      useremail: '',
      validated: false,
      invalidEmail: false,
      feedback: '이메일을 입력하세요'
    }
  },
  methods: {
    handleFindPassword () {
      if (!this.invalidEmail && this.useremail !== '') {
        this.submitForm()
        this.$router.push('/login')
      } else {
        this.validated = true
      }
    },
    checkUserEmail () {
      if (!(validator.validateEmail(this.useremail))) {
        this.feedback = '이메일 형식이 올바르지 않습니다.'
        this.invalidEmail = true
      }
    },
    async submitForm () {
      try {
        const data = {
          username: this.userID,
          email: this.useremail
        }
        const res = await api.findPassword(data)
        console.log(res)
        alert('이메일을 전송하였습니다.')
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
    padding: 1rem 0rem;
  }

  form {
    font-size: 1rem;
    .form-control {
      padding: 1rem 1rem;
    }
    label {
      float: left;
      padding: 1rem 0rem;
    }
    .email-form {
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
}
</style>
