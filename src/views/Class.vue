<template>
  <div class="container">
    <ClassNavBar :className="classInfo.name"/>
    <!--밑에 페이지가 뿌려짐-->
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/api/index.js'
import ClassNavBar from '@/components/ClassNavBar.vue'

export default {
  name: 'Class',
  components: {
    ClassNavBar
  },
  data () {
    return {
      classID: this.$route.params.classID,
      classInfo: []
    }
  },
  mounted () {
    this.getClass()
  },
  methods: {
    async getClass (classID) {
      try {
        const res = await api.getClass(this.classID)
        this.classInfo = res.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
