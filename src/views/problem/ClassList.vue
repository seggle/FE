<template>
<div class="container">
  <header>
    <h1 id="title">수업 및 시험</h1>
    <div class="button-group">
      <button class="btn">편집</button>
      <button class="btn">수업 생성</button>
    </div>
  </header>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">수강학기</th>
        <th scope="col">제목</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for=" classes in classList" :key="classes">
        <th scope="row">{{ classes._id }}</th>
        <td>{{ classes.semester }}</td>
        <td>{{ classes.title }}</td>
      </tr>
    </tbody>
  </table>
  <Pagination/>
</div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'ClassList',
  components: {
    Pagination
  },
  data () {
    return {
      classList: [ // api로 받아올 부분
        {
          _id: '1',
          semester: '2020-2학기',
          title: '기계학습'
        },
        {
          _id: '2',
          semester: '2021-2학기',
          title: '인공지능 챌린지'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 3rem 3rem;
  header {
    display: flex;
    justify-content: space-between;
    padding: 3rem 0rem;
    h1 {
      margin-bottom: 0;
    }
    .btn {
      width: 6rem;
    }
  }
  .table {
    text-align: left;
  }
}
</style>
