<template>
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
      </tr>
    </thead>
    <tbody>
      <tr v-for=" classes in classList" :key="classes">
        <th scope="row">
          <input class="form-check-input"
                type="checkbox"
                :value="classes.id"
                v-model="checkList"></th>
        <td>{{ classes.semester }}</td>
        <td>{{ classes.name }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'EditClassList',
  data () {
    return {
      userID: this.$store.state.userid,
      classList: [ // api로 받아올 부분
        {
          id: '1',
          semester: '2020-2학기',
          name: '기계학습',
          is_show: true
        },
        {
          id: '2',
          semester: '2021-2학기',
          name: '인공지능 챌린지',
          is_show: true
        }
      ],
      checkList: []
    }
  },
  mounted () {
    // this.getClassList()
    this.alreadyChecked()
  },
  methods: {
    async getClassList () {
      try {
        const res = await api.getClassList(this.userID)
        console.log(res)
        this.classList = res.data
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
        // const res = await api.editClassList(this.userID, data)
        // console.log(res)
        alert('변경사항이 저장되었습니다.')
        this.$router.push({ name: 'ClassList' })
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
