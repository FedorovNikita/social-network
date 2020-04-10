<template lang="pug">
  .bg-empty
    .container.empty-layout
      .posts
        ul.posts__list
          li.posts__item
            //- img.posts__image(src="@/assets/img/mn.jpg" alt="")
            h3.posts__title Title
            p.posts__text Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ipsa, dolores laboriosam soluta repellendus numquam molestiae dicta possimus fugit rerum?
          li.posts__item
            //- img.posts__image(src="@/assets/img/mn.jpg" alt="")
            h3.posts__title Title
            p.posts__text Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ipsa, dolores laboriosam soluta repellendus numquam molestiae dicta possimus fugit rerum?
      router-view
</template>

<script>
import messages from '@/utils/messages'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>

<style scoped>
  .bg-empty {
    background-image: url('../assets/img/bg-empty.svg');
    background-repeat: no-repeat;
  }
</style>
