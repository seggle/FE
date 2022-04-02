<template>
  <div class="container">

    <header class="board-header">
      <h1 id="title">건의게시판</h1>
      <button class="btn"
              @click="goCreateProposal"
      >글쓰기</button>
    </header>

    <table class="table">
      <thead>
        <tr>
          <th class="col-1" scope="col">#</th>
          <th class="col-7" scope="col">제목</th>
          <th class="col-2" scope="col">작성자</th>
          <th class="col-2" scope="col">작성일</th>
        </tr>
      </thead>
      <tbody>
       <tr v-if="count===0">
         <td></td>
         <td>등록된 게시물이 없습니다.</td>
         <td></td>
         <td></td>
       </tr>

        <tr v-for="proposal in proposalList"
            :key="proposal"
            @click="goProposalDetail(proposal.id)">
          <td>{{ proposal.id }}</td>
          <td>{{proposal.title}}</td>
          <td>{{ proposal.created_user }}</td>
          <td>{{ setCreatedTime(proposal.created_time) }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pageValue"
                @get-page="getPage" />
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
  data () {
    return {
      proposalList: [],
      pageValue: [],
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
    setPagination (page) {
      this.currentPage = page
      this.pageValue = []

      this.pageValue.push({
        count: this.count,
        currentPage: this.currentPage
      })
    },
    async getProposal (page) {
      try {
        const res = await api.getProposal(page)
        this.proposalList = res.data.results.reverse()
        this.proposalList.reverse()

        this.count = res.data.count
        this.setPagination(page)
      } catch (error) {
        console.log(error)
      }
    },
    setCreatedTime (createdTime) {
      return createdTime.slice(0, 10)
    },
    goCreateProposal () {
      this.$router.push({
        name: 'BoardCreate',
        params: { mode: 'create' }
      })
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
.container {
  padding: 3rem 3rem;
  @media (max-width: 991px) {
    padding: 2rem 2rem;
  }
  @media (max-width: 420px) {
    padding: 1rem 1rem;
  }
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 0rem;
  @media (max-width: 420px) {
    padding: 1rem 0rem;
  }

  .btn {
    width: 6rem;
    height: 2.5rem;
    @media (max-width: 420px) {
      width: 5rem;
      font-size: 14px;
    }
  }
}

.table {
  min-width: 0px;
  text-align: left;
  white-space: normal;
  table-layout: fixed;

  th:nth-child(2) {
    text-align: left;
  }

  td:nth-child(2) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
  }

  th:nth-child(3),
  td:nth-child(3) {
    @media (max-width: 991px) {
      width: 100px;
    }
    @media (max-width: 420px) {
      width: 70px;
    }
  }

  th:nth-child(4),
  td:nth-child(4) {
    @media (max-width: 991px) {
      width: 120px;
    }
    @media (max-width: 420px) {
      display: none;
    }
  }

  tr {
    @media (max-width: 420px) {
      font-size: calc(0.55rem + 2vw);
      padding: 0px;
    }
  }
}

</style>
