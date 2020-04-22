<template lang="pug">
  .comment(v-else)
    .comment__info
      img.comment__user-img(:src="userInfo.urlImg")
      div
        h4.comment__title {{userInfo.firstName}} {{userInfo.lastName}}
        p.comment__text {{ comment.textComment }}
        span.comment__date {{ comment.dateComment | date('datetime') }}
    
    CreateAttachedComment(v-if="currentUser" :idCurrentComment="comment.id" :idCurrentPost="comment.idCurrentPost" @createdAttachedComment="addNewAttachedComment" :uid="uid")
    AttachedCommentNews(v-for="attachedComment in attachedComments" :key="attachedComment.id" :attachedComment="attachedComment")

</template>

<script>
import firebase from 'firebase/app'
import CreateAttachedComment from '@/components/CreateAttachedComment'
import AttachedCommentNews from '@/components/news/AttachedCommentNews'


export default {
  props: ['comment', 'uid'],
  data: () => ({
    attachedComments: [],
    userInfo: [],
    currentUser: true
  }), 
  async mounted() {
    this.userInfo = await this.$store.dispatch('fetchUser', {
      idUser: this.comment.idAuthor
    })
    this.attachedComments = await this.$store.dispatch('fetchAttachedComments', {  
      idCurrentPost: this.comment.idCurrentPost, 
      idCurrentComment: this.comment.id,
      uid: this.uid,
    })
    if(!firebase.auth().currentUser) {
      this.currentUser = false
    }
  },
  components: {
    CreateAttachedComment, AttachedCommentNews
  },
  methods: {
    addNewAttachedComment(comment) {
      this.attachedComments.push(comment)
    }
  }
}
</script>
