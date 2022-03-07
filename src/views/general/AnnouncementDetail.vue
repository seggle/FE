<template>
  <div class="container">
    <div class="d-flex mb-2 mt-3">
      <div class="button-group">
        <button @click="goList" class="btn" id="head"><font-awesome-icon icon="angle-left" /> 목록</button>
      </div>
    </div>

    <div class="table-div">
      <table class="table py-3">
        <tbody>
          <tr>
            <td><h5>제목</h5></td>
            <td colspan="3" class="title">{{ content.title }}</td>
          </tr>
          <tr>
            <td><h5>작성자</h5></td>
            <td>{{ content.created_user }}</td>
            <td><h5>작성일</h5></td>
            <td>{{ content.created_time }}</td>
          </tr>
          <tr>
            <td><h5>내용</h5></td>
            <td colspan="3" class="context" v-html="this.content.context"></td>
          </tr>
        </tbody>
      </table>
    </div>
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
      content: {
        title: '',
        created_time: '',
        context: ''
      }
    }
  },
  created () {
    this.getContent()
  },
  methods: {
    goList () {
      this.$router.push({
        name: 'Announcement'
      })
    },
    async getContent () {
      try {
        const res = await api.getAnnouncementDetail(this.$route.params.id)
        this.content = res.data
        this.content.created_time = res.data.created_time.slice(0, 10)
        this.content.context = converter.makeHtml(this.content.context)
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
.table-div {
  .table {
  min-width: 0px;
  text-align: left;
  white-space: normal;
  table-layout: fixed;
  tr {
    td {
      text-align: left;
      @media (max-width: 420px) {
        font-size: calc(0.55rem + 2vw);
      }
    }
    h5 {
      text-align: center;
      font-weight: bold;
      @media (max-width: 420px) {
        font-size: calc(0.7rem + 2vw);
      }
    }
  }
  tbody {
    tr:hover {
      background-color: transparent;
      cursor: default;
    }
  }
  td.title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
}

.context {
  height: 300px;
}
.button-group {
  margin-left: auto;
}
.btn {
  @media (max-width: 767px) {
    font-size: calc(0.5rem + 2vw);
  }
  margin-top: 30px;
}
</style>
