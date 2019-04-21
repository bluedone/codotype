<template>
  <li class="list-group-item">
      <div class="row d-flex align-items-center">

      <!-- CLEANUP - get rid of hardcoded icons & labels -->
      <div class="col-lg-10">

        <i class="fa fa-lg fa-fw fa-equals mr-2" style='cursor: grab;'></i>

        <!-- BELONGS_TO -->
        <small v-if="item.type === 'BELONGS_TO'">
          <span class='text-primary'>Many <strong>{{ selectedSchema.label_plural }}</strong><i class="fa fa-arrow-right text-primary mx-1"></i></span><span class="text-info">One <strong>{{ inflated.alias.label }}</strong></span><span v-if="inflated.alias.label !== inflated.schema.label"> ({{inflated.schema.label}})</span>
        </small>

        <!-- HAS_ONE -->
        <small v-if="item.type === 'HAS_ONE'">
          <span class='text-primary'>One <strong>{{ selectedSchema.label }}</strong></span><i class="fa fa-arrow-right text-primary mx-1"></i><span class="text-info">One <strong>{{ inflated.alias.label }}</strong></span><span v-if="inflated.alias.label !== inflated.schema.label"> ({{inflated.schema.label}})</span>
        </small>

        <!-- HAS_MANY -->
        <small v-if="item.type === 'HAS_MANY'">
          <span class='text-primary'>One <strong>{{ selectedSchema.label }}</strong><i class="fa fa-arrow-right mx-1"></i></span> <span class='text-info'>Many <strong>{{ inflated.alias.label_plural }}</strong></span><span v-if="inflated.alias.label !== inflated.schema.label"> ({{inflated.schema.label_plural}})</span>
        </small>

      </div>

      <div class="col-sm-2 text-right d-flex controls justify-content-end">
        <b-dropdown
          right
          no-caret
          size="sm"
          variant="light"
          toggle-class='rounded px-0 py-0 d-flex'
          boundary="viewport"
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
  @import '../../../../sass/vendor.sass'

  .list-group-item
    padding: 0.25rem 0.5rem

  .list-group-item:hover i.fa-equals
    opacity: 1

  .list-group-item:hover .controls
    opacity: 1

  i.fa-equals
    cursor: grab
    transition: opacity .25s ease-in
    transition: color .15s ease-in
    opacity: 0
    font-size: 90%
    color: $gray-500
    &:hover
      color: $gray-800

  .badge
    font-weight: 300
    font-size: 70%
    padding: .3rem .3rem
    strong
      font-weight: 700

    &.bordered
      border: 1px solid

  .controls
    transition: opacity .25s ease-in
    opacity: 0

</style>
