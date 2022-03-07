<template>
  <div class="container">
    <h1 id="title">{{ this.classInfo.name }}</h1>
    <ClassNavBar v-if="privilege > 0" :className="classInfo.name"/>
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
      classInfo: [],
      privilege: 0
    }
  },
  mounted () {
    this.getClass()
    this.getPrevilege()
  },
  methods: {
    async getPrevilege () {
      const res = await api.getClassUserList(this.classID)
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].username === this.$store.state.userid) {
          this.privilege = res.data[i].privilege
          break
        }
      }
      console.log(this.privilege)
    },
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

<style lang="scss" scoped>
h1 {
  padding: 0px 0rem;
  margin-bottom: 0rem;
  margin-top: 4rem;
  text-align: center;
  // display: block;
  // max-width: 300px;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;

  @media (max-width: 992px) {
    width: 100%;
    padding: 0rem;
    margin-top: 1rem;
  }
}
</style>
