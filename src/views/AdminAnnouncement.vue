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
      <div>
        <button class="btn btn-dark" id="announce-create" data-bs-toggle="modal" data-bs-target="#announceModal" @click="openAnnouncement()">+ 글쓰기</button>
        <div class="modal fade" id="announceModal" tabindex="-1" aria-labelledby="announceModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 v-if="createMode">공지사항 생성</h5>
                <h5 v-else>공지사항 수정</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <h5 style="float:left">제목</h5>
            <textarea v-model="announcementTitle" id="announce-title" class="form-control mb-3 p-2" cols="100" rows="1" placeholder="제목을 입력하세요"></textarea>
            <h5 style="float:left">내용</h5>
            <v-md-editor v-model="announcementContext" height="400px"></v-md-editor>
            <div class="mt-2">
            <p style="float:left">공개여부 </p>
            <span class="form-check form-switch" style="float:left; margin-left:10px">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="announcementVisible">
            </span>
            <p style="float:left">중요여부 </p>
            <span class="form-check form-switch" style="float:left; margin-left:10px">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="announcementImportant">
            </span>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
            <button type="button" class="btn btn-primary" id="announce-save" @click="submitAnnouncement">저장</button>
            </div>
        </div>
        </div>
    </div>
      </div>
    </div>
    <div class="table-div">
    <table class="table">
    <thead>
      <tr>
        <th scope="col" prop="id">#</th>
        <th scope="col">제목</th>
        <th scope="col">작성일</th>
        <th scope="col">마지막 수정일</th>
        <th scope="col">공개</th>
        <th scope="col">중요</th>
        <th scope="col">옵션</th>
      </tr>
    </thead>
    <tbody>
      <tr :loading="loading" v-for="announcement in announcementList" :key="announcement">
        <th scope="row">{{ announcement.announcement_id }}</th>
        <td>{{ announcement.announcement_title}}</td>
        <td>{{ announcement.announcement_created_time }}</td>
        <td>{{ announcement.announcement_last_modified }}</td>
        <td>
          <div style="display: inline-block" class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="announcement.announcement_visible" @change="changeSwitch(announcement.announcement_id)">
          </div>
        </td>
        <td>
          <div style="display: inline-block" class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="announcement.announcement_important" @change="changeSwitch(announcement.announcement_id)">
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
    async getAnnouncementList (currentpage) {
      try {
        this.loading = true
        const res = await api.getAnnouncementList((currentpage - 1) * this.pageSize, this.pageSize, this.keyword)
        this.loading = false
        this.announcementList = res.data
        console.log(res.data)
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
