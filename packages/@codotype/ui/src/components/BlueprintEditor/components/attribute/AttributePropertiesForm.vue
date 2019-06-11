<template>
  <b-row class="mt-2">

    <b-col lg="12">
      <p class="lead mb-0">Attribute Properties</p>
      <small class="text-muted">The human-readable name for this attribute. Lowercase, no spaces.</small>
    </b-col>

    <b-col lg="6" sm="12">
      <FormInput
        label="Label"
        :focus="true"
        :required="true"
        placeholder="Label"
        v-model="attributeLabel"
        help="Example: 'Last Name'"
      />
    </b-col>

    <b-col lg="6" sm="12">
      <FormInput
        label="Field Name"
        :required="true"
        placeholder="Field Name"
        v-model="model.identifier"
        help="Example: 'last_name'"
      />
    </b-col>

    <div class="col-lg-6 col-sm-12">
      <FormInput
        label="Required"
        v-if="![DATATYPE_BOOLEAN].includes(model.datatype)"
        v-model="model.required"
        help="Whether or not this attribute is required."
        type='BOOL'
      />
    </div>
    <div class="col-lg-6 col-sm-12">
      <FormInput
        label="Unique"
        v-if="![DATATYPE_JSON, DATATYPE_BOOLEAN].includes(model.datatype)"
        v-model="model.unique"
        help="Whether or not to enforce unique values for this attribute."
        type='BOOL'
      />
    </div>


  </b-row>
</template>

<script>
import DATATYPE_META from '@codotype/types/lib/datatype-meta'
import FormInput from '../../../FormInput'
import {
  DATATYPE_STRING,
  DATATYPE_TEXT,
  DATATYPE_INTEGER,
  DATATYPE_FLOAT,
  DATATYPE_BOOLEAN,
  DATATYPE_JSON,
  DATATYPE_DATE,
  DATATYPE_TIME,
  DATATYPE_DATETIME

} from '@codotype/types/lib/datatypes'

export default {
  props: ['model'],
  components: {
    FormInput
  },
  data () {
    return {
      DATATYPE_STRING,
      DATATYPE_TEXT,
      DATATYPE_INTEGER,
      DATATYPE_FLOAT,
      DATATYPE_BOOLEAN,
      DATATYPE_JSON,
      DATATYPE_DATE,
      DATATYPE_TIME,
      DATATYPE_DATETIME
    }
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
