<template>
  <b-list-group-item>

    <!--  -->
    <!--  -->
    <!--  -->
    <div class="row d-flex align-items-center">

      <!-- Handle for re-ordering attributes -->
      <div class="col-sm-2 text-left d-flex align-items-center">
        <i class="fa fa-lg fa-fw fa-bars mr-3" style='cursor: grab;'></i>
        <i class="fa fa-fw text-primary fa-eye mr-3" v-if="item.order === 0"  v-b-tooltip.hover.left title='Leading attribute'></i>
      </div>

      <div class="col-sm-8">
        <AttributeListItemLabel :item="item"/>
        <!-- <span
          v-if="item.unique"
          title="Unique"
          class="badge badge-light"
          v-b-tooltip.hover.top
        >
          <i class="fas fa-snowflake text-dark"></i>
          Unique
        </span> -->
      </div>

      <div class="col-sm-2 text-right controls justify-content-end" v-if="item.locked">
        <b-badge
          variant="secondary"
          size="sm"
          v-b-tooltip.hover.right
          title="Email attribute may not be edited or removed"
        >
          <i class="fa fa-fw fa-lock"></i>
          <!-- Locked -->
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

  .list-group-item
    padding: 0.25rem 1rem

  .list-group-item:hover i.fa-bars
    opacity: 1

  .list-group-item:hover .controls
    opacity: 1

  i.fa-bars
    transition: opacity .25s ease-in
    opacity: 0

  .controls
    transition: opacity .25s ease-in
    opacity: 0

</style>
