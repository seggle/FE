<template>
<div class="table-div">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">아이디</th>
        <th scope="col">IP주소</th>
        <th scope="col">시작시간</th>
        <th scope="col">RESET</th>
        <th scope="col">EXCEPTION</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="users in userList" :key="users">
        <th scope="row">{{ users._id }}</th>
        <td>{{ users.username }}</td>
        <td>{{ users.userIP }}</td>
        <td>{{ users.userStartTime }}</td>
        <td><a href="#" @click="resetIP">RESET</a></td>
        <td>EXCEPTION</td>
      </tr>
    </tbody>
  </table>
</div>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled" v-if="currentPage == 1">
        <a class="page-link" tabindex="-1" aria-disabled="true">이전</a>
      </li>
      <li class="page-item" v-else>
        <a class="page-link" @click="getUserList(currentPage - 1)">이전</a>
      </li>
      <div v-for="page in total" :key="page">
        <li class="page-item active" v-if="page == currentPage">
          <a class="page-link" @click="getUserList(page)">{{ page }}</a>
        </li>
        <li class="page-item" v-else>
          <a class="page-link" @click="getUserList(page)">{{ page }}</a>
        </li>
      </div>
      <li class="page-item disabled" v-if="currentPage == total">
        <a class="page-link" href="#">다음</a>
      </li>
      <li class="page-item" v-else>
        <a class="page-link" @click="getUserList(currentPage + 1)">다음</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ClassExamManage',
  data () {
    return {
      userList: [
        // api로 받아와야될 부분
        {
          _id: '1',
          username: 'user1',
          userIP: 'userIP1',
          userStartTime: '2022-01-08-17:08'
        },
        {
          _id: '2',
          username: 'user2',
          userIP: 'userIP2',
          userStartTime: '2022-01-08-17:09'
        }
      ]
    }
  },
  methods: {
    resetIP () {
      if (confirm('리셋하시겠습니까?')) {
        alert('리셋 완료')
      } else {
      }
    }
  }
}
</script>

<style></style>
