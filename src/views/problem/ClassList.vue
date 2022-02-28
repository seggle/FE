<template>
  <div class="container">
    <header>
      <h1 id="title">수업 및 시험</h1>
      <div v-if="this.$store.getters.isAdmin"
           class="button-group">
        <button class="btn" @click="goEdit">편집</button>
        <button class="btn" @click="showModal = true">
          수업 생성
        </button>
        <ModalClassList
          v-if="showModal"
          @close="showModal = false"
          mode="수업 생성"
        />
      </div>
    </header>

    <table class="table">
      <thead>
        <tr>
          <!-- <th class="col-1" scope="col">#</th> -->
          <th class="col-1" scope="col">연도</th>
          <th class="col-3" scope="col">학기</th>
          <th scope="col">제목</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="classes in classList"
          :key="classes"
          @click="goClass(classes.id)"
        >
          <!-- <th scope="row">{{ classes.id }}</th> -->
          <td>{{ classes.year }}</td>
          <td>{{ classes.semester }}</td>
          <td><p>{{ classes.name }}</p></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ModalClassList from '@/components/ModalClassList.vue'
import api from '@/api/index.js'

export default {
  name: 'ClassList',
  components: {
    ModalClassList
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
        const res = await api.getClassList()
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].is_show) {
            this.classList.push(res.data[i])
          }
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
  @media (max-width: 420px) {
    padding: 1rem 1rem;
  }
  header {
    display: flex;
    justify-content: space-between;
    padding: 3rem 0rem;
    @media (max-width: 768px) {
      display: block;
    }

    .btn {
      width: 6rem;
      @media (max-width: 420px) {
        font-size: 14px;
      }
    }
  }

  .table {
    p {
      margin-bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      @media (max-width: 420px) {
        display: block;
        width: 60%;
      }
    }
  }
}
</style>
