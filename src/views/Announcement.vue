<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1 class="me-auto">공지사항</h1>
      <div class="">
      <form>
          <input
            class="form-control"
            type="search"
            placeholder="검색"
            aria-label="검색"
            v-model="keyword"
          />
        </form>
      </div>
    </div>
    <div class="table-div">
      <table class="table py-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">제목</th>
            <th scope="col">작성일</th>
            <th scope="col">마지막 수정일</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :loading="loading"
            v-for="announce in announcementList"
            :key="announce"
          >
            <th scope="row">{{ announce.id }}</th>
            <td>
              <router-link
                :to="`/announcements/${announce.id}`"
                class="title"
                >{{ announce.title }}</router-link
              >
            </td>
            <td>{{ announce.created_time }}</td>
            <td>{{ announce.last_modified }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled" v-if="currentPage == 1">
          <a class="page-link" tabindex="-1" aria-disabled="true">이전</a>
        </li>
        <li class="page-item" v-else>
          <a class="page-link" @click="getAnnouncement(currentPage - 1)"
            >이전</a
          >
        </li>
        <div v-for="page in total" :key="page">
          <li class="page-item active" v-if="page == currentPage">
            <a class="page-link" @click="getAnnouncement(page)">{{ page }}</a>
          </li>
          <li class="page-item" v-else>
            <a class="page-link" @click="getAnnouncement(page)">{{ page }}</a>
          </li>
        </div>
        <li class="page-item disabled" v-if="currentPage == total">
          <a class="page-link" href="#">다음</a>
        </li>
        <li class="page-item" v-else>
          <a class="page-link" @click="getAnnouncement(currentPage + 1)"
            >다음</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import api from '@/api/index.js'
export default {
  name: 'Announcement',
  data: () => {
    return {
      announcementList: [],
      keyword: '',
      loading: false,
      total: 0,
      currentPage: 1
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
        this.currentPage = page
        const res = await api.getAnnouncement(page, this.keyword)
        this.loading = false
        if (res.data.count !== 0) {
          this.total = parseInt((res.data.count - 1) / 15) + 1
        }
        this.announcementList = res.data.results
        console.log(res.data)
        for (var i = 0; i < this.announcementList.length; i++) {
          this.announcementList[i].created_time =
            this.announcementList[i].created_time.slice(0, 10) +
            ' ' +
            this.announcementList[i].created_time.slice(11, 19)
          this.announcementList[i].last_modified =
            this.announcementList[i].last_modified.slice(0, 10) +
            ' ' +
            this.announcementList[i].last_modified.slice(11, 19)
        }
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
