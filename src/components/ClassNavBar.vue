<template>
  <div class="class-nav-bar py-5">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <h1 id="title">{{ this.className }}</h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div class="navbar-toggler-icon">☰</div>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Pills navs -->
          <ul
            class="nav nav-pills mb-2 mb-lg-0"
            role="tablist"
            @click="handleRoute"
          >
            <li class="nav-item">
              <a
                class="nav-link"
                id="ClassAllProblem"
                data-bs-toggle="pill"
                role="tab"
                >전체 문제</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="ClassStudentManage"
                data-bs-toggle="pill"
                role="tab"
                >수강생 및 TA 관리</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="ClassExamManage"
                data-bs-toggle="pill"
                role="tab"
                >시험 관리</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="ClassProblem"
                data-bs-toggle="pill"
                role="tab"
                >문제</a
              >
            </li>
          </ul>
          <!-- Pills navs -->
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ClassNavBar',
  props: {
    className: String
  },
  mounted () {},
  methods: {
    handleRoute (route) {
      // a태그의 id와 router index.js의 name과 동일해야함
      console.log(route.path)
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

  display: block;
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 992px) {
    width: 40%;
    padding: 0rem;
  }
}
.navbar-toggler {
  &:focus {
    box-shadow: 0 0 0 0rem;
  }
}

#navbarNav {
  justify-content: space-evenly;
  font-weight: bold;

  ul {
    @media (max-width: 992px) {
      margin-top: 20px;
      display: block;
    }
  }

  .nav-item {
    padding: 0.5rem 1.5rem;

    &:hover {
      background-color: var(--bs-light);
    }
  }
}
</style>
