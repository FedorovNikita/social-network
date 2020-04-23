<template lang="pug">
  div
    a.comment__link(href="#" @click.prevent="isOpen = !isOpen") {{ 'Reply' | localize }}

    form.comment__attached(@submit.prevent="submitHandler" v-if="isOpen")
      .input-field
        textarea.materialize-textarea(
          v-model="comment" 
          id="commentAttached" )
        label(for="commentAttached") {{ 'send_comment' | localize }}
        
        small.helper-text.invalid(
          v-if="$v.comment.$dirty && !$v.comment.required")
          | {{ 'Message_FieldEmpty' | localize }}
        small.helper-text.invalid( 
          v-else-if="$v.comment.$dirty && !$v.comment.maxLength")
          | {{ 'Message_ToManySymbols' | localize }}
      
      div
        button.btn.waves-effect.waves-light.auth__submit(type="submit") {{ 'send' | localize }}
          i.material-icons.right send
</template>


<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['idCurrentComment', 'idCurrentPost', 'uid'],
  data: () => ({
    comment: '',
    isOpen: false
  }),
  validations: {
    comment: { required, maxLength: maxLength(5000) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        if(this.$route.params.id) {
          const uid = this.$route.params.id
          if(uid) {
            const comment = await this.$store.dispatch('createAttachedComment', {
              dateComment: new Date().toJSON(),
              textComment: this.comment,
              idCurrentPost: this.idCurrentPost,
              idCurrentComment: this.idCurrentComment,
              uid
            })

            this.comment = ''
            this.$v.$reset()
            this.$message(localizeFilter('Comment_HasBeenCreated'))

            this.$emit('createdAttachedComment', comment)
            this.isOpen = false;
          }
        } else {
          const uid = this.uid
          if(uid) {
            const comment = await this.$store.dispatch('createAttachedComment', {
              dateComment: new Date().toJSON(),
              textComment: this.comment,
              idCurrentPost: this.idCurrentPost,
              idCurrentComment: this.idCurrentComment,
              uid
            })

            this.comment = ''
            this.$v.$reset()
            this.$message(localizeFilter('Comment_HasBeenCreated'))

            this.$emit('createdAttachedComment', comment)
            this.isOpen = false;
          }
        }
      } catch(e) {}
    }
  }
}
</script>
