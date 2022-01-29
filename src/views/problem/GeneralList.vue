<template>
<div class="container">
  <header>
    <h1 id="title">일반 대회</h1>
    <button class="btn">문제 생성</button>
  </header>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">문제 제목</th>
        <th scope="col">디데이</th>
        <th scope="col">시작 날짜</th>
        <th scope="col">프로그레스 바</th>
        <th scope="col">마감날짜</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="problem in problemList" :key="problem">
        <th scope="row">{{ problem._id }}</th>
        <td>{{ problem.title }}</td>
        <td>D-5</td>
        <td>{{ problem.startTime }}</td>
        <td>
          <div class="progress">
            <div class="progress-bar"
                :class="this.progress.type"
                role="progressbar"
                :style="{ width: this.progress.value + '%' }"
                :aria-valuenow="this.progress.value"
                aria-valuemin="0"
                aria-valuemax="100"></div>
          </div>
        </td>
        <td>{{ problem.endTime }}</td>
      </tr>
    </tbody>
  </table>
  <Pagination/>
</div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'GeneralList',
  components: {
    Pagination
  },
  data () {
    return {
      problemList: [ // api로 받아올 부분
        {
          _id: '1',
          title: '따릉이 대여량 예측 경진대회',
          startTime: '2022-02-11',
          endTime: '2022-02-20'
        },
        {
          _id: '2',
          title: '와인 품질 분류 경진대회',
          startTime: '2022-03-01',
          endTime: '2022-03-10'
        },
        {
          _id: '3',
          title: '가스공급량 수요예측',
          startTime: '2021-11-10',
          endTime: '2021-12-30'
        }
      ],
      progress: {
        value: '25',
        type: 'bg-success'
      }
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
  }
}
</style>
