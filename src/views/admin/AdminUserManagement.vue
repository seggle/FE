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
        <div
          class="modal fade"
          id="userModal"
          tabindex="-1"
          aria-labelledby="userModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog admin-user modal-dialog-centered col-md-4">
            <div class="modal-content">
              <div class="modal-header">
                <h5>사용자 정보 수정</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <h5 style="float: left" class="col-3">아이디</h5>
                  <input class="col-6" type="text" :value="userName" disabled />
                </div>
                <div class="mb-3">
                  <h5 style="float: left" class="col-3">이름</h5>
                  <input class="col-6" type="text" :value="Name" disabled />
                </div>
                <div class="mb-3">
                  <h5 style="float: left" class="col-3">이메일</h5>
                  <input
                    class="col-6"
                    type="text"
                    :value="userEmail"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <h5 style="float: left" class="col-3">사용자유형</h5>
                  <select class="btn-toggle col-6" v-model="selected">
                    <option value="student">학생</option>
                    <option value="prof">교수</option>
                    <option value="admin">관리자</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  취소
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  id="announce-save"
                  data-bs-dismiss="modal"
                  @click="submitUser"
                >
                  저장
                </button>
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
            <th style="width:40px" scope="col" prop="id">#</th>
            <th class="col-2" scope="col">ID</th>
            <th class="col-2" scope="col">이름</th>
            <th scope="col">이메일</th>
            <th scope="col">가입날짜</th>
            <th class="col-1" scope="col">권한</th>
            <th class="col-1" scope="col">편집</th>
            <th class="col-1" scope="col">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr :loading="loading" v-for="user in userList" :key="user">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.username }}</td>
            <td>{{ user.name }}</td>
            <td class="email">{{ user.email }}</td>
            <td>{{ user.date_joined }}</td>
            <td>{{ user.privilege }}</td>
            <td scope="row">
              <button class="edit-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#userModal"
                      @click="openUser(user.username)">
                <font-awesome-icon icon="pen" />
              </button>
            </td>
            <td scope="row">
              <button class="delete-btn"
                      @click="deleteUser(user.username)">
                <font-awesome-icon icon="trash-can" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pagination="PageValue" @get-page="getPage"/>
  </div>
</template>

<script>
import api from '@/api/index.js'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'AdminUser',
  components: {
    Pagination
  },
  data () {
    return {
      currentid: '',
      userList: [],
      selected: '',
      loading: false,
      keyword: '',
      currentPage: 1,
      Name: '',
      userEmail: '',
      userName: '',
      PageValue: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getUserList(1)
    },
    getPage (page) {
      this.getUserList(page)
    },
    async getUserList (page) {
      try {
        this.loading = true
        this.currentPage = page
        this.PageValue = []
        const res = await api.getUserList(page, this.keyword)
        this.loading = false
        this.PageValue.push({ count: res.data.count, currentPage: this.currentPage })
        this.userList = res.data.results
        for (var i = 0; i < this.userList.length; i++) {
          this.userList[i].date_joined =
            this.userList[i].date_joined.slice(0, 10) +
            ' ' +
            this.userList[i].date_joined.slice(11, 19)
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
        if (res.data.privilege === 0) {
          this.selected = 'student'
        } else if (res.data.privilege === 1) {
          this.selected = 'prof'
        } else {
          this.selected = 'admin'
        }
        this.userName = res.data.username
        this.Name = res.data.name
        this.userEmail = res.data.email
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
        await api.submitUser(this.currentName, data)
        this.getUserList(1)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser (userName) {
      try {
        if (confirm('삭제하시겠습니까?')) {
          await api.deleteUser(userName)
          const res = await api.getUserList(1, this.keyword)
          if (this.currentPage !== 1 && res.data.count / 15 < this.currentPage) {
            this.currentPage = this.currentPage - 1
          }
          this.getUserList(this.currentPage)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    keyword () {
      this.getUserList(1)
    }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 420px) {
  .form-control {
    float: right;
    width: 80%;
    height: 1.8rem;
    font-size: calc(0.55rem + 1.5vw);
  }
}
.btn-toggle {
  border-width: thin;
  text-align: center;
  background-color: transparent;
}
.table {
  min-width:950px;
  table-layout: fixed;
  tbody {
    tr:hover {
      cursor: default;
    }
    td.email {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
h1 {
  font-weight: bold;
  width: 60%;
  text-align: left;
  @media (max-width: 420px) {
    font-size: calc(1.2rem + 2vw);
  }
}
</style>
