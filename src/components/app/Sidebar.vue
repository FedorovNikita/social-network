<template lang="pug">
  ul.sidebar__list
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
      {title: 'Моя страница', url: '/', exact: true},
      {title: 'Новости', url: '/news'}
    ]
  })
}
</script>
