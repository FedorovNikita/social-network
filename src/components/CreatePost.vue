<template lang="pug">
  .container-component
    form(@submit.prevent="submitHandler" ref="form" )
      .input-field
        textarea.materialize-textarea(
          v-model="description" 
          id="description"
          @click="btnIsOpen = !btnIsOpen")
        label(for="description") Что у Вас нового?
        span.character-counter( 
          style="float: right; font-size: 12px;") {{ description.length }}/{{ $v.description.$params.maxLength.max }}
        small.helper-text.invalid(
          v-if="$v.description.$dirty && !$v.description.required")
          | Поле не должно быть пустым
        small.helper-text.invalid( 
          v-else-if="$v.description.$dirty && !$v.description.maxLength")
          | Слишком много символов
      .input-field.post__user-photo(v-if="btnIsOpen")
        div
          img(:src="getSrc")
        .file-field.input-field.post__btn-wrap
          .file-path-wrapper
            input.file-path.validate(type="text")
          .btn.post__submit
            span Добавить картинку
            input(type="file" @change="handleFileUpload" accept="image/{png, jpg, webp}")
          button.btn.waves-effect.waves-light.post__submit(type="submit") Опубликовать
            i.material-icons.right send
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    description: '',
    btnIsOpen: false
  }),
  validations: {
    description: { required, maxLength: maxLength(15895) }
  },
  methods: {
    async handleFileUpload(e) {
      let file = e.target.files[0];
      await this.$store.dispatch('sendPostFile', file)
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
          this.$v.$reset()
          this.$refs.form.reset()
          this.$store.commit('clearPost')
          this.$message('Новый пост успешно создан')
          this.$emit('created', post)
          this.btnIsOpen = false
        }
      } catch(e) {}

    }
  },
  computed: {
    getSrc() {
      return this.$store.getters.post.urlImg
    }
  },
}
</script>
