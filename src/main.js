import { createApp } from 'vue'
// import VueApexCharts from 'vue-apexcharts'
import VueCalendarHeatMap from 'vue3-calendar-heatmap'
import App from './App.vue'
import router from './router'
import store from './store'

var app = createApp(App)
app.use(store)
app.use(router)
app.use(VueCalendarHeatMap)
// app.component('apexchart', VueApexCharts)
// app.use(VueApexCharts)
app.mount('#app')
