<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1 class="me-auto">공지사항</h1>
      <div class="keyword">
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
      <table class="table">
        <thead>
          <tr>
            <th class="col-lg-1 col-md-2 tableId" scope="col">#</th>
            <th scope="col">제목</th>
            <th class="col-lg-2 col-md-3" scope="col">작성일</th>
            <th class="col-lg-1 col-md-2" scope="col">작성자</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :loading="loading"
            v-for="announce in announcementImportantList"
            :key="announce"
            style="background-color: rgb(223 223 223)"
          >
            <th class="tableId" style="font-weight: bold" scope="row">중요</th>
            <td>
              <router-link
                :to="`/announcements/${announce.id}`"
                class="title"
                >{{ announce.title }}</router-link
              >
            </td>
            <td>{{ announce.created_time }}</td>
            <td>관리자</td>
          </tr>
          <tr
            :loading="loading"
            v-for="announce in announcementList"
            :key="announce"
          >
            <td class="tableId" scope="row">{{ announce.id }}</td>
            <td>
              <router-link
                :to="`/announcements/${announce.id}`"
                class="title"
                >{{ announce.title }}</router-link
              >
            </td>
            <td>{{ announce.created_time }}</td>
            <td>관리자</td>
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
      announcementImportantList: [],
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
        this.announcementList = []
        this.announcementImportantList = []
        const res = await api.getAnnouncement(page, this.keyword)
        this.loading = false
        if (res.data.count !== 0) {
          this.total = parseInt((res.data.count - 1) / 15) + 1
        }
        const tmp = res.data.results
        for (var i = 0; i < tmp.length; i++) {
          tmp[i].created_time = tmp[i].created_time.slice(0, 10)
          if (tmp[i].important) {
            this.announcementImportantList.push(tmp[i])
          } else {
            this.announcementList.push(tmp[i])
          }
        }
        this.announcementList.reverse()
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
div.keyword {
  margin-top: 50px;
  padding: 0px 4rem;
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
div.table-div {
  padding: 0 4rem;
}
.table {
  text-align: left;
  th.tableId {
    text-align: center;
  }
  td.tableId {
    text-align: center;
  }
  tr {
    a.title {
      font-weight: normal;
    }
  }
  a {
  color: black;
  text-decoration: none;
}
}
</style>
