<template>
  <div class="container">
    <div class="header">
      <h1 id="title">{{ this.$store.state.userid }}님, 반갑습니다!</h1>
      <div class="button-group">
        <button class="btn btn-primary" type="button" @click="goResign">
          회원탈퇴
        </button>
        <button class="btn btn-primary" type="button" @click="goResetPW">
          비밀번호 변경
        </button>
      </div>
    </div>
    <table class="table py-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">문제제목</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col">마감 날짜</th>
          <th scope="col">등수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(problems, index) in problemList" :key="index">
          <td>{{ problemList.indexOf(problems, 0) + 1 }}</td>
          <td>{{ problems.problem_title }}</td>
          <td>
            <div class="progress">
              <div
                class="progress-bar"
                :class="this.problemList[i].progressBar.type"
                role="progressbar"
                :style="{ width: this.problemList[i].progressBar.value + '%' }"
                :aria-valuenow="this.problemList[i].progressBar.value"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </td>
          <td>D-</td>
          <td>{{ problems.competition_end_time }}</td>
          <td>
            {{ problems.competition_user_rank }}/{{
              problems.competition_user_total
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="container-sm px-5 py-5">
    <calendar-heatmap :values="heatmapValues" :end-date="endDate" />
  </div>
</template>
<script>
import api from "@/api/index.js";
import "vue-calendar-heatmap";
export default {
  name: "User",
  data: () => {
    return {
      problemList: [],
      heatmapValues: [],
      d_day: [],
      endDate: "2021-11-21",
    };
  },
  created() {
    this.showUserCompetition();
    this.showUserHeatmap();
  },
  methods: {
    goResign() {
      this.$router.push({
        name: "Resign",
      });
    },
    goResetPW() {
      this.$router.push({
        name: "ResetPassword",
      });
    },
    setTime() {
      for (let i = 0; i < this.problemList.length; i++) {
        const startTime = this.problemList[i].start_time.substring(0, 10);
        const endTime = this.problemList[i].end_time.substring(0, 10);
        this.problemList[i].start_time = startTime;
        this.problemList[i].end_time = endTime;
        // D-Day 설정
        const startDate = new Date(startTime.replace(/-/g, "/"));
        const endDate = new Date(endTime.replace(/-/g, "/"));
        const today = new Date();
        endDate.setHours(23, 59, 59, 0);
        today.setHours(0, 0, 0, 0);
        let starttoend = endDate.getTime() - startDate.getTime();
        starttoend = Math.floor(starttoend / (1000 * 60 * 60 * 24)) + 1;
        if (startDate > today) {
          let interval = startDate.getTime() - today.getTime();
          interval = Math.floor(interval / (1000 * 60 * 60 * 24));
          this.problemList[i].dday = "OPEN D - " + interval;
          this.problemList[i].start_end = -1;
          this.problemList[i].diffDay = -1;
        } else if ((startDate <= today) & (endDate >= today)) {
          this.problemList[i].start_end = starttoend;
          let interval = endDate.getTime() - today.getTime();
          interval = Math.floor(interval / (1000 * 60 * 60 * 24));
          if (interval === 0) {
            this.problemList[i].dday = "D - Day";
            this.problemList[i].diffDay = 0;
          } else {
            this.problemList[i].dday = "D - " + interval;
            this.problemList[i].diffDay = interval;
          }
        } else {
          this.problemList[i].start_end = -2;
          this.problemList[i].dday = "종료";
          this.problemList[i].diffDay = -1;
        }
      }
    },
    setProgressBar() {
      for (let i = 0; i < this.problemList.length; i++) {
        const progress = {};
        if (this.problemList[i].start_end === -1) {
          progress.value = 0;
          progress.type = "bg-secondary";
        } else if (this.problemList[i].start_end === -2) {
          progress.value = 100;
          progress.type = "bg-secondary";
        } else {
          progress.value =
            100 -
            (this.problemList[i].diffDay / this.problemList[i].start_end) * 100;
          if (progress.value <= 50) {
            progress.type = "bg-info";
          } else if (progress.value <= 70) {
            progress.type = "bg-warning";
          } else if (progress.value === 100) {
            progress.type = "bg-success";
          } else {
            progress.type = "bg-danger";
          }
        }
        this.problemList[i].progressBar = progress;
      }
    },
    async showUserCompetition() {
      const username = this.$store.state.userid;
      try {
        const res = await api.showUserCompetition(username);
        this.problemList = res.data.reverse();
        console.log(res.data);
        this.setTime();
        this.setProgressBar();
        this.problemList.sort((a, b) => {
          if (a.start_end < b.start_end) return 1;
          else if (a.start_end > b.start_end) return -1;
        });
        this.problemList.sort((a, b) => {
          if ((a.start_end >= 0) & (b.start_end >= 0)) {
            if (a.diffDay > b.diffDay) return 1;
            else if (a.diffDay < b.diffDay) return -1;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async showUserHeatmap() {
      const username = this.$store.state.userid;

      try {
        const res = await api.showUserHeatmap(username);
        this.heatmapValues = res.data;
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 3rem 0rem;

  h1 {
    margin-bottom: 0;
    font-weight: bold;
  }
}

.map {
  background-color: gainsboro;
}
</style>
