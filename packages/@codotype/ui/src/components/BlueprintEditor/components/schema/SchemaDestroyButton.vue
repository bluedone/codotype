<template>
  <b-button
    v-if="hasReverseRelations"
    class="destroy-button hasReverse"
    variant="link"
    v-b-tooltip.hover.right
    title='Cannot delete Schema with incoming relations'
  >
    <i class="far fa-fw fa-trash-alt"></i>
  </b-button>
  <b-button
    v-else
    id="schema-destroy-button"
    class="destroy-button"
    variant="link"
    @click="$store.commit('editor/schema/modals/destroy/showing', true)"
  >
    <i class="far fa-fw fa-trash-alt"></i>
  </b-button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SchemaDestroyButton',
  computed: {
    ...mapGetters({
      inflatedSelectedModel: 'editor/schema/inflatedSelectedModel'
    }),
    hasReverseRelations() {
      return this.inflatedSelectedModel.reverse_relations.length > 0
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../../../sass/vendor.sass'

  .destroy-button
    transition: color 0.25s ease-in-out
    cursor: pointer
    color: $gray-500
    &.hasReverse
      &:hover
        color: $gray-500 !important
        cursor: not-allowed
    &:hover
      color: $red
</style>
