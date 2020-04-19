<template>
  <div class="row mt-2">

    <div class="col-lg-12">
      <p class="lead mb-0">Default & Description</p>
      <small class="form-text text-muted">Define a <span class="text-success">Default Value</span> or provide a <span class="text-success">Description</span> to annotate this <strong>Attribute</strong>. Note that <i>not all </i> <strong>Attributes</strong> support <span class="text-success">Default Values</span>.</small>
      <hr />
    </div>

    <div class="col-sm-12">
      <FormInput
        label="Description"
        placeholder="Description"
        v-model="model.help"
        help="Describe the purpose or document the constraints of this Attribute"
      />
    </div>

    <!-- DEFAULT INPUTS -->

    <div class="col-sm-12" v-if="model.datatype === DATATYPE_INTEGER">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.default"
        :help="helpText"
        type="INTEGER"
      />
    </div>

    <div class="col-sm-12" v-if="model.datatype === DATATYPE_FLOAT">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.default"
        :help="helpText"
        type="FLOAT"
      />
    </div>

    <div class="col-sm-12" v-if="[DATATYPE_NUMERIC, DATATYPE_DECIMAL].includes(model.datatype)">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.default"
        :help="helpText"
        type="DECIMAL"
      />
    </div>

    <div class="col-sm-12" v-if="model.datatype === DATATYPE_BOOLEAN">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.default"
        help="The default value for this boolean attribute."
        type="BOOL"
      />
    </div>

    <div class="col-sm-12" v-if="model.datatype === DATATYPE_STRING">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.default"
        :help="helpText"
      />
    </div>

    <!-- TODO - this should be a text area -->
    <div class="col-sm-12" v-if="model.datatype === DATATYPE_TEXT">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.default"
        :help="helpText"
      />
    </div>

    <div class="col-sm-12" v-if="model.datatype === DATATYPE_DATE">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.default"
        :help="helpText"
        type="DATE"
      />
    </div>

    <div class="col-sm-12" v-if="model.datatype === DATATYPE_TIME">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.default"
        :help="helpText"
        type="TIME"
      />
    </div>

    <div class="col-sm-12" v-if="[DATATYPE_DATETIME, DATATYPE_TIMESTAMP].includes(model.datatype)">
      <FormInput
        label="Default Value"
        placeholder="Default Value"
        v-model="model.default"
        :help="helpText"
        type="DATETIME"
      />
    </div>
  </div>
</template>

<script>
// CLEANUP - this should be moved into a mixin that makes
// DATATYPE_* variables availabe in the component's template scope
import {
  DATATYPE_STRING,
  DATATYPE_TEXT,
  DATATYPE_INTEGER,
  DATATYPE_FLOAT,
  DATATYPE_DECIMAL,
  DATATYPE_NUMERIC,
  DATATYPE_BOOLEAN,
  DATATYPE_DATE,
  DATATYPE_TIME,
  DATATYPE_DATETIME,
  DATATYPE_TIMESTAMP

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
      helpText: "The default value for this attribute when none is available.",
      DATATYPE_STRING,
      DATATYPE_TEXT,
      DATATYPE_INTEGER,
      DATATYPE_FLOAT,
      DATATYPE_DECIMAL,
      DATATYPE_NUMERIC,
      DATATYPE_BOOLEAN,
      DATATYPE_DATE,
      DATATYPE_TIME,
      DATATYPE_DATETIME,
      DATATYPE_TIMESTAMP
    }
  }
}
</script>
