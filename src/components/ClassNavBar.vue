<template>
  <div class="class-nav-bar">
    <h1 class="class-title">기계학습</h1>
    <nav class="class-nav">
        <router-link class="class-nav-list" to="/">전체 문제</router-link>
        <router-link class="class-nav-list" to="/">수강생 및 TA 관리</router-link>
        <router-link class="class-nav-list" to="/">시험 관리</router-link>
        <router-link class="class-nav-list" to="/">문제</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ClassNavBar'
}
</script>

<style>

.class-nav-bar {
    display: flex;
    justify-content: space-between;
    padding: 8vh 30vh;
}

.class-title {
    font-weight: 800;
    font-size: 40px;
}

.class-nav {
    display: flex;
    justify-content: space-between;
    background-color: rgb(0, 0, 0, 0.05);
    padding: 1.2vh 4vh;
    border-radius: 1vh;
}

.class-nav a {
    color: #2c3e50;
    text-decoration: none;
}

.class-nav a:active {
    font-weight: bold;
}

.class-nav-list {
    padding: 0vh 6vh;
    font-size: 20px;
}

</style>
