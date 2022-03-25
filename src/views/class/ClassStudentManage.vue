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
        this.taList = ''
        this.studentList = ''
        const res = await api.getClassUserList(this.classID)
        this.classUserList = res.data
        this.setUserList()
        this.getPrivilege()
      } catch (err) {
        console.log(err)
      }
    },
    setUserList () {
      for (const classUser of this.classUserList) {
        if (classUser.privilege === 0) {
          this.studentList += classUser.username + '\n'
        } else if (classUser.privilege === 1) {
          this.taList += classUser.username + '\n'
        }
      }
    },
    async getUserPrivilege () {
      const res = await api.classUserPrivilege(this.classID)
      this.userPrivilege = res.data.privilege
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
