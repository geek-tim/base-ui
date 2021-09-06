import { createApp, reactive } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import EntryApp from './app'
import Element3 from '@geek-tim/base-ui'

import routes from './route'
import demoBlock from './components/demo-block'
import MainHeader from './components/header'
import SideNav from './components/side-nav'
import FooterNav from './components/footer-nav'
import title from './i18n/title'

// 方便在 demo 里面全局导入 element3
window.Element3 = Element3

import '@geek-tim/base-ui/lib/theme-chalk/index.css'
import './demo-styles/index.scss'
import './assets/styles/common.scss'
import './assets/styles/fonts/style.css'

const app = createApp(EntryApp)
app.component('demo-block', demoBlock)
app.component('main-header', MainHeader)
app.component('side-nav', SideNav)
app.component('footer-nav', FooterNav)
app.use(Element3)

const router = createRouter({
  history: createWebHashHistory(__dirname),
  routes
})
app.use(router)

router.isReady().then(() => {
  router.afterEach(async route => {
    const data = title
    for (const val in data) {
      if (new RegExp('^' + val, 'g').test(route.name)) {
        document.title = data[val]
        return
      }
    }
    document.title = 'Element'
  })
  app.mount('#app')
})

export default app
