<template>
  <b-row>
    <b-col sm=12>
      <p class="mb-0 text-muted">
        <i class="fa fa-question-circle mr-1" v-b-tooltip.left.hover="`Where the ${model.label} Schema is a relation on other Schemas`"></i>
        <strong>Preview</strong>
      </p>

      <small class="mb-0 text-muted">
        <pre class="rounded bg-dark text-light px-3 py-2">{{ `${model.identifier} = new ${model.class_name}(` + JSON.stringify(defaultObject, null, 2) + ')'}}</pre>
      </small>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SchemaPreview',
  computed: mapGetters({
    model: 'editor/schema/selectedModel',
    defaultObject: 'editor/schema/defaultObject'
  })
}
</script>
