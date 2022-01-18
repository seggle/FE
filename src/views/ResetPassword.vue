<template>
<div class="container">
  <h1 id="title">비밀번호 재설정</h1>
  <form id="login-form" class="row"
        :key="formResetPassword"
        :class="{ 'was-validated': validated }"
        @submit.prevent="handleResetPassword" novalidate>
    <div class="current-password-form">
      <label for="current-password">현재 비밀번호</label>
      <input v-model="formResetPassword.currentPassword" type="password" id="current-password" class="form-control" required>
      <div class="invalid-feedback">{{ this.feedback.currentPassword }}</div>
    </div>
    <div class="new-password-form">
      <label for="new-password">새로운 비밀번호</label>
      <input v-model="formResetPassword.newPassword" type="password" id="new-password" class="form-control" required>
      <div class="invalid-feedback">{{ this.feedback.newPassword }}</div>
    </div>
    <div class="new-password-again-form">
      <label for="new-password-again">새로운 비밀번호 확인</label>
      <input v-model="formResetPassword.newPasswordAgain" type="password" id="new-password-again" class="form-control" required>
      <div class="invalid-feedback">{{ this.feedback.newPasswordAgain }}</div>
    </div>
    <button class="btn" type="submit">비밀번호 변경</button>
  </form>
</div>
</template>

<script>
import api from '@/api/index.js'
export default {
  name: 'ResetPassword',
  data () {
    return {
      formResetPassword: {
        currentPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      },
      feedback: {
        currentPassword: '현재 비밀번호를 입력하세요',
        newPassword: '새로운 비밀번호를 입력하세요',
        newPasswordAgain: '새로운 비밀번호를 입력하세요'
      },
      validated: false,
      invalid: {
        currentPassword: false,
        newPassword: false,
        newPasswordAgain: false
      }
    }
  },
  method: {
    async submitForm () {
      try {
        const data = {
          user_id: this.formResetPassword.userID,
          user_password: this.formResetPassword.currentPassword,
          new_password: this.formResetPassword.newPassword
        }
        const res = await api.resetPassword(data)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    checkNewPasswordAgain () {
      if (this.formResetPassword.newPassword !== this.formResetPassword.newPasswordAgain) {
        console.log('비밀번호 일치하지 않음')
        this.feedback.newPasswordAgain = '비밀번호가 일치하지 않습니다.'
        this.invalid.newPasswordAgain = true
      }
    },
    checkFormValid () {
      if (Object.values(this.formResetPassword).includes('') || Object.values(this.invalid).includes(false)) {
        return false
      } else {
        console.log('통과')
        return true
      }
    },
    handleResetPassword () {
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
