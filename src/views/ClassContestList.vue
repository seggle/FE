<template>
  <div class="container">
    <div class="d-flex">
      <h1 class="me-auto">전체 문제</h1>
      <div>
        <button class="btn btn-dark" id="problem-create" @click="goEditContest()">+ 문제 생성</button>
      </div>
    </div>
    <div class="table-div">
    <table class="table">
    <thead>
      <tr>
        <th scope="col" prop="id" class="col-md-1">#</th>
        <th scope="col">제목</th>
      </tr>
    </thead>
    <tbody>
      <tr :loading="loading" v-for="problem in problemList" :key="problem">
        <th scope="row">{{ problem.id }}</th>
        <td>{{ problem.title}}</td>
      </tr>
    </tbody>
  </table>
  </div>
</div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'ClassContestList',
  data () {
    return {
      problemList: [
        {
          id: 1,
          title: '분류 실습1-1'
        }
      ],
      loading: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProblemList(1)
    },
    goEditContest () {
      this.$router.push({
        name: 'ClassContestListEdit',
        params: { contestID: this.$route.params.contestID }
      })
    },
    async getProblemList (page) {
      try {
        this.loading = true
        this.currentPage = page
        const res = await api.getAdminProblemList(page, this.keyword)
        this.loading = false
        this.total = parseInt(res.data.count / 15) + 1
        this.problemList = res.data.results
        for (var i = 0; i < this.problemList.length; i++) {
          this.problemList[i].created_time = this.problemList[i].created_time.slice(0, 10) + ' ' + this.problemList[i].created_time.slice(11, 19)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteProblem (problemID) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          const res = await api.deleteProblem(problemID)
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async openProblem (problemID) {
    },
    async submitAnnouncement () {
    },
    async changeSwitch (problemID) {
      try {
        const res = await api.changeAdminProblemSwitch(problemID)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    'keyword' () {
      this.getProblemList(1)
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
    border-collapse:collapse;
}
.btn {
  background: #0e1b49;
  border-radius: 50px;
  margin: 3px;
}
a {
  color:black;
  cursor: pointer;
}

.modal-dialog {
    max-width: 80%;
}
</style>
