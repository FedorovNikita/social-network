<template lang="pug">
  .container-component
    h3 {{ 'edit' | localize }}

    form.form(@submit.prevent="submitHandler")
      .input-field
        input#userName(
          type="text" 
          v-model="firstName"
          :class="{ invalid: $v.firstName.$dirty && !$v.firstName.required }")
        label(for="userName") {{ 'Name' | localize }}
        small.helper-text.invalid(
          v-if="$v.firstName.$dirty && !$v.firstName.required")
          | {{ 'Message_EnterName' | localize }}

      .input-field
        input#userName(
          type="text" 
          v-model="lastName"
          :class="{ invalid: $v.lastName.$dirty && !$v.lastName.required }")
        label(for="userName") {{ 'Surname' | localize }}
        small.helper-text.invalid(
          v-if="$v.lastName.$dirty && !$v.lastName.required")
          | {{ 'Message_EnterSurname' | localize }}

      .input-field
        input#dateBirth(
          type="date"
          min="1902-01-01" 
          max="2006-12-12"
          v-model="dateBirth"
          :class="{ invalid: $v.dateBirth.$dirty && !$v.dateBirth.required }") 
        label(for="dateBirth") {{ 'dateOfBirth' | localize }}
        small.helper-text.invalid( 
          v-if="$v.dateBirth.$dirty && !$v.dateBirth.required")
          | {{ 'Message_FieldEmpty' | localize }}
      .switch
        label
          | English
          input(type="checkbox" v-model="isRuLocale")
          span.lever
          | Русский
      .input-field.setting__user-photo
        .file-field.input-field
          .btn
            span {{ 'changePhoto' | localize }}
            input(type="file" @change="handleFileUpload"  accept="image/{png, jpg, webp}")
          .file-path-wrapper
            input.file-path.validate(type="text")
        div.setting__user-image
          img(:src="getUrl")  

      button.btn.waves-effect.waves-light.setting__btn(type="submit") {{ 'update' | localize }}
        i.material-icons.right near_me
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'settings',
  data: () => ({
    firstName: '',
    lastName: '',
    dateBirth: '',
    isRuLocale: true
  }),
  validations: {
    firstName: { required },
    lastName: { required },
    dateBirth: { required }
  },
  methods: {
    async handleFileUpload(e) {
      let file = e.target.files[0];
      await this.$store.dispatch('sendFile', file)
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('updateInfo', {
          firstName: this.firstName,
          lastName: this.lastName,
          dateBirth: this.dateBirth,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
        this.$message(localizeFilter('UpdateSuccess'))
      } catch(e) {}
    }

  },
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.firstName = this.info.firstName
    this.lastName = this.info.lastName
    this.dateBirth = this.info.dateBirth
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    }, 0);
  },
  computed: {
    ...mapGetters(['info']),
    getUrl() {
      return this.$store.getters.info.urlImg
    }
  }
}
</script>
