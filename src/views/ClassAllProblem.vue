<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3 justify-content-end">
      <div>
        <form>
            <input
                class="form-control"
                type="search"
                placeholder="검색"
                aria-label="검색"
                v-model="keyword"
            />
            </form>
      </div>
      <div>
        <button class="btn btn-dark" id="problem-create" @click="openProblem()">+ 문제 생성</button>
      </div>
    </div>
    <div class="table-div">
    <table class="table">
    <thead>
      <tr>
        <th scope="col" prop="id">#</th>
        <th scope="col">제목</th>
        <th scope="col">작성일</th>
        <th scope="col">작성자</th>
        <th scope="col">공개</th>
        <th scope="col">옵션</th>
      </tr>
    </thead>
    <tbody>
      <tr :loading="loading" v-for="problem in problemList" :key="problem">
        <th scope="row">{{ problem.id }}</th>
        <td>{{ problem.title}}</td>
        <td>{{ problem.created_time }}</td>
        <td>{{ problem.created_user }}</td>
        <td>
          <div style="display: inline-block" class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="problem.public" @change="changeSwitch(problem.id)">
          </div>
        </td>
        <td scope="row">
          <a class="ghost-button" @click="openProblem(problem.id)">편집</a> |
          <a class="ghost-button" @click="deleteProblem(problem.id)">삭제</a>
        </td>
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
  name: 'ClassAllProblems',
  components: {
    Pagination
  },
  data () {
    return {
      problemList: [],
      loading: false,
      keyword: '',
      currentPage: 1,
      PageValue: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProblemList(1)
    },
    getPage (page) {
      this.getProblemList(page)
    },
    async getProblemList (page) {
      try {
        this.loading = true
        this.currentPage = page
        this.PageValue = []
        const res = await api.getProblemList(page, this.keyword)
        this.loading = false
        this.PageValue.push({ count: res.data.count, currentPage: this.currentPage })
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
          await api.deleteProblem(problemID)
          this.getProblemList(this.currentPage)
        }
      } catch (error) {
        console.log(error)
      }
    },
    openProblem (problemID) {
      try {
        if (typeof problemID === 'undefined') {
          this.$router.push({
            name: 'CreateProblem',
            params: { problemType: 'class' }
          })
        } else {
          console.log(problemID)
          this.$router.push({
            name: 'Problem',
            params: {
              problemType: 'class',
              problemID: problemID
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async changeSwitch (problemID) {
      try {
        const res = await api.changeProblemSwitch(problemID)
        this.getProblemList(this.currentPage)
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
h5 {
    margin-top:5px;
}
select {
    height:100%
}
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
