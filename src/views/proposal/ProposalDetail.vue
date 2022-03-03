<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <div class="button-group">
        <button @click="goList" class="btn" id="head"><font-awesome-icon icon="angle-left" /> 목록</button>
      </div>
    </div>
    <div class="table-div">
      <table class="table py-3">
        <tbody>
          <tr>
            <td><h5>제목</h5></td>
            <td class="title" colspan="3">{{ content.title }}</td>
          </tr>
          <tr>
            <td><h5>작성자</h5></td>
            <td>{{ content.created_user }}</td>
            <td><h5>작성일</h5></td>
            <td>{{ content.created_time }}</td>
          </tr>
          <tr>
            <td><h5>내용</h5></td>
            <td colspan="3" class="context">
              <pre>{{ content.context }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <button
        type="button"
        class="btn btn-primary px-4 me-sm-3"
        @click="goEdit(this.$route.params.id)"
        v-show="this.$store.state.userid === content.created_user"
      >
        편집
      </button>
      <button
        @click="deleteProposal"
        class="btn btn-primary px-4 me-sm-3"
        v-show="
          this.$store.state.userid === content.created_user ||
          this.$store.getters.isSuperAdmin
        "
      >
        삭제
      </button>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  name: 'ProposalDetail',
  data: () => {
    return {
      content: {},
      title: '',
      context: '',
      date:
        new Date().getFullYear() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getDate()
    }
  },
  created () {
    this.getContent()
  },
  methods: {
    goList () {
      this.$router.push({
        name: 'Proposal'
      })
    },
    async deleteProposal () {
      try {
        const proposalId = this.$route.params.id
        if (confirm('삭제하시겠습니까?')) {
          await api.deleteProposal(proposalId)
          alert('삭제되었습니다.')
          this.goList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getContent () {
      try {
        const proposalId = this.$route.params.id
        const res = await api.getProposalDetail(proposalId)
        this.content = res.data
        this.content.created_time = res.data.created_time.slice(0, 10)
        this.title = res.data.title
        this.context = res.data.context
      } catch (error) {
        console.log(error)
      }
    },
    goEdit (proposalID) {
      this.$router.push({
        name: 'ProposalCreate',
        params: { mode: 'edit' },
        query: { id: proposalID }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-weight: bold;
  text-align: left;
}
.context {
  height: 300px;
}
pre {
  background: transparent;
  font-size: 20px;
  font-weight: bold;
}
textarea {
  width: 100%;
  height: 200px;
}
.table-div {
  .table {
  min-width: 0px;
  text-align: left;
  white-space: normal;
  table-layout: fixed;
  tbody {
    tr:hover {
      background-color: transparent;
      cursor: default;
    }
  }
  tr {
    td {
      text-align: left;
      @media (max-width: 420px) {
        font-size: calc(0.55rem + 2vw);
      }
    }
    h5 {
      text-align: center;
      font-weight: bold;
      @media (max-width: 420px) {
        font-size: calc(0.7rem + 2vw);
      }
    }
  }
  td.title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
}

.button-group {
  margin-left: auto;
}

.btn {
  @media (max-width: 767px) {
    margin-right: 0px;
    font-size: calc(0.5rem + 2vw);
  }
  margin-top: 50px;
  margin-right: 0px;
}
</style>
