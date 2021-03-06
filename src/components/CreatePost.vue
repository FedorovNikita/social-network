<template lang="pug">
  .container-component
    form(@submit.prevent="submitHandler" ref="form" )
      .input-field
        textarea.materialize-textarea(
          v-model="description" 
          id="description"
          @click="btnIsOpen = true")
        label(for="description") {{ 'WhatsNews' | localize }}
        span.character-counter( 
          style="float: right; font-size: 12px;") {{ description.length }}/{{ $v.description.$params.maxLength.max }}
        small.helper-text.invalid(
          v-if="$v.description.$dirty && !$v.description.required")
          | {{ 'Message_FieldEmpty' | localize }}
        small.helper-text.invalid( 
          v-else-if="$v.description.$dirty && !$v.description.maxLength")
          | {{ 'Message_ToManySymbols' | localize }}

      <iframe v-if="videoIsOpen" width="100%" height="400" :src="getSrcVideo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      
      .input-field.post__user-photo(v-if="btnIsOpen")
        .input-field.link-video
          input(v-model="video" id="first_name" type="text" class="validate" @mouseleave="handleVideoUpload")
          label(for="first_name") {{ 'LinkYoutube' | localize }}
        div
          img(:src="getSrc")
        .file-field.input-field.post__btn-wrap
          .file-path-wrapper
            input.file-path.validate(type="text")
          .btn.post__submit
            span {{ 'AddAnImage' | localize }}
            input(type="file" @change="handleFileUpload" accept="image/{png, jpg, webp}")
          button.btn.waves-effect.waves-light.post__submit(type="submit") {{ 'Post' | localize }}
            i.material-icons.right send
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  data: () => ({
    description: '',
    video: '',
    srcVideo: '',
    btnIsOpen: false,
    videoIsOpen: false
  }),
  validations: {
    description: { required, maxLength: maxLength(15895) }
  },
  methods: {
    async handleFileUpload(e) {
      let file = e.target.files[0];
      await this.$store.dispatch('sendPostFile', file)
    },
    handleVideoUpload() {
      if(this.video.includes('https://www.youtube.com/watch')) {
        let urlSlice = this.video.split('v=')
        this.srcVideo = urlSlice[urlSlice.length - 1]        
        this.$store.commit('setPostVideo', this.srcVideo)
        this.videoIsOpen = true
      }
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const uid = this.$route.params.id
        if(uid) {
          const post = await this.$store.dispatch('createPost', {
            datePost: new Date().toJSON(),
            description: this.description,
            uid
          })
          this.description = ''
          this.video = ''
          this.$v.$reset()
          this.$refs.form.reset()
          this.$store.commit('clearPost')
          this.$message(localizeFilter('Post_HasBeenCreated'))
          this.$emit('created', post)
          this.btnIsOpen = false
          this.videoIsOpen = false
        }
      } catch(e) {}

    }
  },
  computed: {
    getSrc() {
      return this.$store.getters.post.urlImg
    },
    getSrcVideo() {
      if(this.$store.getters.post.urlVideo) {
        let src = 'https://www.youtube.com/embed/' + this.$store.getters.post.urlVideo
        return src
      }
    }
  },
}
</script>
