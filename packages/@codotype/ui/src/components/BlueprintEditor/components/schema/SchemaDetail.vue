<template>
  <b-row>

    <b-col lg=12>

      <b-row class="d-flex align-items-center">

        <b-col lg=7>
          <h4 class="mb-0 d-flex">

            {{ model.label + ' Schema' }}

            <SchemaEditButton v-if="!isUserModel" />

            <HelpPopover
              v-if="!isUserModel"
              target="schemaEditPopover"
              placement="right"
              :triggers="['hover']"
              content='Edit Schema'>
            </HelpPopover>

          </h4>

          <!-- <UserSchemaInfo v-if="isUserModel" /> -->

          <SchemaEditModal v-if="!isUserModel" />

        </b-col>

        <b-col lg=5 class="d-flex align-items-center justify-content-end">

          <SchemaDestroyButton v-if="!isUserModel" />
          <SchemaDestroyModal :label="model.label" />

          <HelpPopover
            v-if="!isUserModel"
            target="schema-destroy-button"
            placement="left"
            :triggers="['hover']"
            content="Remove Schema">
          </HelpPopover>

        </b-col>

        <b-col lg=12 class="pb-1">
          <small class="text-muted">
            Describe the <strong class="text-primary">{{ model.label }} Schema</strong> with <strong>Attributes</strong> and <strong>Relations</strong>
          </small>
        </b-col>

      </b-row>

    </b-col>

    <b-col sm=12 md=6 lg=6>

      <SortableList
        scope="attribute"
        label="Attributes"
        title="No Attributes added yet"
        icon="https://res.cloudinary.com/codotype/image/upload/v1552157187/codotype-icons/frequency-table.png"
        info="Attributes define properties on this Schema"
      />

      <hr>

      <SchemaPreview />

      <AttributeNewModal />
      <AttributeEditModal />
      <DestroyModal scope="attribute" label="Attribute" />

    </b-col>

    <b-col sm=12 md=6 lg=6 class="pl-md-0">

      <SortableList
        scope="relation"
        label="Relations"
        title="No Relations added yet"
        icon="https://res.cloudinary.com/codotype/image/upload/v1552157160/codotype-icons/complexity.png"
        info="Relations define references to other Schemas"
      />

      <hr>

      <SchemaIncomingRelations/>


      <RelationNewModal />
      <RelationEditModal />
      <DestroyModal scope="relation" label="Relation" />

    </b-col>

  </b-row>

</template>

<script>
import { mapGetters } from 'vuex'
import SortableList from '../SortableList'
import DestroyModal from '../DestroyModal'
import UserSchemaInfo from './UserSchemaInfo'
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
    UserSchemaInfo,
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
    isUserModel () {
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
