<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <h1 class="me-auto">사용자 관리</h1>
      <div class="">
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
        <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered col-md-4">
        <div class="modal-content">
            <div class="modal-header">
                <h5>사용자 정보 수정</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <h5 style="float:left" class="col-3">아이디</h5>
                    <input class="col-6" type="text" v-model="userName" disabled>
                </div>
                <div class="mb-3">
                    <h5 style="float:left" class="col-3">이름</h5>
                    <input class="col-6" type="text" v-model="Name" disabled>
                </div>
                <div class="mb-3">
                    <h5 style="float:left" class="col-3">이메일</h5>
                    <input class="col-6" type="text" v-model="userEmail" disabled>
                </div>
                <div class="mb-3">
                    <h5 style="float:left" class="col-3">사용자유형</h5>
                    <select class="btn-toggle col-6" v-model="selected">
                        <option value="student">학생</option>
                        <option value="prof">교수</option>
                        <option value="admin">관리자</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                <button type="button" class="btn btn-primary" id="announce-save" @click="submitUser">저장</button>
            </div>
        </div>
        </div>
    </div>
      </div>
    </div>
    <div class="table-div">
    <table class="table">
    <thead>
      <tr>
        <th scope="col" prop="id">#</th>
        <th scope="col">ID</th>
        <th scope="col">이름</th>
        <th scope="col">이메일</th>
        <th scope="col">가입날짜</th>
        <th scope="col">권한</th>
        <th scope="col">옵션</th>
      </tr>
    </thead>
    <tbody>
      <tr :loading="loading" v-for="user in userList" :key="user">
        <th scope="row">{{ user.id }}</th>
        <td>{{ user.username }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.date_joined }}</td>
        <td>{{ user.privilege }}</td>
        <td scope="row">
          <a class="ghost-button" data-bs-toggle="modal" data-bs-target="#userModal" @click="openUser(user.username)">편집</a> |
          <a class="ghost-button" @click="deleteUser(user.username)">삭제</a>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled" v-if="currentPage==1">
      <a class="page-link" tabindex="-1" aria-disabled="true">이전</a>
    </li>
    <li class="page-item" v-else>
      <a class="page-link" @click="getUserList(currentPage-1)">이전</a>
    </li>
    <div v-for="page in total" :key="page">
    <li class="page-item active" v-if="page==currentPage"><a class="page-link" @click="getUserList(page)">{{ page }}</a></li>
    <li class="page-item" v-else><a class="page-link" @click="getUserList(page)">{{ page }}</a></li>
    </div>
    <li class="page-item disabled" v-if="currentPage==total">
      <a class="page-link" href="#">다음</a>
    </li>
    <li class="page-item" v-else>
      <a class="page-link" @click="getUserList(currentPage+1)">다음</a>
    </li>
  </ul>
</nav>
</div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'AdminUser',
  data () {
    return {
      currentid: '',
      userList: [],
      selected: '',
      loading: false,
      keyword: '',
      total: 0,
      currentPage: 1
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getUserList(1)
    },
    async getUserList (page) {
      try {
        this.loading = true
        this.currentPage = page
        const res = await api.getUserList(page, this.keyword)
        this.loading = false
        this.total = parseInt(res.data.count / 15) + 1
        this.userList = res.data
        for (var i = 0; i < this.userList.length; i++) {
          this.userList[i].date_joined = this.userList[i].date_joined.slice(0, 10) + ' ' + this.userList[i].date_joined.slice(11, 19)
          if (this.userList[i].privilege === 0) {
            this.userList[i].privilege = '학생'
          } else if (this.userList[i].privilege === 1) {
            this.userList[i].privilege = '교수'
          } else {
            this.userList[i].privilege = '관리자'
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async openUser (userName) {
      try {
        this.currentName = userName
        const res = await api.editUser(userName)
        if (res.data[0].privilege === 0) {
          this.selected = 'student'
        } else if (res.data[0].privilege === 1) {
          this.selected = 'prof'
        } else {
          this.selected = 'admin'
        }
        this.userName = res.data[0].username
        this.Name = res.data[0].name
        this.userEmail = res.data[0].email
      } catch (error) {
        console.log(error)
      }
    },
    async submitUser () {
      try {
        if (this.selected === 'student') {
          this.selected = 0
        } else if (this.selected === 'prof') {
          this.selected = 1
        } else {
          this.selected = 2
        }
        const data = {
          privilege: this.selected
        }
        const res = await api.submitUser(this.currentName, data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser (userName) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          const res = await api.deleteUser(userName)
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    'keyword' () {
      this.getUserList(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-div {
    overflow-x: auto;
}
.table {
    min-width: 700px;
    width: 100%;
    white-space: nowrap;
    border-collapse:collapse;
}
.btn-toggle {
    border-width: thin;
    text-align: center;
    background-color: transparent;
}
.btn {
  background: #0e1b49;
  border-radius: 50px;
  margin: 3px;
}
a {
  color:black;
  cursor: pointer;
}

</style>
