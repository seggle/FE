<template>
<div class="container">
  <header>
    <h1 id="title">일반 대회</h1>
    <button class="btn" @click="goCreateProblem">문제 생성</button>
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
      <tr v-for="(problem, i) in problemList" :key="problem" @click="goProblem(problem.competition_id)">
        <th scope="row">{{ problem.competition_id }}</th>
        <td>{{ problem.title }}</td>
        <td>D-{{ this.diffDay[i] }}</td>
        <td>{{ problem.start_time }}</td>
        <td>
          <div class="progress">
            <div class="progress-bar"
                :class="this.progressBar[i].type"
                role="progressbar"
                :style="{ width: this.progressBar[i].value + '%' }"
                :aria-valuenow="this.progressBar[i].value"
                aria-valuemin="0"
                aria-valuemax="100"></div>
          </div>
        </td>
        <td>{{ problem.end_time }}</td>
      </tr>
    </tbody>
  </table>
  <Pagination :pagination="PageValue" @get-page="getPage"/>
</div>
</template>

<script>
import api from '@/api/index.js'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'GeneralList',
  components: {
    Pagination
  },
  data () {
    return {
      problemList: [],
      diffDay: [],
      progressBar: [],
      currentPage: 1,
      PageValue: []
    }
  },
  mounted () {
    this.getGeneralList(1)
  },
  methods: {
    getPage (page) {
      this.getGeneralList(page)
    },
    async getGeneralList (page) {
      try {
        this.currentPage = page
        this.PageValue = []
        const res = await api.getCompetitionList()
        this.PageValue.push({ count: res.data.count, currentPage: this.currentPage })
        this.problemList = res.data.results
        this.setTime()
        this.setProgressBar()
      } catch (err) {
        console.log(err)
      }
    },
    setTime () {
      for (let i = 0; i < this.problemList.length; i++) {
        const startTime = this.problemList[i].start_time.substring(0, 10)
        const endTime = this.problemList[i].end_time.substring(0, 10)
        this.problemList[i].start_time = startTime
        this.problemList[i].end_time = endTime
        // D-Day 설정
        const startDate = new Date(startTime.replace(/-/g, '/'))
        const endDate = new Date(endTime.replace(/-/g, '/'))
        let interval = endDate.getTime() - startDate.getTime()
        interval = Math.floor(interval / (1000 * 60 * 60 * 24))
        this.diffDay.push(interval)
      }
    },
    setProgressBar () {
      for (let i = 0; i < this.problemList.length; i++) {
        const progress = {}
        progress.value = 100 - this.diffDay[i]
        if (progress.value < 0) {
          progress.value = 0
        }

        if (this.diffDay[i] <= 0) {
          progress.type = 'bg-secondary'
        } else if (this.diffDay[i] <= 3) {
          progress.type = 'bg-danger'
        } else if (this.diffDay[i] <= 7) {
          progress.type = 'bg-warning'
        } else {
          progress.type = 'bg-success'
        }
        this.progressBar.push(progress)
      }
    },
    goCreateProblem () {
      this.$router.push({
        name: 'CreateProblem',
        params: { problemType: 'general' }
      })
    },
    goProblem (problemID) {
      this.$router.push({
        name: 'Problem',
        params: { problemType: 'general', problemID: problemID }
      })
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
  .table {
    tbody {
      tr:hover {
        background-color: #F4F4F8;
        cursor: pointer;
      }
    }
  }
}
</style>
