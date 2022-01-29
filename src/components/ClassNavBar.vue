<template>
  <div class="class-nav-bar py-5">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <h1 id="title">기계학습</h1>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <div class="icon">☰</div>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" @click="handleRoute">
            <li class="nav-item">
              <a class="nav-link" id="ClassAllProblem">전체 문제</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="ClassStudentManage">수강생 및 TA 관리</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="ClassExamManage">시험 관리</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="ClassProblem">문제</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ClassNavBar',
  methods: {
    handleRoute (route) {
      // a태그의 id와 router index.js의 name과 동일해야함
      this.$router.push({
        name: route.path[0].id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  padding: 0px 4rem;
  margin-bottom: 0rem;
}
.navbar-toggler {
    &:focus {
    box-shadow: 0 0 0 0rem;
  }
}

#navbarNav {
  justify-content: space-evenly;
  .nav-item {
    padding: 10px 40px;
    &:hover {
      background-color: var(--bs-light);
      font-weight: bold;
    }
    .nav-link {
      color: black;
    }
  }
}

</style>
