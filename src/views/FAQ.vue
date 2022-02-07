<template>
  <div class="container px-5">
    <h1>FAQ</h1>
    <!--아코디언 시작-->
    <div class="accordion px-5 py-3" id="accordionExample">
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
            {{ faqs.id }}. {{ faqs.question }}
          </button>
        </h2>
        <div
          :id="`collapse${faqs.id}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`heading${faqs.id}`"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            {{ faqs.answer }}
          </div>
        </div>
      </div>
    </div>
    <!--아코디언 끝-->
  </div>
</template>

<style lang="scss" scoped>
h1 {
  padding: 0px 4rem;
  margin-top: 50px;
  font-weight: bold;
  text-align: left;
}
</style>
<script>
import api from '@/api/index.js'
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
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
