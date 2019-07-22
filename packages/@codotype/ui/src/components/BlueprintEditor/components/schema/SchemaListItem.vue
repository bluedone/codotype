<template>
  <li
    @click="selectModel(model)"
    :class="className"
  >

    <div class="row align-items-center d-flex flex-row justify-content-between">
      <span class="d-flex ml-2">
        {{ model.label }}
      </span>

      <i
        v-if="model.attributes && !model.attributes.length && model.relations && !model.relations.length"
        v-b-tooltip.hover.right
        class="fa fa-exclamation-circle text-warning mr-1"
        :title="`Schema requires at least one attribute or relation - empty schemas will be ignored`"
      />
    </div>

  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SchemaListItem',
  props: {
    model: {
      required: true
    }
  },
  computed: {
    isSelected () {
      return this.model.id === this.$store.getters['editor/schema/selectedModel/id']
    },
    tooltipTitle () {
      let attrLen = this.model.attributes.length
      let relLen = this.model.relations.length

      let attrPluralization = attrLen === 1 ? ' Attribute' : ' Attributes'
      let relPluralization = relLen === 1 ? ' Relation' : ' Relations'

      return `${attrLen} ${attrPluralization} and ${relLen} ${relPluralization}`
    },
    className () {
      let css = ['list-group-item', 'list-group-item-action']

      if (this.isSelected) {
        css.push('selected')
      }

      return css.join(' ')
    },
  },
  methods: mapActions({
    selectModel: 'editor/schema/selectModel'
  })
}
</script>

<style lang="sass" scoped>
@import '../../../../sass/vendor.sass'

li.list-group-item
  cursor: pointer
  border-left: 6px solid $gray-500 !important
  &.selected
    border-left: 6px solid #4582EC !important
    font-weight: bold

a.row.align-items-center
  text-decoration: none
</style>
