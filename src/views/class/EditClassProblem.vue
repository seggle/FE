<template>
  <div class="container problem-container">
    <form class="problem-form" @submit.prevent="submitForm">
      <div class="problem-header">
        <input type="text"
              class="form-control"
              v-model="problem.title"
              :placeholder="this.placeholder"
              required>
        <div class="button">
          <button class="btn"
                  type="submit"
                  @click="saveMode = 'save'"
          >저장</button>
          <button class="btn"
                  type="submit"
                  @click="saveMode = 'new-save'"
          >새로 저장</button>
        </div>
      </div>
      <div class="problem-content row">
      <!-- 세로 메뉴 탭 -->
        <div class="problem-tab col-2">
          <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active"
              data-bs-toggle="list" role="tab"
              id="list-info-list"
              href="#list-info"
              aria-controls="list-info">문제 설명</a>
            <a class="list-group-item list-group-item-action"
              data-bs-toggle="list" role="tab"
              id="list-data-list"
              href="#list-data"
              aria-controls="list-data">데이터</a>
          </div>
        </div>
        <!-- 탭 내용 -->
        <div class="problem-tab-content col-10">
          <div class="tab-content" id="nav-tabContent">
            <!-- 문제 설명 -->
            <div class="tab-pane fade show active"
                  role="tabpanel"
                  id="list-info"
                  aria-labelledby="list-info-list"
                  :key="problem">
              <h5 class="list-title">문제 설명</h5>
              <v-md-editor v-model="problem.description" height="400px" placeholder="문제 설명을 입력하세요."/>
              <div class="form-option">
                <div class="form-metrics col-3">
                  <label class="form-label">평가 지표</label>
                  <select class="form-select" v-model="problem.evaluation" required>
                    <option disabled value="">평가 지표</option>
                    <option v-for="item in problem.metrics" :key="item">{{ item }}</option>
                  </select>
                </div>

                <div class="form-check form-switch">
                  <label class="form-label">전체 공개</label>
                  <input v-model="problem.public"
                        class="form-check-input"
                        id="publicSwitch"
                        type="checkbox"
                        role="switch">
                </div>
              </div>
            </div>
            <!-- 데이터 -->
            <div class="tab-pane fade" id="list-data" role="tabpanel" aria-labelledby="list-data-list" :key="problem">
              <h5 class="list-title">데이터 설명</h5>
              <v-md-editor v-model="problem.data_description" height="400px" placeholder="데이터 설명을 입력하세요."/>
              <div class="form-option">
                <div class="data-file col-5">
                  <p class="file-desc">하나의 zip 파일만 업로드 가능합니다</p>
                  <label class="form-label">데이터 파일</label>
                  <label class="file-upload-btn" for="data-file-input">업로드</label>
                  <a class="file-download-btn"
                     :href="problem.data">다운로드</a>
                  <input id="data-file-input"
                         type="file"
                         accept=".zip"
                         @change="uploadFile">
                  <p v-if="problem.data"
                      class="upload-file-name">
                    {{ problem.data.name }}
                  </p>
                </div>
                <div class="solution-file col-5">
                  <p class="file-desc">하나의 csv 파일만 업로드 가능합니다</p>
                  <label class="form-label">정답 파일</label>
                  <label class="file-upload-btn" for="solution-file-input">업로드</label>
                  <a class="file-download-btn"
                     :href="problem.solution"
                  >다운로드</a>
                  <input id="solution-file-input"
                         type="file"
                         accept=".csv"
                         @change="uploadFile">
                  <p v-if="problem.solution"
                       class="upload-file-name"
                  >{{ problem.solution.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'EditContestProblem',
  data () {
    return {
      classID: this.$route.params.classID,
      problemID: this.$route.params.problemID,
      problem: {
        title: '',
        description: '',
        metrics: ['RSME', 'MSE', 'Accuracy', 'F1-score', 'RMSE', 'MAE', 'Log loss'],
        evaluation: '',
        public: '',
        data_description: '',
        data: '',
        solution: ''
      },
      placeholder: '',
      saveMode: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProblem()
      this.placeholder = this.problem.title
    },
    async getProblem () {
      try {
        const res = await api.getProblem(this.problemID)
        Object.assign(this.problem, res.data)

        this.problem.data = ''
        this.problem.solution = ''
      } catch (err) {
        console.log(err)
      }
    },
    async submitForm () {
      try {
        const formData = new FormData()
        formData.append('data', this.problem.data)
        formData.append('solution', this.problem.solution)

        const data = {
          title: this.problem.title,
          description: this.problem.description,
          evaluation: this.problem.evaluation,
          data_description: this.problem.data_description,
          public: this.problem.public,
          class_id: this.classID
        }
        for (const key in data) {
          formData.append(`${key}`, data[key])
        }

        if (this.saveMode === 'save') {
          await api.editProblem(this.problemID, formData)
        } else if (this.saveMode === 'new-save') {
          await api.createClassProblem(formData)
        }

        alert('저장이 완료되었습니다.')
        this.$router.push({
          name: 'ClassAllProblem',
          params: {
            classID: this.classID
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    uploadFile (e) {
      const files = e.target.files || e.dataTransfer.files
      const id = e.target.id
      if (id === 'data-file-input') {
        this.problem.data = files[0]
      } else {
        this.problem.solution = files[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
