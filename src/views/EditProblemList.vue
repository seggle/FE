<template>
  <div class="container">
    <div class="d-flex">
      <h1 class="me-auto">{{ contestTitle }}</h1>
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
          <tr v-for="problem in problemList" :key="problem">
            <th scope="row">{{ problem.id }}</th>
            <td>
              <router-link>{{ problem.title }}</router-link>
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
  name: 'EditProblemList',
  data () {
    return {
      classID: this.$route.params.classID,
      contestID: this.$route.params.contestID,
      contestTitle: '',
      problemList: [],
      contestList: [],
      problemID: ''
    }
  },
  mounted () {
    this.getProblemList()
  },
  methods: {
    goEditContest () {},
    goEdit () {
      this.$router.push({ name: 'ClassContestListEdit' })
    },
    async getProblemList () {
      try {
        const res1 = await api.getContestList(this.classID)
        this.contestList = res1.data
        console.log(parseInt(this.contestID))
        for (var i = 0; i < this.contestList.length; i++) {
          if (this.contestList[i].id === parseInt(this.contestID)) {
            this.contestTitle = this.contestList[i].name
          }
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
}
.btn {
  background: #0e1b49;
  border-radius: 50px;
  margin: 3px;
}
a {
  color: black;
  cursor: pointer;
}
.modal-dialog {
  max-width: 80%;
}
</style>
