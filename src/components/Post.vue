<template lang="pug">
  div
    .container-component(
      v-for="post of posts"
      :key="post.id"
      :data-post="post.id")
      | {{ post.description }}
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
