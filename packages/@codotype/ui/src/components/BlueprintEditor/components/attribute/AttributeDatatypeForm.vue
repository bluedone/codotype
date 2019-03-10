<template>
  <div class="form-group">
    <label>Datatype</label>
    <small class="form-text text-muted">The type of data represented by this attribute.</small>

    <b-row>
      <AttributeDatatypeChild
        v-for="opt in datatypes"
        :key="opt.value"
        :opt="opt"
        :val="model.datatype"
        :click="setDatatype"
      />
    </b-row>

  </div>
</template>

<script>
import DATATYPE_META from '@codotype/types/lib/meta'
import AttributeDatatypeChild from './AttributeDatatypeChild'

export default {
  props: {
    model: {
      required: true
    }
  },
  data () {
    return {
      datatypes: Object.keys(DATATYPE_META).map(dt => DATATYPE_META[dt])
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
