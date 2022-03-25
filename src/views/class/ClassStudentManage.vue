<template>
  <div class="container">
    <div id="class-manager-form" class="form-floating row py-5" @submit.prevent="submitForm">
      <form class="class-student-form col-md-4">
        <label for="class-student" class="p-2 fs-4">수강생</label>
        <textarea id="class-student"
                  class="form-control mb-3 p-3" cols="30" rows="15"
                  v-model="studentList"
                  placeholder="수강생을 등록하세요.">
        </textarea>
        <button class="btn"
                type="submit"
                @click="submitStudentForm"
        >등록</button>
      </form>
      <form v-if="isProf()" class="class-TA-form col-md-4">
        <label for="class-TA" class="p-2 fs-4">TA</label>
        <textarea id="class-TA"
                  class="form-control mb-3 p-3" cols="30" rows="15"
                  v-model="taList"
                  placeholder="TA를 등록하세요.">
        </textarea>
        <button class="btn"
                type="submit"
                @click="submitTAForm"
        >등록</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  name: 'ClassStudentManager',
  data () {
    return {
      classID: this.$route.params.classID,
      classUserList: [],
      studentList: '',
      taList: '',
      userPrivilege: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getClassUserList()
    },
    async getClassUserList () {
      try {
        const res = await api.classUserPrivilege(this.classID)
        this.userPrivilege = res.data.privilege
        this.taList = ''
        this.studentList = ''
        if (this.userPrivilege === 2) {
          this.setTAUserList()
        }
        this.setStudentUserList()
      } catch (err) {
        console.log(err)
      }
    },
    async setStudentUserList () {
      const res = await api.getClassStudentUserList(this.classID)
      for (const StudentUser of res.data) {
        this.studentList += StudentUser.username + '\n'
      }
    },
    async setTAUserList () {
      const res = await api.getClassTAUserList(this.classID)
      for (const TAUser of res.data) {
        this.taList += TAUser.username + '\n'
      }
    },
    isProf () {
      return (this.userPrivilege > 1)
    },
    async submitTAForm () {
      const data = this.makeClassUserData(this.taList)
      await api.submitClassTAList(this.classID, data)
      alert('TA 등록이 완료되었습니다.')
      this.getClassUserList()
    },
    async submitStudentForm () {
      const data = this.makeClassUserData(this.studentList)
      await api.submitClassStudentList(this.classID, data)
      alert('수강생 등록이 완료되었습니다.')
      this.getClassUserList()
    },
    makeClassUserData (userList) {
      const data = []
      const tmp = userList.split('\n')
      for (const user of tmp) {
        data.push({ username: user })
      }
      return data
    }
  }
}
</script>

<style scoped>
#class-manager-form {
  justify-content: space-evenly;
}

label {
  font-weight: bold;
}

.btn {
  float: right;
}
</style>
