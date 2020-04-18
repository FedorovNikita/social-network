<template lang="pug">
  div
    div(v-for="comment of allComments"
      :key="comment.id"
      :data-comment="comment.id")
      | {{ comment.textComment }} {{ new Date(comment.dateComment) }} {{ comment.idAuthor}}
</template>

<script>
export default {
  props: ['comments', 'newComment'],
  data: () => ({
    allComments: []
  }), 
  mounted() {
    if(this.comments) {
      this.allComments = this.comments;
    }
  },
  watch: {
    newComment() {
      this.allComments.push(this.newComment)
    }
  }
}
</script>
