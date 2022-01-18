<template>
<div class="container">
  <h1 id="title">비밀번호 찾기</h1>
  <form id="find-password-form" class="row"
        :class="{ 'was-validated': validated }"
        @blur="validated = true"
        @submit.prevent="handleFindPassword" novalidate>
    <div class="email-form">
      <label for="email">이메일</label>
      <input v-model="email"
            type="email"
            id="email"
            class="form-control"
            required>
      <div class="invalid-feedback">이메일을 입력하세요</div>
    </div>
    <button class="btn" type="submit">메일전송</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'FindPassword',
  data () {
    return {
      email: '',
      validated: false
    }
  },
  method: {
    handleFindPassword () {
      console.log('find-pwd')
      this.$router.push('/login')
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
