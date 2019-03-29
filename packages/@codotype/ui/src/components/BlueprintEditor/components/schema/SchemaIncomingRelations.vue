<template>
  <b-row>
    <b-col lg=12>

      <p class="mb-1 text-muted d-flex justify-content-between">
        <span>
          <i class="fa fa-arrow-left mr-2"></i>
          <strong>Incoming Relations</strong>
        </span>
        <i class="fa fa-info-circle" v-b-tooltip.left.hover="`Relations which reference the ${model.label} Schema`"></i>
      </p>

      <ul class="list-group">

        <b-list-group-item class="text-center" v-if="!reverse_relations[0]">
          <strong class="mb-0 mt-1 text-muted">No Incoming Relations</strong>
          <br>
          <small class="text-muted">Relations which reference the {{ model.label }} Schema</small>
        </b-list-group-item>

        <li class="list-group-item" v-for="rel in reverse_relations" v-else>
          <small>

            <template v-if="rel.type === 'BELONGS_TO'">
              <span>
                <span class="text-primary">One <strong>{{ model.label }}</strong></span><span class="text-info"><i class="fa fa-arrow-left text-info mx-1"></i>Many <strong>{{ rel.alias.label_plural }}</strong></span>
              </span>
            </template>

            <template v-if="rel.type === 'HAS_ONE'">
              <span>
                <span class="text-primary">One <strong>{{ model.label }}</strong></span><span class="text-info"><i class="fa fa-arrow-left text-info mx-1"></i> One <strong>{{ rel.alias.label }}</strong></span>
              </span>
            </template>

            <template v-if="rel.type === 'HAS_MANY'">
              <span>
                <span class="text-primary">Many <strong>{{ model.label_plural }}</strong></span><span class="text-info"><i class="fa fa-arrow-left text-info mx-1"></i>One <strong>{{ rel.alias.label }}</strong></span>
              </span>
            </template>

          </small>
        </li>
      </ul>

    </b-col>
  </b-row>

</template>

<script>
import { mapGetters } from 'vuex'
import { inflate } from '@codotype/util/lib/inflate'

export default {
  name: 'SchemaIncomingRelations',
  computed: {
    ...mapGetters({
      model: 'editor/schema/selectedModel',
      schemas: 'editor/schema/collection/items'
    }),
    reverse_relations () {
      // CLEANUP - this is a little inefficient
      // CLEANUP - this should be abstracted to the Vuex store
      return inflate({ blueprint: { schemas: this.schemas, schema: this.model } }).schemas.find(s => s.id === this.model.id).reverse_relations
    }
  }
}
</script>

<style lang='sass' scoped>
  li.list-group-item
    padding: 0.25rem 0.5rem
</style>
