<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1>{{ title }}</h1>
      <div class="button-group">
        <button @click="goList" class="btn" id="head"><font-awesome-icon icon="angle-left" /> 목록</button>
      </div>
    </div>
    <div class="container">
      <div class="form-group">
        <div class="title">제목</div>
        <div>
        <input
          type="text"
          class="form-control"
          id="proposalTitle"
          v-model="proposalTitle"
          placeholder="글 제목을 입력해주세요."
        />
        </div>
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
      proposalContext: '',
      title: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.$route.params.mode === 'edit') {
        this.getProposal(this.$route.query.id)
        this.title = '글 수정'
      } else {
        this.title = '글 등록'
      }
    },
    goList () {
      this.$router.push({
        name: 'Proposal'
      })
    },
    async submitProposal () {
      try {
        const data = {
          title: this.proposalTitle,
          context: this.proposalContext
        }
        if (this.$route.params.mode === 'create') {
          await api.createProposal(data)
        } else {
          await api.editProposal(this.$route.query.id, data)
        }
        this.$router.push({ path: '/proposals' })
      } catch (err) {
        console.log(err)
      }
    },
    async getProposal (proposalID) {
      try {
        const res = await api.getProposalDetail(proposalID)
        this.proposalTitle = res.data.title
        this.proposalContext = res.data.context
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@media (max-width: 420px) {
  .form-control {
    font-size: calc(0.6rem + 1.5vw);
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
.form-control {
  float: left;
  width: 100%;
}
.button-group {
  margin-left: auto;
}
.btn {
  float: right;
  @media (max-width: 767px) {
    font-size: calc(0.5rem + 2vw);
  }
  margin-top: 50px;
}
</style>
