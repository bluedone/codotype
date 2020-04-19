<template>
  <span>
    <!-- <HelpPopover
      v-if="!hasReverseRelations"
      target="schema-destroy-button"
      placement="left"
      :triggers="[]"
      content="Remove Schema"
    /> -->
    <b-button
      v-if="hidden"
      class="destroy-button disabled invisible"
      variant="link"
      disabled
    >
      <i class="far fa-fw fa-trash-alt" />
    </b-button>
    <b-button
      v-else-if="hasReverseRelations"
      class="destroy-button hasReverse"
      variant="link"
      v-b-tooltip.hover.left
      title='Cannot delete Schema with incoming relations'
    >
      <i class="far fa-fw fa-trash-alt" />
    </b-button>
    <b-button
      v-else
      id="schema-destroy-button"
      class="destroy-button"
      variant="link"
      v-b-tooltip.hover.left
      title='Remove Schema'
      @click="$store.commit('editor/schema/modals/destroy/showing', true)"
    >
      <i class="far fa-fw fa-trash-alt" />
    </b-button>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import HelpPopover from '../../../HelpPopover'

export default {
  name: 'SchemaDestroyButton',
  props: {
    hidden: {
      type: Boolean
    }
  },
  components: {
    HelpPopover
  },
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
