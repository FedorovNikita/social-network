<template lang="pug">
  div
    .container-component(
      v-for="post of posts.slice().reverse()"
      :key="post.id"
      :data-post="post.id")
      | {{ post.description }} {{ new Date(post.datePost) }} {{ post.idAuthor}}
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>
