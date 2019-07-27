<template>
  <div class="row" id="schema-detail">
    <div class="col-lg-12">

      <b-row class="d-flex align-items-center">
        <b-col lg=12 class="d-flex justify-content-between">

          <span class='d-flex align-items-center'>

            <h5 class="mb-0 mr-2 d-flex">{{ model.label + ' Schema' }}</h5>

            <SchemaEditButton v-if="isEditable" />
            <HelpPopover
              v-if="isEditable"
              target="schemaEditPopover"
              placement="right"
              :triggers="['hover']"
              content='Edit Schema'>
            </HelpPopover>

          </span>

          <SchemaDestroyButton :hidden="!isRemovable" />
        </b-col>

        <SchemaEditModal v-if="isEditable" />
        <SchemaDestroyModal :label="model.label" v-if="isRemovable" />
      </b-row>

      <b-row class='mb-0'>
        <b-col lg=12>
          <small class="text-muted">
            Describe the <strong>{{ model.label }} Schema</strong> with <strong>Attributes</strong> and <strong>Relations</strong>
            <template v-if="model.source === 'GENERATOR'">
              <span class="text-success"> (Supplied by <strong>{{ generator.label }} generator)</strong></span>
            </template>
          </small>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col sm=12 md=6 lg=6>

          <SortableList
            :locked="model.locked"
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
            :locked="model.locked"
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
      generator: 'generator/selectedModel',
      schemas: 'editor/schema/collection/items'
    }),
    isEditable () {
      // TOOD - use SCHEMA_SOURCE_GENERATOR
      return this.model.source !== 'GENERATOR'
    },
    isRemovable () {
      return this.model.removable
    }
  }
}
</script>

<style lang='sass' scoped>
  // TODO - remove, testing for reverse relations
  li.list-group-item
    padding: 0.25rem 0.5rem
</style>
