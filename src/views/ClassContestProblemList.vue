<template>
  <!--시험모드인 contest이면서 학생인 경우--->
  <div
    v-if="
      testMode === true &&
      testShow === false &&
      this.$store.state.usertype === '0'
    "
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
      <div>
        <button
          v-if="this.$store.state.usertype !== '0'"
          type="button"
          class="btn btn-sm px-4 me-sm-3"
          data-bs-toggle="modal"
          data-bs-target="#problemModal
        "
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
            <td><a>삭제</a></td>
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
      testShow: false,
      date: new Date()
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
        console.log(this.testMode, this.testShow, this.$store.state.usertype)
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
        this.$router.push({
          name: 'Problem',
          params: { problemType: 'class', problemID: problemID }
        })
      } else {
        alert('접근 시간이 아닙니다!')
      }
    },
    async examStart () {
      if (confirm('시작하시겠습니까?')) {
        try {
          const res = await api.examStart(this.classID, this.contestID)
          console.log(res.data)
          this.testShow = true
          this.$router.go(this.$router.currentRoute)
        } catch (err) {
          console.log(err)
          console.log(err.response.data.error)
        }
        alert('시험이 시작되었습니다.')
      } else {
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
