// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui';    //本项目的目标定位，是移动端的card自助制作，故采用了运动UI库MuseUI；界面布局也是手机页面风格。
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

import {getRemSize} from "@/utils/remHandle"

// import FastClick from 'fastclick'
//
// FastClick.attach(document.body)

Vue.prototype.getRemSize = getRemSize
Vue.prototype.DPR = window.devicePixelRatio
// Vue.prototype.DPR_Rate = fontSize * DPR

Vue.config.productionTip = false

/* eslint-disable no-new */
//本项目最顶层流形核是vue组件对象，包含router函数；下一层是App对象，只是一个<div>，基本不包含实质内容；
//真正的主体从第三层开始；而该第三层，是由router的选择情况而动态挂载的，包括Home和Preview两大组件；
//而Home组件又是主要的。
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
