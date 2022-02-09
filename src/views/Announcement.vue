<template>
  <div class="container px-5">
    <div class="class-nav-bar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <h1 id="title">공지사항</h1>
        </div>
      </nav>
    </div>
    <div class="searchWrap">
      <input type="search" v-model="keyword" />
      <router-link
        @click="fnSearch"
        :to="{ query: { keyword: keyword } }"
        class="btn btn-primary btn-sm px-4 me-sm-3"
        id="head"
        >검색</router-link
      >
    </div>
    <paginated-list :list-array="announcementList" />
    <footer>
      <button>
        <router-link
          tag="button"
          @click="getAnnouncement(0)"
          :to="{ query: { page: '0' } }"
          >1</router-link
        >
      </button>
      <button>
        <router-link
          tag="button"
          @click="getAnnouncement(1)"
          :to="{ query: { page: '1' } }"
          >2</router-link
        >
      </button>
    </footer>
  </div>
</template>
<script>
import api from '@/api/index.js'
import PaginatedList from '@/components/PaginatedList.vue'
export default {
  name: 'simple-pagination',
  components: {
    PaginatedList
  },
  data: () => {
    return {
      announcementList: [],
      keyword: '',
      loading: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getAnnouncement(1)
    },
    async getAnnouncement (page) {
      try {
        this.loading = true
        const res = await api.getAnnouncement(page, this.keyword)
        this.loading = false
        this.announcementList = res.data.results
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    keyword () {
      this.getAnnouncement(1)
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
.btnRightWrap .btnSearch {
  color: white;
}
</style>
