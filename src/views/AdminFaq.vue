<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1 class="me-auto">FAQ</h1>
      <div>
        <button class="btn btn-dark" id="faq-create" data-bs-toggle="modal" data-bs-target="#faqModal" @click="openFAQ()">+ 글쓰기</button>
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
            <button type="button" class="btn btn-primary" id="faq-save" @click="submitFaq">저장</button>
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
        <th scope="col">옵션</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="faq in faqList" :key="faq">
        <th scope="row">{{ faq.faq_id }}</th>
        <td>{{ faq.faq_question}}</td>
        <td>{{ faq.faq_created_time }}</td>
        <td>{{ faq.faq_last_modified }}</td>
        <td>
          <div style="display: inline-block" class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="faq.faq_visible" @change="changeSwitch(faq.faq_id)">
          </div>
        </td>
        <td scope="row">
          <a class="ghost-button" data-bs-toggle="modal" data-bs-target="#faqModal" @click="openFAQ(faq.faq_id)">편집</a> |
          <a class="ghost-button" @click="deleteFAQ(faq.faq_id)">삭제</a>
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
      loading: false,
      pageSize: 15
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
          this.faqList[i].faq_created_time = this.faqList[i].faq_created_time.slice(0, 10) + ' ' + this.faqList[i].faq_created_time.slice(11, 19)
          this.faqList[i].faq_last_modified = this.faqList[i].faq_last_modified.slice(0, 10) + ' ' + this.faqList[i].faq_last_modified.slice(11, 19)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteFAQ (faqID) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          const res = await api.deleteFAQ(faqID)
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async openFAQ (faqID) {
      try {
        console.log(faqID)
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
          this.faqQuestion = res.data[0].faq_question
          this.faqAnswer = res.data[0].faq_answer
          this.faqVisible = res.data[0].faq_visible
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submitFaq () {
      try {
        if (this.currentFaqID === '') {
          const data = {
            faq_question: this.faqQuestion,
            faq_answer: this.faqAnswer,
            faq_visible: this.faqVisible
          }
          const res = await api.submitFAQ(data)
          console.log(res.data)
        } else {
          const data = {
            faq_id: this.currentFaqID,
            faq_question: this.faqQuestion,
            faq_answer: this.faqAnswer,
            faq_visible: this.faqVisible
          }
          const res = await api.submitEditFAQ(data)
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async changeSwitch (faqID) {
      try {
        const res = await api.changeFAQSwitch(faqID)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
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
