<template>
  <div class="container">
    <div class="search-box mb-2 mt-3 justify-content-end">
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
        <button class="btn" @click="createProblem()">+ 문제 생성</button>
      </div>
    </div>
    <div class="table-div">
    <table class="table">
    <thead>
      <tr>
        <th scope="col" prop="id">#</th>
        <th scope="col">제목</th>
        <th scope="col">작성일</th>
        <th scope="col">작성자</th>
        <th scope="col">공개</th>
        <th scope="col">편집</th>
        <th scope="col">삭제</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="problem in problemList" :key="problem">
        <th scope="row">{{ problem.id }}</th>
        <td>
          <a @click="goProblemDetail(problem.id)">{{ problem.title }}</a>
        </td>
        <td>{{ problem.created_time }}</td>
        <td>{{ problem.created_user }}</td>
        <td>
          <div style="display: inline-block" class="form-check form-switch">
            <input class="form-check-input"
                   type="checkbox"
                   id="flexSwitchCheckChecked"
                   v-model="problem.public"
                   @change="changeSwitch(problem.id)">
          </div>
        </td>
        <td scope="row">
          <button class="edit-btn"
                  @click="editProblem(problem.id)">
            <font-awesome-icon icon="pen" />
          </button>
        </td>
        <td scope="row">
          <button class="delete-btn"
                  @click="deleteProblem(problem.id)">
            <font-awesome-icon icon="trash-can" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  <Pagination :pagination="PageValue" @get-page="getProblemList"/>
</div>
</template>

<script>
import api from '@/api/index.js'
import Pagination from '@/components/Pagination.vue'
import { GMTtoLocale } from '@/utils/time.js'

export default {
  name: 'ClassAllProblems',
  components: {
    Pagination
  },
  data () {
    return {
      problemList: [],
      keyword: '',
      currentPage: 1,
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
    async getProblemList (page) {
      try {
        this.currentPage = page
        this.PageValue = []
        const res = await api.getProblemList(page, this.keyword)
        this.problemList = res.data.results
        for (const problem of this.problemList) {
          problem.created_time = GMTtoLocale(problem.created_time)
        }
        this.PageValue.push({ count: res.data.count, currentPage: this.currentPage })
      } catch (err) {
        console.log(err)
      }
    },
    async deleteProblem (problemID) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          await api.deleteProblem(problemID)
          this.getProblemList(this.currentPage)
        }
      } catch (err) {
        console.log(err)
      }
    },
    goProblemDetail (problemID) {
      this.$router.push({
        name: 'ClassProblem',
        params: {
          problemID: problemID
        }
      })
    },
    editProblem (problemID) {
      this.$router.push({
        name: 'EditClassProblem',
        params: {
          classID: this.$route.params.classID,
          problemID: problemID
        }
      })
    },
    createProblem () {
      this.$router.push({
        name: 'CreateClassProblem',
        params: {
          classID: this.$route.params.classID
        }
      })
    },
    async changeSwitch (problemID) {
      try {
        await api.changeProblemSwitch(problemID)
        this.getProblemList(this.currentPage)
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    'keyword' () {
      this.getProblemList(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
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

</style>
