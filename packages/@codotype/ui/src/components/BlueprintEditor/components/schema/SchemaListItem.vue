<template>
  <li
    @click="selectModel(model)"
    :class="className"
  >

    <div class="row align-items-center">
      <div class="col-md-8">
        {{ model.label }}
      </div>

      <div class="col-md-4 text-right">

        <span
          class="badge badge-danger px-3"
          v-if="!model.attributes.length && !model.relations.length"
          v-b-tooltip.hover.right
          :title="`The ${model.label} Schema requires at least one attribute or relation`"
        >
          <i class="fa fa-exclamation"></i>
        </span>

        <template v-else>
          <span class="badge badge-dark" v-if="!model.attributes.length" v-b-tooltip.hover.left :title="model.attributes.length + (model.attributes.length === 1 ? ' Attribute' : ' Attributes')">
            <i class="fa fa-times mr-1"></i>
            0
          </span>

          <span class="badge badge-dark" v-else v-b-tooltip.hover.left :title="model.attributes.length + (model.attributes.length === 1 ? ' Attribute' : ' Attributes')">
            <i class="fa fa-tags mr-1"></i>
            {{ model.attributes.length }}
          </span>

          <span class="badge badge-dark ml-1" v-if="!model.relations.length" v-b-tooltip.hover.right :title="model.attributes.length + (model.attributes.length === 1 ? ' Relation' : ' Relations')">
            <i class="fa fa-times mr-1"></i>
            0
          </span>

          <span class="badge badge-dark ml-1" v-else v-b-tooltip.hover.right :title="model.relations.length + (model.relations.length === 1 ? ' Relation' : ' Relations')">
            <i class="fa fa-link mr-1"></i>
            {{ model.relations.length }}
          </span>
        </template>


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
