<template>
  <b-row>
    <b-col lg=12>

      <!-- Step 1 - Select Datatype -->

      <!-- Step 2 - Define Properties & Validations -->
      <!-- <template v-else> -->
      <b-tabs lazy pills v-model="formStep">
        <b-tab title="Datatype">
          <AttributeDatatypeForm :model="model" />
        </b-tab>
        <b-tab title="Properties">
          <AttributePropertiesForm :model="model" />
        </b-tab>
        <b-tab title="Validations">
          <AttributeValidationsForm :model="model" />
        </b-tab>
      </b-tabs>
      <!-- </template> -->

    </b-col>
  </b-row>
</template>

<script>
  import { mapGetters } from 'vuex'
import AttributeDatatypeForm from './AttributeDatatypeForm'
import AttributePropertiesForm from './AttributePropertiesForm'
import AttributeValidationsForm from './AttributeValidationsForm'

export default {
  name: 'AttributeForm',
  components: {
    AttributeDatatypeForm,
    AttributePropertiesForm,
    AttributeValidationsForm
  },
  computed: {
    ...mapGetters({
      model: 'editor/schema/attribute/form/model'
    }),
    formStep () {
      return !this.model.datatype ? 0 : 1
    }
  }
}
</script>
