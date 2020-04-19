<template>
  <a
    id="projectEditPopover"
    @click="$store.dispatch('editor/project/edit')"
  >
    <i class="fas fa-pencil-alt" />
  </a>
</template>

<script>
export default {
  name: 'ProjectEditButton'
}
</script>

<style lang="sass" scoped>
  @import '../../../../sass/vendor.sass'

  #projectEditPopover
    transition: color 0.25s ease-in-out
    cursor: pointer
    color: $gray-500
    &:hover
      color: $blue
</style>
