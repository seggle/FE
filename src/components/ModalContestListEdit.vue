<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <form class="modal-container" @submit.prevent="submitForm">
          <div class="modal-header">
            <h5>목록 편집</h5>
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')"
            ></button>
          </div>

          <div class="modal-body">
            <div class="row">
              <table>
                <thead>
                  <tr>
                    <th scope="col">제목</th>
                    <th scope="col">공개</th>
                    <th scope="col">편집</th>
                    <th scope="col">삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contest, i) in contestList" :key="contest">
                    <td class="contest-name">{{ contest.name }}</td>
                    <td>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          id="publicSwitch"
                          type="checkbox"
                          role="switch"
                          v-model="contest.visible"
                          @change="changePublic(contest.id)"
                        />
                      </div>
                    </td>
                    <td>
                      <button
                        class="edit-btn"
                        @click="
                          showModal = true;
                          rowIndex = i;
                        "
                      >
                        <font-awesome-icon icon="pen" />
                      </button>
                      <ModalContestCreate
                        v-if="showModal"
                        @close="showModal = false"
                        :editContestInfo="contestList[rowIndex]"
                        :mode="'edit'"
                      />
                    </td>
                    <td>
                      <button
                        class="delete-btn"
                        @click="onRemove(contest.id, contest.name)"
                      >
                        <font-awesome-icon icon="trash-can" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalContestCreate from '@/components/ModalContestCreate.vue'
import api from '@/api/index.js'

export default {
  name: 'ModalContestListEdit',
  components: {
    ModalContestCreate
  },
  data () {
    return {
      classID: this.$route.params.classID,
      contestList: [],
      showModal: false,
      rowIndex: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getContestList()
    },
    /* 대회 리스트 불러오기 */
    async getContestList () {
      try {
        const res = await api.getContestList(this.classID)
        this.contestList = res.data
      } catch (error) {
        console.log(error)
      }
    },
    /* 해당 대회 삭제 */
    async onRemove (contestID, contestName) {
      if (confirm('삭제하시겠습니까?')) {
        // contest 삭제 api
        const res = await api.deleteContest(this.classID, contestID)
        console.log(res.data)
        alert(contestName + ' 삭제 완료')
        this.$router.go(this.$router.currentRoute)
      }
    },
    /* 해당 대회 공개 설정 바꾸기 */
    async changePublic (contestID) {
      try {
        await api.changeContestPublic(this.classID, contestID)
        alert('공개 설정 완료')
        this.$router.go(this.$router.currentRoute) // 새로고침
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-container {
  min-width: 500px;

  @media (max-width: 500px) {
    max-width: 300px;
    min-width: 300px;
  }
}

.row {
  overflow-x: auto;

  .contest-name {
    display: block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  td {
    padding: 0.5rem 1rem;
  }
}
</style>
