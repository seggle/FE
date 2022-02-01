<template>
  <div class="container px-5">
    <div class="class-nav-bar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <h1 id="title">건의게시판</h1>
          <router-link
            to="/proposals/create"
            @click="write"
            class="btn btn-primary btn-sm px-4 me-sm-3"
            id="head"
            >글쓰기</router-link
          >
        </div>
      </nav>
      <paginated-list-pro :list-array="proList" />
    </div>
  </div>
</template>
<script>
import api from '@/api/index.js'
import PaginatedListPro from '@/components/PaginatedListPro.vue'
export default {
  name: 'Proposal',
  components: {
    PaginatedListPro
  },
  data: () => {
    return {
      proList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProposal(0)
    },
    async getProposal (page) {
      try {
        const res = await api.getProposal(page)
        this.proList = res.data
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
</style>
