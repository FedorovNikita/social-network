<template lang="pug">
  div
    | Вложенный коммент
    h4 Автор коммента {{ attachedComment.idAuthor}}
    p Тект коммента {{ attachedComment.textComment }}
    span Дата публикации {{ attachedComment.dateComment }}
    small id коммента {{ attachedComment.id }} {{attachedComment.idCurrentPost}} {{attachedComment.idCurrentComment}}
</template>

<script>
export default {
  props: ['attachedComment']
}
</script>
