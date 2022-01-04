<template>
  <div class="class-manager">
    <ClassNavBar/>
    <form class="class-manager-form" v-on:submit.prevent="submitForm">
      <div class="class-student-form">
        <label for="class-student">수강생</label>
        <textarea id="class-student" cols="30" rows="15" placeholder="내용을 입력하세요"></textarea>
        <button class="class-manager-btn" type="submit" v-on:click="submitForm">등록</button>
      </div>
      <div class="class-TA-form">
        <label for="class-TA">TA</label>
        <textarea id="class-TA" cols="30" rows="15" placeholder="내용을 입력하세요"></textarea>
        <button class="class-manager-btn" type="submit" v-on:click="submitForm">등록</button>
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import ClassNavBar from '@/components/ClassNavBar.vue'

export default {
  name: 'ClassManager',
  components: {
    ClassNavBar
  }
}
</script>

<style scoped>
.class-manager {
  padding: 8vh 30vh;
}

.class-manager-form {
  display: flex;
  justify-content: space-around;
  padding: 4vh 0vh;
}

.class-student-form,
.class-TA-form {
  margin-left: 10vh;
}

label {
  display: flex;
  padding: 3vh 0vh;
  font-size: 22px;
  font-weight: bold;
}

textarea {
  display: flex;
  resize: none;
  padding: 1vh 1vh;
  font-size: 22px;
  border: 2px solid rgb(221, 221, 221);
  border-radius: 1vh;
  margin-bottom: 3vh;
}

.class-manager-btn {
    float: right;
    padding: 1vh 3vh;
    font-size: 20px;
    background-color: var(--navy);
    color: white;
    border: none;
    border-radius: 3vh;
    cursor: pointer;
}
</style>
