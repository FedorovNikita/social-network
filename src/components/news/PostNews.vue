<template lang="pug">
  .container-component.post
    .post__info-author
      img.post__user-img(:src="userInfo.urlImg")
      div
        h4.post__title {{userInfo.firstName}} {{userInfo.lastName}}
        span.post__date {{new Date(post.datePost) | date('datetime')}}
    p.post__description {{post.description}}
    img(:src="post.srcImg")
    <iframe v-if="videoIsOpen" width="100%" height="400" :src="`https://www.youtube.com/embed/${post.srcVideo}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    CommentNews(v-for="comment in comments" :key="comment.id" :comment="comment" :uid="post.uid")

    CreateComment(v-if="currentUser" :currentPost="post.id" @createdComment="addNewComment" :uid="post.uid")
</template>

<script>
import firebase from 'firebase/app'
import CommentNews from '@/components/news/CommentNews'
import CreateComment from '@/components/CreateComment'

export default {
  props: ['post'],
  data: () => ({
    userInfo: '',
    comments: [],
    currentUser: true,
    videoIsOpen: false
  }),
  async mounted() {
    if(this.post.srcVideo) {
      this.videoIsOpen = true
    }
    if(this.post.comments) {
      this.comments = await this.$store.dispatch('fetchComments', {
        idCurrentPost: this.post.id,
        uid: this.post.uid
      })
    }
    this.userInfo = await this.$store.dispatch('fetchUser', {
      idUser: this.post.idAuthor
    })
    if(!firebase.auth().currentUser) {
      this.currentUser = false
    }
  },
  methods: {
    addNewComment(comment) {
      this.comments.push(comment)
    }
  },
  components: {
    CommentNews, CreateComment
  },
}
</script>
