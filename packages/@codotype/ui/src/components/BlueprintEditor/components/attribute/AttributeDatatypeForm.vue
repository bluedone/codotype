<template>
  <b-row class="mt-2">

    <b-col lg="12">
      <p class="lead mb-0">Attribute Datatype</p>
      <small class="form-text text-muted">The type of data represented by this attribute.</small>
    </b-col>

    <b-col lg="12">
      <b-row>

        <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_STRING]"
          :val="model.datatype"
          :click="setDatatype"
        />

        <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_TEXT]"
          :val="model.datatype"
          :click="setDatatype"
        />

        <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_INTEGER]"
          :val="model.datatype"
          :click="setDatatype"
        />

        <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_FLOAT]"
          :val="model.datatype"
          :click="setDatatype"
        />

        <!-- <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_DOUBLE]"
          :val="model.datatype"
          :click="setDatatype"
        /> -->

        <!-- <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_JSON]"
          :val="model.datatype"
          :click="setDatatype"
        /> -->

        <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_BOOLEAN]"
          :val="model.datatype"
          :click="setDatatype"
        />

        <!-- <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_TIME]"
          :val="model.datatype"
          :click="setDatatype"
        /> -->

        <!-- <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_DATE]"
          :val="model.datatype"
          :click="setDatatype"
        /> -->

        <AttributeDatatypeChild
          :opt="DATATYPE_META[datatypes.DATATYPE_DATETIME]"
          :val="model.datatype"
          :click="setDatatype"
        />

      </b-row>
    </b-col>

  </b-row>
</template>

<script>
import DATATYPE_META from '@codotype/types/lib/datatype-meta'
import datatypes from '@codotype/types/lib/datatypes'
import AttributeDatatypeChild from './AttributeDatatypeChild'

export default {
  props: {
    model: {
      required: true
    }
  },
  data () {
    return {
      DATATYPE_META,
      datatypes,
      datatypeObj: Object.keys(DATATYPE_META).map(dt => DATATYPE_META[dt])
    }
  },
  components: {
    AttributeDatatypeChild
  },
  methods: {
    setDatatype (datatype) {
      this.model.datatype = datatype
      this.$store.commit('editor/schema/attribute/collection/newModel', this.model)
    }
  }
}
</script>
