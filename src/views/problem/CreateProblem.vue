<template>
  <div class="container">
    <form class="create-problem-form" @submit.prevent="submitForm">
      <div class="problem-header">
        <input type="text"
              class="form-control"
              v-model="problemTitle"
              placeholder="문제 이름을 입력하세요."
              required>
        <button class="btn" type="submit">문제 생성</button>
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
              <div v-if="this.problemType == 'general' " class="period">
                <h5>시작 시간</h5>
                <Datepicker v-model="problemInfo.startTime" placeholder="시작 시간" textInput />

                <h5>종료 시간</h5>
                <Datepicker v-model="problemInfo.endTime" placeholder="종료 시간" textInput />
              </div>
              <div v-if="this.problemType == 'class' " class="form-check form-switch">
                <label class="form-check-label" for="publicSwitch">전체 공개</label>
                <input v-model="problemInfo.public"
                      class="form-check-input"
                      id="publicSwitch"
                      type="checkbox"
                      role="switch">
              </div>
            </div>
            <!-- 데이터 -->
            <div class="tab-pane fade" id="list-data" role="tabpanel" aria-labelledby="list-data-list" :key="dataInfo">
              <h5 class="list-title">데이터 설명</h5>
              <textarea id="data-description"
                        class="form-control"
                        v-model="dataInfo.description"
                        placeholder="문제 설명을 입력하세요."></textarea>
              <div class="data-file">
                <h5 class="list-title">데이터 파일 업로드</h5>
                <input type="file" class="form-control" accept=".zip" required>
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
  name: 'CreateProblem',
  data () {
    return {
      problemType: '',
      problemTitle: '',
      problemInfo: {
        description: '',
        startTime: '',
        endTime: '',
        public: true
      },
      dataInfo: {
        description: '',
        dataFile: ''
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.problemType = this.$route.params.problemType
    },
    async submitForm () {
      try {
        const data = {
          title: this.problemTitle,
          description: this.problemInfo.description,
          created_user: this.$store.state.userid,
          data: this.dataInfo.dataFile,
          data_description: this.dataInfo.description
        }
        if (this.problemType === 'general') {
          data.start_time = this.problemInfo.startTime
          data.end_time = this.problemInfo.endTime
          console.log(data)
          await api.createGeneralProblem(data)
        }
        if (this.problemType === 'class') {
          data.pubilc = this.problemInfo.public
          console.log(data)
          await api.createClassProblem(data)
        }
      } catch (err) {
        console.log(err)
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
    .period {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem 0rem;
      h5 {
        padding: 0rem 1rem;
        margin-bottom: 0rem;
        font-weight: bold;
      }
    }
    .form-check {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .form-check-input {
        width: 4em;
        height: 2em;
        margin: 0em 1em;
      }
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
    .form-control::file-selector-button {
        color: transparent;
        background-color: transparent;
        border: none;
    }
    .data-file {
      display: flex;
      align-items: center;
      .form-control {
        width: 30%;
        line-height: initial;
        padding: 1rem;
        margin-top: 1.5rem;
      }
    }
  }
}
</style>
