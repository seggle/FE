<template>
  <ProblemForm :mode="'create'" />
</template>

<script>
import ProblemForm from '@/components/ProblemForm.vue'
export default {
  name: 'CreateProblem',
  components: {
    ProblemForm
  },
  props: {
    classID: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
