<!--시험모드인 contest이면서 학생인 경우-->
<template>
  <div v-if="beforeTest() && isClassStudent()" class="container">
    <header class="title">
      <h1>{{ contestTitle }}</h1>
    </header>
    <div class="test">
      <h3 class="datetime">{{ time }}</h3>
      <button class="btn btn-primary px-4 me-sm-3" @click="examStart">
        Start
      </button>
    </div>
  </div>
  <div v-else class="container">
    <header class="title">
      <h1>{{ contestTitle }}</h1>
      <div class="button-group" v-if="isTAOverPrivilege()">
        <button
          v-if="testMode"
          type="button"
          class="btn btn-sm px-4 me-sm-3"
          @click="goExamManage"
        >
          시험관리
        </button>
        <button
          type="button"
          class="btn btn-sm px-4 me-sm-3"
          @click="goContestProblemListEdit"
        >
          문제 편집
        </button>
      </div>
    </header>
    <div class="table-div">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="col-md-1">#</th>
            <th scope="col">제목</th>
            <th scope="col">마감기한</th>
            <th scope="col" v-if="isTAOverPrivilege()"></th>
            <th scope="col" v-if="isTAOverPrivilege()"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="count === 0">
            <td colspan="5">등록된 문제가 없습니다.</td>
          </tr>

          <tr v-for="(problems, i) in contestProblemList" :key="problems">
            <th @click="
                  goContestProblem(
                    problems.id,
                    problems.start_time,
                    problems.end_time
                  )
                " scope="row">{{ i + 1 }}</th>
            <td @click="
                  goContestProblem(
                    problems.id,
                    problems.start_time,
                    problems.end_time
                  )
                ">
              <a>{{ problems.title }}</a>
            </td>
            <td @click="
                  goContestProblem(
                    problems.id,
                    problems.start_time,
                    problems.end_time
                  )
                ">{{ problems.end_time }}</td>
            <td scope="row" v-if="isTAOverPrivilege()">
              <button
                class="edit-btn"
                @click="EditClassContestProblem(problems.id)"
              >
                <font-awesome-icon icon="pen" />
              </button>
            </td>
            <td scope="row" v-if="isTAOverPrivilege()">
              <button
                class="delete-btn"
                @click="deleteContestProblem(problem.id)"
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
      contestProblemList: [],
      problemID: '',
      testMode: false,
      testStart: localStorage.getItem('test'),
      date: new Date(),
      examUserList: [],
      userPrivilege: 0,
      count: 0
    }
  },
  created () {
    this.getContestInfo(this.$route.params.contestID)
    this.getClassUserList()
    this.getContestProblemList(this.$route.params.contestID)
    this.onEverySecond()
  },
  methods: {
    beforeTest () {
      return this.testMode && this.testStart === null
    },
    async getClassUserList () {
      const res = await api.getClassUserList(this.classID)
      for (const classUser of res.data) {
        if (classUser.username === this.$store.state.userid) {
          this.userPrivilege = classUser.privilege
        }
      }
    },
    isClassStudent () {
      return this.userPrivilege === 0
    },
    isTAOverPrivilege () {
      return this.userPrivilege > 0
    },
    onEverySecond () {
      this.date = new Date()
      setTimeout(this.onEverySecond, 1000)
    },
    goContestProblemListEdit () {
      this.$router.push({ name: 'ClassContestProblemListEdit' })
    },
    goExamManage () {
      this.$router.push({
        name: 'ClassExamManage',
        params: { classID: this.classID, contestID: this.contestID }
      })
    },
    EditClassContestProblem (contestProblemID) {
      this.$router.push({
        name: 'EditClassContestProblem',
        params: {
          contestID: this.contestID,
          contestProblemID: contestProblemID
        }
      })
    },
    async getContestInfo (contestID) {
      try {
        const res = await api.getContestList(this.classID)
        for (const contest of res.data) {
          if (contest.id === parseInt(contestID)) {
            this.contestTitle = contest.name
            this.testMode = contest.is_exam
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getContestProblemList (contestID) {
      try {
        const res = await api.getContestProblemList(this.classID, contestID)
        this.contestProblemList = res.data
        this.count = res.data.length
        for (const contestProblem of this.contestProblemList) {
          contestProblem.end_time = contestProblem.end_time.slice(0, 10)
        }
        this.contestProblemList.sort(function (a, b) {
          return a.order - b.order
        })
      } catch (err) {
        console.log(err)
      }
    },
    async goContestProblem (problemID, start, end) {
      if (this.isExamTime(start, end)) {
        this.$router.push({
          name: 'ClassContestProblem',
          params: {
            contestID: this.contestID,
            contestProblemID: problemID
          }
        })
      } else {
        alert('접근 시간이 아닙니다!')
      }
    },
    isExamTime (start, end) {
      const today = new Date()
      const startTime = new Date(start)
      const endTime = new Date(end)
      return (
        startTime.getTime() <= today.getTime() &&
        today.getTime() <= endTime.getTime()
      )
    },
    async alreadyExist (username) {
      try {
        const res = await api.examInfo(this.classID, this.contestID)
        this.examUserList = res.data.results
        for (const examUser of this.examUserList) {
          if (examUser.username === username) {
            return true
          }
        }
        return false
      } catch (err) {
        console.log(err)
      }
    },
    async examStart () {
      if (confirm('시작하시겠습니까?')) {
        try {
          await api.examStart(this.classID, this.contestID)
          if (this.alreadyExist(this.$store.state.userid)) {
            localStorage.setItem('test', 'on')
          }
          alert('시험이 시작되었습니다.')
          this.$router.go()
        } catch (err) {
          alert(err.response.data.error)
        }
      } else {
      }
    },
    async deleteContestProblem (problemID) {
      try {
        if (confirm(problemID + '번 문제를 삭제하시겠습니까?')) {
          await api.deleteContestProblem(
            this.classID,
            this.contestID,
            problemID
          )
          alert('삭제되었습니다.')
          this.$router.go(this.$router.currentRoute)
        }
      } catch (err) {
        console.log(err)
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
          this.getContestInfo(this.$route.params.contestID)
          this.getContestProblemList(this.$route.params.contestID)
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

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    display: block;
  }
}

h1 {
  display: block;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 500px) {
    max-width: 100%;
  }
}
</style>
