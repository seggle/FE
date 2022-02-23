<template>
<div class="container">
  <header>
    <h1 id="title">일반 대회</h1>
    <button class="btn" @click="goCreateProblem">문제 생성</button>
  </header>
  <div class="table-div">
  <table class="table">
    <thead>
      <tr>
        <!-- <th scope="col" class="col-1">#</th> -->
        <th scope="col" class="col-3">문제 제목</th>
        <th scope="col" class="col-2"></th>
        <th scope="col" class="col-2">시작날짜</th>
        <th scope="col" class="col-2"></th>
        <th scope="col" class="col-2">마감날짜</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(problem, i) in problemList" :key="problem"
          @click="goProblem(problem.id)"
          :style="{ color: `var(--bs-${this.problemList[i].progressBar.type})` }">
        <!-- <th scope="row">{{ i + 1 }}</th> -->
        <td class="col-3 probtitle">{{ problem.problem.title }}</td>
        <td>{{ problem.dday }}</td>
        <td>{{ problem.start_time }}</td>
        <td>
          <div class="progress">
            <div class="progress-bar"
                :class="`bg-${this.problemList[i].progressBar.type}`"
                role="progressbar"
                :style="{ width: this.problemList[i].progressBar.value + '%' }"
                :aria-valuenow="this.problemList[i].progressBar.value"
                aria-valuemin="0"
                aria-valuemax="100"></div>
          </div>
        </td>
        <td>{{ problem.end_time }}</td>
      </tr>
    </tbody>
  </table>
  </div>
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
        this.problemList.reverse()
        this.setTime()
        this.setProgressBar()
        this.problemList.sort((a, b) => {
          if (a.astart_end < b.astart_end) return 1
          else if (a.astart_end > b.astart_end) return -1
        })
        this.problemList.sort((a, b) => {
          if (a.astart_end >= 0 & b.astart_end >= 0) {
            if (a.diffDay > b.diffDay) return 1
            else if (a.diffDay < b.diffDay) return -1
          }
        })
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
        const today = new Date()
        endDate.setHours(23, 59, 59, 0)
        today.setHours(0, 0, 0, 0)
        let starttoend = endDate.getTime() - startDate.getTime()
        starttoend = Math.floor(starttoend / (1000 * 60 * 60 * 24)) + 1
        if (startDate > today) {
          let interval = startDate.getTime() - today.getTime()
          interval = Math.floor(interval / (1000 * 60 * 60 * 24))
          this.problemList[i].dday = 'OPEN D - ' + interval
          this.problemList[i].astart_end = -1
          this.problemList[i].diffDay = -1
        } else if (startDate <= today & endDate >= today) {
          this.problemList[i].astart_end = starttoend
          let interval = endDate.getTime() - today.getTime()
          interval = Math.floor(interval / (1000 * 60 * 60 * 24))
          if (interval === 0) {
            this.problemList[i].dday = 'D - Day'
            this.problemList[i].diffDay = 0
          } else {
            this.problemList[i].dday = 'D - ' + interval
            this.problemList[i].diffDay = interval
          }
        } else {
          this.problemList[i].astart_end = -2
          this.problemList[i].dday = '종료'
          this.problemList[i].diffDay = -1
        }
      }
    },
    setProgressBar () {
      for (let i = 0; i < this.problemList.length; i++) {
        const progress = {}
        if (this.problemList[i].astart_end === -1) {
          progress.value = 0
          progress.type = 'secondary'
        } else if (this.problemList[i].astart_end === -2) {
          progress.value = 100
          progress.type = 'secondary'
        } else {
          progress.value = 100 - ((this.problemList[i].diffDay / this.problemList[i].astart_end) * 100)
          if (progress.value <= 50) {
            progress.type = 'info'
          } else if (progress.value <= 70) {
            progress.type = 'warning'
          } else if (progress.value === 100) {
            progress.type = 'success'
          } else {
            progress.type = 'danger'
          }
        }
        this.problemList[i].progressBar = progress
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
    table-layout: fixed;
    font-weight: 500;
    tbody {
      td.probtitle {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  a.ghost-button {
    color: black;
  }
  a.ghost_button:hover {
    text-decoration: underline;
  }
}
</style>
