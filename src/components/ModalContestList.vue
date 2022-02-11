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
                  <p style="float:left">시험모드 </p>
                  <span class="form-check form-switch" style="float:left; margin-left:10px">
                    <input class="form-check-input" id="flexSwitchCheckChecked" type="checkbox" v-model="contestInfo.checkedExam" checked>
                  </span>
                  </div>
                  <div class="col-4">
                  <p style="float:left">공개 </p>
                  <span class="form-check form-switch" style="float:left; margin-left:10px">
                    <input class="form-check-input" id="flexSwitchCheckChecked" type="checkbox" v-model="contestInfo.checkedVisible" checked>
                  </span>
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
        checkedExam: false,
        checkedVisible: true
      }
    }
  },
  methods: {
    async submitForm () {
      try {
        const data = {
          name: this.contestInfo.title,
          start_time: this.contestInfo.startTime.toISOString(),
          end_time: this.contestInfo.endTime.toISOString(),
          is_exam: this.contestInfo.checkedExam,
          visible: this.contestInfo.checkedVisible
        }
        const res = await api.createContest(this.classID, data)
        console.log(res)
        alert(`${this.contestInfo.title}이(가) 등록되었습니다.`)
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
