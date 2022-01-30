<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <form class="modal-container" @submit.prevent="submitForm">

          <div class="modal-header">
            <h5>{{ mode }}</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>

          <div class="modal-body">
            <div class="row">
              <div class="col-4">
                <label class="form-label">연도</label>
                <select class="form-select" disabled>
                  <option>{{ this.classYear }}</option>
                </select>
              </div>
              <div class="col-4">
                <label class="form-label">학기</label>
                <select class="form-select" v-model="classSemester" required>
                  <option disabled value="">선택</option>
                  <option v-for="option in semesterOption" :key="option">{{ option.name }}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <label class="form-label">수업명(시험명)</label>
              <input class="form-control"
                    type="text"
                    v-model="classTitle"
                    :placeholder="placeholder"
                    required>
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
  name: 'ModalClassList',
  props: {
    mode: {
      type: String
    },
    semester: {
      type: String
    },
    title: {
      type: String
    }
  },
  data () {
    return {
      classYear: '',
      semesterOption: [
        { name: '1학기' },
        { name: '2학기' }
      ],
      classSemester: '',
      classTitle: '',
      placeholder: '수업명(시험명)을 입력하세요.'
    }
  },
  mounted () {
    this.getYear()
    this.changeEditMode()
  },
  methods: {
    getYear () {
      const now = new Date()
      const year = now.getFullYear()
      this.classYear = year
    },
    changeEditMode () {
      if (this.mode === '수업 편집') {
        this.classTitle = this.title
        this.classSemester = this.semester.substring(5)
        this.placeholder = this.classTitle
      }
    },
    submitForm () {
      if (this.mode === '수업 생성') {
        this.createClass()
      } else if (this.mode === '수업 편집') {
        this.editClass()
      }
    },
    async createClass () {
      try {
        const data = {
          name: this.classTitle,
          year: this.classYear,
          semester: this.classSemester
        }
        const res = await api.createClass(data)
        console.log(res)
        alert(`${this.classTitle} 수업이 등록되었습니다.`)
        this.$router.go({ name: 'ClassList' })
      } catch (err) {
        console.log(err)
      }
    },
    async editClass () {
      try {
        console.log('편집')
        // 아직 api 안 만들어짐
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}
.modal-header {
  h5 {
    font-weight: bold;
  }
}
.modal-body {
  .row {
    padding: 1rem 0rem;
  }
  label {
    display: flex;
    float: left;
    font-weight: bold;
    font-size: 1rem;
  }
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
