<template>
  <div>
    <table class="table py-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">제목</th>
          <th scope="col">작성자</th>
          <th scope="col">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proposals in paginatedDataPro" :key="proposals">
          <td>{{ proposals.id }}</td>
          <td>
            <router-link :to="`/proposals/${proposals.id}`" class="title">{{
              proposals.title
            }}</router-link>
          </td>
          <td>{{ proposals.created_user }}</td>
          <td>{{ proposals.created_time.slice(0, 10) }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
            이전
          </button>
        </li>
        <li v-for="n in pageCount" :key="n" class="page-item">
          <button @click="toPage(n)">{{ n }}</button>
        </li>
        <li class="page-item">
          <button
            :disabled="pageNum >= pageCount - 1"
            @click="nextPage"
            class="page-btn"
          >
            다음
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'paginated-list-pro',
  data () {
    return {
      pageNum: 0
    }
  },
  props: {
    listArray: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10
    }
  },
  methods: {
    nextPage () {
      this.pageNum += 1
    },
    prevPage () {
      this.pageNum -= 1
    },
    toPage (page) {
      this.pageNum = page - 1
    }
  },
  computed: {
    pageCount () {
      const listLeng = this.listArray.length
      const listSize = this.pageSize
      let page = Math.floor(listLeng / listSize)
      if (listLeng % listSize > 0) page += 1

      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page
    },
    paginatedDataPro () {
      const start = this.pageNum * this.pageSize
      const end = start + this.pageSize
      return this.listArray.slice(start, end)
    }
  }
}
</script>
<style scoped>
.title {
  color: black;
  text-decoration: none;
}
.title:hover {
  color: black;
  text-decoration: underline;
}
</style>
