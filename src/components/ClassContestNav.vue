<template>
  <div class="contest-nav-bar">
    <nav class="nav flex-column px-4 py-4">
      <div class="nav-header px-1 py-2">
        <span id="title">문제</span>
        <span
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          >+</span
        >
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a class="dropdown-item" @click="showModal = true">문제 생성</a>
          </li>
          <li>
            <a
              class="dropdown-item"
              v-if="this.$store.getters.isAdmin"
              @click="problemModal = true"
              >문제 목록 편집</a
            >
          </li>
        </ul>
        <!-- <a class="icon" @click="showModal = true">&#8942;</a> -->
        <ModalContestList
          v-if="showModal"
          @close="showModal = false"
          :mode="'create'"
        />
      </div>
      <ul class="navbar-nav px-3">
        <li class="nav-item" v-for="contest in contestList" :key="contest">
          <a
            v-if="contest.visible"
            class="nav-link"
            @click="goContest(contest.id)"
          >
            {{ contest.name }}</a
          >
        </li>
      </ul>
    </nav>

    <!-- <button
      v-if="this.$store.getters.isAdmin"
      class="btn"
      @click="problemModal = true">
      목록 편집
    </button> -->
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
      problemModal: false
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
.contest-nav-bar {
  width: 12rem;
  flex-direction: column;
  align-items: center;

  @media (max-width: 992px) {
    width: 100%;
  }
}
nav {
  float: left;
  border-radius: 14px;
  margin-bottom: 10px;
  width: 12rem;

  background-color: #fff;
  border: 0.025rem solid #d7e2eb;
  margin-top: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 8%);
  &:hover {
    box-shadow: 0px 12px 30px 6px rgb(0 0 0 / 16%);
  }
  padding: 2rem 1rem;

  @media (max-width: 992px) {
    width: 100%;
  }

  .nav-header {
    #title {
      float: left;
      font-size: 18px;
    }
    #dropdownMenuButton {
      float: right;
      cursor: pointer;
      font-weight: bold;
      width: 24px;
      height: 24px;
      background-color: #0e1b49;
      border-radius: 24px;
      color: white;
    }
    .dropdown-menu {
      border: 0.025rem solid #d7e2eb;
    }
    .dropdown-item {
      &:hover {
        // background: rgb(0 0 0 / 80%);
        background: none;
        // color: white;
        font-weight: bold;
      }
    }
    .icon {
      float: right;
      color: black;
    }
  }

  .nav-link {
    display: block;
    width: 6rem;
    overflow: hidden; // 100px 넘으면 hidden
    text-overflow: ellipsis; // 100px 넘으면 생략 부호
    white-space: nowrap;

    @media (max-width: 992px) {
      width: 100%;
    }
  }
}
</style>
