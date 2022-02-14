<template>
  <div class="container">
    <div class="d-flex">
      <h1 class="me-auto">{{ contestTitle }}</h1>
      <div>
        <button
          v-if="this.$store.state.usertype !== 0"
          type="button"
          class="btn btn-primary btn-sm px-4 me-sm-3"
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="problems in problemList" :key="problems">
            <th scope="row">{{ problems.id }}</th>
            <td>
              <router-link
                :to="`class/${classID}/contests/${contestID}/${problems.id}`"
                >{{ problems.title }}</router-link
              >
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
      problemID: ''
    }
  },
  mounted () {
    this.getProblemList()
  },
  methods: {
    goEditContest () {},
    goEdit () {
      this.$router.push({ name: 'ClassContestProblemListEdit' })
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
      try {
        const res2 = await api.getContestProblemList(
          this.classID,
          this.contestID
        )
        this.problemList = res2.data
        console.log(typeof this.problemList)
        console.log(this.problemList)
      } catch (error) {
        console.log(typeof this.classID, typeof this.contestID)
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
  tbody {
    tr:hover {
      background-color: #f4f4f8;
      cursor: pointer;
    }
  }
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
