<template>
  <div class="container">
    <div class="d-flex flex-wrap mb-2 mt-3">
      <h1 class="me-auto">공지사항</h1>
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
        <button class="btn" id="announce-create" data-bs-toggle="modal" data-bs-target="#announceModal" @click="openAnnouncement()">+ 글쓰기</button>
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
            <button type="button" class="btn btn-primary" id="announce-save" data-bs-dismiss="modal" @click="submitAnnouncement">저장</button>
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
        <th scope="row">{{ announcement.id }}</th>
        <td>{{ announcement.title}}</td>
        <td>{{ announcement.created_time }}</td>
        <td>{{ announcement.last_modified }}</td>
        <td>
          <div style="display: inline-block" class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="announcement.visible" @change="changeSwitch(announcement.id, announcement.visible, announcement.important)">
          </div>
        </td>
        <td>
          <div style="display: inline-block" class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="announcement.important" @change="changeSwitch(announcement.id, announcement.visible, announcement.important)">
          </div>
        </td>
        <td scope="row">
          <a class="ghost-button" data-bs-toggle="modal" data-bs-target="#announceModal" @click="openAnnouncement(announcement.id)">편집</a> |
          <a class="ghost-button" @click="deleteAnnouncement(announcement.id)">삭제</a>
        </td>
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
  name: 'AdminAnnouncement',
  components: {
    Pagination
  },
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
      keyword: '',
      currentPage: 1,
      PageValue: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getAnnouncementList(1)
    },
    getPage (page) {
      this.getAnnouncementList(page)
    },
    async getAnnouncementList (page) {
      try {
        this.loading = true
        const res = await api.getAnnouncementList(page, this.keyword)
        this.currentPage = page
        this.PageValue = []
        this.loading = false
        this.PageValue.push({ count: res.data.count, currentPage: this.currentPage })
        this.announcementList = res.data.results
        for (var i = 0; i < this.announcementList.length; i++) {
          this.announcementList[i].created_time = this.announcementList[i].created_time.slice(0, 10) + ' ' + this.announcementList[i].created_time.slice(11, 19)
          this.announcementList[i].last_modified = this.announcementList[i].last_modified.slice(0, 10) + ' ' + this.announcementList[i].last_modified.slice(11, 19)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteAnnouncement (announcementID) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          await api.deleteAnnouncement(announcementID)
          const res = await api.getAnnouncementList(1, this.keyword)
          if (res.data.count / 15 < this.currentPage) {
            this.currentPage = this.currentPage - 1
          }
          this.getAnnouncementList(this.currentPage)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async openAnnouncement (announcementID) {
      try {
        if (typeof announcementID === 'undefined') {
          this.createMode = true
          this.currentAnnouncementID = ''
          this.announcementTitle = ''
          this.announcementContext = ''
          this.announcementVisible = true
          this.announcementImportant = false
        } else {
          this.currentAnnouncementID = announcementID
          this.createMode = false
          const res = await api.editAnnouncement(announcementID)
          this.announcementTitle = res.data.title
          this.announcementContext = res.data.context
          this.announcementVisible = res.data.visible
          this.announcementImportant = res.data.important
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submitAnnouncement () {
      try {
        const data = {
          title: this.announcementTitle,
          context: this.announcementContext,
          important: this.announcementImportant,
          visible: this.announcementVisible
        }
        if (this.currentAnnouncementID === '') {
          await api.submitAnnouncement(data)
        } else {
          await api.submitEditAnnouncement(this.currentAnnouncementID, data)
        }
        this.getAnnouncementList(this.currentPage)
      } catch (error) {
        console.log(error)
      }
    },
    async changeSwitch (announcementID, visible, important) {
      try {
        const data = {
          visible: visible,
          important: important
        }
        await api.changeAnnouncementSwitch(announcementID, data)
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
a {
  color:black;
  cursor: pointer;
}

a.ghost-button:hover {
  color:black;
  text-decoration: underline;
}

.modal-dialog {
  max-width: 100%;
}

.page-item:active {
  background-color: pink;
}
</style>
