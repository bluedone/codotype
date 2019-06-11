<template>
  <div class="row" id="schema-detail">
    <div class="col-lg-12">

      <b-row class="d-flex align-items-center">
        <b-col lg=12 class="d-flex justify-content-between">

          <span class='d-flex align-items-center'>

            <h5 class="mb-0 mr-2 d-flex">{{ model.label + ' Schema' }}</h5>

            <SchemaEditButton v-if="!isLocked" />
            <HelpPopover
              v-if="!isLocked"
              target="schemaEditPopover"
              placement="right"
              :triggers="['hover']"
              content='Edit Schema'>
            </HelpPopover>

          </span>

          <SchemaDestroyButton v-if="!isLocked && !isRemovable" />
          <HelpPopover
            v-if="!isLocked"
            target="schema-destroy-button"
            placement="left"
            :triggers="['hover']"
            content="Remove Schema">
          </HelpPopover>

        </b-col>

        <SchemaEditModal v-if="!isLocked" />
        <SchemaDestroyModal :label="model.label" v-if="!locked && !isRemovable" />
      </b-row>

      <b-row class='mb-0'>
        <b-col lg=12>
          <small class="text-muted">
            Describe the <strong>{{ model.label }} Schema</strong> with <strong>Attributes</strong> and <strong>Relations</strong>
          </small>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col sm=12 md=6 lg=6>

          <SortableList
            :locked="isLocked"
            scope="attribute"
            label="Attributes"
            title="No Attributes added yet"
            info="Attributes define properties on this Schema"
          />

          <br>

          <SchemaPreview />

          <AttributeNewModal />
          <AttributeEditModal />
          <DestroyModal scope="attribute" label="Attribute" />

        </b-col>

        <b-col sm=12 md=6 lg=6 class="pl-md-0">

          <SortableList
            :locked="isLocked"
            scope="relation"
            label="Relations"
            title="No Relations added yet"
            info="Relations define references to other Schemas"
          />

          <br>

          <SchemaIncomingRelations/>


          <RelationNewModal />
          <RelationEditModal />
          <DestroyModal scope="relation" label="Relation" />

        </b-col>
      </b-row>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SortableList from '../SortableList'
import DestroyModal from '../DestroyModal'
import SchemaEditButton from './SchemaEditButton'
import SchemaEditModal from './SchemaEditModal'
import SchemaDestroyButton from './SchemaDestroyButton'
import SchemaDestroyModal from './SchemaDestroyModal'
import SchemaIncomingRelations from './SchemaIncomingRelations'
import SchemaPreview from './SchemaPreview'
import AttributeNewModal from '../attribute/AttributeNewModal'
import AttributeEditModal from '../attribute/AttributeEditModal'
import RelationNewModal from '../relation/RelationNewModal'
import RelationEditModal from '../relation/RelationEditModal'
import HelpPopover from '../../../HelpPopover'

export default {
  name: 'SchemaDetail',
  components: {
    SortableList,
    HelpPopover,
    DestroyModal,
    SchemaEditButton,
    SchemaEditModal,
    SchemaDestroyButton,
    SchemaDestroyModal,
    AttributeNewModal,
    AttributeEditModal,
    RelationNewModal,
    RelationEditModal,
    SchemaIncomingRelations,
    SchemaPreview
  },
  computed: {
    ...mapGetters({
      model: 'editor/schema/selectedModel',
      schemas: 'editor/schema/collection/items'
    }),
    isLocked () {
      return this.model.locked
    },
    isRemovable () {
      return this.model.identifier === 'user'
    }
  }
}
</script>

<style lang='sass' scoped>
  // TODO - remove, testing for reverse relations
  li.list-group-item
    padding: 0.25rem 0.5rem
</style>
