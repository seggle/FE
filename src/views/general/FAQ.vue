<template>
  <div class="container">
    <header class="faq-header">
      <h1 id="title">FAQ</h1>
    </header>

    <div class="accordion py-3" id="accordionExample">
      <div v-for="(faqs, index) in faqList"
           :key="index"
           class="accordion-item">
        <h2 class="accordion-header"
            :id="`heading${faqs.id}`">
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
  </div>
</template>

<script>
import api from '@/api/index.js'

const showdown = require('showdown')
const converter = new showdown.Converter()

export default {
  name: 'FAQ',
  data () {
    return {
      faqList: []
    }
  },
  created () {
    this.getfaqList()
    this.setAnswer()
  },
  methods: {
    async getfaqList () {
      try {
        const res = await api.getFAQ()
        this.faqList = res.data
      } catch (error) {
        console.log(error)
      }
    },
    setAnswer () {
      for (const faq of this.faqList) {
        faq.answer = converter.makeHtml(faq.answer)
      }
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
  display: flex;
  justify-content: space-between;
  padding: 3rem 0rem;
  @media (max-width: 768px) {
    display: block;
    padding: 1rem 0rem;
  }
}

.accordion-button,
.accordion-body {
  text-align: left;
  @media (max-width: 420px) {
    font-size: calc(0.5rem + 2vw);
    padding: 0.7rem;
  }
}
</style>
