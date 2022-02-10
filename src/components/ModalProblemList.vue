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
                  <td>{{ contest.contestTitle }}</td>
                  <td>
                    <div class="form-check form-switch">
                      <input class="form-check-input"
                            id="publicSwitch"
                            type="checkbox" role="switch"
                            @change="changePublic(contest.contestID)">
                    </div>
                  </td>
                  <td>
                    <button @click="showModal = true">🖋</button>
                    <ModalContestList v-if="showModal" @close="showModal = false" />
                  </td>
                  <td>
                    <button @click="onRemove(contest.contestID)">❌</button>
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
import ModalContestList from '@/components/ModalContestList.vue'
import api from '@/api/index'
export default {
  name: 'ModalProblemList',
  components: {
    ModalContestList
  },
  data () {
    return {
      classID: Number(this.$route.params.classID),
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
      showModal: false
    }
  },
  methods: {
    onEdit (contestID) {
      var id = contestID
      if (confirm('저장하시겠습니까?')) {
        alert(id + ' 저장 완료')
      } else {
      }
    },
    onRemove (contestID) {
      var id = contestID
      if (confirm('삭제하시겠습니까?')) {
        alert(id + ' 삭제 완료')
      } else {
      }
    },
    async changePublic (contestID) {
      try {
        const res = await api.changeContestPublic(this.classID, contestID)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
