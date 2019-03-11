<template>
  <li class="list-group-item">
    <div class="row d-flex align-items-center">

      <!-- Handle for re-ordering attributes -->
      <div class="col-lg-1 text-left d-flex align-items-center">
        <i class="fa fa-lg fa-fw fa-bars mr-3" style='cursor: grab;'></i>
      </div>

      <!-- CLEANUP - get rid of hardcoded icons & labels -->
      <div class="col-lg-6">

        <!-- DEBUGGING INFLATED -->
        <!-- <pre>{{ inflated }}</pre> -->

        <!-- BELONGS_TO -->
        <span class="badge" v-if="item.type === 'BELONGS_TO'">
          <i class="fa fa-link mr-2" v-b-tooltip.hover.left title='Many To One'></i>
          <!-- {{inflated.alias.label}} -->
          <span class='text-warning'>Many </span><span class='text-info'>{{ selectedSchema.label_plural }}</span> <span class='text-warning'> To One </span><span class="text-info">{{ inflated.alias.label }}</span><span v-if="inflated.alias.label !== inflated.schema.label"> ({{inflated.schema.label}})</span>
        </span>

        <!-- HAS_ONE -->
        <span class="badge" v-if="item.type === 'HAS_ONE'">
          <i class="fa fa-link mr-2" v-b-tooltip.hover.left title='One To One'></i>
          <!-- {{inflated.alias.label}} -->
          <span class='text-warning'>One </span><span class='text-info'>{{ selectedSchema.label }}</span> <span class='text-warning'> To One </span><span class="text-info">{{ inflated.alias.label }}</span><span v-if="inflated.alias.label !== inflated.schema.label"> ({{inflated.schema.label}})</span>
        </span>

        <!-- HAS_MANY -->
        <span class="badge" v-if="item.type === 'HAS_MANY'">
          <i class="fa fa-link mr-2" v-b-tooltip.hover.left title='One To Many'></i>
          <!-- {{inflated.alias.label}} -->
          <span class='text-warning'>One </span><span class='text-info'>{{ selectedSchema.label }}</span> <span class='text-warning'> To Many </span><span class="text-info">{{ inflated.alias.label_plural }}</span><span v-if="inflated.alias.label !== inflated.schema.label"> ({{inflated.schema.label_plural}})</span>
        </span>

        <!-- OWNS_MANY -->
        <!-- <span class="badge" v-if="item.type === 'OWNS_MANY'"> -->
          <!-- <i class="fa fa-link mr-2" v-b-tooltip.hover.left title='Relation'></i> -->
          <!-- {{inflated.alias.label_plural}} -->
          <!-- <span class="badge badge-light ml-2">Referenced By Many</span> -->
          <!-- <span class="badge badge-light ml-2">one {{ selectedSchema.label }} to many {{ inflated.schema.label_plural }}</span> -->
        <!-- </span> -->

      </div>

      <div class="col-lg-3">
        <!-- REQUIRED -->
        <!-- <span class="badge" v-if="item.required" v-b-tooltip.hover.top title="Required"> -->
          <!-- <i class="fa fa-asterisk text-danger"></i> -->
        <!-- </span> -->
        <span class="badge badge-light" v-if="item.unique" v-b-tooltip.hover.top title="Unique">
          <i class="fa fa-snowflake-o text-dark"></i>
          Unique
        </span>

      </div>

      <div class="col-sm-2 text-right d-flex controls justify-content-end">
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

          <DestroyButton scope="relation" :modelId="item.id" />

        </b-dropdown>
      </div>

    </div>
  </li>
</template>

<!-- // // // //  -->
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { inflateRelation } from '@codotype/util/lib/inflate'
import DestroyButton from '../DestroyButton'

export default {
  props: {
    item: {
      required: true
    }
  },
  components: {
    DestroyButton
  },
  methods: {
    ...mapMutations({
      setEditModel: 'editor/schema/relation/collection/editModel',
      showEditModal: 'editor/schema/relation/modals/edit/showing',
    }),
    ...mapActions({
      removeModel: 'editor/schema/relation/collection/destroy',
      updateRelations: 'editor/schema/updateRelations'
    }),
    editModel () {
      this.setEditModel(this.item)
      this.showEditModal(true)
    },
    destroyModel () {
      this.removeModel(this.item.id)
      this.updateRelations()
    }
  },
  computed: {
    ...mapGetters({
      selectedSchema: 'editor/schema/selectedModel'
    }),
    // TODO - abstract this into the Vuex store
    inflated () {
      this.item.schema_id = this.selectedSchema.id
      return inflateRelation({
        relation: this.item,
        schemas: this.$store.getters['editor/schema/collection/items']
      })
    }
  }
}
</script>

<!-- CLEANUP - the following CSS is almost identical to what's in AttributeListItem -->
<style lang='sass' scoped>

  .list-group-item
    padding: 0.25rem 0.5rem

  .list-group-item:hover i.fa-bars
    opacity: 1

  .list-group-item:hover .controls
    opacity: 1

  i.fa-bars
    transition: opacity .25s ease-in
    opacity: 0

  .badge
    font-weight: 300
    padding: .3rem .3rem

    &.bordered
      border: 1px solid

  .controls
    transition: opacity .25s ease-in
    opacity: 0

</style>
