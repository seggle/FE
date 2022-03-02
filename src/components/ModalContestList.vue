<template>
  <transition name="modal" data-backdrop="static">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <form class="modal-container" @submit.prevent="submitForm">
          <div class="modal-header">
            <h5>{{ this.modalHeader }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')"
            ></button>
          </div>

          <div class="modal-body">
            <div class="row">
              <label class="form-label">문제</label>
              <input
                class="form-control"
                type="text"
                v-model="contestInfo.title"
                placeholder="문제명"
                required
              />
            </div>
            <div class="row">
              <div class="col-6" data-backdrop="static">
                <label class="form-label">시작시간</label>
                <Datepicker
                  v-model="contestInfo.startTime"
                  placeholder="시작 시간"
                  textInput
                />
              </div>
              <div class="col-6" data-backdrop="static">
                <label class="form-label">종료시간</label>
                <Datepicker
                  v-model="contestInfo.endTime"
                  placeholder="종료 시간"
                  textInput
                />
              </div>
              <div class="row exam-checkbox">
                <div class="col-6">
                  <label style="float: left">시험모드</label>
                  <span
                    class="form-check form-switch"
                    style="float: left; margin-left: 10px"
                  >
                    <input
                      class="form-check-input"
                      id="flexSwitchCheckChecked"
                      type="checkbox"
                      v-model="contestInfo.checkedExam"
                      checked
                    />
                  </span>
                </div>
                <div class="col-6">
                  <label style="float: left">공개</label>
                  <span
                    class="form-check form-switch"
                    style="float: left; margin-left: 10px"
                  >
                    <input
                      class="form-check-input"
                      id="flexSwitchCheckChecked"
                      type="checkbox"
                      v-model="contestInfo.checkedVisible"
                      checked
                    />
                  </span>
                </div>
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
import { GMTtoLocale } from '@/utils/time.js'
export default {
  name: 'ModalContestList',
  props: {
    editContestInfo: Object,
    mode: String
  },
  data () {
    return {
      classID: this.$route.params.classID,
      contestInfo: {
        id: '',
        title: '',
        startTime: '',
        endTime: '',
        checkedExam: false,
        checkedVisible: true
      },
      modalHeader: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.mode === 'create') {
        this.modalHeader = '문제 생성'
      } else if (this.mode === 'edit') {
        this.modalHeader = '문제 편집'
        this.contestInfo.id = this.editContestInfo.id
        this.contestInfo.title = this.editContestInfo.name
        this.contestInfo.startTime = this.editContestInfo.start_time
        this.contestInfo.endTime = this.editContestInfo.end_time
        this.contestInfo.checkedExam = this.editContestInfo.is_exam
        this.contestInfo.checkedVisible = this.editContestInfo.visible
      }
    },
    async submitForm () {
      try {
        const data = {
          name: this.contestInfo.title,
          start_time: GMTtoLocale(this.contestInfo.startTime),
          end_time: GMTtoLocale(this.contestInfo.endTime),
          is_exam: this.contestInfo.checkedExam,
          visible: this.contestInfo.checkedVisible
        }
        if (this.mode === 'create') {
          await api.createContest(this.classID, data)
        } else if (this.mode === 'edit') {
          await api.editContest(this.classID, this.contestInfo.id, data)
        }
        alert(`${this.contestInfo.title}이(가) 등록되었습니다.`)
        this.$router.go({ name: 'ClassProblem' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
