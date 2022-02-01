<template>
  <div class="container px-5">
    <div class="class-nav-bar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <h1 id="title"></h1>
        </div>
      </nav>
    </div>
    <div class="AddWrap">
      <form id="pro-form">
        <table class="tbAdd">
          <colgroup>
            <col width="15%" />
            <col width="*" />
          </colgroup>
          <tr>
            <th>제목</th>
            <td><input type="text" v-model="title" required /></td>
          </tr>
          <tr>
            <th>작성자</th>
            <td><input type="text" v-model="created_user" required /></td>
          </tr>
          <tr>
            <th>내용</th>
            <td rowspan="4">
              <textarea name="" id="" v-model="context" required></textarea>
            </td>
          </tr>
        </table>
        <router-link
          @click="submitProposal"
          to="/proposals"
          class="btn btn-primary btn-sm px-4 me-sm-3"
          id="head"
          >등록</router-link
        >
      </form>
    </div>
  </div>
</template>
<script>
import api from '@/api/index.js'
export default {
  name: 'ProposalCreate',
  data: () => {
    return {
      formProposal: {
        id: '1',
        title: '',
        context: '',
        created_user: '',
        created_time: ''
      }
    }
  },
  methods: {
    async submitProposal () {
      try {
        const data = {
          id: this.formProposal.id,
          title: this.formProposal.title,
          context: this.formProposal.context,
          created_time: this.formProposal.created_time,
          created_user: this.formProposal.created_user
        }
        const res = await api.createProposal(data)
        console.log(res)
        this.$router.push({ path: '/proposals' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  font-weight: bold;
  text-align: left;
}
.AddWrap {
  padding: 0px 5rem;
  margin-top: 100px;
}
.tbAdd th,
.tbAdd td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.tbAdd td {
  padding: 10px 10px;
  box-sizing: border-box;
}
.tbAdd td input {
  width: 100%;
  min-height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
}
.tbAdd td textarea {
  width: 100%;
  min-height: 300px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
