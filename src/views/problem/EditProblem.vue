<template>
  <ProblemForm :mode="'edit'"
               :problemID="problemID"
               :classID="classID" />
</template>

<script>
import ProblemForm from '@/components/ProblemForm.vue'
export default {
  name: 'EditProblem',
  components: {
    ProblemForm
  },
  data () {
    return {
      problemID: Number(this.$route.params.problemID),
      classID: this.$route.params.classID
    }
  }
}
</script>

<style>

</style>
