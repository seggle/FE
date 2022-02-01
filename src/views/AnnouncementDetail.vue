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
      <table class="table table-bordered py-5">
        <colgroup>
          <col width="15%" />
          <col width="*" />
        </colgroup>
        <tr>
          <th>제목</th>
          <td>{{ content.title }}</td>
        </tr>
        <tr>
          <th>내용</th>
          <td v-html="this.content.context"></td>
        </tr>
      </table>
    </div>
    <footer>
      <router-link
        to="/announcements"
        class="btn btn-primary btn-sm px-4 me-sm-3"
        id="head"
        >목록</router-link
      >
    </footer>
  </div>
</template>
<script>
import api from '@/api/index.js'
var showdown = require('showdown')
var converter = new showdown.Converter()
export default {
  name: 'AnnouncementDetail',
  data: () => {
    return {
      content: {}
    }
  },
  created () {
    this.getContent(1)
  },
  methods: {
    async getContent (announcementId) {
      try {
        const res = await api.getAnnouncementDetail(announcementId)
        this.content = res.data
        this.content.context = converter.makeHtml(this.content.context)
        console.log(this.content)
      } catch (error) {
        console.log(error)
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
</style>
