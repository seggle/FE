<template>
  <ProblemForm :mode="'edit'"
                :problemID="problemID" />
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
      problemID: Number(this.$route.params.problemID)
    }
  }
}
</script>

<style>

</style>
