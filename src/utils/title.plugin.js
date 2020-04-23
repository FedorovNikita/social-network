import locaizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = 'MyHome'
      return `${locaizeFilter(titleKey)} | ${appName}`
    }
  }
}
