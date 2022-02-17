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
                    <td>{{ contest.name }}</td>
                    <td>
                      <div class="form-check form-switch">
                        <input class="form-check-input"
                              id="publicSwitch"
                              type="checkbox" role="switch"
                              v-model="contest.visible"
                              @change="changePublic(contest.id)">
                      </div>
                    </td>
                    <td>
                      <button @click="showModal = true; rowIndex = i">🖋</button>
                      <ModalContestList v-if="showModal"
                                        @close="showModal = false"
                                        :editContestInfo="contestList[rowIndex]"
                                        :mode="'edit'" />
                    </td>
                    <td>
                      <button @click="onRemove(contest.id)">❌</button>
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
import ModalContestList from '@/components/ModalContestList.vue'
import api from '@/api/index.js'

export default {
  name: 'ModalProblemList',
  components: {
    ModalContestList
  },
  data () {
    return {
      classID: this.$route.params.classID,
      contestList: [],
      showModal: false,
      rowIndex: ''
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
      } catch (error) {
        console.log(error)
      }
    },
    // onEdit (contestID) {
    //   var id = contestID
    //   if (confirm('저장하시겠습니까?')) {
    //     alert(id + ' 저장 완료')
    //   } else {
    //   }
    // },
    onRemove (contestID) {
      var id = contestID
      if (confirm('삭제하시겠습니까?')) {
        // contest 삭제 api
        alert(id + ' 삭제 완료')
        this.$router.go(this.$router.currentRoute)
      }
    },
    async changePublic (contestID) {
      try {
        const res = await api.changeContestPublic(this.classID, contestID)
        console.log(res)
        alert('공개 설정 완료')
        this.$router.go(this.$router.currentRoute)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
