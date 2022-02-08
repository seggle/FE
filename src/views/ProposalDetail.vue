<template>
  <div class="container px-5">
    <div class="class-nav-bar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <h1 id="title"></h1>
        </div>
      </nav>
    </div>
    <div class="AddWrap">
      <table class="table table-bordered py-5">
        <colgroup>
          <col width="15%" />
          <col width="*" />
        </colgroup>
        <tr>
          <th>제목</th>
          <td>{{ content.title }}</td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{{ content.created_user }}</td>
          <th>작성일</th>
          <td>{{ content.created_time.slice(0, 10) }}</td>
        </tr>
        <tr>
          <th>내용</th>
          <td rowspan="4">{{ content.context }}</td>
        </tr>
      </table>
    </div>
    <footer>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary btn-sm px-4 me-sm-3"
        data-bs-toggle="modal"
        data-bs-target="#proposalModal
        "
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
        <div class="modal-dialog">
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
                      <input type="text" v-model="title" />
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
                Close
              </button>
              <button
                type="button"
                @click="editProposal"
                class="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="deleteProposal"
        class="btn btn-primary btn-sm px-4 me-sm-3"
      >
        삭제
      </button>

      <router-link
        to="/proposals"
        class="btn btn-primary btn-sm px-4 me-sm-3"
        id="head"
        >목록</router-link
      >
    </footer>
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
        const res = await api.editProposal(proposalId, data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async getContent () {
      try {
        const proposalId = this.$route.params.id
        const res = await api.getProposalDetail(proposalId)
        this.content = res.data
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
.AddWrap {
  padding: 0px 5rem;
  margin-top: 100px;
}
</style>
