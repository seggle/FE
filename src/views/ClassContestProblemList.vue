<template>
  <div class="container">
    <div class="d-flex">
      <h1 class="me-auto">{{ contestTitle }}</h1>
      <div>
        <button
          v-if="this.$store.state.usertype !== 0"
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
      contestID: this.$route.params.classID,
      contestTitle: '',
      problemList: [],
      contestList: [],
      problemID: ''
    }
  },
  created () {
    this.getProblemList(this.$route.params.contestID)
    console.log(this.$store.state.usertype)
  },
  methods: {
    goEditContest () {},
    goEdit () {
      this.$router.push({ name: 'ClassContestProblemListEdit' })
    },
    async getProblemList (contestID) {
      try {
        const res1 = await api.getContestList(this.classID)
        this.contestList = res1.data
        console.log(parseInt(contestID))
        for (var i = 0; i < this.contestList.length; i++) {
          if (this.contestList[i].id === parseInt(contestID)) {
            this.contestTitle = this.contestList[i].name
          }
        }
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
.table-div {
  overflow-x: auto;
}
.table {
  min-width: 700px;
  width: 100%;
  white-space: nowrap;
  border-collapse: collapse;
  tbody {
    tr:hover {
      background-color: #f4f4f8;
      cursor: pointer;
    }
  }
}
a {
  color: black;
  cursor: pointer;
}
.modal-dialog {
  max-width: 80%;
}
</style>
