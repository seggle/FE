<template>
  <div class="container problem-container" :key="problem"
       v-if="isClassUser">
    <div class="problem-header">
      <h1 id="title">
        {{ problem.title }}
      </h1>
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
            >제출
          </a>
        </div>
      </div>
      <!-- 탭 내용 -->
      <div class="problem-tab-content col-10">
        <div class="tab-content" id="nav-tabContent">
        <!-- 문제 설명 -->
          <div class="tab-pane fade show active" role="tabpanel"
                id="list-info" aria-labelledby="list-info-list"
                :key="problem">
            <h5 class="list-title">
              문제 설명
            </h5>
            <p class="list-content">
              <span><VueShowdown class="v-show-down" :markdown="problem.description"></VueShowdown></span>
            </p>
          </div>
        <!-- 데이터 -->
          <div class="tab-pane fade" id="list-data" role="tabpanel" aria-labelledby="list-data-list">
            <h5 class="list-title">데이터 설명
              <a id="zip-download">
                <button class="btn"
                        :disabled="alreadyJoined == false"
                        @click="downloadDataFile">
                  다운로드
                </button>
              </a>
            </h5>
            <p class="list-content">
              <span><VueShowdown class="v-show-down" :markdown="problem.data_description"></VueShowdown></span>
            </p>
          </div>
        <!-- 리더보드 -->
          <div class="tab-pane fade table-div" id="list-leaderboard" role="tabpanel" aria-labelledby="list-leaderboard-list">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">이름</th>
                  <th scope="col">점수</th>
                  <th scope="col">제출 날짜</th>
                  <th v-if="isTAOverPrivilege()" scope="col">코드(.ipynb)</th>
                  <th v-if="isTAOverPrivilege()" scope="col">답안(.csv)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isTAOverPrivilege() && leaderboardList.length === 0"><td colspan="6">아직 아무도 제출하지 않았어요.</td></tr>
                <tr v-else-if="!isTAOverPrivilege() && leaderboardList.length === 0"><td colspan="4">아직 아무도 제출하지 않았어요.</td></tr>
                <tr v-for="(users, i) in leaderboardList" :key="users" :class="{ 'bg-success p-2 text-dark bg-opacity-50': this.userID === users.username }">
                  <th scope="row">{{ i + 1 }}</th>
                  <td>{{ users.username }}</td>
                  <td>{{ users.score }}</td>
                  <td>{{ users.created_time }}</td>
                  <td v-if="isTAOverPrivilege()">
                    <a id="ipynb-download">
                      <button class="download-btn"
                        @click="downloadIpynbFile(users.id)">
                        <font-awesome-icon icon="file-arrow-down" />
                      </button>
                    </a>
                  </td>
                  <td v-if="isTAOverPrivilege()">
                    <a id="csv-download">
                      <button class="download-btn"
                        @click="downloadCsvFile(users.id)">
                        <font-awesome-icon icon="file-arrow-down" />
                      </button>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        <!-- 제출 -->
          <div class="tab-pane fade" id="list-submit" role="tabpanel" aria-labelledby="list-submit-list">
            <div class="file-submit">
              <h5 class="list-title">csv 파일 제출</h5>
              <p class="file-desc">하나의 csv 파일만 업로드 가능합니다</p>
              <input id="csv-file-input"
                     type="file"
                     class="form-control"
                     accept=".csv"
                     @change="uploadFile">

              <h5 class="list-title">ipynb 파일 제출</h5>
              <p class="file-desc">하나의 ipynb 파일만 업로드 가능합니다</p>
              <input id="ipynb-file-input"
                     type="file"
                     class="form-control"
                     accept=".ipynb"
                     @change="uploadFile">
              <button class="btn" @click="submitFile()">파일 제출</button>
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
                    <th scope="col">Status</th>
                    <th scope="col">제출 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(submit, i) in submitList" :key="i">
                    <th scope="row">
                      <input v-if="submit.status===0" class="form-check-input"
                            type="checkbox"
                            v-model="submitRowIndex"
                            :true-value="submit.id"
                      />
                    </th>
                    <td>{{ submit.csv }}</td>
                    <td>{{ submit.ipynb }}</td>
                    <td>{{ submit.score }}</td>
                    <td>{{ submit.success }}</td>
                    <td>{{ submit.created_time }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination :pagination="PageValue" @get-page="getUserSubmissions" />
            <button class="btn" @click="selectSubmission">저장</button>
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
import VueShowdown from 'vue-showdown'

export default {
  name: 'ClassContestProblem',
  components: {
    Pagination,
    VueShowdown
  },
  data () {
    return {
      userID: this.$store.state.userid,
      isClassUser: false,
      userPrivilege: 0,

      problemID: this.$route.params.classID,
      contestID: this.$route.params.contestID,
      contestProblemID: this.$route.params.contestProblemID,

      problem: [],
      leaderboardList: [],

      submitList: [],
      submitRowIndex: '',
      csv: '',
      ipynb: '',

      PageValue: [],
      currentPage: 1
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getClassUserList()
      this.getProblem()
      this.getUserSubmissions(1)
      this.getLeaderboard()
    },
    async getClassUserList () {
      try {
        const res = await api.getClassUserList(this.problemID)
        const userList = res.data
        for (const user of userList) {
          if (String(user.username) === this.userID) {
            this.isClassUser = true
            this.alreadyJoined = true
            this.userPrivilege = user.privilege
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    isTAOverPrivilege () {
      return (this.userPrivilege > 0)
    },
    async getProblem () {
      try {
        const res = await api.getContestProblem(this.problemID, this.contestID, this.contestProblemID)
        this.problem = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async getLeaderboard () {
      try {
        const res = await api.getClassLeaderboard(this.contestProblemID)
        this.leaderboardList = res.data
        for (const leaderboard of this.leaderboardList) {
          leaderboard.created_time = GMTtoLocale(leaderboard.created_time)
        }
      } catch (err) {
        console.log(err)
      }
    },
    alreadyChecked () {
      for (const submission of this.submitList) {
        if (submission.on_leaderboard) {
          this.submitRowIndex = submission.id
        }
      }
    },
    changeSubmissionListName () {
      for (const submission of this.submitList) {
        const csvName = submission.csv
        const ipynbName = submission.ipynb
        const submitDate = submission.created_time

        submission.csv = csvName.split('/').pop()
        submission.ipynb = ipynbName.split('/').pop()
        submission.created_time = GMTtoLocale(submitDate)
      }
    },
    async getUserSubmissions (page) {
      try {
        this.currentPage = page
        this.PageValue = []
        const res = await api.getUserProblemSubmissions(page, this.userID, this.contestProblemID)
        this.submitList = res.data.results
        for (const submit of this.submitList) {
          if (submit.status === 1) {
            submit.success = '파일 오류'
          } else {
            submit.success = '정상 제출'
          }
        }
        this.alreadyChecked()
        this.changeSubmissionListName()

        this.PageValue.push({ count: res.data.count, currentPage: this.currentPage })
      } catch (err) {
        console.log(err)
      }
    },
    async submitFile () {
      try {
        const formData = new FormData()
        formData.append('csv', this.csv)
        formData.append('ipynb', this.ipynb)

        await api.submitFileProblem(
          this.problemID,
          this.contestID,
          this.contestProblemID,
          this.userID,
          formData)

        alert('파일 제출이 완료되었습니다.')
        this.getUserSubmissions(1)
      } catch (err) {
        console.log(err)
      }
    },
    uploadFile (e) {
      const files = e.target.files || e.dataTransfer.files
      const id = e.target.id

      const fileSize = files[0].size
      const maxSize = 10 * 1024 * 1024
      if (id === 'csv-file-input') {
        if (fileSize > maxSize) {
          alert('첨부파일은 10MB 이내로 등록 가능합니다.')
        } else {
          this.csv = files[0]
        }
      } else {
        this.ipynb = files[0]
      }
    },
    async selectSubmission () {
      try {
        const data = {
          id: this.submitRowIndex
        }
        await api.selectProblemSubmission(
          this.problemID,
          this.contestID,
          this.contestProblemID,
          data)

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
      const response = await api.downloadDataFile(this.problemID)
      this.downloadFile(response, 'zip')
    },
    async downloadCsvFile (submissionID) {
      const response = await api.downloadClassCsvFile(submissionID)
      this.downloadFile(response, 'csv')
    },
    async downloadIpynbFile (submissionID) {
      const response = await api.downloadClassIpynbFile(submissionID)
      this.downloadFile(response, 'ipynb')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-div {
  .table {
    tbody {
      tr:hover {
        cursor: default;
      }
    }
  }
}
</style>
