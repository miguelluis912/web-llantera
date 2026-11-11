import './style.css'
import { createApp } from 'vue'
import App from './App.vue'

const mountPoint = document.querySelector('#app')
const pageName = mountPoint.dataset.page
const pages = import.meta.glob('./pages/*.vue')
pages[`./pages/${pageName}.vue`]().then(({ default: Page }) => {
  createApp(App, { Page, pageName }).mount(mountPoint)
})
