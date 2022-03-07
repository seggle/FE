<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1>건의게시판</h1>
      <div class="button-group">
        <button @click="goCreate" class="btn" id="head">글쓰기</button>
      </div>
    </div>
      <table class="table py-3">
        <thead>
          <tr>
            <th class="col-1 tableId" scope="col">#</th>
            <th class="col-7 proposal-title" scope="col">제목</th>
            <th class="col-2" scope="col">작성자</th>
            <th class="col-2" scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="count===0"><td></td><td style="text-align: center;">등록된 게시물이 없습니다.</td><td></td><td></td></tr>
          <tr v-for="proposals in proList" :key="proposals" @click="goProposalDetail(proposals.id)">
            <td class="tableId">{{ proposals.id }}</td>
            <td class="proposal-title">{{proposals.title}}</td>
            <td>{{ proposals.created_user }}</td>
            <td>{{ proposals.created_time.slice(0, 10) }}</td>
          </tr>
        </tbody>
      </table>
    <Pagination :pagination="PageValue" @get-page="getPage" />
  </div>
</template>
<script>
import api from '@/api/index.js'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Board',
  components: {
    Pagination
  },
  data: () => {
    return {
      proList: [],
      PageValue: [],
      currentPage: 1,
      count: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProposal(1)
    },
    getPage (page) {
      this.getProposal(page)
    },
    goCreate () {
      this.$router.push({
        name: 'BoardCreate',
        params: { mode: 'create' }
      })
    },
    async getProposal (page) {
      try {
        this.currentPage = page
        this.PageValue = []
        const res = await api.getProposal(page)
        this.count = res.data.count
        this.PageValue.push({
          count: res.data.count,
          currentPage: this.currentPage
        })
        this.proList = res.data.results
        this.proList.reverse()
      } catch (error) {
        console.log(error)
      }
    },
    goProposalDetail (proposalID) {
      this.$router.push({
        name: 'BoardDetail',
        params: { id: proposalID }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@media (max-width: 420px) {
  .table tr th:nth-child(4), .table tr td:nth-child(4) {
    display: none;
  }
  .table tr th:nth-child(3), .table tr td:nth-child(3) {
    width: 70px;
  }
}
@media (max-width: 991px) {
  .table tr th:nth-child(4), .table tr td:nth-child(4) {
    width: 100px;
  }
}

h1 {
  width: 50%;
  @media (max-width: 767px) {
    font-size: calc(1.3rem + 2vw);
    padding: 0px;
  }
  margin-right: 0px;
  text-align: left;
  padding: 0 4rem 0 0;
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
.button-group {
  margin-left: auto;
}

.table {
  min-width: 0px;
  text-align: left;
  white-space: normal;
  table-layout: fixed;
  th.tableId {
    text-align: center;
  }
  td.proposal-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  td.tableId {
    text-align: center;
  }
  tr {
    @media (max-width: 420px) {
      font-size: calc(0.55rem + 2vw);
      padding: 0px;
    }
  }
}
</style>
