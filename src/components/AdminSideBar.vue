<template>
<div class="admin-sidebar">
  <nav class="nav bg-light justify-content-center">
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="/admin/all-problems">전체 문제</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/admin/announcements">공지사항</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/admin/faqs">FAQ</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/admin/user-management">사용자 관리</a>
        </li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
  name: 'AdminSideBar'
}
</script>

<style lang="scss" scoped>
nav {
    float: left;
    width:100%;
    border-radius: 1.5rem;
}
a {
    color: #000000;
}
.nav-item {
    &:hover {
        .nav-link{
            font-weight: bold;
            color: #000000
        }
    }
}
</style>
