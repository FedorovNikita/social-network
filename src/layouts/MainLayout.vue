<template lang="pug">
  .main-layout
    Navbar

    .main-layout__wrapper.container
      Sidebar

      main.main-content
        router-view
      
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'

export default {
  name: 'main-layout',
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Navbar, Sidebar
  }
}
</script>
