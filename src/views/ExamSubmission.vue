<template>
  <div class="container">
    <ClassNavBar />
    <!--밑에 페이지가 뿌려짐-->
    <div class="test">
      <div class="title container"><h1>중간고사</h1></div>
      <form>
        <input type="text" placeholder="ip를 입력해주세요" required />

        <input
          type="submit"
          value="ip초기화"
          class="btn btn-primary btn-sm px-4 me-sm-3"
        />
        <button type="submit" class="btn btn-primary btn-sm px-4 me-sm-3">
          제출
        </button>
      </form>
      <button class="btn btn-primary btn-sm px-4 me-sm-3" @click="examStart">
        Start
      </button>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import ClassNavBar from '@/components/ClassNavBar.vue'
export default {
  name: 'ClassProblemTest',
  components: {
    ClassNavBar
  },
  methods: {
    examStart () {
      if (confirm('시작하시겠습니까?')) {
        alert('시험이 시작되었습니다.')
      } else {
      }
    }
  }
}
</script>

<style>
.title {
  font-weight: bold;
}
</style>
