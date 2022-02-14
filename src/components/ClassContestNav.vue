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
          <a
            v-if="contest.visible"
            class="nav-link"
            @click="goContest(contest.id)"
            >{{ contest.name }}</a
          >
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
import api from '@/api/index.js'

export default {
  name: 'ClassContestNav',
  components: {
    ModalContestList,
    ModalProblemList
  },
  data () {
    return {
      classID: this.$route.params.classID,
      contestList: [],
      showModal: false,
      problemModal: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getContestList()
    },
    async getContestList () {
      try {
        const res = await api.getContestList(this.classID)
        this.contestList = res.data
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    },
    goContest (contestID) {
      this.contestID = contestID
      this.$router.push({
        name: 'ClassContestProblemList',
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
