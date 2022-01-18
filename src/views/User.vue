<template>
  <div class="container px-5">
    <div class="class-nav-bar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <h1 id="title">{{ user_id }}님, 반갑습니다!</h1>
          <router-link
            :to="`/users/${user_id}`"
            class="btn btn-primary btn-sm px-4 me-sm-3"
            id="head"
            >회원 탈퇴</router-link
          >

          <router-link
            :to="`/users/${user_id}`"
            class="btn btn-primary btn-sm px-4 me-sm-3"
            id="head"
            >비밀번호 변경</router-link
          >
        </div>
      </nav>
    </div>
    <table class="table py-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">문제제목</th>
          <th scope="col"></th>
          <th scope="col">마감 날짜</th>
          <th scope="col">등수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="problems in problemList" :key="problems">
          <td>{{ problemList.indexOf(problems, 0) + 1 }}</td>
          <td>{{ problems.problem_title }}</td>
          <td>
            D-{{
              problems.competition_end_time - problems.competition_start_time
            }}
          </td>
          <td>{{ problems.competition_end_time }}</td>
          <td>
            {{ problems.competition_user_rank }}/{{
              problems.competition_user_total
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="container-sm px-5 py-5">
    <calendar-heatmap :values="heatmapValues" :end-date="endDate" />
  </div>
</template>
<script>
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.browser'
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.common'
import 'vue-calendar-heatmap'
export default {
  name: 'User',
  data () {
    return {
      user_id: 19012345,
      problemList: [
        {
          competition_id: 1,
          problem_id: 1,
          problem_title: '따릉이 대여량 예측 경진대회',
          competition_start_time: '2013-01-29T12:34:56.000000Z',
          competition_end_time: '2013-01-29T12:34:56.000000Z',
          competition_user_rank: 3,
          competition_user_total: 20
        },
        {
          competition_id: 1,
          problem_id: 1,
          problem_title: '따릉이 대여량 예측 경진대회',
          competition_start_time: '2013-01-29T12:34:56.000000Z',
          competition_end_time: '2013-01-29T12:34:56.000000Z',
          competition_user_rank: 3,
          competition_user_total: 20
        }
      ],
      heatmapValues: [
        { date: '2021-9-22', count: 6 },
        { date: '2021-10-22', count: 4 },
        { date: '2021-10-30', count: 1 },
        { date: '2021-11-10', count: 5 },
        { date: '2021-11-20', count: 6 }
      ],
      endDate: '2021-11-21'
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  padding: 0px 4rem;
  margin-top: 50px;
  font-weight: bold;
  text-align: left;
}
.map {
  background-color: gainsboro;
}
</style>
