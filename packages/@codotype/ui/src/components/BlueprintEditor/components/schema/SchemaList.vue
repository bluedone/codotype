<template>
  <div class="card">
    <div class="card-header">
      <strong class="text-muted">
        Schemas
      </strong>
    </div>
    <draggable
      class='list-group list-group-flush reflow-target'
      v-model='collection'
      :animation="150"
      :fallbackTolerance="100"
    >
      <SchemaListItem
        v-for="item in collection"
        :key="item.id"
        :model="item"
      />
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import SchemaListItem from './SchemaListItem'

export default {
  name: 'SchemaList',
  components: {
    draggable,
    SchemaListItem
  },
  computed: {
    collection: {
      get () {
        return this.$store.getters['editor/schema/collection/items']
      },
      set (value) {

        // Ensures only truthy values
        value = value.filter(s => !!s)

        // Sets `order` attribute on each item
        value.forEach((s, i) => { s.order = i })

        // Sorts the values by `order` attribute before commiting to the Vuex store
        // value = orderBy(value, ['order'], ['asc'])

        // Commits the sorted list to the store
        this.$store.commit('editor/schema/collection/items', value)
      }
    }
  }
}
</script>
