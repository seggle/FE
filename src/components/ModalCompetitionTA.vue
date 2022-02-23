<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <form class="modal-container" @submit.prevent="submitForm">
          <div class="modal-header">
            <h5>관리자 등록</h5>
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')"
            ></button>
          </div>

          <div class="modal-body">
            <form class="class-TA-form">
              <textarea id="class-TA" class="form-control mb-3 p-3" width="100%" rows="10" v-model="talist" placeholder="관리자를 등록하세요."></textarea>
            </form>
          </div>

          <div class="modal-footer">
            <button class="btn" type="submit" @click="submitTAList">저장</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'ModalCompetitionTA',
  props: {
    competition_id: {
      type: Number
    }
  },
  data () {
    return {
      talist: '',
      showModal: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getCompetitionTAList()
    },
    async getCompetitionTAList () {
      try {
        const res = await api.getCompetitionTAList(this.competition_id)
        this.talist = ''
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].privilege === 1) {
            this.talist += res.data[i].username + '\n'
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submitTAList () {
      const data = []
      const tmp = this.talist.split('\n')
      for (var i = 0; i < tmp.length; i++) {
        data.push({ username: tmp[i] })
      }
      await api.submitCompetitionTAList(this.competition_id, data)
      alert('TA 등록이 완료되었습니다.')
      this.getCompetitionTAList()
    }
  }
}
</script>

<style scoped lang="scss">
.modal-mask {
  background-color: rgba(0, 0, 0, 0.1)
}
.modal-container {
  @media (max-width: 383px) {
    width: 100%;
  }
  @media (min-width: 384px) {
    width: 70%;
  }
  @media (min-width: 768px) {
    width: 400px;
  }
}
</style>
