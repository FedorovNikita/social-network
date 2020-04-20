<template lang="pug">
  .container-component.post
    h4.post__title Никита Федоров 
      //- | {{post.idAuthor}}
    span.post__date {{new Date(post.datePost) | date('datetime')}}
      //- | {{post.datePost}}
    p.post__description {{post.description}}
    //- small id поста {{post.id}}

    Comment(v-for="comment in comments" :key="comment.id" :comment="comment")
    
    CreateComment(:currentPost="post.id" @createdComment="addNewComment")
</template>

<script>
import CreateComment from '@/components/CreateComment'
import Comment from '@/components/Comment'

export default {
  props: ['post'],
  data: () => ({
    comments: []
  }),
  components: {
    CreateComment, Comment
  },
  async mounted() {
    this.comments = await this.$store.dispatch('fetchComments', {idCurrentPost: this.post.id})
    // console.log(this.post)
  },
  methods: {
    addNewComment(comment) {
      this.comments.push(comment)
    }
  }
}
</script>
