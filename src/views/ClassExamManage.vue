<template>
<div class="table-div">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">아이디</th>
        <th scope="col">IP주소</th>
        <th scope="col">시작시간</th>
        <th scope="col">RESET</th>
        <th scope="col">EXCEPTION</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="users in userList" :key="users">
        <th scope="row">{{ users._id }}</th>
        <td>{{ users.username }}</td>
        <td>{{ users.ip_address }}</td>
        <td>{{ users.start_time }}</td>
        <td><a href="#" @click="resetIP">RESET</a></td>
        <td><a href="#" @click="except">EXCEPTION</a></td>
      </tr>
    </tbody>
  </table>
</div>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled" v-if="currentPage == 1">
        <a class="page-link" tabindex="-1" aria-disabled="true">이전</a>
      </li>
      <li class="page-item" v-else>
        <a class="page-link" @click="getUserList(currentPage - 1)">이전</a>
      </li>
      <div v-for="page in total" :key="page">
        <li class="page-item active" v-if="page == currentPage">
          <a class="page-link" @click="getUserList(page)">{{ page }}</a>
        </li>
        <li class="page-item" v-else>
          <a class="page-link" @click="getUserList(page)">{{ page }}</a>
        </li>
      </div>
      <li class="page-item disabled" v-if="currentPage == total">
        <a class="page-link" href="#">다음</a>
      </li>
      <li class="page-item" v-else>
        <a class="page-link" @click="getUserList(currentPage + 1)">다음</a>
      </li>
    </ul>
  </nav>
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
      userList: []
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    /* is_exam인 contest들의 contestID 추출 */
    async getUserList () {
      try {
        const res1 = await api.getContestList(this.classID)
        this.contestList = res1.data
        for (var i = 0; i < this.contestList.length; i++) {
          if (this.contestList[i].is_exam === true) {
            this.examList.push(this.contestList[i])
          }
        }
        console.log(this.testMode)
      } catch (error) {
        console.log(error)
      }
      try {
        for (var j = 0; j < this.examList.length; j++) {
          var contestID = this.examList[i].id
          const res2 = await api.examInfo(this.classID, contestID)
          this.userList.concat(res2)
        }
        console.log(this.userList)
      } catch (error) {
        console.log(error)
      }
    },
    resetIP () {
      if (confirm('리셋하시겠습니까?')) {
        alert('리셋 완료')
      } else {
      }
    },
    except () {
      if (confirm('예외처리하시겠습니까?')) {
        alert('예외처리 완료')
      } else {
      }
    }
  }
}
</script>

<style></style>
