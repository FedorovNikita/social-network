<template lang="pug">
  div
    Loader(v-if="loading")
    .main-layout.bg-main
      Navbar

      .main-layout__wrapper.container
        Sidebar

        main.main-content
          router-view
        
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    loading: true,
  }),
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      const infoUid = await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  components: {
    Navbar, Sidebar
  }
}
</script>

<style scoped>
  .bg-main {
    background-image: url('../assets/img/bg-main.svg');
    background-repeat: no-repeat;
  }
</style>
