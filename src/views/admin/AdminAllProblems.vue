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
      <div>
        <button class="btn" id="problem-create" @click="openProblem()">+ 문제 생성</button>
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
  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled" v-if="currentPage==1">
      <a class="page-link" tabindex="-1" aria-disabled="true">이전</a>
    </li>
    <li class="page-item" v-else>
      <a class="page-link" @click="getProblemList(currentPage-1)">이전</a>
    </li>
    <div v-for="page in total" :key="page">
    <li class="page-item active" v-if="page==currentPage"><a class="page-link" @click="getProblemList(page)">{{ page }}</a></li>
    <li class="page-item" v-else><a class="page-link" @click="getProblemList(page)">{{ page }}</a></li>
    </div>
    <li class="page-item disabled" v-if="currentPage==total">
      <a class="page-link" href="#">다음</a>
    </li>
    <li class="page-item" v-else>
      <a class="page-link" @click="getProblemList(currentPage+1)">다음</a>
    </li>
  </ul>
</nav>
</div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'AdminAllProblems',
  data () {
    return {
      problemList: [],
      loading: false,
      keyword: '',
      total: 0,
      currentPage: 1
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProblemList(1)
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
          const res = await api.deleteAdminProblem(problemID)
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
a {
  color:black;
  cursor: pointer;
}

</style>
