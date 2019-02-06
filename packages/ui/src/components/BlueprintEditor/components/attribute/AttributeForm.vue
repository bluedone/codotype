<template>
  <b-row>
    <b-col lg=12>

      <!-- Step 1 - Select Datatype -->
      <AttributeDatatypeForm v-model="model.datatype" v-if="formStep" />

      <!-- Step 2 - Define Properties & Validations -->
      <template v-else>
        <b-tabs lazy pills>
          <b-tab title="Properties" active>
            <AttributePropertiesForm :model="model" />
          </b-tab>
          <b-tab title="Validations" >
            <AttributeValidationsForm :model="model" />
          </b-tab>
        </b-tabs>
      </template>

    </b-col>
  </b-row>
</template>

<script>
import AttributeDatatypeForm from './AttributeDatatypeForm'
import AttributePropertiesForm from './AttributePropertiesForm'
import AttributeValidationsForm from './AttributeValidationsForm'

export default {
  name: 'AttributeForm',
  props: {
    model: {
      required: true
    }
  },
  components: {
    AttributeDatatypeForm,
    AttributePropertiesForm,
    AttributeValidationsForm
  },
  computed: {
    formStep () {
      return !this.model.datatype
    }
  }
}
</script>
