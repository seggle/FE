<template>
  <div class="container">
    <header>
      <h1 id="title">일반 대회</h1>
      <div v-if="this.$store.getters.isAdmin">
        <button class="btn"
                @click="showModal = true"
        >대회 관리</button>
        <ModalCompetitionAdmin
          v-if="showModal"
          @close="showModal = false"
        />
        <button class="btn"
                @click="goCreateProblem"
        >대회 생성</button>
      </div>
    </header>

    <div class="table-div">
      <table class="table">
        <thead>
          <tr>
            <!-- <th scope="col" class="col-1">#</th> -->
            <th scope="col" class="col-3">대회 제목</th>
            <th scope="col" class="col-2"></th>
            <th scope="col" class="col-2">시작날짜</th>
            <th scope="col" class="col-2"></th>
            <th scope="col" class="col-2">마감날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="count===0"><td colspan="5">등록된 대회가 없습니다.</td></tr>
          <tr v-for="(problem, i) in problemList" :key="problem"
              @click="goProblem(problem.id)">
            <!-- <th scope="row">{{ i + 1 }}</th> -->
            <td class="col-3 probtitle">{{ problem.problem.title }}</td>
            <td>{{ problem.dday }}</td>
            <td>{{ problem.start_time }}</td>
            <td>
              <div class="progress">
                <div class="progress-bar"
                    :class="this.problemList[i].progressBar.type"
                    role="progressbar"
                    :style="{ width: this.problemList[i].progressBar.value + '%' }"
                    :aria-valuenow="this.problemList[i].progressBar.value"
                    aria-valuemin="0"
                    aria-valuemax="100">
                </div>
              </div>
            </td>
            <td>{{ problem.end_time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import ModalCompetitionAdmin from '@/components/ModalCompetitionAdmin.vue'

export default {
  name: 'GeneralList',
  components: {
    ModalCompetitionAdmin
  },
  data () {
    return {
      problemList: [],
      showModal: false,
      count: 0
    }
  },
  mounted () {
    this.getGeneralList()
  },
  methods: {
    async getGeneralList () {
      try {
        const res = await api.getCompetitionList()
        this.count = res.data.length
        this.problemList = res.data.reverse()
        this.setTime()
        this.setProgressBar()
        this.problemList.sort((a, b) => {
          if (a.start_end < b.start_end) return 1
          else if (a.start_end > b.start_end) return -1
        })
        this.problemList.sort((a, b) => {
          if (a.start_end >= 0 & b.start_end >= 0) {
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
          this.problemList[i].start_end = -1
          this.problemList[i].diffDay = -1
        } else if (startDate <= today & endDate >= today) {
          this.problemList[i].start_end = starttoend
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
          this.problemList[i].start_end = -2
          this.problemList[i].dday = '종료'
          this.problemList[i].diffDay = -1
        }
      }
    },
    setProgressBar () {
      for (let i = 0; i < this.problemList.length; i++) {
        const progress = {}
        if (this.problemList[i].start_end === -1) {
          progress.value = 0
          progress.type = 'bg-secondary'
        } else if (this.problemList[i].start_end === -2) {
          progress.value = 100
          progress.type = 'bg-secondary'
        } else {
          progress.value = 100 - ((this.problemList[i].diffDay / this.problemList[i].start_end) * 100)
          if (progress.value <= 50) {
            progress.type = 'bg-info'
          } else if (progress.value <= 70) {
            progress.type = 'bg-warning'
          } else if (progress.value === 100) {
            progress.type = 'bg-success'
          } else {
            progress.type = 'bg-danger'
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
  @media (max-width: 420px) {
    padding: 1rem 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    padding: 3rem 0rem;
    @media (max-width: 768px) {
      display: block;
    }
  }

  .btn {
    @media (max-width: 420px) {
      font-size: 14px;
    }
  }
}
</style>
