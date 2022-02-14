<template>
  <div class="container">
    <form class="problem-form" @submit.prevent="submitForm">
      <div class="problem-header">
        <input type="text"
              class="form-control"
              v-model="problemTitle"
              :placeholder="this.placeholder"
              required>
        <button class="btn" type="submit">저장</button>
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
                  <select class="form-select">
                    <option v-for="item in problemInfo.metrics" :key="item">{{ item }}</option>
                  </select>
                </div>
              <div class="form-time col-5">
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
                  <input id="data-file-input" type="file" accept=".zip" required @change="uploadFile">
                  <!-- <div class="upload-file-name">{{ dataInfo.dataFile.name }}</div> -->
                </div>
                <div class="solution-file col-5">
                  <label class="form-label">정답 파일 업로드</label>
                  <label class="file-upload-btn" for="solution-file-input">업로드</label>
                  <input id="solution-file-input" type="file" accept=".csv" required @change="uploadFile">
                  <!-- <div class="upload-file-name">{{ dataInfo.solutionFile.name }}</div> -->
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
  name: 'ProblemForm',
  props: {
    mode: {
      type: String
    },
    problemID: {
      type: Number
    }
  },
  data () {
    return {
      problemType: '', // class or general
      problemTitle: '',
      problemInfo: {
        description: '',
        metrics: ['RSME', 'MSE', 'Accuracy'],
        startTime: '',
        endTime: '',
        public: true
      },
      dataInfo: {
        description: '',
        dataFile: null,
        solutionFile: null
      },
      placeholder: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.problemType = this.$route.params.problemType
      if (this.mode === 'create') {
        this.placeholder = '문제 이름을 입력하세요.'
      } else if (this.mode === 'edit') {
        this.getProblem()
        this.placeholder = this.problemTitle
      }
    },
    async getProblem () {
      try {
        const res = await api.getProblem(this.problemID)
        const data = res.data
        this.problemTitle = data.title
        this.problemInfo.description = data.description
        this.problemInfo.public = data.public
        this.dataInfo.description = data.data_description
        this.dataInfo.dataFile = data.data
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
          data_description: this.dataInfo.description
        }

        if (this.problemType === 'general') {
          const startTime = this.problemInfo.startTime.toISOString()
          const endTime = this.problemInfo.endTime.toISOString()
          data.start_time = startTime.slice(0, 10) + ' ' + startTime.slice(11, 19)
          data.end_time = endTime.slice(0, 10) + ' ' + endTime.slice(11, 19)
          for (const key in data) {
            formData.append(`${key}`, data[key])
          }
          await api.createGeneralProblem(formData)
          alert('저장이 완료되었습니다.')
          this.$router.push({ name: 'GeneralList' })
        }
        if (this.problemType === 'class') {
          data.pubilc = this.problemInfo.public
          for (const key in data) {
            formData.append(`${key}`, data[key])
          }
          // for (const value of formData.values()) {
          //   console.log(value)
          // }
          if (this.mode === 'create') {
            await api.createClassProblem(formData)
          } else if (this.mode === 'edit') {
            await api.editProblem(this.problemID, formData)
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
      font-size: 2.5rem;
      font-weight: 800;
    }
    .btn {
      padding: 0.5rem 2rem;
      font-size: 22px;
      font-weight: bold;
    }
    button:hover {
      background: white;
      color: #0e1b49;
    }
  }
  .list-group-item {
    border: none;
    padding: 1rem 0rem;
    font-size: 20px;
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
    }
    .form-time {
      display: flex;
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
      line-height: 10;
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
