<template lang="pug">
  div
    Loader(v-if="loading" style="height: 50px")
    .comment(v-else)
      .comment__info
        img.comment__user-img(:src="userInfo.urlImg")
        div
          router-link(:to="`/profile/${userInfo.uid}`")
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
      AttachedComment(v-for="attachedComment in attachedComments" :key="attachedComment.id" :attachedComment="attachedComment")
</template>

<script>
import firebase from 'firebase/app'
import CreateAttachedComment from '@/components/CreateAttachedComment'
import AttachedComment from '@/components/AttachedComment'

export default {
  props: ['comment', 'uid'],
  data: () => ({
    attachedComments: [],
    userInfo: [],
    currentUser: true,
    loading: true,
    likeIsOpen: true,
    countLike: ''
  }),
  components: {
    CreateAttachedComment, AttachedComment
  },
  async mounted() {
    if(!firebase.auth().currentUser) {
      this.currentUser = false
    }
    if(this.comment.likes) {
      const uid = await this.$store.dispatch('getUid')
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

    if(this.comment.attachedComments) {
      this.attachedComments = Object.keys(this.comment.attachedComments).map(key => ({...this.comment.attachedComments[key], id: key, idCurrentPost: this.comment.idCurrentPost, idCurrentComment: this.comment.id}))
    }

    this.loading = false
  },
  methods: {
    addNewAttachedComment(comment) {
      this.attachedComments.push(comment)
    },
    async changeCommentLikes() {
      if(this.uid) {
        const like = await this.$store.dispatch('setCommentLike', {
          idCurrentPost: this.comment.idCurrentPost,
          idCurrentComment: this.comment.id,
          uid: this.uid,
        })
      } else {
        const like = await this.$store.dispatch('setCommentLike', {
          idCurrentPost: this.comment.idCurrentPost,
          idCurrentComment: this.comment.id,
          uid: this.$route.params.id,
        })
      }

      this.countLike += 1
      this.likeIsOpen = false
    }
  }
}
</script>
