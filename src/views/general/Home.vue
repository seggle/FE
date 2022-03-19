<template>
  <div class="home">
    <MainHome msg="Welcome to Seggle" />
  </div>
</template>

<script>
// @ is an alias to /src
import MainHome from '@/components/MainHome.vue'
export default {
  name: 'Home',
  components: {
    MainHome
  }
}
</script>
