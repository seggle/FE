<template>
  <div class="container">
    <ClassNavBar/>
    <!--밑에 페이지가 뿌려짐-->
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import ClassNavBar from '@/components/ClassNavBar.vue'

export default {
  name: 'Class',
  components: {
    ClassNavBar
  }
}
</script>

<style>

</style>
