<template>
  <div class="container">
    <div id="class-manager-form" class="form-floating row px-5 py-5" v-on:submit.prevent="submitForm">
      <form class="class-student-form col-md-4">
        <label for="class-student" class="p-2 fs-4">수강생</label>
        <textarea id="class-student" class="form-control mb-3 p-3" cols="30" rows="15" placeholder="내용을 입력하세요"></textarea>
        <button class="btn btn-dark" type="submit" v-on:click="submitForm">등록</button>
      </form>
      <form class="class-TA-form col-md-4">
        <label for="class-TA" class="p-2 fs-4">TA</label>
        <textarea id="class-TA" class="form-control mb-3 p-3" cols="30" rows="15" placeholder="내용을 입력하세요"></textarea>
        <button class="btn btn-dark" type="submit" v-on:click="submitForm">등록</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ClassStudentManager'
}
</script>

<style scoped>
#class-manager-form {
  justify-content: space-evenly;
}
label {
  font-weight: bold;
}
textarea {
  resize: none;
}
.btn {
  float: right;
}
</style>
