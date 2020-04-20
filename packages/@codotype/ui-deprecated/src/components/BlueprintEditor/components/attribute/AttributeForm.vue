<template>
  <b-row>
    <b-col lg=12>
      <b-tabs lazy pills v-model="formStep">
        <b-tab title="Datatype">
          <AttributeDatatypeForm :generator="generator" :model="model" />
        </b-tab>
        <b-tab title="Properties">
          <AttributePropertiesForm :model="model" />
        </b-tab>
        <b-tab title="Default & Description">
          <AttributeValidationsForm :model="model" />
        </b-tab>
      </b-tabs>
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
  data () {
    return {
      step: -1
    }
  },
  computed: {
    ...mapGetters({
      generator: 'generator/selectedModel',
      model: 'editor/schema/attribute/form/model'
    }),
    formStep: {
      get () {
        if (this.step === -1) {
          return !this.model.datatype ? 0 : 1
        } else {
          return this.step
        }
      },
      set (val) {
        this.step = val
      }
    }
  }
}
</script>
