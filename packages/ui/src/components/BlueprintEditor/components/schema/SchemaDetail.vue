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

        <!-- USER MODEL NOTICE -->
        <!-- TODO - break out into a separate component? -->
        <b-col class="pb-1" v-if="isUserModel">
          <b-alert show>
            <i class="fa fa-info-circle mr-2"></i>The <strong>User Model</strong> is included by default
            <br>
            <small>It comes pre-loaded with an <strong>Email</strong> attribute that cannot be removed</small>
          </b-alert>
        </b-col>

      </b-row>

    </b-col>

    <b-col lg=12>

      <SortableList
        scope="attribute"
        label="Attributes"
        info="Attributes define properties that can be assigned to a single model"
      />

      <AttributeNewModal />
      <AttributeEditModal />

      <DestroyModal scope="relation" label="Relation" />
      <DestroyModal scope="attribute" label="Attribute" />

      <hr>

      <SortableList
        scope="relation"
        label="Relations"
        info="Relations define associations between different models"
      />

      <RelationNewModal />
      <RelationEditModal />
      <!-- TODO - add RelationEdit modal here -->

    </b-col>

  </b-row>

</template>

<script>
import { mapGetters } from 'vuex'
import SortableList from '../SortableList'
import DestroyModal from '../DestroyModal'
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
