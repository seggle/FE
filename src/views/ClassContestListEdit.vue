<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3 justify-content-end">
      <h2 class="me-auto">문제 등록 및 수정</h2>
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
        <button class="btn btn-dark" id="problem-create" @click="openProblem()">저장</button>
      </div>
    </div>
    <div class="row d-flex mb-2 mt-3" style="padding-left: 0px;">
    <div class="col-lg-3 col-md-6 mb-2">
        <h5 style="float:left" class="col-3">수업명</h5>
        <select class="btn-toggle col-9" style="float:left; text-align: center" v-model="classSelected">
            <option value="all">전체</option>
            <option v-for="Class in classlist" :key="Class" :value="Class">{{ Class }}</option>
        </select>
    </div>
    <div class="col-lg-3 col-md-6 mb-2">
        <h5 style="float:left" class="col-3">연도</h5>
        <select class="btn-toggle col-9" style="float:left; text-align: center" v-model="yearSelected">
            <option value=0>전체</option>
            <option v-for="year in yearlist" :key="year" :value="year">{{ year }}</option>
        </select>
    </div>
    <div class="col-lg-3 col-md-6 mb-2">
        <h5 style="float:left" class="col-3">학기</h5>
        <select class="btn-toggle col-9" style="float:left; text-align: center" v-model="semesterSelected">
            <option value=0>전체</option>
            <option value=1>1학기</option>
            <option value=2>2학기</option>
        </select>
    </div>
    <div class="col-lg-3 col-md-6 mb-2">
        <h5 style="float:left" class="col-3">작성자</h5>
        <select class="btn-toggle col-9" style="float:left; text-align: center" v-model="createUserSelected">
            <option value="all">전체</option>
            <option v-for="createUser in createUserlist" :key="createUser" :value="createUser">{{ createUser }}</option>
        </select>
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
      <tr :loading="loading" v-for="problem in problemList" :key="problem">
        <th scope="row">{{ problem.id }}</th>
        <td>{{ problem.title}}</td>
        <td>{{ problem.created_time }}</td>
        <td>{{ problem.created_user }}</td>
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
  name: 'ClassContestListEdit',
  data () {
    return {
      problemList: [],
      loading: false,
      keyword: '',
      total: 0,
      currentPage: 1,
      classSelected: 'all',
      yearSelected: 0,
      semesterSelected: 0,
      createUserSelected: 'all',
      yearlist: [2022, 2023],
      classlist: ['기계학습', '인공지능']
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
        const res = await api.getProblemList(page, this.keyword, this.yearSelected, this.classSelected, parseInt(this.semesterSelected), this.createUserSelected)
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
        const res = await api.changeProblemSwitch(problemID)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    'keyword' () {
      this.getProblemList(1)
    },
    'yearSelected' () {
      this.getProblemList(1)
    },
    'semesterSelected' () {
      this.getProblemList(1)
    },
    'classSelected' () {
      this.getProblemList(1)
    },
    'createUserSelecte' () {
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
