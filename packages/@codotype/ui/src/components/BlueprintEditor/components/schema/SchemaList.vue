<template>
  <div class="card">
    <div class="card-header">
      <strong>Schemas</strong>
    </div>
    <ul class='list-group list-group-flush'>
      <SchemaListItem
        v-for="item in collection"
        :key="item.id"
        :model="item"
      />

      <!-- QUESTION - do we want an "EmptyView" for models? -->
      <!-- <template v-if="collection.length === 1"> -->
        <!-- <b-list-group-item class='text-center text-primary'> -->
          <!-- <i class="fa fa-info-circle"></i> -->
          <!-- <br> -->
          <!-- Add more models, yo -->
        <!-- </b-list-group-item> -->
      <!-- </template> -->
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
