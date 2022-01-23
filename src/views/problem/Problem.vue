<template>
  <div class="container">
    <div class="problem-header">
      <h1 id="title">{{ this.problemTitle }}</h1>
      <button class="btn" @click="joinCompetition" :disabled="alreadyJoined">{{ this.joinText }}</button>
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
            <h5 class="list-title">문제 설명</h5>
            <p class="list-content">
              {{ problemInfo.description }}
            </p>
            <div class="period">
              <h5>시작 시간</h5>
              <p class="list-content">
                {{ problemInfo.startTime }}
              </p>
              <h5>종료 시간</h5>
              <p class="list-content">
                {{ problemInfo.endTime }}
              </p>
            </div>
          </div>
        <!-- 데이터 -->
          <div class="tab-pane fade" id="list-data" role="tabpanel" aria-labelledby="list-data-list">
            <h5 class="list-title">데이터 설명
                <button class="btn" :disabled="alreadyJoined == false">다운로드</button>
            </h5>
            <p class="list-content">
              {{ this.dataDescription }}
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
              <input type="file" class="form-control" accept=".csv" placeholder="첨부파일">
              <h5 class="list-title">ipynb 파일 제출</h5>
              <input type="file" class="form-control" accept=".ipynb">
              <button class="btn">파일 제출</button>
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
                <tr v-for="submit in submitList" :key="submit">
                <th scope="row">
                  <input class="form-check-input" type="checkbox" @select="submitFile()">
                </th>
                <td>{{ submit.submission_csv }}</td>
                <td>{{ submit.submission_ipynb }}</td>
                <td>{{ submit.submission_score }}</td>
                <td>{{ submit.submission_time }}</td>
                </tr>
            </tbody>
            </table>
            <button class="btn">제출</button>
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
      joinText: '참여하기',
      alreadyJoined: false,
      problemID: '',
      problemTitle: '',
      problemInfo: {
        description: '',
        startTime: '',
        endTime: ''
      },
      dataDescription: '',
      leaderboardList: [],
      submitList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.problemID = this.$route.params.problemID
      this.getUserInfo()
      this.getCompetitionProblem()
      this.getCompetitionLeaderboard()
      this.getUserSubmissions()
    },
    async getUserInfo () {
      try {
        const res = await api.getUserCompetitionList(this.userID)
        const competitionList = res.data
        for (let i = 0; i < competitionList.length; i++) {
          if (String(competitionList[i].competition_id) === this.problemID) {
            this.joinText = '참여중'
            this.alreadyJoined = true
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getCompetitionProblem () {
      try {
        const res = await api.getCompetitions(this.problemID)
        const problem = res.data

        this.problemTitle = problem.problem_title
        this.problemInfo.description = problem.problem_description
        this.problemInfo.startTime = problem.competition_start_time
        this.problemInfo.endTime = problem.competition_end_time
        this.dataDescription = problem.problem_data_description
      } catch (err) {
        console.log(err)
      }
    },
    async getCompetitionLeaderboard () {
      try {
        const res = await api.getCompetitionsLeaderboard(this.problemID)
        this.leaderboardList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async joinCompetition () {
      try {
        const res = await api.joinCompetition(this.problemID)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    async getUserSubmissions () {
      try {
        const res = await api.getUserSubmissions(this.userID, this.problemID)
        console.log(res)
        this.submitList = res.data
        console.log(this.submitList)
      } catch (err) {
        console.log(err)
      }
    },
    async submitFile () {
      try {
        // const data = {
        //   submission_csv: // 체크박스에 선택된 csv 파일
        //   submission_ipynb: // 체크박스에 선택된 ipynb 파일
        // }
        // const res = await api.submitFile(this.problemID, this.userID, data)
        // console.log(res)
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
    background-color: var(--colorBg10);
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
