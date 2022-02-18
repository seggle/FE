<template>
<<<<<<< HEAD
  <div class="container">
    <header>
      <h1 id="title">수업 및 시험</h1>
      <button class="btn" @click="editClassList">저장</button>
    </header>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">수강학기</th>
          <th scope="col">제목</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(classes, i) in classList" :key="i">
          <th scope="row">
            <input
              class="form-check-input"
              type="checkbox"
              :value="classes.id"
              v-model="checkList"
            />
          </th>
          <td>{{ classes.semester }}</td>
          <td>{{ classes.name }}</td>
          <td><a @click="clickModal(i)">편집</a></td>
          <ModalClassList
            v-if="showModal"
            @close="showModal = false"
            mode="수업 편집"
            :classID="classList[rowIndex].id"
            :semester="classList[rowIndex].semester"
            :title="classList[rowIndex].name"
          />
          <td><a @click="removeClass(classes.id)">삭제</a></td>
        </tr>
      </tbody>
    </table>
  </div>
=======
<div class="container">
  <header>
    <h1 id="title">수업 및 시험</h1>
    <button class="btn" @click="editClassList">저장</button>
  </header>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">수강학기</th>
        <th scope="col">제목</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for=" (classes, i) in classList" :key="i">
        <th scope="row">
          <input class="form-check-input"
                type="checkbox"
                :value="classes.id"
                v-model="checkList"></th>
        <td>{{ classes.semester }}</td>
        <td>{{ classes.name }}</td>
        <td><a @click="showModal = true; rowIndex = i">편집</a></td>
        <ModalClassList v-if="showModal"
                        @close="showModal = false"
                        mode="수업 편집"
                        :classID="classList[rowIndex].id"
                        :semester="classList[rowIndex].semester"
                        :title="classList[rowIndex].name"/>
        <td><a @click="removeClass(classes.id)">삭제</a></td>
      </tr>
    </tbody>
  </table>
</div>
>>>>>>> 0486d70c3a2f68e738f8bba3e987a840e1b94f60
</template>

<script>
import api from '@/api/index.js'
import ModalClassList from '@/components/ModalClassList.vue'
export default {
  name: 'EditClassList',
  components: {
    ModalClassList
  },
  data () {
    return {
      userID: this.$store.state.userid,
      classList: [],
      checkList: [],
      showModal: false,
      rowIndex: ''
    }
  },
  mounted () {
    this.getClassList()
  },
  methods: {
    async getClassList () {
      try {
        const res = await api.getClassList()
        console.log(res)
        this.classList = res.data
        this.alreadyChecked()
      } catch (err) {
        console.log(err)
      }
    },
    alreadyChecked () {
      // is_show이면 체크되어있어야함
      for (let i = 0; i < this.classList.length; i++) {
        if (this.classList[i].is_show) {
          this.checkList.push(this.classList[i].id)
        }
      }
    },
    async editClassList () {
      try {
        const data = []
        for (let i = 0; i < this.checkList.length; i++) {
          const item = {}
          item.class_id = this.checkList[i]
          data.push(item)
        }
        console.log(data)
        const res = await api.editClassList(data)
        console.log(res)
        alert('변경사항이 저장되었습니다.')
        this.$router.push({ name: 'ClassList' })
      } catch (err) {
        console.log(err)
      }
    },
    async removeClass (classID) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          const res = await api.removeClass(classID)
          console.log(res)
          alert('변경사항이 저장되었습니다.')
          this.$router.push({ name: 'ClassList' })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 3rem 3rem;
  header {
    display: flex;
    justify-content: space-between;
    padding: 3rem 0rem;
    h1 {
      margin-bottom: 0;
    }
    .btn {
      width: 6rem;
    }
  }
  .table {
    text-align: left;
    tbody {
      td {
        a {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
