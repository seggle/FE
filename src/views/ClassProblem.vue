<template>
  <div class="container">
    <div class="row">
<<<<<<< HEAD
      <ClassContestNav class="col-lg-2 col-xs-4 py-4 sidebar"></ClassContestNav>
      <!--밑에 페이지가 뿌려짐-->
      <router-view class="col-lg-10 col-xs-8 px-4 py-4"></router-view>
=======
    <ClassContestNav class="col-lg-3 col-xs-4 py-4"></ClassContestNav>
    <!--밑에 페이지가 뿌려짐-->
    <router-view class="col-lg-9 col-xs-8 px-4 py-4"></router-view>
>>>>>>> 0486d70c3a2f68e738f8bba3e987a840e1b94f60
    </div>
  </div>
</template>

<script>
import ClassContestNav from '@/components/ClassContestNav.vue'
export default {
  name: 'ClassProblem',
  components: {
    ClassContestNav
  }
}
</script>

<style></style>
