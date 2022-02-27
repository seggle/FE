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
            <td colspan="3" class="context">{{ content.context }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary btn-sm px-4 me-sm-3"
        data-bs-toggle="modal"
        data-bs-target="#proposalModal
        "
        v-show="this.$store.state.userid === content.created_user"
      >
        편집
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="proposalModal"
        tabindex="-1"
        aria-labelledby="proposalModal
        Label"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="proposalModal
              Label"
              >
                건의사항 편집
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <table class="tbAdd">
                  <colgroup>
                    <col width="15%" />
                    <col width="*" />
                  </colgroup>
                  <tr>
                    <th>제목</th>
                    <td>
                      <!-- v-model 양뱡향데이터전송으로 상세 데이터 넣어준다 -->
                      <input type="text" v-model="title" style="width: 350px" />
                    </td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td>{{ content.created_user }}</td>
                  </tr>
                  <tr>
                    <th>수정일</th>
                    <td>{{ date }}</td>
                  </tr>
                  <tr>
                    <th>내용</th>
                    <td><textarea v-model="context"></textarea></td>
                  </tr>
                </table>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                취소
              </button>
              <button
                type="button"
                @click="editProposal"
                class="btn btn-primary"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="deleteProposal"
        class="btn btn-primary btn-sm px-4 me-sm-3"
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
          console.log(proposalId)
          const res = await api.deleteProposal(proposalId)
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editProposal () {
      try {
        const data = {
          title: this.title,
          context: this.context
        }
        const proposalId = this.$route.params.id
        console.log(proposalId)
        if (confirm('저장하시겠습니까?')) {
          const res = await api.editProposal(proposalId, data)
          console.log(res.data)
          alert('저장 완료')
          this.$router.go()
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
textarea {
  width: 350px;
  height: 100px;
}

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
