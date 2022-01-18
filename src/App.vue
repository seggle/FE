<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container px-5">
      <a class="navbar-brand" href="/" id="title">Seggle</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdownBlog"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >문제</a
            >
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownBlog"
            >
              <li>
                <a class="dropdown-item" href="/problem/general">일반</a>
              </li>
              <li>
                <a class="dropdown-item" href="/problem/contest">대회</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/proposals">건의게시판</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/announcements">공지사항</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/faqs">FAQ</a>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <!-- 로그인 했을 때 -->
        <template v-if="isUserLogin">
          <p> {{ this.$store.state.userid }} </p>
          <button type="button" class="btn btn-dark" id="logout" @click="logout">로그아웃</button>
        </template>
        <!-- 로그인 안했을 때 -->
        <template v-else>
          <button type="button" class="btn btn-dark" id="login">로그인</button>
        </template>
      </div>
    </div>
  </nav>
  <router-view />
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import api from '@/api/index.js'
import { deleteCookie } from '@/utils/cookies.js'

export default {
  data () {
    return {
      userid: this.$store.state.userid
    }
  },
  methods: {
    async logout () {
      const res = await api.logoutUser(this.userid)
      console.log(res)
      // state 값 삭제
      this.$store.commit('clearToken')
      this.$store.commit('clearUserid')
      // 쿠키 삭제
      deleteCookie('til_auth')
      deleteCookie('til_user')
      this.$router.push('/login')
    }
  },
  computed: {
    isUserLogin () {
      return this.$store.getters.isLogin
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100vh;
}
nav {
  color: black;
  background-color: white;
}
#title {
  font-weight: bold;
}
#nav a.router-link-exact-active {
  font-family: Roboto;
  font-style: bolder;
  font-weight: 500;
  line-height: 37px;
  text-decoration: none;
  font-size: 23px;
  color: #000000;
}
.user {
  display: grid;
  padding: 15px 25px;
  justify-content: space-between;
}
.btn {
  background: #0e1b49;
  border-radius: 50px;
  margin: 3px;
}
</style>
