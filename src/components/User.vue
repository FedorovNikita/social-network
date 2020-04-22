<template lang="pug">
  div.users__wrap
    router-link(:to="`/profile/${user.id}`")
      img.users__image(:src="user.info.urlImg")
      p.users__name {{user.info.firstName}} {{user.info.lastName}}

</template>

<script>
export default {
  props: ['user'],
}
</script>
