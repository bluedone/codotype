<template>
  <div class="card">
    <ul class='list-group list-group-flush'>
      <SchemaListItem
        v-for="item in collection"
        :key="item.id"
        :model="item"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SchemaListItem from './SchemaListItem'

export default {
  name: 'SchemaList',
  components: {
    SchemaListItem
  },
  computed: mapGetters({
    collection: 'editor/schema/collection/items'
  })
}
</script>
