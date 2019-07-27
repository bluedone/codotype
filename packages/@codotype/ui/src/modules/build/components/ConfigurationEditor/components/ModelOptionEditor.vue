<template>
  <b-row>
    <b-col lg=3>
      <div class="text-muted mb-2">
        <strong>
          <i class="fa fa-database mr-1" />
          Schemas
        </strong>
      </div>
      <SchemaSelector />
    </b-col>

    <b-col lg=9 class="pl-0">
      <div class="card">

        <div class="card-body pb-0">
          <!-- Header - "User MODEL OPTIONS" -->
          <p class="lead mb-0">
            {{ selectedSchema.label }} {{ group.label_plural }}
          </p>

          <!-- Header - Description -->
          <small class="text-muted">{{group.description}}</small>
          <hr>

          <!-- Define new instance -->
          <div
            v-for="attr in group.attributes"
            :key="selectedSchema.identifier + '_' + attr.identifier"
            class="mb-3"
          >

            <OptionFormItem
              :group="group"
              :schema="selectedSchema"
              :attribute="attr"
            />
          </div>
        </div>
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
