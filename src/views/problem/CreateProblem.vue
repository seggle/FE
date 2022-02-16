<template>
  <ProblemForm :mode="'create'" />
</template>

<script>
import api from '@/api/index.js'
import ProblemForm from '@/components/ProblemForm.vue'
export default {
  name: 'CreateProblem',
  components: {
    ProblemForm
  },
  data () {
    return {
      problemType: '',
      problemTitle: '',
      problemInfo: {
        description: '',
        metrics: ['RSME', 'MSE', 'Accuracy'],
        startTime: '',
        endTime: '',
        public: true
      },
      dataInfo: {
        description: '',
        dataFile: '',
        solutionFile: ''
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.problemType = this.$route.params.problemType
    },
    async submitForm () {
      try {
        const data = {
          title: this.problemTitle,
          description: this.problemInfo.description,
          created_user: this.$store.state.userid,
          data: this.dataInfo.dataFile,
          solution: this.dataInfo.solutionFile,
          data_description: this.dataInfo.description,
          public: true
        }
        if (this.problemType === 'general') {
          console.log(data)
          data.start_time = this.problemInfo.startTime.toISOString()
          data.end_time = this.problemInfo.endTime.toISOString()
          await api.createGeneralProblem(data)
          alert('문제가 생성되었습니다.')
          this.$router.push({ name: 'GeneralList' })
        }
        if (this.problemType === 'class') {
          data.pubilc = this.problemInfo.public
          console.log(data)
          await api.createClassProblem(data)
          alert('문제가 생성되었습니다.')
          this.$router.push({ name: 'ClassList' })
        }
      } catch (err) {
        console.log(err)
      }
    },
    uploadFile (e) {
      const files = e.target.files || e.dataTransfer.files
      const id = e.target.id
      console.log(id)
      if (id === 'data-file-input') {
        console.log(files)
        this.dataInfo.dataFile = files[0]
        console.log(this.dataInfo.dataFile)
      } else {
        this.dataInfo.solutionFile = files[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 5rem 0rem;
  .form-control::placeholder {
    color: #ced4da;
    font-weight: 800;
   }
  .problem-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 3rem 0;
    .form-control {
      width: 50%;
      font-size: 2.5rem;
      font-weight: 800;
    }
    .btn {
      padding: 0.5rem 2rem;
      font-size: 22px;
      font-weight: bold;
    }
    button:hover {
      background: white;
      color: #0e1b49;
    }
  }
  .list-group-item {
    border: none;
    padding: 1rem 0rem;
    font-size: 20px;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
  }
  .list-group-item.active {
    z-index: 2;
    color: black;
    font-weight: bold;
    background-color: #F4F4F8;
    border-color: #fff;
  }
  .tab-content {
    // border: 0.0625rem solid #D7E2EB;
    margin-top: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 8%);
    padding: 2rem 1rem;
    .list-title {
      padding: 0.5rem 2rem;
      margin-top: 1.5rem;
      font-weight: bold;
    }
    .form-option {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 1rem 0rem;
    }
    .form-label {
      // display: block;
      font-weight: bold;
      font-size: 1rem;
    }
    .form-check-input {
        width: 5em;
        height: 2em;
        margin: 0em 1em;
    }
    .btn {
      float: right;
      padding: 0.5rem 1.5rem;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 2rem;
    }
    .form-control {
    //   background-color: #F4F4F8;
    //   border: 0.2rem solid #dde4eb;
      padding: 2rem;
      margin-bottom: 1rem;
      line-height: 10;
      resize: none;
    }
    // .form-control::file-selector-button {
    //     color: transparent;
    //     background-color: transparent;
    //     border: none;
    // }
    input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
    .file-upload-btn {
      display: inline-block;
      padding: 5px 20px;
      background: #0e1b49;
      color: white;
      border-radius: 50px;
      cursor: pointer;
      margin-left: 10px;
    }
    // .data-file {
    //   display: flex;
    //   align-items: center;
    //   .form-control {
    //     width: 30%;
    //     line-height: initial;
    //     padding: 1rem;
    //     margin-top: 1.5rem;
    //   }
    // }
  }
}
</style>
