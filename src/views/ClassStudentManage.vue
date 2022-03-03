<template>
  <div class="container">
    <div id="class-manager-form" class="form-floating row py-5" @submit.prevent="submitForm">
      <form class="class-student-form col-md-4">
        <label for="class-student" class="p-2 fs-4">수강생</label>
        <textarea id="class-student"
                  class="form-control mb-3 p-3" cols="30" rows="15"
                  v-model="studentlist"
                  placeholder="수강생을 등록하세요.">
        </textarea>
        <button class="btn"
                type="submit"
                @click="submitStudentForm"
        >등록</button>
      </form>
      <form v-if="privilege>1" class="class-TA-form col-md-4">
        <label for="class-TA" class="p-2 fs-4">TA</label>
        <textarea id="class-TA"
                  class="form-control mb-3 p-3" cols="30" rows="15"
                  v-model="talist"
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
      studentlist: '',
      talist: '',
      privilege: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getClassUserList()
      this.getPrevilege()
    },
    async getPrevilege () {
      const res = await api.getClassUserList(this.classID)
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].username === this.$store.state.userid) {
          this.privilege = res.data[i].privilege
          break
        }
      }
    },
    async getClassUserList () {
      try {
        const res = await api.getClassUserList(this.classID)
        this.studentlist = ''
        this.talist = ''
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].privilege === 0) {
            this.studentlist += res.data[i].username + '\n'
          } else if (res.data[i].privilege === 1) {
            this.talist += res.data[i].username + '\n'
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submitTAForm () {
      const data = []
      const tmp = this.talist.split('\n')
      for (var i = 0; i < tmp.length; i++) {
        data.push({ username: tmp[i] })
      }
      await api.submitClassTAList(this.classID, data)
      alert('TA 등록이 완료되었습니다.')
      this.getClassUserList()
    },
    async submitStudentForm () {
      const data = []
      const tmp = this.studentlist.split('\n')
      for (var i = 0; i < tmp.length; i++) {
        data.push({ username: tmp[i] })
      }
      await api.submitClassStudentList(this.classID, data)
      alert('수강생 등록이 완료되었습니다.')
      this.getClassUserList()
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
textarea {
  resize: none;
}
.btn {
  float: right;
}
</style>
