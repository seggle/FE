<template>
  <div class="table-div">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">시험명</th>
          <th scope="col">아이디</th>
          <th scope="col">사용자</th>
          <th scope="col">IP주소</th>
          <th scope="col">시작시간</th>
          <th scope="col">RESET</th>
          <th scope="col">EXCEPTION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="users in userList" :key="users">
          <th scope="row">{{ users.contest }}</th>
          <td>{{ users.id }}</td>
          <td>{{ users.user }}</td>
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
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'ClassExamManage',
  data () {
    return {
      classID: this.$route.params.classID,
      contestList: [],
      examList: [],
      userList: [],
      currentPage: 1
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    /* is_exam인 contest들의 contestID 추출 -> examList */
    async getUserList () {
      try {
        const res1 = await api.getContestList(this.classID)
        this.contestList = res1.data
        for (var i = 0; i < this.contestList.length; i++) {
          if (this.contestList[i].is_exam === true) {
            this.examList.push(this.contestList[i])
          }
        }
        console.log(this.examList)
      } catch (error) {
        console.log(error)
      }
      try {
        for (var j = 0; j < this.examList.length; j++) {
          var contestID = this.examList[j].id
          const res2 = await api.examInfo(this.classID, contestID)
          console.log(res2.data.results)
          this.userList = this.userList.concat(res2.data.results)
        }
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
