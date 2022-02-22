<template>
  <div class="container" :key="problemInfo"
       v-if="isClassUser || this.problemType == 'general'">
    <div class="problem-header">
      <h1 id="title">
        {{ problemInfo.title}}
      </h1>
      <button v-if="this.problemType == 'general'"
              class="btn"
              @click="joinCompetition"
              :disabled="alreadyJoined">{{ this.joinText }}
      </button>
    </div>
    <div class="problem-content row">
      <!-- 세로 메뉴 탭 -->
      <div class="problem-tab col-2">
        <div class="list-group" id="list-tab" role="tablist">
          <a class="list-group-item list-group-item-action active"
            data-bs-toggle="list" role="tab"
            id="list-info-list"
            href="#list-info"
            aria-controls="list-info">문제 설명
          </a>
          <a class="list-group-item list-group-item-action"
            data-bs-toggle="list" role="tab"
            id="list-data-list"
            href="#list-data"
            aria-controls="list-data">데이터
          </a>
          <a class="list-group-item list-group-item-action"
            data-bs-toggle="list" role="tab"
            id="list-leaderboard-list"
            href="#list-leaderboard"
            aria-controls="list-leaderboard">리더보드
          </a>
          <a class="list-group-item list-group-item-action"
            data-bs-toggle="list" role="tab"
            id="list-submit-list"
            href="#list-submit"
            aria-controls="list-submit"
            :disabled="alreadyJoined == false">제출
          </a>
        </div>
      </div>
      <!-- 탭 내용 -->
      <div class="problem-tab-content col-10">
        <div class="tab-content" id="nav-tabContent">
        <!-- 문제 설명 -->
          <div class="tab-pane fade show active" role="tabpanel"
                id="list-info" aria-labelledby="list-info-list"
                :key="problemInfo">
            <h5 class="list-title">
              문제 설명
            </h5>
            <p class="list-content">
              {{ problemInfo.description }}
            </p>
            <div class="period"
                 v-if="this.problemType == 'general'">
              <h5>시작 시간</h5>
              <p class="list-content">
                {{ problemInfo.start_time }}
              </p>
              <h5>종료 시간</h5>
              <p class="list-content">
                {{ problemInfo.end_time }}
              </p>
            </div>
          </div>
        <!-- 데이터 -->
          <div class="tab-pane fade" id="list-data" role="tabpanel" aria-labelledby="list-data-list">
            <h5 class="list-title">데이터 설명
              <button class="btn" :disabled="alreadyJoined == false">
                <a :href="problemInfo.data">다운로드</a>
              </button>
            </h5>
            <p class="list-content">
              {{ problemInfo.data_description }}
            </p>
          </div>
        <!-- 리더보드 -->
          <div class="tab-pane fade" id="list-leaderboard" role="tabpanel" aria-labelledby="list-leaderboard-list">
            <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">이름</th>
                <th scope="col">점수</th>
                <th scope="col">제출 횟수</th>
                <th scope="col">제출 날짜</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="users in leaderboardList" :key="users">
                <th scope="row">{{ users.submission_id }}</th>
                <td>{{ users.user_name }}</td>
                <td>{{ users.submission_score }}</td>
                <td>{{ users.userSubmitCount }}</td>
                <td>{{ users.submission_time }}</td>
              </tr>
            </tbody>
            </table>
          </div>
        <!-- 제출 -->
          <div class="tab-pane fade" id="list-submit" role="tabpanel" aria-labelledby="list-submit-list">
            <div class="file-submit">
              <h5 class="list-title">csv 파일 제출</h5>
              <input type="file"
                     class="form-control"
                     accept=".csv"
                     placeholder="첨부파일">

              <h5 class="list-title">ipynb 파일 제출</h5>
              <input type="file"
                     class="form-control"
                     accept=".ipynb">
              <button class="btn" @click="submitFile">파일 제출</button>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">선택</th>
                  <th scope="col">csv 파일 이름</th>
                  <th scope="col">ipynb 파일 이름</th>
                  <th scope="col">점수</th>
                  <th scope="col">제출 날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(submit, i) in submitList" :key="i">
                  <th scope="row">
                    <input class="form-check-input"
                           type="checkbox"
                           @select="this.submitRowIndex = i">
                  </th>
                  <td>{{ submit.submission_csv }}</td>
                  <td>{{ submit.submission_ipynb }}</td>
                  <td>{{ submit.submission_score }}</td>
                  <td>{{ submit.submission_time }}</td>
                </tr>
              </tbody>
            </table>
            <button class="btn" @click="totalSubmit()">제출</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'Problem',
  data () {
    return {
      userID: this.$store.state.userid,
      joinText: '참여',
      alreadyJoined: false,
      isClassUser: false,
      problemType: '',
      problemID: '', // 대회 문제 아이디, 수업 아이디
      contestID: '', // 수업 사이드바 아이디
      contestProblemID: '', // 수업 사이드바 하위 문제 아이디
      problemInfo: [],
      leaderboardList: [],
      submitList: [],
      submitRowIndex: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.problemType = this.$route.params.problemType
      this.problemID = this.$route.params.problemID
      if (this.problemType === 'general') {
        // this.getUserStatus() -> api 없이 진행할 예정
      }
      if (this.problemType === 'class') {
        this.contestID = this.$route.params.contestID
        this.contestProblemID = this.$route.params.contestProblemID
        this.getClassUserList()
      }
      if (this.alreadyjoined) {
        this.joinText = '참여중'
      } else {
        this.joinText = '참여하기'
      }
      this.getProblem()
      // this.getLeaderboard() -> api 미구현
      // this.getUserSubmissions() -> api 미구현
    },
    // async getUserStatus () {
    //   try {
    //     const res = await api.getUserCompetitionList(this.userID)
    //     const competitionList = res.data
    //     for (let i = 0; i < competitionList.length; i++) {
    //       if (String(competitionList[i].competition_id) === this.problemID) {
    //         this.joinText = '참여중'
    //         this.alreadyJoined = true
    //       }
    //     }
    //   } catch (err) {
    //     console.log(err.response.data)
    //   }
    // },
    async getClassUserList () {
      try {
        const res = await api.getClassUserList(this.problemID)
        const userList = res.data
        for (let i = 0; i < userList.length; i++) {
          if (String(userList[i].username) === this.userID) {
            this.isClassUser = true
            this.alreadyJoined = true
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getProblem () {
      try {
        let res
        if (this.problemType === 'general') { // 대회 문제
          res = await api.getCompetitions(this.problemID)
        }
        if (this.problemType === 'class') {
          if (this.contestID === undefined) { // all problem
            res = await api.getProblem(this.problemID)
            console.log(res)
          } else { // contest problem
            res = await api.getContestProblem(this.problemID, this.contestID, this.contestProblemID)
          }
        }
        this.problemInfo = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async getLeaderboard () { // api 미구현
      try {
        let res = await api.getCompetitionsLeaderboard(this.problemID)
        if (this.problemType === 'class') {
          res = await api.getClassLeaderboard(this.contestProblemID)
        }
        this.leaderboardList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async joinCompetition () {
      try {
        await api.joinCompetition(this.problemID)
      } catch (err) {
        console.log(err)
      }
    },
    async getUserSubmissions () { // api 미구현
      try {
        const res = await api.getUserSubmissions(this.userID, this.problemID)
        this.submitList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async submitFile () { // api 미구현
      try {
        // const data = {
        //   submission_csv:
        //   submission_ipynb:
        // }
        // const res = await api.submitFile(this.problemID, this.userID, data)
        // console.log(res)
        // this.getUserSubmissions() // 제출 후 아래 제출 내역 리로드
      } catch (err) {
        console.log(err)
      }
    },
    async selectFile (i) { // api 미구현
      try {
        // const data = {
        //   submission_csv: // 체크박스에 선택된 csv 파일
        //   submission_ipynb: // 체크박스에 선택된 ipynb 파일
        // }
        // const res = await api.selectFile(this.problemID, this.userID, data)
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    async totalSubmit () { // api 미구현
      try {
        // const data = {
        // submitRowIndex의 값을 데이터로 전송
        // }
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
  .problem-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 3rem 0;
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
    background-color: #fff;
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
      h5 {
        padding: 0rem 1rem;
        font-weight: bold;
      }
      p {
        margin-right: 10px;
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
      background-color: #F4F4F8;
      border: none;
      margin-bottom: 1rem;
      line-height: 10;
      color: #98A8B9;
    }
    .form-control::file-selector-button {
        color: transparent;
        background-color: #F4F4F8;
    }
  }
}
</style>
