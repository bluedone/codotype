<template>
  <div class="card">
    <div class="card-header">
      <!-- <b-button variant="primary" size="sm" @click="$store.dispatch('editor/schema/newModel')"> -->
        <!-- <i class="fa fa-plus"></i> -->
      <!-- </b-button> -->
      <strong class="text-muted">
        Schemas
      </strong>
    </div>
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
