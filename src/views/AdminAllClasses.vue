<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1 class="me-auto">전체 수업</h1>
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
        <th class="col-1" scope="col" prop="id">#</th>
        <th class="col-1" scope="col">연도</th>
        <th class="col-1" scope="col">학기</th>
        <th scope="col">수업이름</th>
        <th scope="col">수업 생성자</th>
      </tr>
    </thead>
    <tbody>
      <tr :loading="loading" v-for="Class in ClassList" :key="Class" @click="goClass(Class.id)">
        <th scope="row">{{ Class.id }}</th>
        <td>{{ Class.year}}</td>
        <td>{{ Class.semester}}</td>
        <td>{{ Class.name }}</td>
        <td>{{ Class.created_user }}</td>
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
      <a class="page-link" @click="getClassList(currentPage-1)">이전</a>
    </li>
    <div v-for="page in total" :key="page">
    <li class="page-item active" v-if="page==currentPage"><a class="page-link" @click="getClassList(page)">{{ page }}</a></li>
    <li class="page-item" v-else><a class="page-link" @click="getClassList(page)">{{ page }}</a></li>
    </div>
    <li class="page-item disabled" v-if="currentPage==total">
      <a class="page-link" href="#">다음</a>
    </li>
    <li class="page-item" v-else>
      <a class="page-link" @click="getClassList(currentPage+1)">다음</a>
    </li>
  </ul>
</nav>
</div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'AdminAllClasses',
  data () {
    return {
      ClassList: [],
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
      this.getClassList(1)
    },
    async getClassList (page) {
      try {
        this.loading = true
        this.currentPage = page
        const res = await api.getAdminClassList(page, this.keyword)
        this.loading = false
        this.total = parseInt(res.data.count / 15) + 1
        this.ClassList = res.data.results
      } catch (error) {
        console.log(error)
      }
    },
    goClass (classID) {
      this.$router.push({
        name: 'Class',
        params: { classID: classID }
      })
    }
  },
  watch: {
    'keyword' () {
      this.getClassList(1)
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

.table {
  text-align: left;
  tbody {
    tr:hover {
      background-color: #F4F4F8;
      cursor: pointer;
    }
  }
}
</style>
