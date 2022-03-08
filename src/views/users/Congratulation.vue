<template>
  <main>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
  </main>
</template>

<script>
export default {
  created () {
    this.start()
  },
  methods: {
    start () {
      this.$confetti.start({
        particles: [
          {
            type: 'rect'
          }
        ],
        defaultDropRate: 3,
        defaultSize: 4
      })
      this.$$confetti.stop()
    },

    stop () {
      this.$confetti.stop()
    }
  }
}
</script>
