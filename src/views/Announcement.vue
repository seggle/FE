<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1>공지사항</h1>
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
            <th class="col-lg-2" scope="col">작성일</th>
            <th class="col-lg-1 col-md-2" scope="col">작성자</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :loading="loading"
            v-for="announce in announcementImportantList"
            :key="announce"
            @click="goAnnouncementDetail(announce.id)"
          >
            <th class="tableId" style="font-weight: bold" scope="row">중요</th>
            <td class="title">{{ announce.title }}</td>
            <td>{{ announce.created_time }}</td>
            <td>관리자</td>
          </tr>
          <tr
            :loading="loading"
            v-for="announce in announcementList"
            :key="announce"
            @click="goAnnouncementDetail(announce.id)"
          >
            <td class="tableId" scope="row">{{ announce.id }}</td>
            <td class="title">{{ announce.title }}</td>
            <td>{{ announce.created_time }}</td>
            <td>관리자</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pagination="PageValue" @get-page="getPage"/>
  </div>
</template>
<script>
import api from '@/api/index.js'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Announcement',
  components: {
    Pagination
  },
  data: () => {
    return {
      announcementList: [],
      announcementImportantList: [],
      keyword: '',
      loading: false,
      PageValue: [],
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
    getPage (page) {
      this.getAnnouncement(page)
    },
    async getAnnouncement (page) {
      try {
        this.loading = true
        this.currentPage = page
        this.PageValue = []
        this.announcementList = []
        this.announcementImportantList = []
        const res = await api.getAnnouncement(page, this.keyword)
        this.loading = false
        this.PageValue.push({ count: res.data.count, currentPage: this.currentPage })
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
    },
    goAnnouncementDetail (announcementID) {
      this.$router.push({
        name: 'AnnouncementDetail',
        params: { id: announcementID }
      })
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
@media (max-width: 420px) {
  .table tr th:nth-child(3),.table tr th:nth-child(4),
  .table tr td:nth-child(3),.table tr td:nth-child(4) {
    display: none;
  }
  .form-control {
    float: right;
    width: 80%;
    height: 1.8rem;
    font-size: calc(0.55rem + 1.5vw);
  }
}

@media (max-width: 991px) {
  .table tr th:nth-child(3), .table tr td:nth-child(3) {
    width: 100px;
  }
  .table tr th:nth-child(4), .table tr td:nth-child(4){
    display: none;
  }
}

h1 {
  width: 50%;
  @media (max-width: 767px) {
    font-size: calc(1.3rem + 2vw);
  }
  padding: 0px;
  text-align: left;
  margin-top: 50px;
  font-weight: bold;
}
.keyword {
  margin-left: auto;
  margin-top: 50px;
}
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnRightWrap .btnSearch {
  color: white;
}
.table {
  min-width: 0px;
  text-align: left;
  white-space: normal;
  table-layout: fixed;
  th.tableId {
    @media (max-width: 767px) {
      width: 40px;
    }
    text-align: center;
  }
  td.tableId {
    text-align: center;
  }
  td.title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  tr {
    a.title {
      font-weight: normal;
    }
    @media (max-width: 420px) {
      font-size: calc(0.55rem + 2vw);
      padding: 0px;
    }
  }
  a {
    color: black;
    text-decoration: none;
  }
}
</style>
