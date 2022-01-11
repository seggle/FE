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
            <a class="nav-link" href="/suggest">건의게시판</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/announce">공지사항</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/faq">FAQ</a>
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
        <button type="button" class="btn btn-dark" id="login">로그인</button>
      </div>
    </div>
  </nav>

  <router-view />
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

export default {}
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
