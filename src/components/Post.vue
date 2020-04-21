<template lang="pug">
  .container-component.post
    .post__info-author
      img.post__user-img(:src="userInfo.urlImg")
      div
        h4.post__title {{userInfo.firstName}} {{userInfo.lastName}}
        span.post__date {{new Date(post.datePost) | date('datetime')}}
    p.post__description {{post.description}}

    Comment(v-for="comment in comments" :key="comment.id" :comment="comment")
    
    CreateComment(:currentPost="post.id" @createdComment="addNewComment")
</template>

<script>
import CreateComment from '@/components/CreateComment'
import Comment from '@/components/Comment'

export default {
  props: ['post'],
  data: () => ({
    comments: [],
    userInfo: ''
  }),
  components: {
    CreateComment, Comment
  },
  async mounted() {
    this.userInfo = await this.$store.dispatch('fetchUser', {
      idUser: this.post.idAuthor
    })
    this.comments = await this.$store.dispatch('fetchComments', {
      idCurrentPost: this.post.id,
      uid: this.$route.params.id
    })
  },
  methods: {
    addNewComment(comment) {
      this.comments.push(comment)
    }
  }
}
</script>
