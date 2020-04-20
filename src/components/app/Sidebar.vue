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
export default {
  data: () => ({
    links: [
      {title: 'Новости', url: '/', exact: true},
    ]
  }),
  computed: {
    getUid() {
      const uid = this.$store.getters.info.uid
      if(uid) {
        const newLink = {
          title: 'Моя страница',
          url: `/profile/${uid}`
        }
        this.links.unshift(newLink)
      }
    }
  }
}
</script>
