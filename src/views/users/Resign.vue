<template>
  <div class="container">
    <h1 id="title">회원탈퇴</h1>
    <form
      id="resign-form"
      class="row"
      :key="formResign"
      :class="{ 'was-validated': validated }"
      @submit.prevent="handleResign"
      novalidate
    >
      <!--현재 비밀번호-->
      <div class="current-password-form">
        <label for="current-password">현재 비밀번호</label>
        <input
          v-model="formResign.currentPassword"
          type="password"
          id="current-password"
          class="form-control"
          :class="{ 'is-invalid': invalid.currentPassword }"
          @focus="invalid.currentPassword = false"
          required
        />
        <div class="invalid-feedback">
          {{ this.feedback.currentPassword }}
        </div>
      </div>
      <button class="btn" type="submit">회원탈퇴</button>
    </form>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { deleteCookie } from '@/utils/cookies.js'
export default {
  name: 'Resign',
  data () {
    return {
      userID: this.$store.state.userid,
      formResign: {
        currentPassword: ''
      },
      feedback: {
        currentPassword: '현재 비밀번호를 입력하세요'
      },
      validated: false,
      invalid: {
        currentPassword: false
      }
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          password: this.formResign.currentPassword
        }
        if (confirm('정말 탈퇴하시겠습니까?')) {
          const res = await api.resignUser(this.userID, data)
          console.log(res)
          alert('탈퇴 완료')
          this.logout()
          this.$router.push('/')
        }
      } catch (err) {
        console.log(err)
        console.log(err.response.data.error)
        console.log(this.formResign.currentPassword)
        this.invalid.currentPassword = true
        this.feedback.currentPassword = '현재 비밀번호가 일치하지 않습니다.'
      }
    },
    checkFormValid () {
      if (
        Object.values(this.formResign).includes('') ||
        Object.values(this.invalid).includes(true)
      ) {
        return false
      } else {
        return true
      }
    },
    logout () {
      this.$store.commit('clearToken')
      this.$store.commit('clearUserid')
      this.$store.commit('clearUserInfo')
      deleteCookie('til_user')
      deleteCookie('til_access')
      deleteCookie('til_refresh')
    },
    handleResign () {
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
