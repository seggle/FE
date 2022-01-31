<template>
  <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <form class="modal-container" @submit.prevent="submitForm">

              <div class="modal-header">
                <h5>문제 생성</h5>
                <button type="button" class="btn-close" @click="$emit('close')"></button>
              </div>

              <div class="modal-body">
                <div class="row">
                  <label class="form-label">문제</label>
                  <input class="form-control"
                        type="text"
                        v-model="contestInfo.title"
                        placeholder="문제명"
                        required>
                </div>
                <div class="row">
                  <div class="col-5">
                    <label class="form-label">시작시간</label>
                    <Datepicker v-model="contestInfo.startTime" placeholder="시작 시간" textInput />
                  </div>
                  <div class="col-5">
                    <label class="form-label">종료시간</label>
                    <Datepicker v-model="contestInfo.endTime" placeholder="종료 시간" textInput />
                  </div>
                </div>
                <div class="row exam-checkbox">
                  <div class="col-4">
                    <label class="form-label">시험 모드</label>
                    <input type="checkbox" v-model="contestInfo.checkedExam">
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button class="btn" type="submit">저장</button>
              </div>
          </form>
        </div>
      </div>
    </transition>
</template>

<script>
import api from '@/api/index.js'
export default {
  name: 'ModalContestList',
  data () {
    return {
      classID: this.$route.params.classID,
      contestInfo: {
        title: '',
        startTime: '',
        endTime: '',
        checkedExam: false
      }
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          contest_name: this.contestInfo.title,
          contest_start_time: this.contestInfo.startTime.toISOString(),
          contest_end_time: this.contestInfo.endTime.toISOString(),
          is_exam: this.contestInfo.checkedExam
        }
        const res = await api.createContest(this.classID, data)
        console.log(res)
        alert(`${this.contestInfo.title}이 등록되었습니다.`)
        this.$router.go({ name: 'ClassProblem' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
