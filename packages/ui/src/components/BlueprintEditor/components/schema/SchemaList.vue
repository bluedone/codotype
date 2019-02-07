<template>
  <ul class='list-group'>
    <SchemaListItem
      v-for="item in collection"
      :key="item.id"
      :model="item"
    />
    <!-- QUESTION - do we want an "EmptyView" for models? -->
    <template v-if="collection.length === 1">
      <hr>
      <b-card class='text-center text-primary'>
        <i class="fa fa-info-circle"></i>
        <br>
        Add more models, yo
      </b-card>
    </template>
  </ul>
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
