<template>
  <div class="class">
    <ClassNavBar/>
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
.class {
  padding: 8vh 30vh;
}
</style>
