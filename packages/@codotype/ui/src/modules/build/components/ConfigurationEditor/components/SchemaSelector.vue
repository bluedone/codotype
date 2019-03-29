<template>
  <div class="card">
    <div class="card-header">
      <strong class="text-muted">Schemas</strong>
    </div>
    <ul class="list-group list-group-flush">
      <li
        v-for="schema in schemas"
        :class='selectedSchema.id === schema.id ? "list-group-item list-group-item-primary" : "list-group-item" '
        @click="selectSchema(schema)"
      >
        {{ schema.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SchemaSelector',
  computed: mapGetters({
    schemas: 'editor/schema/collection/items',
    selectedSchema: 'editor/schema/selectedModel'
  }),
  methods: mapActions({
    selectSchema: 'editor/schema/selectModel'
  })
}
</script>
