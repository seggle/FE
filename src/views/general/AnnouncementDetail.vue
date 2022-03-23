<template>
  <div class="container">

    <header class="announcement-detail-header">
      <button class="btn"
              @click="goAnnouncementList">
        <font-awesome-icon icon="angle-left" /> 목록
      </button>
    </header>
    <section class="grid-section">
      <span><h5>제목</h5></span>
      <span class="title">{{content.title}}</span>
      <span><h5>작성자</h5></span>
      <span>{{ content.created_user }}</span>
      <span><h5>작성일</h5></span>
      <span>{{ content.created_time }}</span>
      <span><h5>내용</h5></span>
      <span class="content"><VueShowdown class="v-show-down" :markdown="content.context"></VueShowdown></span>
    </section>
    <!---table로>
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
          <td class="context" colspan="3"><VueShowdown class="v-show-down" :markdown="content.context"></VueShowdown></td>
        </tr>
      </tbody>
    </table>
    <!-->
  </div>
</template>
<script>
import api from '@/api/index.js'
import VueShowdown from 'vue-showdown'

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

.grid-section{
  margin-top:20px;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 3fr;
  grid-template-rows: 1fr 1fr auto;
  //grid-gap: 0;
  //gap: 1px;
  text-align: left;
  //border-left: 2px solid #aaa;
  h5{
    font-weight: bold;
    text-align: center;
    @media (max-width: 768px) {
      font-size:1.1rem;
    }
    @media (max-width: 420px) {
      font-size: 0.7rem;
    }
  }
  span{
      padding: 0.7rem;
      //border-right: 2px solid #aaa;
      border-bottom: 0.7px solid #E5E5E5;
      @media (max-width: 420px) {
       font-size: 0.7rem;
    }
  }

  .title{
    grid-column: 2 / 5;
    grid-row: 1 / 2;
  }

  .content{
  grid-column: 2 / 5;
  grid-row: 3 / 4;
  padding: 1.1rem;
  }
}
</style>
