<template>
  <b-row class="mt-2">

    <b-col lg="12">
      <p class="lead mb-0">Datatype</p>
      <small class="form-text text-muted">The <span class="text-success">Datatype</span> describes the data represented by this <strong>Attribute</strong> - this <strong>Codotype Generator</strong> supports <strong>{{filteredDatatypes.length}} </strong><span class="text-success">Datatypes</span>.</small>
      <hr />
    </b-col>

    <b-col lg="12">
      <b-row>
        <AttributeDatatypeChild
          v-for="dt in filteredDatatypes"
          :key="dt.value"
          :opt="dt"
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
    generator: {
      required: true
    },
    model: {
      required: true
    }
  },
  data () {
    return {
      DATATYPE_META,
      datatypes,
      datatypeObj: Object.keys(DATATYPE_META).map(dt => DATATYPE_META[dt]),
      filteredDatatypes: this.generator.supportedDatatypes.map(dt => DATATYPE_META[dt])
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
