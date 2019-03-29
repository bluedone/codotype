<template>
  <b-list-group-item>

    <div class="row d-flex align-items-center">

      <!-- Handle for re-ordering attributes -->
      <div class="col-sm-2 text-left d-flex align-items-center">
        <i class="fa fa-lg fa-fw fa-sort mr-3"></i>
        <i class="fa fa-fw text-primary fa-eye" v-if="item.order === 0"  v-b-tooltip.hover.left title='Leading attribute'></i>
      </div>

      <div class="col-sm-8">
        <AttributeListItemLabel :item="item"/>
      </div>

      <div class="col-sm-2 text-right controls justify-content-end" v-if="item.locked">
        <b-badge
          variant="secondary"
          v-b-tooltip.hover.right
          title="Email attribute may not be edited or removed"
        >
          <i class="fa fa-fw fa-lock"></i>
        </b-badge>
      </div>

      <div class="col-sm-2 text-right d-flex controls justify-content-end" v-else>
        <b-dropdown
          right
          no-caret
          size="sm"
          variant="light"
          toggle-class='rounded px-0 py-0 d-flex'
        >
          <template slot="button-content">
            <i class="fa fa-fw fa-ellipsis-h"></i>
          </template>

          <b-dropdown-item-button @click="editModel(item)">
            <i class="fas fa-fw fa-pencil-alt"></i>
            Edit
          </b-dropdown-item-button>

          <DestroyButton scope="attribute" :modelId="item.id" />

        </b-dropdown>
      </div>


    </div>

  </b-list-group-item>
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

  .list-group-item:hover i.fa-sort
    opacity: 1

  .list-group-item:hover .controls
    opacity: 1

  i.fa-sort
    cursor: grab
    transition: opacity .25s ease-in
    transition: color .15s ease-in
    opacity: 0
    color: $gray-500
    &:hover
      color: $gray-800

  .controls
    transition: opacity .25s ease-in
    opacity: 0

</style>
