<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1 class="me-auto">{{ contestTitle }}</h1>
    </div>

    <div class="table-div">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">응시자</th>
            <th scope="col">IP주소</th>
            <th scope="col">시작시간</th>
            <th scope="col">RESET</th>
            <th scope="col">EXCEPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="users in userList" :key="users">
            <td scope="row">{{ users.user }}</td>
            <td>{{ users.ip_address }}</td>
            <td>
              {{
                users.start_time.slice(0, 10) +
                " " +
                users.start_time.slice(11, 19)
              }}
            </td>
            <td>
              <button
                v-if="this.$store.getters.isAdmin"
                class="btn btn-sm"
                @click="resetIP(users.contest, users.id)"
              >
                RESET
              </button>
            </td>
            <td>
              <button
                v-if="this.$store.getters.isAdmin"
                class="btn btn-sm"
                href="#"
                @click="exceptIP(users.contest, users.id)"
              >
                EXCEPTION
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Pagination :pagination="PageValue" @get-page="getPage" />
</template>

<script>
import api from '@/api/index.js'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'ClassExamManage',
  components: {
    Pagination
  },
  data () {
    return {
      classID: this.$route.params.classID,
      contestID: this.$route.params.contestID,
      contestTitle: '',
      contestList: [],
      userList: [],
      currentPage: 1,
      PageValue: []
    }
  },
  mounted () {
    this.getContestTitle()
    this.getUserList()
    this.init()
  },
  methods: {
    /* contestTitle 저장 */
    init () {
      this.getUserList(1)
    },
    async getContestTitle () {
      try {
        const res = await api.getContestList(this.classID)
        this.contestList = res.data
        console.log(this.contestList)
        for (var i = 0; i < this.contestList.length; i++) {
          console.log(this.contestList[i].id)
          if (this.contestList[i].id === parseInt(this.contestID)) {
            this.contestTitle = this.contestList[i].name
          }
        }
        console.log(this.contestTitle)
      } catch (error) {
        console.log(error)
      }
    },
    getPage (page) {
      this.getUserList(page)
    },
    /* 응시자 리스트 저장 */
    async getUserList (page) {
      try {
        this.currentPage = page
        this.PageValue = []
        const res = await api.examInfo(this.classID, this.contestID, page)
        this.PageValue.push({
          count: res.data.count,
          currentPage: this.currentPage
        })
        this.userList = res.data.results
        this.userList = this.userList.reverse()
        console.log(this.userList)
      } catch (error) {
        console.log(error)
      }
    },
    async resetIP (contestID, examID) {
      if (confirm('리셋하시겠습니까?')) {
        const res = await api.resetExam(this.classID, contestID, examID)
        console.log(res.data)
        alert('리셋 완료')
        this.$router.go()
      } else {
      }
    },
    async exceptIP (contestID, examID) {
      if (confirm('예외처리하시겠습니까?')) {
        const res = await api.exceptUser(this.classID, contestID, examID)
        console.log(res.data)
        alert('리셋 완료')
        this.$router.go()
      } else {
      }
    }
  }
}
</script>

<style>
tr {
  text-align: center;
}
</style>
