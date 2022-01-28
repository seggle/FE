<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1 class="me-auto">전체 문제</h1>
      <div>
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
      <div>
        <button class="btn btn-dark" id="announce-create" data-bs-toggle="modal" data-bs-target="#announceModal" @click="openAnnouncement()">+ 문제 생성</button>
      </div>
    </div>
    <div class="table-div">
    <table class="table">
    <thead>
      <tr>
        <th scope="col" prop="id">#</th>
        <th scope="col">제목</th>
        <th scope="col">작성일</th>
        <th scope="col">작성자</th>
        <th scope="col">공개</th>
        <th scope="col">옵션</th>
      </tr>
    </thead>
    <tbody>
      <tr :loading="loading" v-for="announcement in announcementList" :key="announcement">
        <th scope="row">{{ announcement.announcement_id }}</th>
        <td>{{ announcement.announcement_title}}</td>
        <td>{{ announcement.announcement_created_time }}</td>
        <td>작성자</td>
        <td>
          <div style="display: inline-block" class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="announcement.announcement_visible" @change="changeSwitch(announcement.announcement_id)">
          </div>
        </td>
        <td scope="row">
          <a class="ghost-button" data-bs-toggle="modal" data-bs-target="#announceModal" @click="openAnnouncement(announcement.announcement_id)">편집</a> |
          <a class="ghost-button" @click="deleteAnnouncement(announcement.announcement_id)">삭제</a>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1" aria-disabled="true">이전</a>
    </li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item">
      <a class="page-link" href="#">다음</a>
    </li>
  </ul>
</nav>
</div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'ClassExamManage',
  data () {
    return {
      currentAnnouncementID: '',
      announcementList: [],
      announcementTitle: '',
      announcementContext: '',
      announcementVisible: true,
      announcementImportant: false,
      createMode: true,
      loading: false,
      pageSize: 15,
      keyword: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getAnnouncementList(1)
    },
    async getAnnouncementList (page) {
      try {
        this.loading = true
        const res = await api.getAnnouncementList((page - 1) * this.pageSize, this.pageSize, this.keyword)
        this.loading = false
        this.announcementList = res.data
        for (var i = 0; i < this.announcementList.length; i++) {
          this.announcementList[i].announcement_created_time = this.announcementList[i].announcement_created_time.slice(0, 10) + ' ' + this.announcementList[i].announcement_created_time.slice(11, 19)
          this.announcementList[i].announcement_last_modified = this.announcementList[i].announcement_last_modified.slice(0, 10) + ' ' + this.announcementList[i].announcement_last_modified.slice(11, 19)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteAnnouncement (announcementID) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          console.log(announcementID)
          const res = await api.deleteAnnouncement(announcementID)
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async openAnnouncement (announcementID) {
      try {
        console.log(announcementID)
        if (typeof announcementID === 'undefined') {
          this.createMode = true
          this.currentAnnouncementID = ''
          this.faqQuestion = ''
          this.faqAnswer = ''
          this.faqVisible = true
        } else {
          this.currentAnnouncementID = announcementID
          this.createMode = false
          const res = await api.editAnnouncement(announcementID)
          this.announcementTitle = res.data[0].announcement_title
          this.announcementContext = res.data[0].announcement_context
          this.announcementVisible = res.data[0].announcement_visible
          this.announcementImportant = res.data[0].announcement_important
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submitAnnouncement () {
      try {
        const data = {
          announcement_title: this.announcementTitle,
          announcement_context: this.announcementContext,
          announcement_important: this.announcementImportant,
          announcement_visible: this.announcementVisible
        }
        if (this.currentAnnouncementID === '') {
          const res = await api.submitAnnouncement(data)
          console.log(res.data)
        } else {
          const res = await api.submitEditAnnouncement(this.currentAnnouncementID, data)
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async changeSwitch (announcementID) {
      try {
        const data = {
          announcement_important: this.announcementImportant,
          announcement_visible: this.announcementVisible
        }
        const res = await api.changeAnnouncementSwitch(announcementID, data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    'keyword' () {
      this.getAnnouncementList(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-div {
    overflow-x: auto;
}
.table {
    min-width: 700px;
    width: 100%;
    white-space: nowrap;
    border-collapse:collapse;
}
.btn {
  background: #0e1b49;
  border-radius: 50px;
  margin: 3px;
}
a {
  color:black;
  cursor: pointer;
}

.modal-dialog {
    max-width: 80%;
}
</style>
