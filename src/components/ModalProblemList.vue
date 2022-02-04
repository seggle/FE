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
                  <td><button @click="onEdit(contest.contestID)">🖋</button></td>
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
export default {
  name: 'ModalProblemList',
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
      ]
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
    }
  }
}
</script>

<style></style>
