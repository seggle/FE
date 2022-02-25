<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <form class="modal-container" @submit.prevent="submitForm">
          <div class="modal-header">
            <h5>문제 관리</h5>
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')"
            ></button>
          </div>

          <div class="modal-body">
            <div class="row">
              <table class = "modal-table" frame = void>
                <thead>
                  <tr>
                    <th class="col-6 competition-title" scope="col">제목</th>
                    <th class="col-5" scope="col">옵션</th>
                    <th scope="col">편집</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(competition) in competitionList" :key="competition">
                    <td class="competition-title">{{ competition.problem.title }}</td>
                    <td scope="row" v-if="competition.problem.created_user === this.$store.state.userid">
                      <a class="ghost-button" @click="showModal = true; competition_id = competition.id">관리자 등록</a> |
                      <ModalCompetitionTA
                        v-if="showModal"
                        @close="showModal = false"
                        :competition_id="competition_id"
                      />
                      <a class="ghost-button" @click="deleteCompetition(competition.id)">삭제</a>
                    </td>
                    <td v-else></td>
                    <td>
                      <a class="ghost-button">편집</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- <div class="modal-footer">
            <button class="btn" type="submit">저장</button>
          </div> -->
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalCompetitionTA from '@/components/ModalCompetitionTA.vue'
import api from '@/api/index.js'

export default {
  name: 'ModalCompetitionAdmin',
  components: {
    ModalCompetitionTA
  },
  data () {
    return {
      classID: this.$route.params.classID,
      competitionList: [],
      showModal: false,
      competition_id: -1,
      userCompetitionList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getGeneralList()
    },
    async getGeneralList () {
      try {
        this.competitionList = []
        const res = await api.getCompetitionList()
        for (var i = 0; i < this.$store.state.competitions.length; i++) {
          this.userCompetitionList.push(this.$store.state.competitions[i].competition_id)
        }
        for (i = 0; i < res.data.length; i++) {
          if (this.userCompetitionList.includes(res.data[i].id)) {
            this.competitionList.push(res.data[i])
          }
        }
        this.competitionList.reverse()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteCompetition (competitionID) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          await api.deleteCompetition(competitionID)
        }
        this.getGeneralList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ghost-button {
  color: black;
}
.ghost-button:hover {
  text-decoration: underline;
}
.modal-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  .competition-title {
    text-align: left;
  }
  td.competition-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  tr {
    border: 1px solid black;
  }
}

tbody, td, tfoot, th, thead, tr {
  padding: 0.5rem;
}

.modal-container {
  @media (max-width: 383px) {
    width: 100%;
  }
  @media (min-width: 384px) {
    width: 70%;
  }
  @media (min-width: 768px) {
    width: 500px;
  }
}
</style>
