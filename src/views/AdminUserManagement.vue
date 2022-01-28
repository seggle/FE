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
                    <input class="col-6" type="text" v-model="userID" disabled>
                </div>
                <div class="mb-3">
                    <h5 style="float:left" class="col-3">이름</h5>
                    <input class="col-6" type="text" v-model="userName" disabled>
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
        <th scope="row">{{ user._id }}</th>
        <td>{{ user.user_id }}</td>
        <td>{{ user.user_name }}</td>
        <td>{{ user.user_email }}</td>
        <td>{{ user.user_created_time }}</td>
        <td>{{ user.user_privilege }}</td>
        <td scope="row">
          <a class="ghost-button" data-bs-toggle="modal" data-bs-target="#userModal" @click="openUser(user._id)">편집</a>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1" aria-disabled="true">이전</a>
    </li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item">
      <a class="page-link" href="#">다음</a>
    </li>
  </ul>
</nav>
</div>
</template>

<script>
import api from '@/api/index.js'

export default {
  name: 'ClassExamManage',
  data () {
    return {
      currentid: '',
      userList: [],
      selected: '',
      loading: false,
      pageSize: 15,
      keyword: ''
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
        const res = await api.getUserList((page - 1) * this.pageSize, this.pageSize, this.keyword)
        console.log(res)
        this.loading = false
        this.userList = res.data
        for (var i = 0; i < this.userList.length; i++) {
          this.userList[i].user_created_time = this.userList[i].user_created_time.slice(0, 10) + ' ' + this.userList[i].user_created_time.slice(11, 19)
          if (this.userList[i].user_privilege === 0) {
            this.userList[i].user_privilege = '학생'
          } else if (this.userList[i].user_privilege === 1) {
            this.userList[i].user_privilege = '교수'
          } else {
            this.userList[i].user_privilege = '관리자'
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async openUser (userID) {
      try {
        this.currentid = userID
        const res = await api.editUser(userID)
        if (res.data[0].user_privilege === 0) {
          this.selected = 'student'
        } else if (res.data[0].user_privilege === 1) {
          this.selected = 'prof'
        } else {
          this.selected = 'admin'
        }
        this.userID = res.data[0].user_id
        this.userName = res.data[0].user_name
        this.userEmail = res.data[0].user_email
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
          user_privilege: this.selected
        }
        console.log(data)
        const res = await api.submitUser(this.currentid, data)
        console.log(res.data)
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
