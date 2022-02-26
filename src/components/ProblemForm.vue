<template>
  <div class="container">
    <form class="problem-form" @submit.prevent="submitForm">
      <div class="problem-header">
        <input type="text"
              class="form-control"
              v-model="problemTitle"
              :placeholder="this.placeholder"
              required>
        <div class="button">
          <button class="btn" type="submit" @click="saveMode = 'save'">저장</button>
          <button v-if="this.problemType == 'class'" class="btn" type="submit" @click="saveMode = 'new-save'">새로 저장</button>
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
                  :key="problemInfo">
              <h5 class="list-title">문제 설명</h5>
              <textarea id="problem-description"
                          class="form-control"
                          v-model="problemInfo.description"
                          placeholder="문제 설명을 입력하세요."></textarea>
              <div class="form-option">
                <div class="form-metrics col-3">
                  <label class="form-label">평가 지표</label>
                  <select class="form-select" v-model="problemInfo.evaluation">
                    <option disabled value="">평가 지표</option>
                    <option v-for="item in problemInfo.metrics" :key="item">{{ item }}</option>
                  </select>
                </div>
              <div v-if="this.problemType == 'general'" class="form-time col-5">
                <div class="form-start-time">
                  <label class="form-label">시작 시간</label>
                  <Datepicker v-model="problemInfo.startTime" placeholder="시작 시간" textInput />
                </div>

                <div class="form-end-time">
                  <label class="form-label">종료 시간</label>
                  <Datepicker v-model="problemInfo.endTime" placeholder="종료 시간" textInput />
                </div>
              </div>
                <div v-if="this.problemType == 'class' " class="form-check form-switch">
                  <label class="form-label">전체 공개</label>
                  <input v-model="problemInfo.public"
                        class="form-check-input"
                        id="publicSwitch"
                        type="checkbox"
                        role="switch">
                </div>
              </div>
            </div>
            <!-- 데이터 -->
            <div class="tab-pane fade" id="list-data" role="tabpanel" aria-labelledby="list-data-list" :key="dataInfo">
              <h5 class="list-title">데이터 설명</h5>
              <textarea id="data-description"
                        class="form-control"
                        v-model="dataInfo.description"
                        placeholder="문제 설명을 입력하세요."></textarea>
              <div class="form-option">
                <div class="data-file col-5">
                  <label class="form-label">데이터 파일 업로드</label>
                  <label class="file-upload-btn" for="data-file-input">업로드</label>
                  <input id="data-file-input" type="file" accept=".zip" @change="uploadFile">
                  <div class="upload-file-name" v-if="dataInfo.dataFile">{{ dataInfo.dataFile.name }}</div>
                </div>
                <div class="solution-file col-5">
                  <label class="form-label">정답 파일 업로드</label>
                  <label class="file-upload-btn" for="solution-file-input">업로드</label>
                  <input id="solution-file-input" type="file" accept=".csv" @change="uploadFile">
                  <div class="upload-file-name" v-if="dataInfo.solutionFile">{{ dataInfo.solutionFile.name }}</div>
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
import { GMTtoLocale } from '@/utils/time.js'

