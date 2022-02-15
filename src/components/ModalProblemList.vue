<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <form class="modal-container" @submit.prevent="submitForm">
          <div class="modal-header">
            <h5>문제 편집</h5>
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')"
            ></button>
          </div>

          <div class="modal-body">
            <div class="row">
              <table v-for="contest in contestList" :key="contest">
                <tr>
                  <td>{{ contest.name }}</td>
                  <td><button @click="editContest(contest.id)">🖋</button></td>
                  <td>
                    <button @click="deleteContest(contest.id)">❌</button>
                  </td>
                </tr>
              </table>
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
  name: 'ModalProblemList',
  data () {
    return {
      classID: this.$route.params.classID,
      contestList: []
    }
  },
  methods: {
    async getContestList () {
      try {
        const res = await api.getContestList(this.classID)
        this.contestList = res.data
      } catch (error) {
        console.log(error)
      }
    },
    editContest (contestID) {
      var id = contestID
      if (confirm('저장하시겠습니까?')) {
        alert(id + ' 저장 완료')
      } else {
      }
    },
    async deleteContest (contestID) {
      var classID = this.$route.params.classID
      if (confirm('삭제하시겠습니까?')) {
        const res = await api.deleteContest(classID, contestID)
        console.log(res.data)
        alert(contestID + ' 삭제 완료')
      } else {
      }
    }
  }
}
</script>

<style></style>
