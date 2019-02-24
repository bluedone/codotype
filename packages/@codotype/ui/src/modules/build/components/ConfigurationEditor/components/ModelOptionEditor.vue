<!-- TODO - this should really be an entire separate Editor component -->
<!-- Should not even be SCOPED to the generator module -->
<template>
  <b-row>
    <b-col lg=4 class='border-right'>
      <SchemaSelector :group="group" />
    </b-col>

    <b-col lg=8>

      <!-- Header - "User MODEL OPTIONS" -->
      <p class="lead mb-0">
        {{ selectedSchema.label }} {{ group.label_plural }}
      </p>

      <!-- Header - Description -->
      <small class="text-muted">{{group.description}}</small>


      <!-- Define new instance -->
      <div
        class="card card-body mt-2"
        v-for="attr in group.attributes"
        :key="selectedSchema.identifier + '_' + attr.identifier"
      >
        <OptionFormItem
          :group="group"
          :schema="selectedSchema"
          :attribute="attr"
        />
      </div>

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OptionFormItem from './OptionFormItem'
import SchemaSelector from './SchemaSelector'

export default {
  name: 'ModelOptionEditor',
  props: {
    group: { required: true },
    schemas: { required: true }
  },
  components: {
    SchemaSelector,
    OptionFormItem
  },
  computed: mapGetters({
    selectedSchema: 'editor/schema/selectedModel'
  }),
  methods: mapActions({
    selectSchema: 'editor/schema/selectModel'
  })
}
</script>
