<template>
  <li
    @click="selectModel(model)"
    :class="className"
  >

    <div class="row align-items-center">
      <div class="col-md-10">
        {{ model.label }}
      </div>

      <div class="col-md-2 text-right">

        <span
          v-if="!model.attributes.length && !model.relations.length"
          class="badge badge-danger px-2"
          v-b-tooltip.hover.right
          :title="`The ${model.label} Schema requires at least one attribute or relation`"
        >
          <i class="fa fa-exclamation"></i>
        </span>

        <!-- <span
          v-else
          class="badge badge-dark px-2"
          v-b-tooltip.hover.right
          :title="tooltipTitle"
        >
          <small>
            <i class="fa fa-tags mr-1"></i>
            {{ model.attributes.length }}
            <span class="mx-2">|</span>
            <i class="fa fa-link mr-1"></i>
            {{ model.relations.length }}
          </small>
        </span> -->

      </div>

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
        // css.push('active')
        css.push('list-group-item-primary')
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
  li.list-group-item
    cursor: pointer

  a.row.align-items-center
    text-decoration: none
</style>