export default {
  name: 'ProblemForm',
  props: {
    mode: String,
    problemID: Number,
    classID: Number
  },
  data () {
    return {
      problemType: this.$route.params.problemType, // class or general
      problemTitle: '',
      problemInfo: {
        description: '',
        metrics: ['RSME', 'MSE', 'Accuracy'],
        evaluation: '',
        startTime: '',
        endTime: '',
        public: true
      },
      dataInfo: {
        description: '',
        dataFile: '',
        solutionFile: ''
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
      if (this.mode === 'create') {
        this.placeholder = '문제 이름을 입력하세요.'
      } else if (this.mode === 'edit') {
        this.getProblem()
        this.placeholder = this.problemTitle
      }
    },
    async getProblem () {
      try {
        let res
        if (this.problemType === 'general') {
          res = await api.getCompetitions(this.problemID)
          this.problemInfo.startTime = res.data.start_time
          this.problemInfo.endTime = res.data.end_time
        }
        if (this.problemType === 'class') {
          res = await api.getProblem(this.problemID)
        }
        const data = res.data
        this.problemTitle = data.title
        this.problemInfo.description = data.description
        this.problemInfo.public = data.public
        this.problemInfo.evaluation = data.evaluation
        this.dataInfo.description = data.data_description
        // this.dataInfo.dataFile = data.data
        // this.dataInfo.solutionFile = data.solution
      } catch (err) {
        console.log(err)
      }
    },
    async submitForm () {
      try {
        const formData = new FormData()
        formData.append('data', this.dataInfo.dataFile)
        formData.append('solution', this.dataInfo.solutionFile)

        const data = {
          title: this.problemTitle,
          description: this.problemInfo.description,
          evaluation: this.problemInfo.evaluation,
          data_description: this.dataInfo.description
        }

        if (this.problemType === 'general') {
          data.start_time = GMTtoLocale(this.problemInfo.startTime)
          data.end_time = GMTtoLocale(this.problemInfo.endTime)
          for (const key in data) {
            formData.append(`${key}`, data[key])
          }
          if (this.mode === 'create') {
            await api.createGeneralProblem(formData)
          } else if (this.mode === 'edit') {
            await api.editGeneralProblem(this.problemID, formData)
          }
          alert('저장이 완료되었습니다.')
          this.$router.push({ name: 'GeneralList' })
        }

        if (this.problemType === 'class') {
          data.public = this.problemInfo.public
          for (const key in data) {
            formData.append(`${key}`, data[key])
          }
          // for (const value of formData.values()) {
          //   console.log(value)
          // }
          formData.append('class_id', this.classID)
          if (this.mode === 'create') {
            await api.createClassProblem(formData)
          } else if (this.mode === 'edit') {
            if (this.saveMode === 'save') {
              await api.editProblem(this.problemID, formData)
            } else if (this.saveMode === 'new-save') {
              await api.createClassProblem(formData)
            }
          }
          alert('저장이 완료되었습니다.')
          this.$router.push({ name: 'ClassList' })
        }
      } catch (err) {
        console.log(err)
      }
    },
    uploadFile (e) {
      const files = e.target.files || e.dataTransfer.files
      const id = e.target.id
      if (id === 'data-file-input') {
        this.dataInfo.dataFile = files[0]
      } else {
        this.dataInfo.solutionFile = files[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 5rem 0rem;
  @media (max-width: 414px) {
    width: 360px;
  }

  .form-control::placeholder {
    color: #ced4da;
    font-weight: 800;
   }

  .problem-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 3rem 0;

    .form-control {
      width: 50%;
      font-size: calc(1.375rem + 1.5vw);
      font-weight: 800;
    }

    .btn {
      padding: 0.5rem 2rem;
      font-size: calc(0.8rem + 0.5vw);
      font-weight: bold;
      @media (max-width: 768px) {
        padding: 0.3rem 1.2rem;
      }

      &:hover {
        background: white;
        color: #0e1b49;
      }
    }
  }

  .problem-tab {
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .list-group-item {
    border: none;
    padding: 1rem 0rem;
    font-size: calc(0.8rem + 0.5vw);
    border-radius: 0.75rem;
    margin-bottom: 1rem;
  }
  .list-group-item.active {
    z-index: 2;
    color: black;
    font-weight: bold;
    background-color: #F4F4F8;
    border-color: #fff;
  }
  .problem-tab-content {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .tab-content {
    // border: 0.0625rem solid #D7E2EB;
    margin-top: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 8%);
    padding: 2rem 1rem;

    .list-title {
      padding: 0.5rem 2rem;
      margin-top: 1.5rem;
      font-weight: bold;
    }

    .form-option {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 1rem 0rem;
      @media (max-width: 768px) {
        display: block;
      }

      .form-time {
        display: flex;
      }

      .form-metrics,
      .form-time,
      .data-file,
      .solution-file {
        @media (max-width: 768px) {
          display: block;
          width: 100%;
          margin-bottom: 12px;
        }
      }
    }

    .form-label {
      // display: block;
      font-weight: bold;
      font-size: 1rem;
    }

    .form-check-input {
        width: 5em;
        height: 2em;
        margin: 0em 1em;
    }

    .btn {
      float: right;
      padding: 0.5rem 1.5rem;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 2rem;
    }

    .form-control {
    //   background-color: #F4F4F8;
    //   border: 0.2rem solid #dde4eb;
      padding: 2rem;
      margin-bottom: 1rem;
      height: 20rem;
      resize: none;
    }

    // .form-control::file-selector-button {
    //     color: transparent;
    //     background-color: transparent;
    //     border: none;
    // }
    input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }

    .file-upload-btn {
      display: inline-block;
      padding: 5px 20px;
      background: #0e1b49;
      color: white;
      border-radius: 50px;
      cursor: pointer;
      margin-left: 10px;
    }
    // .data-file {
    //   display: flex;
    //   align-items: center;
    //   .form-control {
    //     width: 30%;
    //     line-height: initial;
    //     padding: 1rem;
    //     margin-top: 1.5rem;
    //   }
    // }
  }
}
</style>
