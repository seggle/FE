<template>
  <div class="container">

    <header class="board-create-header">
      <h1 id="title">{{ title }}</h1>
      <button class="btn"
              @click="goBoardList">
        <font-awesome-icon icon="angle-left" />
        목록
      </button>
    </header>

    <main class="board-create-content">
      <div class="form-group">
        <label for="proposalTitle">제목</label>
        <input
          type="text"
          class="form-control"
          id="proposalTitle"
          v-model="proposal.title"
          placeholder="글 제목을 입력해주세요."
        />
      </div>

      <div class="form-group">
        <label for="proposalContext">본문</label>
        <textarea
          rows="10"
          class="form-control"
          id="proposalContext"
          v-model="proposal.context"
          placeholder="내용을 입력해주세요."
        />
      </div>
    </main>

    <button
      class="btn"
      id="proposal-submit-btn"
      @click="submitProposal"
    >등록
    </button>
  </div>
</template>
<script>
import api from '@/api/index.js'
export default {
  name: 'BoardCreate',
  data () {
    return {
      title: '',
      mode: this.$route.params.mode,
      proposal: {
        id: this.$route.query.id,
        title: '',
        context: ''
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.mode === 'edit') {
        this.getProposal()
        this.title = '글 수정'
      } else {
        this.title = '글 등록'
      }
    },
    async getProposal () {
      try {
        const res = await api.getProposalDetail(this.proposal.id)
        this.proposal.title = res.data.title
        this.proposal.context = res.data.context
      } catch (error) {
        console.log(error)
      }
    },
    async submitProposal () {
      try {
        const data = {
          title: this.proposal.title,
          context: this.proposal.context
        }

        if (this.mode === 'create') {
          await api.createProposal(data)
        } else {
          await api.editProposal(this.proposal.id, data)
        }

        this.goBoardList()
      } catch (err) {
        console.log(err)
      }
    },
    goBoardList () {
      this.$router.push({ name: 'Board' })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 3rem 3rem;
  @media (max-width: 420px) {
    padding: 1rem 1rem;
  }
}

header {
  display: flex;
  justify-content: space-between;
  padding: 2rem 0rem;
  @media (max-width: 420px) {
    padding: 1rem 0rem;
  }
}

.btn {
  @media (max-width: 420px) {
    font-size: calc(0.5rem + 1.5vw);
  }
}

.form-group {
  text-align: left;

  label {
    font-weight: bold;
    font-size: 20px;
    padding: 10px 0px;
  }

  .form-control {
    resize: none;
    margin-bottom: 10px;
    @media (max-width: 420px) {
      font-size: calc(0.6rem + 1.5vw);
    }
  }
}

#proposal-submit-btn {
  float: right
}
</style>
