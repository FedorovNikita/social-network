<template lang="pug">
  div
    .page-title.container-component
      h3 Моя стр

    CreatePost
</template>

<script>
import CreatePost from '@/components/CreatePost'

export default {
  name: 'Home',
  components: {
    CreatePost
  }
}
</script>
