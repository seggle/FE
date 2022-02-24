<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1 class="me-auto">FAQ</h1>
      <div>
        <button class="btn" id="faq-create" data-bs-toggle="modal" data-bs-target="#faqModal" @click="openFAQ()">+ 글쓰기</button>
        <div class="modal fade" id="faqModal" tabindex="-1" aria-labelledby="faqModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 v-if="createMode">FAQ 생성</h5>
                <h5 v-else>FAQ 수정</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h5 style="float:left">질문</h5>
                <textarea v-model="faqQuestion" id="faq-title" class="form-control mb-3 p-2" cols="100" rows="1" placeholder="질문을 입력하세요"></textarea>
                <h5 style="float:left">답변</h5>
                <v-md-editor v-model="faqAnswer" height="400px"></v-md-editor>
                <div class="mt-2">
                  <p style="float:left">공개여부 </p>
                  <span class="form-check form-switch" style="float:left; margin-left:10px">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="faqVisible">
                  </span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                <button type="button" class="btn btn-primary" id="faq-save" data-bs-dismiss="modal" @click="submitFaq">저장</button>
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
            <th scope="col">편집</th>
            <th scope="col">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="faq in faqList" :key="faq">
            <th scope="row">{{ faq.id }}</th>
            <td>{{ faq.question}}</td>
            <td>{{ faq.created_time }}</td>
            <td>{{ faq.last_modified }}</td>
            <td>
              <div style="display: inline-block" class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="faq.visible" @change="changeSwitch(faq.id)">
              </div>
            </td>
            <td scope="row">
              <button class="edit-btn"
                      @click="openFAQ(faq.id)">
                <font-awesome-icon icon="pen" />
              </button>
            </td>
            <td scope="row">
              <button class="delete-btn"
                      @click="deleteFAQ(faq.id)">
                <font-awesome-icon icon="trash-can" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'AdminFAQ',
  data () {
    return {
      currentFaqID: '',
      faqList: [],
      faqQuestion: '',
      faqAnswer: '',
      faqVisible: true,
      createMode: true,
      loading: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getFAQList()
    },
    async getFAQList () {
      try {
        const res = await api.getFAQList()
        this.faqList = res.data
        for (var i = 0; i < this.faqList.length; i++) {
          this.faqList[i].created_time = this.faqList[i].created_time.slice(0, 10) + ' ' + this.faqList[i].created_time.slice(11, 19)
          this.faqList[i].last_modified = this.faqList[i].last_modified.slice(0, 10) + ' ' + this.faqList[i].last_modified.slice(11, 19)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteFAQ (faqID) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          await api.deleteFAQ(faqID)
          this.getFAQList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async openFAQ (faqID) {
      try {
        if (typeof faqID === 'undefined') {
          this.createMode = true
          this.currentFaqID = ''
          this.faqQuestion = ''
          this.faqAnswer = ''
          this.faqVisible = true
        } else {
          this.currentFaqID = faqID
          this.createMode = false
          const res = await api.editFAQ(faqID)
          this.faqQuestion = res.data.question
          this.faqAnswer = res.data.answer
          this.faqVisible = res.data.visible
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submitFaq () {
      try {
        if (this.currentFaqID === '') {
          const data = {
            question: this.faqQuestion,
            answer: this.faqAnswer,
            visible: this.faqVisible
          }
          await api.submitFAQ(data)
        } else {
          const data = {
            question: this.faqQuestion,
            answer: this.faqAnswer,
            visible: this.faqVisible
          }
          await api.submitEditFAQ(this.currentFaqID, data)
        }
        this.getFAQList()
      } catch (error) {
        console.log(error)
      }
    },
    async changeSwitch (faqID) {
      try {
        await api.changeFAQSwitch(faqID)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
