<template>
  <div class="container px-5">
    <div class="class-nav-bar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <h1 id="title">공지사항</h1>
        </div>
      </nav>
    </div>
    <table class="table py-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">제목</th>
          <th scope="col">내용</th>
          <th scope="col">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="announces in announceList" :key="announces">
          <td>{{ announces.announcement_id }}</td>
          <td>{{ announces.announcement_title }}</td>
          <td></td>
          <td>{{ announces.announcement_created_time }}</td>
        </tr>
      </tbody>
    </table>
    <nav class="page" aria-label="...">
      <ul class="pagination">
        <li class="page-item disabled">
          <span class="page-link">Previous</span>
        </li>
        <li class="page-item active" aria-current="page">
          <span class="page-link" href="#">1</span>
        </li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'User',
  data () {
    return {
      user_id: 19012345,
      announceList: [
        {
          announcement_id: 1,
          announcement_title: '세글 이용 공지',
          announcement_created_time: '2013-01-29T12:34:56.000000Z',
          announcement_last_modified: '2013-01-29T12:34:56.000000Z',
          announcement_important: true,
          announcement_visible: true
        },
        {
          announcement_id: 2,
          announcement_title: '세글 이용 공지2',
          announcement_created_time: '2013-01-29T12:34:56.000000Z',
          announcement_last_modified: '2013-01-29T12:34:56.000000Z',
          announcement_important: true,
          announcement_visible: true
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  padding: 0px 4rem;
  margin-top: 50px;
  font-weight: bold;
  text-align: left;
}
.map {
  background-color: gainsboro;
}
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
