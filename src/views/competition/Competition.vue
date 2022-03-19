<template>
  <div class="container problem-container" :key="problem">
    <div class="problem-header">
      <h1 id="title">
        {{ problem.title }}
      </h1>
      <button class="btn" @click="joinCompetition" :disabled="alreadyJoined">
        {{ this.joinText }}
      </button>
    </div>

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
            >문제 설명
          </a>
          <a
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
            role="tab"
            id="list-data-list"
            href="#list-data"
            aria-controls="list-data"
            >데이터
          </a>
          <a
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
            role="tab"
            id="list-leaderboard-list"
            href="#list-leaderboard"
            aria-controls="list-leaderboard"
            >리더보드
          </a>
          <a
            class="list-group-item list-group-item-action"
            data-bs-toggle="list"
            role="tab"
            id="list-submit-list"
            href="#list-submit"
            aria-controls="list-submit"
            >제출
          </a>
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
            <p class="list-content">
              <span v-html="problem.description"></span>
            </p>
            <div class="period">
              <h5>시작 시간</h5>
              <p>
                {{ problem.start_time }}
              </p>
              <h5>종료 시간</h5>
              <p>
                {{ problem.end_time }}
              </p>
            </div>
          </div>
          <!-- 데이터 -->
          <div
            class="tab-pane fade"
            id="list-data"
            role="tabpanel"
            aria-labelledby="list-data-list"
          >
            <h5 class="list-title">데이터 설명
              <a id="zip-download">
                <button class="btn"
                        :disabled="alreadyJoined == false"
                        @click="downloadDataFile"
                >다운로드</button>
              </a>
            </h5>
            <p class="list-content">
              <span v-html="problem.data_description"></span>
            </p>
          </div>
          <!-- 리더보드 -->
          <div
            class="tab-pane fade table-div"
            id="list-leaderboard"
            role="tabpanel"
            aria-labelledby="list-leaderboard-list"
          >
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">이름</th>
                  <th scope="col">점수</th>
                  <th scope="col">제출 날짜</th>
                  <th v-if="IsContestAdminCheck" scope="col">코드(.ipynb)</th>
                  <th v-if="IsContestAdminCheck" scope="col">답안(.csv)</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, i) in leaderboardList"
                  :key="user"
                  :class="{
                    'bg-success p-2 text-dark bg-opacity-50':
                      this.userID === user.username,
                  }"
                >
                  <th scope="row">{{ i + 1 }}</th>
                  <td>{{ user.username }}</td>
                  <td>{{ user.score }}</td>
                  <td>
                    {{ user.created_time }}
                  </td>
                  <td v-if="IsContestAdminCheck">
                    <a id="ipynb-download">
                      <button
                        class="download-btn"
                        @click="downloadIpynbFile(user.id)"
                      >
                        <font-awesome-icon icon="file-arrow-down" />
                      </button>
                    </a>
                  </td>
                  <td v-if="IsContestAdminCheck">
                    <a id="csv-download">
                      <button
                        class="download-btn"
                        @click="downloadCsvFile(user.id)"
                      >
                        <font-awesome-icon icon="file-arrow-down" />
                      </button>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 제출 -->
          <div
            class="tab-pane fade"
            id="list-submit"
            role="tabpanel"
            aria-labelledby="list-submit-list"
          >
            <div class="file-submit">
              <h5 class="list-title">csv 파일 제출</h5>
              <p class="file-desc">하나의 csv 파일만 업로드 가능합니다</p>
              <input
                id="csv-file-input"
                type="file"
                class="form-control"
                accept=".csv"
                @change="uploadFile"
              />

              <h5 class="list-title">ipynb 파일 제출</h5>
              <p class="file-desc">하나의 ipynb 파일만 업로드 가능합니다</p>
              <input
                id="ipynb-file-input"
                type="file"
                class="form-control"
                accept=".ipynb"
                @change="uploadFile"
              />
              <button class="btn" @click="submitFile">파일 제출</button>
            </div>
            <div class="table-div">
              <h5 class="list-title">제출 내역</h5>
              <p class="file-desc">선택한 제출 내역이 리더보드에 표시됩니다.</p>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"><font-awesome-icon icon="check" /></th>
                    <th scope="col">csv 파일</th>
                    <th scope="col">ipynb 파일</th>
                    <th scope="col">점수</th>
                    <th scope="col">제출 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="count === 0">
                    <td colspan="3">제출한 대회가 없습니다.</td>
                  </tr>
                  <tr v-for="(submit, i) in submitList" :key="i">
                    <th scope="row">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="submitRowIndex"
                        :true-value="submit.id"
                      />
                    </th>
                    <td>{{ submit.csv }}</td>
                    <td>{{ submit.ipynb }}</td>
                    <td>{{ submit.score }}</td>
                    <td>{{ submit.created_time }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination :pagination="PageValue" @get-page="getUserSubmissions" />
            <button class="btn" @click="selectSubmission">제출</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import Pagination from '@/components/Pagination.vue'
import { GMTtoLocale } from '@/utils/time.js'

const showdown = require('showdown')
const converter = new showdown.Converter()

export default {
  name: 'Competition',
  components: {
    Pagination
  },
  data () {
    return {
      userID: this.$store.state.userid,
      joinText: '참여',
      alreadyJoined: false,
      isClassUser: false,

      competitionID: this.$route.params.competitionID, // 대회 문제 아이디, 수업 아이디

      problem: [],
      leaderboardList: [],

      submitList: [],
      submitRowIndex: '',
      csv: '',
      ipynb: '',

      PageValue: [],
      count: 0,
      currentPage: 1,
      privilege: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getUserStatus()
      /* 대회 참여여부 체크 */
      if (this.alreadyjoined) {
        this.joinText = '참여중'
      } else {
        this.joinText = '참여하기'
      }
      this.getProblem()
      this.getUserSubmissions(1)
      this.getLeaderboard()
    },
    /* 대회 관리자 리스트 불러오기 */
    async getUserStatus () {
      try {
        const res = await api.getCompetitionUserList(this.competitionID)
        const competitionUserList = res.data
        for (const competitionUser of competitionUserList) {
          if (competitionUser.username === this.userID) {
            this.joinText = '참여중'
            this.alreadyJoined = true
            this.privilege = competitionUser.privilege
          }
        }
      } catch (err) {
        console.log(err.response.data)
      }
    },
    /* 대회 관리자인지 체크 */
    IsContestAdminCheck () {
      if (this.privilege !== 0) {
        return false
      } else {
        return true
      }
    },
    /* 대회문제 불러오기 */
    async getProblem () {
      try {
        const res = await api.getCompetitions(this.competitionID)
        res.data.start_time = GMTtoLocale(res.data.start_time)
        res.data.end_time = GMTtoLocale(res.data.end_time)
        res.data.description = converter.makeHtml(res.data.description)
        res.data.data_description = converter.makeHtml(
          res.data.data_description
        )
        this.problem = res.data
      } catch (err) {
        console.log(err)
      }
    },
    /* 리더보드 불러오기 */
    async getLeaderboard () {
      try {
        const res = await api.getCompetitionsLeaderboard(this.competitionID)
        this.leaderboardList = res.data
        for (const user of this.leaderboardList) {
          user.created_time = GMTtoLocale(user.created_time)
        }
      } catch (err) {
        console.log(err)
      }
    },
    /* 대회 참여하기 */
    async joinCompetition () {
      try {
        await api.joinCompetition(this.competitionID)
        alert('참여 완료되었습니다.')
        this.$router.go(this.$router.currentRoute)
      } catch (err) {
        alert(err.response.data.error)
      }
    },
    /* 제출할 파일이 이미 리더보드에 있는지 확인 */
    alreadyChecked () {
      // is_show이면 체크되어있어야함
      for (const submit of this.submitList) {
        if (submit.on_leaderboard) {
          this.submitRowIndex = submit.id
        }
      }
    },
    /* 제출내역의 파일명 바꾸기 */
    changeSubmissionListName () {
      for (const submit of this.submitList) {
        const csvName = submit.csv
        const ipynbName = submit.ipynb
        const submitDate = submit.created_time

        submit.csv = csvName.split('/').pop()
        submit.ipynb = ipynbName.split('/').pop()
        submit.created_time = GMTtoLocale(submitDate)
      }
    },
    /* 대회참여자의 제출물 불러오기 */
    async getUserSubmissions (page) {
      try {
        this.currentPage = page
        this.PageValue = []

        const res = await api.getUserCompetitionSubmissions(
          this.competitionID,
          this.userID
        )
        this.count = res.data.length
        this.submitList = res.data.results
        this.alreadyChecked()
        this.changeSubmissionListName()

        this.PageValue.push({
          count: res.data.count,
          currentPage: this.currentPage
        })

        if (res.data.count !== 0) {
          this.total = parseInt((res.data.count - 1) / 15) + 1
        }
      } catch (err) {
        console.log(err)
      }
    },
    /* 파일 제출 */
    async submitFile () {
      try {
        const formData = new FormData()
        formData.append('csv', this.csv)
        formData.append('ipynb', this.ipynb)

        await api.submitFileCompetition(
          this.competitionID,
          this.userID,
          formData
        )

        alert('파일 제출이 완료되었습니다.')
        this.getUserSubmissions(1)
      } catch (err) {
        console.log(err)
      }
    },
    /* 파일 업로드 */
    uploadFile (e) {
      const files = e.target.files || e.dataTransfer.files
      const id = e.target.id
      if (id === 'csv-file-input') {
        this.csv = files[0]
      } else {
        this.ipynb = files[0]
      }
    },
    /* 제출할 파일 선택 */
    async selectSubmission () {
      try {
        const data = {
          id: this.submitRowIndex
        }
        await api.selectCompetitionSubmission(this.competitionID, data)

        alert('제출이 완료되었습니다.')
        this.getLeaderboard()
      } catch (err) {
        console.log(err)
      }
    },
    downloadFile (response, FILE_TYPE) {
      const filename = response.headers['content-disposition'].split('filename=')[1]
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: `application/${FILE_TYPE}`
        })
      )
      const a = document.getElementById(`${FILE_TYPE}-download`)
      a.href = url
      a.download = filename
      a.click()
    },
    async downloadDataFile () {
      const response = await api.downloadDataFile(this.problem.problem_id)
      this.downloadFile(response, 'zip')
    },
    async downloadCsvFile (submissionID) {
      const response = await api.downloadCompetitionCsvFile(submissionID)
      this.downloadFile(response, 'csv')
    },
    async downloadIpynbFile (submissionID) {
      console.log(submissionID)
      const response = await api.downloadCompetitionIpynbFile(submissionID)
      this.downloadFile(response, 'ipynb')
    }
  }
}
</script>

<style lang="scss" scoped></style>
