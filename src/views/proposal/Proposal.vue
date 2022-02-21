<template>
  <div class="container px-5">
    <div class="d-flex mb-2 mt-3">
      <h1 class="me-auto">건의게시판</h1>
      <div class="button-group">
        <button @click="goCreate" class="btn" id="head">글쓰기</button>
      </div>
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
    <Pagination :pagination="PageValue" @get-page="getPage" />
  </div>
</template>
<script>
import api from '@/api/index.js'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Proposal',
  components: {
    Pagination
  },
  data: () => {
    return {
      proList: [],
      PageValue: [],
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
    getPage (page) {
      this.getProposal(page)
    },
    goCreate () {
      this.$router.push({
        name: 'ProposalCreate'
      })
    },
    async getProposal (page) {
      try {
        this.currentPage = page
        this.PageValue = []
        const res = await api.getProposal(page)
        this.PageValue.push({
          count: res.data.count,
          currentPage: this.currentPage
        })
        this.proList = res.data.results
        this.proList.reverse()
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
