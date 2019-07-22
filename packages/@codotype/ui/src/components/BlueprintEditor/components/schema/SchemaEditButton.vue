<template>
  <a
    id="schemaEditPopover"
    @click="$store.dispatch('editor/schema/editModel')"
  >
    <i class="fas fa-pencil-alt" />
  </a>
</template>

<script>
export default {
  name: 'SchemaEditButton'
}
</script>

<style lang="sass" scoped>
  @import '../../../../sass/vendor.sass'

  #schemaEditPopover
    transition: color 0.25s ease-in-out
    cursor: pointer
    color: $gray-500
    &:hover
      color: $blue
</style>
