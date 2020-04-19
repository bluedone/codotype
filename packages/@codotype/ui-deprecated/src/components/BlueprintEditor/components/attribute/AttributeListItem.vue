<template>
  <li class="list-group-item">

    <div class="row d-flex align-items-center">

      <div class="col-sm-10">
        <AttributeListItemLabel :item="item" :index="index"/>
      </div>

      <div class="col-sm-2 text-right controls justify-content-end" v-if="item.locked">
        <b-badge
          variant="secondary"
          v-b-tooltip.hover.right
          title="Attribute may not be edited or removed"
        >
          <i class="fa fa-fw fa-lock" />
        </b-badge>
      </div>

      <div class="col-sm-2 text-right controls" v-else>
        <b-dropdown
          right
          no-caret
          size="sm"
          variant="light"
          toggle-class='rounded px-0 py-0 d-flex'
          boundary="viewport"
        >
          <template slot="button-content">
            <i class="fa fa-fw fa-ellipsis-h" />
          </template>

          <b-dropdown-item-button @click="editModel(item)">
            <i class="fas fa-fw fa-pencil-alt" />
            Edit
          </b-dropdown-item-button>

          <DestroyButton scope="attribute" :modelId="item.id" />

        </b-dropdown>
      </div>


    </div>

  </li>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import AttributeListItemLabel from './AttributeListItemLabel'
import DestroyButton from '../DestroyButton'

export default {
  name: 'AttributeListItem',
  props: {
    item: {
      required: true
    },
    index: {
      required: true
    }
  },
  components: {
    AttributeListItemLabel,
    DestroyButton
  },
  methods: mapActions({
    editModel: 'editor/schema/attribute/editModel'
  })
}
</script>

<style lang='sass' scoped>
@import '../../../../sass/vendor.sass'

.list-group-item
  padding: 0.25rem 0.5rem
  border-left: 3px solid $gray-500 !important
  cursor: grab

.list-group-item:hover i.fa-equals
  opacity: 1

.list-group-item:hover .controls
  opacity: 1

.controls
  transition: opacity .25s ease-in
  opacity: 0
</style>
