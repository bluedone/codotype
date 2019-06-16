<template>
  <b-row>
    <b-col sm=12>
      <p class="mb-0 text-muted" id="schema-preview">
        <span class="d-flex align-items-center justify-content-between mb-1 mx-1">
          <span>
            <i class="fa fa-eye mr-2"></i>
            <strong class="m-0">Preview</strong>
          </span>

          <i class="fa fa-info-circle" v-b-tooltip.left.hover="`The data structure of a single ${model.label} Schema`"></i>
        </span>

        <small class="mb-0 text-muted">
          <pre class="rounded bg-dark text-light px-3 py-2">{{ previewBody }}</pre>
        </small>
      </p>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SchemaPreview',
  props: {
    override: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      model: 'editor/schema/selectedModel',
      defaultObject: 'editor/schema/defaultObject'
    }),
    previewBody () {
      return JSON.stringify((this.override || this.defaultObject), null, 2)
    }
  }
}
</script>
