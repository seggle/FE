<template>
  <div v-if="firstPage" class="container">
    <div class="d-flex mb-2 mt-3 justify-content-end">
      <h2 class="me-auto">문제 등록</h2>
      <div>
        <form>
          <input
            class="form-control"
            type="search"
            placeholder="검색"
            aria-label="검색"
            v-model="keyword"
          />
        </form>
      </div>
      <div>
        <button class="btn btn-dark" id="problem-create" @click="selectProblem">
          다음
        </button>
      </div>
    </div>
    <div class="table-div">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">✅</th>
            <th scope="col">제목</th>
          </tr>
        </thead>
        <tbody>
          <tr :loading="loading" v-for="problem in problemList" :key="problem">
            <th scope="row">
              <input
                v-if="alreadyExist(problem.id) === true"
                class="form-check-input"
                type="checkbox"
                :value="problem.id"
                v-model="checkList"
                disabled
              />
              <input
                v-else
                class="form-check-input"
                type="checkbox"
                :value="problem.id"
                v-model="checkList"
                checked
              />
            </th>
            <td>{{ problem.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled" v-if="currentPage == 1">
          <a class="page-link" tabindex="-1" aria-disabled="true">이전</a>
        </li>
        <li class="page-item" v-else>
          <a class="page-link" @click="getProblemList(currentPage - 1)">이전</a>
        </li>
        <div v-for="page in total" :key="page">
          <li class="page-item active" v-if="page == currentPage">
            <a class="page-link" @click="getProblemList(page)">{{ page }}</a>
          </li>
          <li class="page-item" v-else>
            <a class="page-link" @click="getProblemList(page)">{{ page }}</a>
          </li>
        </div>
        <li class="page-item disabled" v-if="currentPage == total">
          <a class="page-link" href="#">다음</a>
        </li>
        <li class="page-item" v-else>
          <a class="page-link" @click="getProblemList(currentPage + 1)">다음</a>
        </li>
      </ul>
    </nav>
  </div>
  <!---다음 버튼 누르면-->
  <div v-else class="container">
    <div class="d-flex mb-2 mt-3 justify-content-end">
      <h2 class="me-auto">문제 순서 및 제목 수정</h2>
      <div>
        <button class="btn btn-dark" id="problem-create" @click="editProblem">
          저장
        </button>
      </div>
    </div>
    <div class="table-div">
      <table class="table">
        <thead>
          <div class="detail">* 드래그하여 순서를 변경할 수 있습니다</div>
        </thead>
        <tbody>
          <draggable
            class="dragArea list-group w-full"
            :list="contestProblemList"
            @change="log"
          >
            <tr
              class="list-group-item"
              v-for="problem in contestProblemList"
              :key="problem"
            >
              <th scope="row">{{ problem.problem_id }}</th>
              <td>
                <input type="text" v-model="problem.title" />
              </td>
            </tr>
          </draggable>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
export default defineComponent({
  name: 'ClassContestListEdit',
  components: {
    draggable: VueDraggableNext
  },
  data () {
    return {
      classID: this.$route.params.classID,
      contestID: this.$route.params.contestID,
      problemList: [],
      alreadyList: [],
      contestProblemList: [],
      checkList: [],
      selectedProblem: [],
      changedList: [],
      loading: false,
      keyword: '',
      total: 0,
      currentPage: 1,
      firstPage: true,
      problemTitle: '',
      enabled: true,
      dragging: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProblemList(1)
    },
    async getProblemList (page) {
      try {
        this.loading = true
        this.currentPage = page
        const res = await api.getProblemList(page, this.keyword)
        this.loading = false
        this.total = parseInt(res.data.count / 15) + 1
        this.problemList = res.data.results
        console.log(this.problemList)
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await api.getContestProblemList(
          this.classID,
          this.contestID
        )
        this.alreadyList = res.data
        console.log(this.alreadyList)
      } catch (error) {
        console.log(error)
      }
    },
    alreadyExist (problemID) {
      var flag = 0
      for (var i = 0; i < this.alreadyList.length; i++) {
        if (problemID === this.alreadyList[i].problem_id) {
          flag = 1
        }
      }
      if (flag === 1) return true
      else return false
    },
    async selectProblem () {
      try {
        for (let i = 0; i < this.checkList.length; i++) {
          const item = {}
          item.problem_id = this.checkList[i]
          this.selectedProblem.push(item)
        }
        console.log('체크리스트: ', this.checkList)
        console.log(this.selectedProblem)
        const res = await api.selectContestProblem(
          this.classID,
          this.contestID,
          this.selectedProblem
        )
        console.log(res)
        alert('변경사항이 저장되었습니다.')
        this.firstPage = false
        this.getProblem()
      } catch (err) {
        console.log(this.checkList)
        console.log(err)
      }
    },

    async getProblem () {
      try {
        const res = await api.getContestProblemList(
          this.classID,
          this.contestID
        )
        this.contestProblemList = res.data
        console.log(this.contestProblemList)
      } catch (error) {
        console.log(error)
      }
    },

    // 문제제목 중복체크
    checkTitle () {
      var k = 0
      for (var i = 0; i < this.changedList.length;) {
        var item = this.changedList[i]
        for (var j = 0; j < i; j++) {
          if (item.title === this.changedList[j].title) {
            k = 1
            break
          }
        }
        if (k === 0) i += 1
      }
      if (k === 0) return true
      else return false
    },
    async editProblem () {
      try {
        for (let i = 0; i < this.contestProblemList.length; i++) {
          const item = {}
          item.id = this.contestProblemList[i].id
          item.title = this.contestProblemList[i].title
          item.order = i + 1
          this.changedList.push(item)
        }
        console.log(this.changedList)
        if (this.checkTitle()) {
          const res = await api.editContestProblem(
            this.classID,
            this.contestID,
            this.changedList
          )
          console.log(res)
          alert('변경사항이 저장되었습니다.')
          this.firstPage = true
          this.$router.push({ name: 'ClassContestProblemList' })
        } else {
          alert('중복된 제목이 존재합니다')
        }
      } catch (err) {
        console.log(this.changedList)
        console.log(err)
      }
    }
  },
  watch: {
    keyword () {
      this.getProblemList(1)
    },
    yearSelected () {
      this.getProblemList(1)
    },
    semesterSelected () {
      this.getProblemList(1)
    },
    classSelected () {
      this.getProblemList(1)
    },
    createUserSelecte () {
      this.getProblemList(1)
    }
  }
})
</script>

<style lang="scss" scoped>
h5 {
  margin-top: 5px;
}
select {
  height: 100%;
}
.table-div {
  overflow-x: auto;
}
.table {
  min-width: 700px;
  width: 100%;
  white-space: nowrap;
  border-collapse: collapse;
}
.btn {
  background: #0e1b49;
  border-radius: 50px;
  margin: 3px;
}
a {
  color: black;
  cursor: pointer;
}

.modal-dialog {
  max-width: 80%;
}
.list-group-item {
  display: flex;
  justify-content: space-around;
}
.detail {
  font-size: 8px;
  color: gray;
}
</style>
