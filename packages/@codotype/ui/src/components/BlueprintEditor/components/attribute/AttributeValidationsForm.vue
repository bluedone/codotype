<template>
  <div class="row mt-2">

    <div class="col-lg-12">
      <p class="lead mb-0">Attribute Validations</p>
    </div>

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
        v-if="!['JSON', DATATYPE_BOOLEAN].includes(model.datatype)"
        v-model="model.unique"
        help="Whether or not to enforce unique values for this attribute."
        type='BOOL'
      />
    </div>

    <div class="col-sm-12" v-if="[DATATYPE_NUMBER_INTEGER, DATATYPE_NUMBER].includes(model.datatype)">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.datatypeOptions.default"
        help="The default value for this attribute when none is available."
        type="NUMBER"
      />
    </div>

      <div class="col-sm-12" v-if="model.datatype === DATATYPE_BOOLEAN">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.datatypeOptions.default"
        help="The default value for this boolean attribute."
        type="BOOL"
      />
    </div>

    <div class="col-sm-12" v-if="model.datatype === DATATYPE_STRING">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.datatypeOptions.default"
        help="The default value for this attribute when none is available."
      />
    </div>

  </div>
</template>

<script>
import {
  DATATYPE_STRING,
  DATATYPE_NUMBER,
  DATATYPE_NUMBER_INTEGER,
  DATATYPE_BOOLEAN
} from '@codotype/types/lib/datatypes'

import FormInput from '../../../FormInput'

export default {
  props: {
    model: {
      required: true
    }
  },
  components: {
    FormInput
  },
  data () {
    return {
      DATATYPE_STRING,
      DATATYPE_BOOLEAN,
      DATATYPE_NUMBER,
      DATATYPE_NUMBER_INTEGER
    }
  }
}
</script>
