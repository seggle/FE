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
    <Pagination :pagination="PageValue" @get-page="getPage"/>
  </div>
</template>

<script>
import api from '@/api/index.js'
import Pagination from '../../components/Pagination.vue'

export default {
  components: { Pagination },
  name: 'AdminAllClasses',
  data () {
    return {
      ClassList: [],
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
      this.getClassList(1)
    },
    getPage (page) {
      this.getClassList(page)
    },
    async getClassList (page) {
      try {
        this.loading = true
        this.currentPage = page
        this.PageValue = []
        const res = await api.getAdminClassList(page, this.keyword)
        this.loading = false
        this.PageValue.push({ count: res.data.count, currentPage: this.currentPage })
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
@media (max-width: 420px) {
  .form-control {
    float: right;
    width: 80%;
    height: 1.8rem;
    font-size: calc(0.55rem + 1.5vw);
  }
}
.table {
  min-width:950px;
  table-layout: fixed;
  text-align: left;
  tbody {
    tr:hover {
      cursor: default;
    }
    td.email {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
h1 {
  font-weight: bold;
  width: 60%;
  text-align: left;
  @media (max-width: 420px) {
    font-size: calc(1.2rem + 2vw);
  }
}
</style>
