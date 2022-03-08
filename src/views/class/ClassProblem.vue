<template>
  <div class="container problem-container" :key="problem">
    <div class="problem-header">
      <h1 id="title">
        {{ problem.title}}
      </h1>
    </div>

    <div class="problem-content row">
      <!-- 세로 메뉴 탭 -->
      <div class="problem-tab col-2">
        <div class="list-group" id="list-tab" role="tablist">
          <a class="list-group-item list-group-item-action active"
            data-bs-toggle="list" role="tab"
            id="list-info-list"
            href="#list-info"
            aria-controls="list-info">문제 설명
          </a>
          <a class="list-group-item list-group-item-action"
            data-bs-toggle="list" role="tab"
            id="list-data-list"
            href="#list-data"
            aria-controls="list-data">데이터
          </a>
        </div>
      </div>
      <!-- 탭 내용 -->
      <div class="problem-tab-content col-10">
        <div class="tab-content" id="nav-tabContent">
        <!-- 문제 설명 -->
          <div class="tab-pane fade show active" role="tabpanel"
                id="list-info" aria-labelledby="list-info-list"
                :key="problem">
            <h5 class="list-title">
              문제 설명
            </h5>
            <p class="list-content">
              <span v-html="problem.description"></span>
            </p>
          </div>
        <!-- 데이터 -->
          <div class="tab-pane fade" id="list-data" role="tabpanel" aria-labelledby="list-data-list">
            <h5 class="list-title">데이터 설명
              <button class="btn" :disabled="alreadyJoined == false">
                <a :href="problem.data">다운로드</a>
              </button>
            </h5>
            <p class="list-content">
              <span v-html="problem.data_description"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

const showdown = require('showdown')
const converter = new showdown.Converter()

export default {
  name: 'ClassProblem',
  data () {
    return {
      userID: this.$store.state.userid,
      problemID: this.$route.params.problemID,
      problem: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getProblem()
    },
    async getProblem () {
      try {
        const res = await api.getProblem(this.problemID)
        res.data.description = converter.makeHtml(res.data.description)
        res.data.data_description = converter.makeHtml(res.data.data_description)
        this.problem = res.data
      } catch (err) {
        console.log(err)
      }
    },
    download (url) {
      location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
