<template>
  <div class="container">
    <h1>FAQ</h1>
    <!--아코디언 시작-->
    <div class="accordion py-3" id="accordionExample">
      <div v-for="(faqs, index) in faqList" :key="index" class="accordion-item">
        <h2 class="accordion-header" :id="`heading${faqs.id}`">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse${faqs.id}`"
            aria-expanded="false"
            :aria-controls="`collapse${faqs.id}`"
          >
            Q. {{ faqs.question }}
          </button>
        </h2>
        <div
          :id="`collapse${faqs.id}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`heading${faqs.id}`"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <span v-html="faqs.answer"></span>
          </div>
        </div>
      </div>
    </div>
    <!--아코디언 끝-->
  </div>
</template>

<script>
import api from '@/api/index.js'
var showdown = require('showdown')
var converter = new showdown.Converter()

export default {
  name: 'FAQ',
  data: () => {
    return {
      faqList: []
    }
  },
  created () {
    this.getfaqList()
  },
  methods: {
    async getfaqList () {
      try {
        const res = await api.getFAQ()
        this.faqList = res.data
        for (var i = 0; i < this.faqList.length; i++) {
          this.faqList[i].answer = converter.makeHtml(this.faqList[i].answer)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  width: 50%;
  @media (max-width: 767px) {
    font-size: calc(1.3rem + 2vw);
  }
  padding: 0px;
  text-align: left;
  margin-top: 50px;
  font-weight: bold;
}
.accordion-button,
.accordion-body {
  @media (max-width: 420px) {
    font-size: calc(0.5rem + 2vw);
    padding: 0.7rem;
  }
  text-align: left;
}
</style>
