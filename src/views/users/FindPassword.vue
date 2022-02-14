<template>
<div class="container">
  <h1 id="title">비밀번호 찾기</h1>
  <form id="find-password-form"
        class="row"
        :key="formFindPassword"
        :class="{ 'was-validated': validated }"
        @submit.prevent="handleFindPassword" novalidate>
    <div class="username-form">
      <label for="username">아이디</label>
      <input v-model="formFindPassword.username"
            type="text"
            id="username"
            class="form-control"
            :class="{'is-invalid': invalid.username }"
            @focus="invalid.username = false"
            required>
      <div class="invalid-feedback">
        {{ this.feedback.username }}
      </div>
    </div>
    <div class="email-form">
      <label for="email">이메일</label>
      <input v-model="formFindPassword.useremail"
            type="email"
            id="email"
            class="form-control"
            :class="{'is-invalid': invalid.email }"
            @blur="checkUserEmail" @focus="invalid.email = false"
            required>
      <div class="invalid-feedback">
        {{ this.feedback.email }}
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
      formFindPassword: {
        username: '',
        useremail: ''
      },
      validated: false,
      invalid: {
        username: false,
        email: false
      },
      feedback: {
        username: '아이디를 입력하세요',
        email: '이메일을 입력하세요'
      }
    }
  },
  methods: {
    checkUserEmail () {
      if (!(validator.validateEmail(this.formFindPassword.useremail))) {
        this.feedback.email = '이메일 형식이 올바르지 않습니다.'
        this.invalid.email = true
      }
    },
    async submitForm () {
      try {
        const data = {
          username: this.formFindPassword.username,
          email: this.formFindPassword.useremail
        }
        const res = await api.findPassword(data)
        console.log(res)
        alert('이메일을 전송하였습니다.')
        this.$router.push('/login')
      } catch (err) {
        console.log(err)
      }
    },
    checkFormValid () {
      if (Object.values(this.formFindPassword).includes('') || Object.values(this.invalid).includes(true)) {
        return false
      } else {
        return true
      }
    },
    handleFindPassword () {
      if (this.checkFormValid()) {
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
