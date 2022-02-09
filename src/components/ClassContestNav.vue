<template>
  <div class="contest-nav-bar">
    <nav class="nav flex-column bg-light px-4 py-3">
      <div class="nav-header px-1 py-2">
        <span id="title">문제</span>
        <a class="icon" @click="showModal = true">+</a>
        <ModalContestList v-if="showModal" @close="showModal = false" />
      </div>
      <ul class="navbar-nav px-3">
        <li class="nav-item" v-for="contest in contestList" :key="contest">
          <a class="nav-link" @click="goContest(contest.contestID)">{{
            contest.contestTitle
          }}</a>
        </li>
      </ul>
    </nav>
    <button
      v-if="this.$store.state.usertype !== 0"
      class="btn btn-primary btn-sm px-4 me-sm-3"
      @click="problemModal = true"
    >
      목록 편집
    </button>
    <ModalProblemList v-if="problemModal" @close="problemModal = false" />
  </div>
</template>

<script>
import ModalContestList from '@/components/ModalContestList.vue'
import ModalProblemList from '@/components/ModalProblemList.vue'
export default {
  name: 'ClassContestNav',
  components: {
    ModalContestList,
    ModalProblemList
  },
  data () {
    return {
      contestList: [
        // api로 받아와야될 부분
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
        },
        {
          contestID: '4',
          contestTitle: '중간고사'
        }
      ],
      showModal: false,
      problemModal: false
    }
  },
  methods: {
    goContest (contestID) {
      this.$router.push({
        name: 'ClassContestList',
        params: { contestID: contestID }
      })
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
