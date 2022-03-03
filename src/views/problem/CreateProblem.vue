<template>
  <ProblemForm :mode="'create'"
               :classID="classID" />
</template>

<script>
import ProblemForm from '@/components/ProblemForm.vue'
export default {
  name: 'CreateProblem',
  components: {
    ProblemForm
  },
  data () {
    return {
      classID: this.$route.params.classID
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
