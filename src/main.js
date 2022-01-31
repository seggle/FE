import { createApp } from 'vue'
// import VueApexCharts from 'vue-apexcharts'
import VueCalendarHeatMap from 'vue3-calendar-heatmap'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'

import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import koKR from '@kangc/v-md-editor/lib/lang/ko-KR'

// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'

VMdEditor.use(vuepressTheme, {
  Prism
})
VMdEditor.lang.use('ko-KR', koKR)

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueCalendarHeatMap)
// app.component('apexchart', VueApexCharts)
// app.use(VueApexCharts)
app.component('Datepicker', Datepicker)

app.mount('#app')
app.use(VMdEditor)
