<template>
  <ProblemForm :mode="'create'" />
</template>

<script>
import ProblemForm from '@/components/ProblemForm.vue'
export default {
  name: 'CreateProblem',
  components: {
    ProblemForm
  }
}
</script>

<style lang="scss" scoped>
</style>
