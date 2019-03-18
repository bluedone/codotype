<template>
  <b-row class="mt-2">

    <b-col lg="12">
      <p class="lead mb-0">Attribute Properties</p>
    </b-col>

    <b-col lg="6" sm="12">
      <FormInput
        label="Label"
        :focus="true"
        :required="true"
        placeholder="Label"
        v-model="attributeLabel"
        example="Example: 'Last Name'"
        help="The human-readable name for this attribute."
      />
    </b-col>

    <b-col lg="6" sm="12">
      <FormInput
        label="Field Name"
        :required="true"
        placeholder="Field Name"
        v-model="model.identifier"
        example="Example: 'last_name'"
        help="Lowercase, no spaces."
      />
    </b-col>

    <b-col sm="12">
      <FormInput
        label="Description"
        placeholder="Description"
        v-model="model.help"
        example="Example: 'The Last Name of the individual'"
        help="A description of this attribute."
      />
    </b-col>

  </b-row>
</template>

<script>
import DATATYPE_META from '@codotype/types/lib/meta'
import FormInput from '../../../FormInput'

export default {
  props: ['model'],
  components: {
    FormInput
  },
  computed: {
    datatypeLabel () {
      let datatype = DATATYPE_META[this.model.datatype]
      return datatype.label
    },
    attributeLabel: {
      get () {
        return this.model.label
      },
      set (label) {
        this.$store.dispatch('editor/schema/attribute/setLabel', label)
      }
    }
  }
}
</script>
