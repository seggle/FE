<template>
  <div class="container">
    <div class="row">
    <ClassContestNav class="col-lg-2 col-xs-4 py-4"></ClassContestNav>
    <!--밑에 페이지가 뿌려짐-->
    <router-view class="col-lg-10 col-xs-8 px-4 py-4"></router-view>
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

<style>

</style>
