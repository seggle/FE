import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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

var app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
app.use(VMdEditor)
