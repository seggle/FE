<template>
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
      <td>RESET</td>
      <td>EXCEPTION</td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  name: 'ClassExamManage',
  data () {
    return {
      userList: [ // api로 받아와야될 부분
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
  }
}
</script>

<style>

</style>
