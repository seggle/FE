<template>
  <div class="container px-5">
    <div class="class-nav-bar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <h1 id="title">건의게시판</h1>
          <router-link
            to="/proposals/create"
            @click="write"
            class="btn btn-primary btn-md px-4"
            id="head"
            >글쓰기</router-link
          >
        </div>
      </nav>
    </div>
    <div class="table-div">
      <table class="table py-3">
        <thead>
          <tr>
            <th class="col-1 tableId" scope="col">#</th>
            <th scope="col">제목</th>
            <th class="col-2" scope="col">작성자</th>
            <th class="col-2" scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proposals in proList" :key="proposals">
            <td class="tableId">{{ proposals.id }}</td>
            <td>
              <router-link :to="`/proposals/${proposals.id}`" class="title">{{
                proposals.title
              }}</router-link>
            </td>
            <td>{{ proposals.created_user }}</td>
            <td>{{ proposals.created_time.slice(0, 10) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled" v-if="currentPage == 1">
          <a class="page-link" tabindex="-1" aria-disabled="true">이전</a>
        </li>
        <li class="page-item" v-else>
          <a class="page-link" @click="getProposal(currentPage - 1)">이전</a>
        </li>
        <div v-for="page in total" :key="page">
          <li class="page-item active" v-if="page == currentPage">
            <a class="page-link" @click="getProposal(page)">{{ page }}</a>
          </li>
          <li class="page-item" v-else>
            <a class="page-link" @click="getProposal(page)">{{ page }}</a>
          </li>
        </div>
        <li class="page-item disabled" v-if="currentPage == total">
          <a class="page-link" href="#">다음</a>
        </li>
        <li class="page-item" v-else>
          <a class="page-link" @click="getProposal(currentPage + 1)">다음</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import api from '@/api/index.js'
export default {
  name: 'Proposal',

  data: () => {
    return {
      proList: [],
      total: 0,
      currentPage: 1
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProposal(1)
    },
    async getProposal (page) {
      try {
        const res = await api.getProposal(page)
        this.proList = res.data.results
        this.proList.reverse()
        console.log(res.data.results)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  padding: 0px 4rem;
  margin-top: 50px;
  font-weight: bold;
  text-align: left;
}
.map {
  background-color: gainsboro;
}
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
div.table-div {
  padding: 0 4rem;
}

.btn {
  margin-top: 50px;
  margin-right: 4rem;
}

.table {
  text-align: left;
  th.tableId {
    text-align: center;
  }
  td.tableId {
    text-align: center;
  }
  tr {
    a.title {
      font-weight: normal;
    }
  }
  a {
  color: black;
  text-decoration: none;
}
}
</style>
