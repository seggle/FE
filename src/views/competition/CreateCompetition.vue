<template>
  <div class="container problem-container">
    <form class="problem-form" @submit.prevent="submitForm">
      <header class="problem-header">
        <input
          type="text"
          class="form-control"
          v-model="problem.title"
          :placeholder="this.placeholder"
          required
        />
        <div class="button">
          <button class="btn" type="submit">저장</button>
        </div>
      </header>

      <div class="problem-content row">
        <!-- 세로 메뉴 탭 -->
        <div class="problem-tab col-2">
          <div class="list-group" id="list-tab" role="tablist">
            <a
              class="list-group-item list-group-item-action active"
              data-bs-toggle="list"
              role="tab"
              id="list-info-list"
              href="#list-info"
              aria-controls="list-info"
              >문제 설명</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-bs-toggle="list"
              role="tab"
              id="list-data-list"
              href="#list-data"
              aria-controls="list-data"
              >데이터</a
            >
          </div>
        </div>
        <!-- 탭 내용 -->
        <div class="problem-tab-content col-10">
          <div class="tab-content" id="nav-tabContent">
            <!-- 문제 설명 -->
            <div
              class="tab-pane fade show active"
              role="tabpanel"
              id="list-info"
              aria-labelledby="list-info-list"
              :key="problem"
            >
              <h5 class="list-title">문제 설명</h5>
              <v-md-editor
                v-model="problem.description"
                height="400px"
                placeholder="문제 설명을 입력하세요."
              />

              <div class="form-option">
                <div class="form-metrics col-3">
                  <label class="form-label">평가 지표</label>
                  <select
                    class="form-select"
                    v-model="problem.evaluation"
                    required
                  >
                    <option disabled value="">평가 지표</option>
                    <option v-for="item in problem.metrics" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </div>

                <div class="form-time col-8">
                  <div class="form-start-time">
                    <label class="form-label">시작 시간</label>
                    <Datepicker
                      v-model="problem.startTime"
                      placeholder="시작 시간"
                      textInput
                    />
                  </div>

                  <div class="form-end-time">
                    <label class="form-label">종료 시간</label>
                    <Datepicker
                      v-model="problem.endTime"
                      placeholder="종료 시간"
                      textInput
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- 데이터 -->
            <div
              class="tab-pane fade"
              id="list-data"
              role="tabpanel"
              aria-labelledby="list-data-list"
              :key="problem"
            >
              <h5 class="list-title">데이터 설명</h5>
              <v-md-editor
                v-model="problem.data_description"
                height="400px"
                placeholder="데이터 설명을 입력하세요."
              />

              <div class="form-option">
                <div class="data-file col-5">
                  <p class="file-desc">하나의 zip 파일만 업로드 가능합니다</p>
                  <label class="form-label">데이터 파일</label>
                  <label class="file-upload-btn" for="data-file-input"
                    >업로드</label
                  >
                  <input
                    id="data-file-input"
                    type="file"
                    accept=".zip"
                    @change="uploadFile"
                  />
                  <p v-if="problem.data" class="upload-file-name">
                    {{ problem.data.name }}
                  </p>
                </div>

                <div class="solution-file col-5">
                  <p class="file-desc">하나의 csv 파일만 업로드 가능합니다</p>
                  <label class="form-label">정답 파일</label>
                  <label class="file-upload-btn" for="solution-file-input"
                    >업로드</label
                  >
                  <input
                    id="solution-file-input"
                    type="file"
                    accept=".csv"
                    @change="uploadFile"
                  />
                  <p v-if="problem.solution" class="upload-file-name">
                    {{ problem.solution.name }}
                  </p>
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
import { UTCtoKST } from '@/utils/time.js'

export default {
  name: 'CreateCompetition',
  data () {
    return {
      competitionID: this.$route.params.id,
      problem: {
        title: '',
        description: '',
        metrics: [
          'RSME',
          'MSE',
          'Accuracy',
          'F1-score',
          'RMSE',
          'MAE',
          'Log loss'
        ],
        evaluation: '',
        startTime: '',
        endTime: '',
        data_description: '',
        data: '',
        solution: ''
      },
      placeholder: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.placeholder = '문제 이름을 입력하세요.'
    },
    /* 대회 문제 등록 */
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
          start_time: UTCtoKST(this.problem.startTime),
          end_time: UTCtoKST(this.problem.endTime)
        }

        for (const key in data) {
          formData.append(`${key}`, data[key])
        }

        await api.createCompetitionProblem(formData)

        alert('저장이 완료되었습니다.')
        this.$router.push({ name: 'CompetitionList' })
      } catch (err) {
        console.log(err)
      }
    },
    /* 데이터 파일, 솔루션 파일 업로드 */
    uploadFile (e) {
      const files = e.target.files || e.dataTransfer.files
      const id = e.target.id
      if (id === 'data-file-input') {
        this.problem.data = files[0]
      } else {
        this.problem.solution = files[0]
      }
    }
  },
  watch: {
    'problem.endTime' () {
      const date = new Date()
      if (this.problem.endTime !== '') {
        if (date > this.problem.endTime || this.problem.startTime > this.problem.endTime) {
          alert('종료 시간을 다시 설정해주세요.')
          this.problem.endTime = ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
