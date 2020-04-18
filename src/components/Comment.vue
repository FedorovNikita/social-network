<template lang="pug">
  div
    div(v-for="comment of comments"
      :key="comment.id"
      :data-comment="comment.id")
      | {{ comment.textComment }} {{ new Date(comment.dateComment) }} {{ comment.idAuthor}}

</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  // mounted() {
  //   console.log(this.comments)
  // }
}
</script>
