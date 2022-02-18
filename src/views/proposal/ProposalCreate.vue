<template>
  <div class="container px-5">
    <div class="class-nav-bar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <h1 id="title">글 등록</h1>
          <router-link
            to="/proposals"
            class="btn btn-primary btn-md px-4"
            id="head"
            >목록</router-link
          >
        </div>
      </nav>
    </div>
    <div class="container">
      <div class="form-group">
        <div class="title">제목</div>
        <input
          type="text"
          class="form-control"
          id="proposalTitle"
          v-model="proposalTitle"
          placeholder="글 제목을 입력해주세요."
        />
      </div>

      <div class="form-group">
        <div class="context">본문</div>
        <textarea
          rows="10"
          class="form-control"
          id="proposalContext"
          v-model="proposalContext"
          placeholder="내용을 입력해주세요."
        />
      </div>
    </div>
    <button
      type="button"
      class="btn btn-primary btn-sm px-4 me-sm-3"
      id="proposal-submit"
      @click="submitProposal"
    >
      등록
    </button>
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
  padding: 0px 4rem;
  margin-top: 50px;
  font-weight: bold;
  text-align: left;
}
.title,
.context {
  font-weight: bold;
  text-align: left;
  margin: 10px;
}
</style>
