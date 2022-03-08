<template>
  <div v-if="firstPage" class="container">
    <div class="search-box mb-2 mt-3 justify-content-end">
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
        <button class="btn" id="problem-create" @click="selectProblem">
          다음
        </button>
      </div>
    </div>
    <div class="table-div">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"><font-awesome-icon icon="check" /></th>
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
    <Pagination :pagination="PageValue" @get-page="getPage" class="page" />
  </div>
  <!---다음 버튼 누르면-->
  <div v-else class="container">
    <div class="search-box mb-2 mt-3 justify-content-end">
      <h2 class="me-auto">문제 순서 및 제목 수정</h2>
      <div>
        <button class="btn" id="problem-create" @click="editProblem">
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
import Pagination from '@/components/Pagination.vue'
export default defineComponent({
  name: 'ClassContestListEdit',
  components: {
    draggable: VueDraggableNext,
    Pagination
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
      dragging: false,
      PageValue: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProblemList(1)
    },
    getPage (page) {
      this.getProblemList(page)
    },
    async getProblemList (page) {
      try {
        this.loading = true
        this.currentPage = page
        this.PageValue = []
        const res = await api.getProblemList(page, this.keyword)
        this.loading = false
        this.PageValue.push({
          count: res.data.count,
          currentPage: this.currentPage
        })
        this.problemList = res.data.results
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await api.getContestProblemList(
          this.classID,
          this.contestID
        )
        this.alreadyList = res.data
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
.search-box {
  display: flex;
  display: flex;
  @media (max-width: 420px) {
    display: block;
  }

  .form-control {
    @media (max-width: 420px) {
      font-size: 14px;
    }
  }
}
.btn {
  @media (max-width: 420px) {
    margin-top: 5px;
    font-size: 14px;
  }
}
h5 {
  margin-top: 5px;
}
select {
  height: 100%;
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
.page {
  margin-top: 7px;
}
</style>
