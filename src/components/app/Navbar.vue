<template lang="pug">
  nav.navbar
    .navbar__wrapper
      ul.navbar__list
        li.navbar__link
          a.navbar__link(href="#")
            i.material-icons home
            span NF
        li.navbar__link
          a.navbar__link.dropdown-trigger.black-text(
            href="#"
            data-target="dropdown"
            ref="dropdown")
            | USER NAME
            i.material-icons.right arrow_drop_down

          ul#dropdown.dropdown-content
            li
              router-link.black-text(to="/settings")
                i.material-icons.navbar__icon edit
                | Редактировать
            li.divider(tabindex="-1")
            li
              a.black-text(
                href="#" 
                @click.prevent="logout")
                i.material-icons.navbar__icon assignment_return
                | Выйти
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
