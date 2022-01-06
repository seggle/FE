<template>
  <div class="class-nav-bar py-5">
    <div class="row">
      <div class="col-md-3">
        <h1 id="title">기계학습</h1>
      </div>
      <div class="col-md-8">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <spacer></spacer>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#">전체 문제</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/class-manager">수강생 및 TA 관리</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">시험 관리</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">문제</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassNavBar'
}
</script>

<style scoped>
nav {
  border-radius: 20px;
}
#navbarNav {
  justify-content: space-around;
}
.nav-item {
  padding: 0px 50px;
}
</style>
