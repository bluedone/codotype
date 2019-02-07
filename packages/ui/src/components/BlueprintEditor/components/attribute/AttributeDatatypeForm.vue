<template>
  <div class="form-group">
    <label>DataType</label>
    <small class="form-text text-muted">The type of data represented by this attribute.</small>

    <b-row>
      <AttributeDatatypeChild
        v-for="opt in datatypes"
        :key="opt.value"
        :opt="opt"
        :click="setDatatype"
      />
    </b-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AttributeDatatypeChild from './AttributeDatatypeChild'

export default {
  props: {
    model: {
      required: true
    }
  },
  components: {
    AttributeDatatypeChild
  },
  computed: mapGetters({
    datatypes: 'schema/datatypes' // TODO - pull this from @codotype/types instead
  }),
  methods: {
    setDatatype (datatype) {
      this.model.datatype = datatype
      this.$store.commit('editor/schema/attribute/collection/newModel', this.model)
    }
  }
}
</script>
