<template lang="pug">
  nav.navbar
    .navbar__wrapper
      ul.navbar__list
        li.navbar__link
          router-link.navbar__link(to="/")
            i.material-icons home
            span.navbar__logo 
              i my
              | Home
        li.navbar__link
          a.navbar__link.dropdown-trigger(
            href="#"
            data-target="dropdown"
            ref="dropdown")
            img.navbar__user-img(:src="user.urlImg")
            | {{ user.firstName }}
            i.material-icons.right arrow_drop_down

          ul#dropdown.dropdown-content
            li
              router-link.black-text(to="/settings")
                i.material-icons.navbar__icon edit
                | {{ 'edit' | localize }}
            li.divider(tabindex="-1")
            li
              a.black-text(
                href="#" 
                @click.prevent="logout")
                i.material-icons.navbar__icon assignment_return
                | {{ 'logout' | localize }}
</template>


<script>
export default {
  data: () => ({
    dropdown: null
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    user() {
      return this.$store.getters.info
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
