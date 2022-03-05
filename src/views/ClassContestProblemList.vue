<!--시험모드인 contest이면서 학생인 경우--->
<template>
  <div
    v-if="testMode && testStart === null && this.$store.state.usertype === '0'"
    class="container"
  >
    <div class="d-flex">
      <h1 class="me-auto">{{ contestTitle }}</h1>
    </div>
    <div class="test">
      <h3 class="datetime">{{ time }}</h3>
      <button class="btn btn-primary px-4 me-sm-3" @click="examStart">
        Start
      </button>
    </div>
  </div>
  <div v-else class="container">
    <div class="d-flex">
      <h1 class="me-auto">{{ contestTitle }}</h1>
      <div class="button-group">
        <button
          v-if="this.$store.getters.isAdmin"
          type="button"
          class="btn btn-sm px-4 me-sm-3"
          @click="goExamManage"
        >
          시험관리
        </button>
        <button
          v-if="this.$store.getters.isAdmin"
          type="button"
          class="btn btn-sm px-4 me-sm-3"
          @click="goEdit"
        >
          문제 편집
        </button>
      </div>
    </div>
    <div class="table-div">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="col-md-1">#</th>
            <th scope="col">제목</th>
            <th scope="col">마감기한</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="problems in problemList" :key="problems">
            <th scope="row">{{ problems.id }}</th>
            <td>
              <a
                @click="
                  goContestProblem(
                    problems.id,
                    problems.start_time,
                    problems.end_time
                  )
                "
                >{{ problems.title }}</a
              >
            </td>
            <td>{{ problems.end_time.slice(0, 10) }}</td>
            <td scope="row">
              <button
                v-if="this.$store.getters.isAdmin"
                class="delete-btn"
                @click="deleteProblem(problems.id)"
              >
                <font-awesome-icon icon="trash-can" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  name: 'ClassContestProblemList',
  data () {
    return {
      classID: this.$route.params.classID,
      contestID: this.$route.params.contestID,
      contestTitle: '',
      problemList: [],
      contestList: [],
      problemID: '',
      testMode: false,
      testStart: localStorage.getItem('test'),
      date: new Date(),
      examUser: []
    }
  },
  created () {
    this.getProblemList(this.$route.params.contestID)
    this.onEverySecond()
  },
  methods: {
    onEverySecond () {
      this.date = new Date()
      setTimeout(this.onEverySecond, 1000)
    },
    goEdit () {
      this.$router.push({ name: 'ClassContestProblemListEdit' })
    },
    goExamManage () {
      const classID = this.classID
      const contestID = this.contestID
      this.$router.push({
        name: 'ClassExamManage',
        params: { classID: classID, contestID: contestID }
      })
    },
    async getProblemList (contestID) {
      try {
        const res1 = await api.getContestList(this.classID)
        this.contestList = res1.data
        for (var i = 0; i < this.contestList.length; i++) {
          if (this.contestList[i].id === parseInt(contestID)) {
            this.contestTitle = this.contestList[i].name
            this.testMode = this.contestList[i].is_exam
          }
        }
        console.log(this.testMode)
      } catch (error) {
        console.log(error)
      }
      try {
        const res2 = await api.getContestProblemList(this.classID, contestID)
        this.problemList = res2.data
        this.problemList.sort(function (a, b) {
          return a.order - b.order
        })
        console.log(typeof this.problemList)
        console.log(this.problemList)
        console.log(this.testMode, this.testStart, this.$store.state.usertype)
      } catch (error) {
        console.log(error)
      }
    },
    async goContestProblem (problemID, start, end) {
      var today = new Date()
      const startTime = new Date(start)
      const endTime = new Date(end)
      if (
        today.getTime() >= startTime.getTime() &&
        today.getTime() <= endTime.getTime()
      ) {
        // console.log('router push 로 이동하기' + problemID)
        this.$router.push({
          name: 'Problem',
          params: {
            problemType: 'class',
            problemID: this.classID,
            contestID: this.contestID,
            contestProblemID: problemID
          }
        })
      } else {
        alert('접근 시간이 아닙니다!')
      }
    },
    async alreadyExist (username) {
      try {
        var flag = false
        console.log(username)
        const res = await api.examInfo(this.classID, this.contestID)
        this.examUser = res.data.results
        console.log(this.examUser)
        for (var i = 0; i < this.examUser.length; i++) {
          if (this.examUser[i].username === username) {
            flag = true
          }
        }
        if (flag === true) return true
        else return false
      } catch (error) {
        console.log(error)
      }
    },
    async examStart () {
      if (confirm('시작하시겠습니까?')) {
        try {
          const data = {
            ip_address: '123.123.123.020'
          }
          const res = await api.examStart(this.classID, this.contestID, data)
          console.log(res.data)
          if (this.alreadyExist(this.$store.state.userid)) {
            localStorage.setItem('test', 'on')
          }
          alert('시험이 시작되었습니다.')
          this.$router.go()
        } catch (err) {
          console.log(err)
          console.log(err.response.data.error)
          alert(err.response.data.error)
        }
      } else {
      }
    },
    async deleteProblem (problemID) {
      try {
        if (confirm(problemID + '번 문제를 삭제하시겠습니까?')) {
          await api.deleteContestProblem(
            this.classID,
            this.contestID,
            problemID
          )
          alert('삭제 완료')
          this.$router.go(this.$router.currentRoute)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    time () {
      return `${this.date.toLocaleTimeString()}`
    }
  },
  watch: {
    $route (to, from) {
      if (to.path !== from.path) {
        if (this.$route.params.contestID !== undefined) {
          this.getProblemList(this.$route.params.contestID)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: black;
  cursor: pointer;
}
.test {
  margin: 30px;
}
</style>
