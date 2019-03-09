<template>

  <b-row>

    <b-col lg=12>

      <b-row class="d-flex align-items-center">

        <b-col lg=7>
          <h4 class="mb-0 d-flex">

            {{ model.label + ' Model' }}

            <SchemaEditButton v-if="!isUserModel" />

            <HelpPopover
              v-if="!isUserModel"
              target="schemaEditPopover"
              placement="right"
              content='Edit Model Name'>
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
            content="Remove Model">
          </HelpPopover>

          <!-- TODO - Edit Schema Modal GOES HERE -->

        </b-col>

        <b-col lg=12 class="pb-1">
          <small class="text-muted">
            Define <strong>Attributes</strong> and <strong>Relations</strong> that describe a single {{ model.label }} model
          </small>
        </b-col>

      </b-row>

    </b-col>

    <b-col lg=12>

      <SortableList
        scope="attribute"
        label="Attributes"
        title="No Attributes added yet"
        icon="https://res.cloudinary.com/codotype/image/upload/v1552157187/codotype-icons/frequency-table.png"
        info="Attributes define properties that can be assigned to a single model"
      />

      <AttributeNewModal />
      <AttributeEditModal />
      <DestroyModal scope="attribute" label="Attribute" />


      <hr>

      <SortableList
        scope="relation"
        label="Relations"
        title="No Relations added yet"
        icon="https://res.cloudinary.com/codotype/image/upload/v1552157160/codotype-icons/complexity.png"
        info="Relations define associations between different models"
      />

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
    RelationEditModal
  },
  computed: {
    ...mapGetters({
      model: 'editor/schema/selectedModel'
    }),
    isUserModel () {
      return this.model.identifier === 'user'
    }
  }
}
</script>
