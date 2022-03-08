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
    <section>
      <div class="table-div">
        <table class="table py-3">
          <thead>
            <tr>
              <th scope="col" class="col-2">#</th>
              <th scope="col" class="col-3">대회 제목</th>
              <th scope="col" class="col-2"></th>
              <th scope="col" class="col-2">시작 날짜</th>
              <th scope="col" class="col-2"></th>
              <th scope="col" class="col-2">마감 날짜</th>
              <th scope="col" class="col-3">등수</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="generalCount === 0">
              <td colspan="5">등록된 대회가 없습니다.</td>
            </tr>
            <tr
              v-else
              v-for="(problems, i) in generalList"
              :key="problems"
              @click="goProblem(problems.id)"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ problems.title }}</td>
              <td>{{ problems.dday }}</td>
              <td>{{ problems.start_time }}</td>
              <td>
                <div class="progress">
                  <div
                    class="progress-bar"
                    :class="this.generalList[i].progressBar.type"
                    role="progressbar"
                    :style="{
                      width: this.generalList[i].progressBar.value + '%',
                    }"
                    :aria-valuenow="this.generalList[i].progressBar.value"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </td>
              <td>{{ problems.end_time }}</td>
              <td>{{ problems.rank }}/{{ problems.user_total }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container">
        <calendar-heatmap :values="heatmapValues" :end-date="endDate" />
      </div>
    </section>
  </div>
</template>
<script>
import api from '@/api/index.js'
import 'vue-calendar-heatmap'
export default {
  name: 'User',
  data: () => {
    return {
      generalList: [],
      classList: [],
      heatmapValues: [],
      list: [{ date: '2022-3-6', count: 6 }],
      d_day: [],
      generalCount: 0,
      classCount: 0,
      endDate: '',
      general: true
    }
  },
  created () {
    this.showUserCompetition()
    this.showUserHeatmap()
    this.changeElement()
    this.changeEndDate()
  },
  methods: {
    changeEndDate () {
      var today = new Date()
      var year = today.getFullYear()
      var month = today.getMonth() + 1
      var date = '25'
      this.endDate = year + '-' + month + '-' + date
    },
    changeElement () {
      var el = document.getElementsByClassName('vch__month__label')
      console.log(el)
      console.log(el.length)
      for (var i = 0; i < el.length; i++) {
        print(el[i])
        el[i].setAttribute('y', '11')
      }
    },
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
    async showUserCompetition () {
      const username = this.$store.state.userid
      try {
        const res = await api.showUserCompetition(username)
        this.generalCount = res.data.length
        this.generalList = res.data
        this.generalList = this.generalList.reverse()
        console.log(res.data)
        this.setTime()
        this.setProgressBar()
        this.generalList.sort((a, b) => {
          if (a.start_end < b.start_end) return 1
          else if (a.start_end > b.start_end) return -1
        })
        this.generalList.sort((a, b) => {
          if ((a.start_end >= 0) & (b.start_end >= 0)) {
            if (a.diffDay > b.diffDay) return 1
            else if (a.diffDay < b.diffDay) return -1
          }
        })
        console.log(this.generalList)
      } catch (error) {
        console.log(error)
      }
    },
    async showUserHeatmap () {
      const username = this.$store.state.userid
      try {
        const res = await api.showUserHeatmap(username)
        this.heatmapValues = res.data
        console.log(this.heatmapValues)
      } catch (error) {
        console.log(error)
      }
    },
    setTime () {
      for (let i = 0; i < this.generalList.length; i++) {
        const startTime = this.generalList[i].start_time.substring(0, 10)
        const endTime = this.generalList[i].end_time.substring(0, 10)
        this.generalList[i].start_time = startTime
        this.generalList[i].end_time = endTime
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
          this.generalList[i].dday = 'OPEN D - ' + interval
          this.generalList[i].start_end = -1
          this.generalList[i].diffDay = -1
        } else if ((startDate <= today) & (endDate >= today)) {
          this.generalList[i].start_end = starttoend
          let interval = endDate.getTime() - today.getTime()
          interval = Math.floor(interval / (1000 * 60 * 60 * 24))
          if (interval === 0) {
            this.generalList[i].dday = 'D - Day'
            this.generalList[i].diffDay = 0
          } else {
            this.generalList[i].dday = 'D - ' + interval
            this.generalList[i].diffDay = interval
          }
        } else {
          this.generalList[i].start_end = -2
          this.generalList[i].dday = '종료'
          this.generalList[i].diffDay = -1
        }
      }
    },
    setProgressBar () {
      for (let i = 0; i < this.generalList.length; i++) {
        const progress = {}
        if (this.generalList[i].start_end === -1) {
          progress.value = 0
          progress.type = 'bg-secondary'
        } else if (this.generalList[i].start_end === -2) {
          progress.value = 100
          progress.type = 'bg-secondary'
        } else {
          progress.value =
            100 -
            (this.generalList[i].diffDay / this.generalList[i].start_end) * 100
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
        this.generalList[i].progressBar = progress
      }
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
<style lang="scss" scoped>
.container {
  padding: 3rem 3rem;
  @media (max-width: 420px) {
    padding: 1rem 1rem;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 3rem 0rem;
    @media (max-width: 768px) {
      display: block;
    }
  }

  h1 {
    margin-bottom: 0;
    font-weight: bold;
  }

  .btn {
    @media (max-width: 420px) {
      font-size: 14px;
    }
  }

  section {
    margin-top: 10px;
  }
}

// &:hover {
//   background-color: var(--bs-light);
// }
.vch__legend {
  display: inline;
}
.vch__day__label {
  width: 4px;
}
</style>
