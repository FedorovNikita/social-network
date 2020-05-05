<template lang="pug">
  div
    div.user-info(:val="getUid")
      .container-component.user-info__image
        img(:src="userInfo.urlImg")
      .container-component.user-info__desc
        h3.user-info__name {{ userInfo.firstName }} {{ userInfo.lastName }}
        table
          tr.user-info__table-row
            td.user-info__first-column.user-info__date {{ 'dateBirth' | localize }}
            td.user-info__date {{ userInfo.dateBirth | date('date') }}

    CreatePost(@created="addNewPost")

    Loader(v-if="loading")
    p(v-else-if="!posts.length") На стене пока нет ни одной записи
    div(v-else)
      Post(v-for="post in posts.slice().reverse()" :key="post.id"  :post="post")
</template>

<script>
import CreatePost from '@/components/CreatePost'
import Post from '@/components/Post'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'profile',
  metaInfo() {
    return {
      title: this.$title('Profile')
    }
  },
  data: () => ({
    posts: [],
    userInfo: [],
    loading: true
  }),
  async mounted() {
    this.userInfo = await this.$store.dispatch('fetchUser', {
      idUser: this.$route.params.id
    })
    this.posts = await this.$store.dispatch('fetchPosts', {
      uid: this.$route.params.id
    })
    this.loading = false
  },
  components: {
    CreatePost, Post
  },
  methods: {
    addNewPost(post) {
      this.posts.push(post)
    }
  },
  computed: {
    async getUid() {
      if (this.$route.params.id !== this.userInfo.uid ) {
        this.userInfo = await this.$store.dispatch('fetchUser', {
          idUser: this.$route.params.id
        })
        this.posts = await this.$store.dispatch('fetchPosts', {
          uid: this.$route.params.id
        })
      }
    }
  }
}
</script>
