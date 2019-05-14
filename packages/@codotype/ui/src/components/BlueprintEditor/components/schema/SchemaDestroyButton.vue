<template>
  <a
    id="schema-destroy-button"
    @click="$store.commit('editor/schema/modals/destroy/showing', true)"
  >
    <i class="far fa-fw fa-trash-alt"></i>
  </a>
</template>

<script>
export default {
  name: 'SchemaDestroyButton'
}
</script>

<style lang="sass" scoped>
  @import '../../../../sass/vendor.sass'

  a#schema-destroy-button
    transition: color 0.25s ease-in-out
    cursor: pointer
    color: $gray-500
    &:hover
      color: $red
</style>
