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
      <table class="tbAdd">
        <colgroup>
          <col width="15%" />
          <col width="*" />
        </colgroup>
        <tr>
          <th>제목</th>
          <td>
            <textarea
              id="proposal-title"
              placeholder="제목 입력"
              v-model="proposalTitle"
              required
            ></textarea>
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td rowspan="4">
            <textarea
              id="proposal-context"
              placeholder="건의사항 입력"
              v-model="proposalContext"
              required
            ></textarea>
          </td>
        </tr>
      </table>
      <button
        type="button"
        class="btn btn-primary"
        id="proposal-submit"
        @click="submitProposal"
      >
        등록
      </button>
    </div>
  </div>
</template>
<script>
import api from '@/api/index.js'
export default {
  name: 'ProposalCreate',
  data: () => {
    return {
      proposalTitle: '',
      proposalContext: ''
    }
  },
  methods: {
    async submitProposal () {
      try {
        const data = {
          title: this.proposalTitle,
          context: this.proposalContext
        }
        const res = await api.createProposal(data)
        console.log(res.data)
        this.$router.push({ path: '/proposals' })
      } catch (err) {
        console.log(err)
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
.tbAdd th,
.tbAdd td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.tbAdd td {
  padding: 10px 10px;
  box-sizing: border-box;
}
.tbAdd td input {
  width: 100%;
  min-height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
}
.tbAdd td textarea {
  width: 100%;
  min-height: 300px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
