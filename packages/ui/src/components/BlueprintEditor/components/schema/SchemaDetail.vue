<template>

  <b-row>

    <b-col lg=12>

      <b-row class="d-flex align-items-center">

        <b-col lg=7>
          <h4 class="mb-0 d-flex">

            {{ model.label + ' Model' }}
            <SchemaEditButton v-if="!isUserModel" />

          </h4>
        </b-col>

        <b-col lg=5 class="d-flex align-items-center justify-content-end">

          <SchemaDestroyButton v-if="!isUserModel" />
          <SchemaDestroyModal :label="model.label" />

          <!-- Edit Schema Modal GOES HERE -->

        </b-col>

        <b-col lg=12 class="pb-1">
          <small class="text-muted">
            {{ 'Define attributes and relations that describe a single ' + model.label + ' model' }}
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

      <hr>

      <SortableList
        scope="relation"
        label="Relations"
        info="Relations define associations between different models"
      />

      <RelationNewModal />

    </b-col>

  </b-row>

</template>

<script>
import { mapGetters } from 'vuex'
import SortableList from '../SortableList'
import SchemaEditButton from './SchemaEditButton'
import SchemaDestroyButton from './SchemaDestroyButton'
import SchemaDestroyModal from './SchemaDestroyModal'
import AttributeNewModal from '../attribute/AttributeNewModal'
import AttributeEditModal from '../attribute/AttributeEditModal'
import RelationNewModal from '../relation/RelationNewModal'

export default {
  name: 'SchemaDetail',
  components: {
    SortableList,
    SchemaEditButton,
    SchemaDestroyButton,
    SchemaDestroyModal,
    AttributeNewModal,
    AttributeEditModal,
    RelationNewModal
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
