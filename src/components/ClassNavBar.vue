<template>
  <div class="class-nav-bar py-4">
    <div class="row">
      <div class="col-3">
        <h1 class="class-title fw-bolder">기계학습</h1>
      </div>
      <div class="col-9">
        <nav class="class-nav nav nav-pills flex-column flex-sm-row p-1 rounded-pill">
            <a class="class-nav-list flex-sm-fill text-sm-center nav-link" aria-current="page" href="#">전체 문제</a>
            <a class="class-nav-list flex-sm-fill text-sm-center nav-link" href="/class-manager">수강생 및 TA 관리</a>
            <a class="class-nav-list flex-sm-fill text-sm-center nav-link" href="#">시험 관리</a>
            <a class="class-nav-list flex-sm-fill text-sm-center nav-link" href="#">문제</a>
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

<style>

.class-nav {
    background-color: rgb(0, 0, 0, 0.05);
}

.class-nav a {
    color: #2c3e50;
}

</style>
