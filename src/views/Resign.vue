<template>
  <div class="container">
    <h1 id="title">비밀번호 확인</h1>
    <form
      id="resign-form"
      class="row"
      :key="formResign"
      :class="{ 'was-validated': validated }"
      @submit.prevent="handleResignPassword"
      novalidate
    >
      <div class="current-password-form">
        <label for="current-password">현재 비밀번호</label>
        <input
          v-model="formResign.currentPassword"
          type="password"
          id="current-password"
          class="form-control"
          @blur="checkCurrentPassword"
          @focus="invalid.currentPassword = false"
          required
        />
        <div class="invalid-feedback">
          {{ this.feedback.currentPassword }}
        </div>
      </div>
      <button @click="submitForm" class="btn" type="submit">회원 탈퇴</button>
    </form>
  </div>
</template>

<script>
import api from '@/api/index.js'
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
        if (confirm('정말 탈퇴하시겠습니까?')) {
          const res = await api.resignUser(this.userID)
          console.log(res.data)
          console.log('탈퇴 완료')
        }
        this.$router.push('/login')
      } catch (err) {
        console.log(err)
      }
    },
    checkCurrentPassword () {
      // 기존 비밀번호와 일치하는지
    },
    checkFormValid () {
      if (
        Object.values(this.formResign).includes('') ||
        Object.values(this.invalid).includes(false)
      ) {
        return false
      } else {
        return true
      }
    },
    handleResignPassword () {
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
