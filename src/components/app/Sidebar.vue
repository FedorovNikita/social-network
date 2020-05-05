<template lang="pug">
  ul.sidebar__list
    router-link(
      v-for="link in links"
      :key="link.title"
      tag="li"
      class="sidebar__item"
      active-class="sidebar__item--active"
      :to="{ name: link.urlName, params:{ id: getUid }}"
      :exact="link.exact")
      a.waves-effect.waves-green.sidebar__link(href="#") {{ link.title }}
      a {{getUid}}
</template>


<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  data: () => ({
    links: [
      {title: localizeFilter('Menu_news'), urlName: 'home', exact: true},
      {title: localizeFilter('Menu_profile'), urlName: 'profile'},
      {title: localizeFilter('Menu_users'), urlName: 'users'}
    ],
    linksCount: true
  }),
  computed: {
    getUid() {
      return this.$store.getters.info.uid
    }
  }
}
</script>
