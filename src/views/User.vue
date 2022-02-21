<template>
  <div class="container">
    <div class="header">
      <h1 id="title">{{ this.$store.state.userid }}님, 반갑습니다!</h1>
      <div class="button-group">
        <button class="btn btn-primary" type="button" @click="goResign">
          회원탈퇴
        </button>
        <button class="btn btn-primary" type="button" @click="goResetPW">
          비밀번호 변경
        </button>
      </div>
    </div>
    <table class="table py-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">문제제목</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col">마감 날짜</th>
          <th scope="col">등수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(problems, index) in problemList" :key="index">
          <td>{{ problemList.indexOf(problems, 0) + 1 }}</td>
          <td>{{ problems.problem_title }}</td>
          <td><progress max="100" value="70">70%</progress></td>
          <td>D- {{ d_day[index] }}</td>
          <td>{{ problems.competition_end_time.slice(0, 10) }}</td>
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
import api from '@/api/index.js'
import 'vue-calendar-heatmap'
export default {
  name: 'User',
  data: () => {
    return {
      problemList: [],
      heatmapValues: [],
      d_day: [],
      endDate: '2021-11-21'
    }
  },
  created () {
    this.showUserInfo()
  },
  methods: {
    goResign () {
      this.$router.push({
        name: 'Resign'
      })
    },
    goResetPW () {
      this.$router.push({
        name: 'ResetPassword'
      })
    },
    async showUserInfo () {
      var username = this.$store.state.userid
      try {
        const res1 = await api.showUserCompetition(username)
        const res2 = await api.showUserCompetition(username)
        this.problemList = res1.data
        this.heatmapValues = res2.data
        console.log(res1.data)
        console.log(res2.data)
        for (var i = 0; i < this.problemList.length; i++) {
          var time = this.problemList[i].competition_end_time
          var year = time.slice(0, 4)
          var month = time.slice(5, 7)
          var date = time.slice(8, 10)
          year = Number(year)
          month = Number(month) - 1
          date = Number(date)
          console.log(year, month, date)
          var dday = new Date(year, month, date)
          var gap = dday.getTime() - new Date().getTime()
          var result = Math.ceil(gap / (1000 * 60 * 60 * 24))
          console.log(result)
          this.d_day.push(result)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 3rem 0rem;

  h1 {
    margin-bottom: 0;
    font-weight: bold;
  }
}

.map {
  background-color: gainsboro;
}
</style>
