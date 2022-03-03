<template>
  <div class="container">
    <div class="d-flex flex-wrap mb-2 mt-3">
      <h1 class="me-auto">전체 문제</h1>
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
    </div>
    <div class="table-div">
    <table class="table">
    <thead>
      <tr>
        <th scope="col" prop="id">#</th>
        <th scope="col">제목</th>
        <th scope="col">작성일</th>
        <th scope="col">작성자</th>
        <th scope="col">옵션</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="count===0"><td colspan="5">게시물이 없습니다.</td></tr>
      <tr :loading="loading" v-for="problem in problemList" :key="problem">
        <th scope="row">{{ problem.id }}</th>
        <td>{{ problem.title}}</td>
        <td>{{ problem.created_time }}</td>
        <td>{{ problem.created_user }}</td>
        <td scope="row">
          <button class="delete-btn"
                  @click="deleteProblem(problem.id)">
            <font-awesome-icon icon="trash-can" />
          </button>
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
import Pagination from '../../components/Pagination.vue'

export default {
  components: { Pagination },
  name: 'AdminAllProblems',
  data () {
    return {
      problemList: [],
      loading: false,
      keyword: '',
      total: 0,
      currentPage: 1,
      PageValue: [],
      count: 0
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
        const res = await api.getAdminProblemList(page, this.keyword)
        console.log(res.data)
        this.count = res.data.count
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
          await api.deleteAdminProblem(problemID)
          const res = await api.getProblemList(1, this.keyword)
          if (this.currentPage !== 1 && res.data.count / 15 < this.currentPage) {
            this.currentPage = this.currentPage - 1
          }
          this.getProblemList(this.currentPage)
        }
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
@media (max-width: 420px) {
  .form-control {
    float: right;
    width: 80%;
    height: 1.8rem;
    font-size: calc(0.55rem + 1.5vw);
  }
}
a {
  color:black;
  cursor: pointer;
}
h1 {
  width: 40%;
  text-align: left;
  font-size: calc(1rem + 2vw);
}
</style>
