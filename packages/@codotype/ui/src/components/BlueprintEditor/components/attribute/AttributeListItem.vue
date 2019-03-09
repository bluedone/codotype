<template>
  <b-list-group-item>

    <!--  -->
    <!--  -->
    <!--  -->
    <div class="row d-flex align-items-center">

      <!-- Handle for re-ordering attributes -->
      <div class="col-lg-1 text-left d-flex align-items-center">
        <i class="fa fa-lg fa-fw fa-bars mr-3" style='cursor: grab;'></i>
        <!-- <i class="fa fa-fw text-primary fa-eye mr-3" v-if="item.order === 0"  v-b-tooltip.hover.left title='Leading attribute'></i> -->
      </div>
      <div class="col-lg-1 text-left d-flex align-items-center">
        <i class="fa fa-fw text-primary fa-eye mr-3" v-if="item.order === 0"  v-b-tooltip.hover.left title='Leading attribute'></i>
      </div>

      <div class="col-lg-4">
        <AttributeListItemLabel :item="item"/>
      </div>

      <div class="col-lg-2">
        <!-- REQUIRED -->
        <!-- <span class="badge" v-if="item.required" v-b-tooltip.hover.top title="Required"> -->
          <!-- <i class="fa fa-asterisk text-danger"></i> -->
        <!-- </span> -->

        <!-- UNIQUE Badge -->
        <span
          v-if="item.unique"
          title="Unique"
          class="badge badge-light"
          v-b-tooltip.hover.top
        >
          <i class="fas fa-snowflake text-dark"></i>
          Unique
        </span>

      </div>

      <div class="col-lg-4 text-right controls" v-if="item.locked">
        <b-badge
          variant="secondary"
          size="sm"
          v-b-tooltip.hover.left
          title="Locked attributes may not be edited or removed - they are required for correct baseline functionality."
        >
          <i class="fa fa-fw fa-lock"></i>
          Locked
        </b-badge>
      </div>

      <div class="col-lg-4 text-right controls" v-else>

        <b-button
          size="sm"
          title="Edit"
          variant="outline-warning"
          v-b-tooltip.hover.top
          @click="editModel(item)"
        >
          <i class="fas fa-fw fa-pencil-alt"></i>
        </b-button>

        <DestroyButton scope="attribute" :modelId="item.id" />

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
