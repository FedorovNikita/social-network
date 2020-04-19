<template lang="pug">
  div
    h4 Автор коммента {{ comment.idAuthor}}
    p Тект коммента {{ comment.textComment }}
    span Дата публикации {{ comment.dateComment }}
</template>

<script>
export default {
  props: ['comment']
}
</script>
