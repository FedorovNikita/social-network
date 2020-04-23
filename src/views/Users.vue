<template lang="pug">
  div.container-component.users
    User(v-for="user in users" :key="user.id" :user="user")
</template>

<script>
import firebase from 'firebase/app'
import User from '@/components/User'

export default {
  data: () => ({
    users: [] 
  }),
  metaInfo() {
    return {
      title: this.$title('Menu_users')
    }
  },
  async mounted() {
    const allUser = (await firebase.database().ref(`/users`).once('value')).val()
    const allUserId = Object.keys(allUser).map(key => ({...allUser[key], id: key}))
    this.users = allUserId
  },
  components: {
    User
  }
}
</script>
