<template>
  <b-row>
    <b-col sm=12>
      <p class="mb-0 text-muted" id="schema-preview">
        <i class="fa fa-question-circle mr-1" v-b-tooltip.left.hover="`The data structure of a single ${model.label} Schema`"></i>
        <strong>Preview</strong>

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
  computed: {
    ...mapGetters({
      model: 'editor/schema/selectedModel',
      defaultObject: 'editor/schema/defaultObject'
    }),
    previewBody () {
      return `${this.model.identifier} = new ${this.model.class_name}(` + JSON.stringify(this.defaultObject, null, 2) + ')'
    }
  }
}
</script>
