<template>
<div class="contest-nav-bar">
  <nav class="nav flex-column bg-light px-4 py-3">
    <div class="nav-header px-1 py-2">
      <span id="title">문제</span>
      <a class="icon" @click="showModal = true">+</a>
      <!-- modal -->
      <transition name="modal" v-if="showModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <form class="modal-container" @submit.prevent="submitForm">

              <div class="modal-header">
                <h5>문제 생성</h5>
                <button type="button" class="btn-close" @click="showModal = false"></button>
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
    </div>
    <ul class="navbar-nav px-3">
      <li class="nav-item" v-for="contest in contestList" :key="contest">
        <a class="nav-link" @click="goContest(contest.contestID)">{{ contest.contestTitle }}</a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
import api from '@/api/index.js'
export default {
  name: 'ClassContestNav',
  data () {
    return {
      classID: this.$route.params.classID,
      contestList: [ // api로 받아와야될 부분
        {
          contestID: '1',
          contestTitle: '분류 실습1'
        },
        {
          contestID: '2',
          contestTitle: '분류 실습2'
        },
        {
          contestID: '3',
          contestTitle: '분류 실습3'
        }
      ],
      showModal: false,
      contestInfo: {
        title: '',
        startTime: '',
        endTime: '',
        checkedExam: false
      }
    }
  },
  methods: {
    goContest (contestID) {
      this.$router.push({
        name: 'class-contest-list',
        params: { contestID: contestID }
      })
    },
    async submitForm () {
      try {
        const data = {
          contest_name: this.contestInfo.title,
          contest_start_time: this.contestInfo.startTime,
          contest_end_time: this.contestInfo.endTime,
          is_exam: this.contestInfo.checkedExam
        }
        const res = await api.createContest(this.classID, data)
        alert(`${this.contestInfo.title}이 등록되었습니다.`)
        this.$router.go({ name: 'ClassProblem' })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  float: left;
  width: 100%;
  border-radius: 1rem;
}
.nav-header {
  #title {
    float: left;
  }
  .icon {
    float: right;
  }
}
a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
