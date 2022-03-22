<template>
  <div class="container">

    <header class="announcement-detail-header">
      <button class="btn"
              @click="goAnnouncementList">
        <font-awesome-icon icon="angle-left" /> 목록
      </button>
    </header>

    <table class="table">
      <tbody>
        <tr>
          <td><h5>제목</h5></td>
          <td class="title" colspan="3">{{ content.title }}</td>
        </tr>
        <tr>
          <td><h5>작성자</h5></td>
          <td>{{ content.created_user }}</td>
          <td><h5>작성일</h5></td>
          <td>{{ content.created_time }}</td>
        </tr>
        <tr>
          <td><h5>내용</h5></td>
          <!-- <vue-marked>{{content.context}}</vue-marked> -->
          <!-- <v-md-editor :model-value="content.context" mode="preview"></v-md-editor> -->
          <!-- <td class="context" colspan="3"
              v-html="this.content.context"
          ></td> -->
          <td class="context" colspan="3"><VueShowdown :markdown="content.context"></VueShowdown></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import api from '@/api/index.js'
import VueShowdown from 'vue-showdown'

// const showdown = require('showdown')
// const converter = new showdown.Converter()
// converter.setOption({ parseImgDimensions: true, omitExtraWLInCodeBlocks: true, tables: true, tablesHeaderId: true, simpleLineBreaks: true, emoji: true, underline: true })
// converter.setOption({ tables: true })

export default {
  name: 'AnnouncementDetail',
  components: VueShowdown,
  data () {
    return {
      announcementID: this.$route.params.id,
      content: { context: null }
    }
  },
  created () {
    this.getContent()
  },
  beforeUpdate () {
    this.setCreatedTime()
    this.setContext()
  },
  methods: {
    async getContent () {
      try {
        const res = await api.getAnnouncementDetail(this.announcementID)
        this.content = res.data
      } catch (error) {
        console.log(error)
      }
    },
    setCreatedTime () {
      this.content.created_time = this.content.created_time.slice(0, 10)
    },
    setContext () {
      // this.content.context = converter.makeHtml(this.content.context)
    },
    goAnnouncementList () {
      this.$router.push({ name: 'Announcement' })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 3rem 3rem;
  @media (max-width: 420px) {
    padding: 1rem 1rem;
  }
}

header {
  padding: 2rem 0rem;
  @media (max-width: 768px) {
    display: block;
  }

  button {
    float: right;
    @media (max-width: 420px) {
      font-size: calc(0.5rem + 1.5vw);
    }
  }
}

.table {
  min-width: 0px;
  text-align: left;
  white-space: normal;

  h5 {
    text-align: center;
    font-weight: bold;
    @media (max-width: 420px) {
      font-size: calc(0.7rem + 1.5vw);
    }
  }
  tr {
    border-bottom: 1px solid gray;
    &:hover {
      background-color: transparent;
      cursor: default;
    }

    &:nth-child(2) {
      td {
        @media (max-width: 420px) {
          padding: 0.2rem;
        }
      }
    }
    .context {
      text-align: left;
    }
    td {
      width: 50px;
      border-width: 0;
      @media (max-width: 420px) {
        font-size: calc(0.55rem + 1.5vw);
      }

      .title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .context {
      height: 300px;
    }
  }
}
</style>
