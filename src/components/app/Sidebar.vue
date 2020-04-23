<template lang="pug">
  ul.sidebar__list(:val="getUid")
    router-link(
      v-for="link in links"
      :key="link.url"
      tag="li"
      class="sidebar__item"
      active-class="sidebar__item--active"
      :to="link.url"
      :exact="link.exact")
      a.waves-effect.waves-green.sidebar__link(href="#") {{ link.title }}
</template>


<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  data: () => ({
    links: [
      {title: localizeFilter('Menu_news'), url: '/', exact: true},
      {title: localizeFilter('Menu_users'), url: '/users'},
    ],
    linksCount: true
  }),
  computed: {
    getUid() {
      const uid = this.$store.getters.info.uid
      if(uid && this.linksCount) {
        const newLink = {
          title: localizeFilter('Menu_profile'),
          url: `/profile/${uid}`
        }
        this.links.unshift(newLink)
        this.linksCount = false
      }
    }
  }
}
</script>
