<template lang="pug">
  .comment(v-else)
    .comment__info
      img.comment__user-img(:src="userInfo.urlImg")
      div
        h4.comment__title {{userInfo.firstName}} {{userInfo.lastName}}
        p.comment__text {{ comment.textComment }}
        span.comment__date {{ comment.dateComment | date('datetime') }}

        div.likes(v-if="currentUser")
          span.likes__thumb-up(@click="changeCommentLikes" v-if="likeIsOpen") 
            i.material-icons thumb_up
          span.likes__count
            i.material-icons(:class="{likes__favorite: !likeIsOpen}") favorite
            | {{ countLike }} 
    
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
    currentUser: true,
    likeIsOpen: true,
    countLike: ''
  }), 
  async mounted() {
    if(!firebase.auth().currentUser) {
      this.currentUser = false
    }
    if(this.comment.likes) {
      const uid =  await this.$store.dispatch('getUid')
      if(uid) {
        const likesId = Object.keys(this.comment.likes).map(key => ({...this.comment.likes[key], id: key}))
        for(let i = 0; i < likesId.length; i++) {
          if(likesId[i].uid == uid) {
            this.likeIsOpen = false
          }
        }
        this.countLike = likesId.length
      }
    }
    this.userInfo = await this.$store.dispatch('fetchUser', {
      idUser: this.comment.idAuthor
    })
    this.attachedComments = await this.$store.dispatch('fetchAttachedComments', {  
      idCurrentPost: this.comment.idCurrentPost, 
      idCurrentComment: this.comment.id,
      uid: this.uid,
    })
  },
  components: {
    CreateAttachedComment, AttachedCommentNews
  },
  methods: {
    addNewAttachedComment(comment) {
      this.attachedComments.push(comment)
    },
    async changeCommentLikes() {
      const like = await this.$store.dispatch('setCommentLike', {
        idCurrentPost: this.comment.idCurrentPost,
        idCurrentComment: this.comment.id,
        uid: this.uid,
      })
      this.countLike += 1
      this.likeIsOpen = false
    }
  }
}
</script>
