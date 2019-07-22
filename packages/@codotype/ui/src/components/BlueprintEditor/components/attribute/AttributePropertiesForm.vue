<template>
  <b-row class="mt-2">

    <b-col lg="12">
      <p class="lead mb-0">Properties</p>
      <small class="text-muted">Define the <span class="text-success">Tokens</span> for this <strong>Attribute</strong> and set its <span class="text-success">Required</span> and <span class="text-success">Unique</span> constraints.</small>
      <hr />
    </b-col>

    <b-col lg="6" sm="12">
      <FormInput
        label="Label"
        :focus="true"
        :required="true"
        placeholder="Label"
        v-model="attributeLabel"
        help="The input field will enforce proper capitalization and spacing."
      />
    </b-col>

    <b-col lg="6" sm="12">
      <FormInput
        label="Identifier"
        :required="true"
        placeholder="Identifier"
        v-model="model.identifier"
        help="Supply a camel-cased or snake-cased value - no whitespace."
      />
    </b-col>

    <div class="col-lg-6 col-sm-12">
      <FormInput
        label="Required"
        v-if="![DATATYPE_BOOLEAN].includes(model.datatype)"
        v-model="model.required"
        help="Whether or not this Attribute is required."
        type='BOOL'
      />
    </div>
    <div class="col-lg-6 col-sm-12">
      <FormInput
        label="Unique"
        v-if="![DATATYPE_JSON, DATATYPE_BOOLEAN].includes(model.datatype)"
        v-model="model.unique"
        help="Whether or not to enforce unique values for this Attribute."
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
