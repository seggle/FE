<template>
<div class="container">
  <header>
    <h1 id="title">수업 및 시험</h1>
    <div class="button-group">
      <button class="btn" @click="goEdit">편집</button>
      <button class="btn" id="show-modal" @click="showModal = true">수업 생성</button>
      <ModalClassList v-if="showModal"
                      @close="showModal = false"
                      mode="수업 생성"/>
    </div>
  </header>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">수강학기</th>
        <th scope="col">제목</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for=" classes in classList" :key="classes" @click="goClass(classes.id)">
        <th scope="row">{{ classes.id }}</th>
        <td>{{ classes.semester }}</td>
        <td>{{ classes.name }}</td>
      </tr>
    </tbody>
  </table>
  <Pagination/>
</div>
</template>

<script>
import ModalClassList from '@/components/ModalClassList.vue'
import Pagination from '@/components/Pagination.vue'
import api from '@/api/index.js'

export default {
  name: 'ClassList',
  components: {
    ModalClassList,
    Pagination
  },
  data () {
    return {
      userID: this.$store.state.userid,
      classList: [],
      showModal: false
    }
  },
  mounted () {
    this.getClassList()
  },
  methods: {
    goClass (classID) {
      this.$router.push({
        name: 'Class',
        params: { classID: classID }
      })
    },
    goEdit () {
      this.$router.push({ name: 'EditClassList' })
    },
    async getClassList () {
      try {
        const res = await api.getClassList(this.userID)
        this.classList = res.data
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
      tr:hover {
        background-color: #F4F4F8;
        cursor: pointer;
      }
    }
  }
}
</style>
