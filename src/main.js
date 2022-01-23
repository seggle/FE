import { createApp } from 'vue'
// import VueApexCharts from 'vue-apexcharts'
import VueCalendarHeatMap from 'vue3-calendar-heatmap'
import App from './App.vue'
import router from './router'
import store from './store'

import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueCalendarHeatMap)
// app.component('apexchart', VueApexCharts)
// app.use(VueApexCharts)
app.component('Datepicker', Datepicker)

app.mount('#app')
