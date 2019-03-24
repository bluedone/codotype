<template>
  <b-row>
    <b-col lg=12>

      <p class="mb-0 text-muted">
        <i class="fa fa-question-circle mr-1" v-b-tooltip.left.hover="`Where the ${model.label} Schema is a relation on other Schemas`"></i>
        <strong>Incoming Relations</strong>
      </p>

      <ul class="list-group">

        <b-list-group-item class="text-center" v-if="!reverse_relations[0]">
          <!-- <img style="width: 2rem;" :src="icon"> -->
          <!-- <br> -->
          <!-- <i class="fa fa-times fa-lg text-muted"></i> -->
          <!-- <br> -->
          <strong class="mb-0 mt-1 text-muted">No incoming relations</strong>
          <br>
          <small class="text-muted">Add incoming relations here what are they though?</small>
          <!-- <br> -->
          <!-- <b-btn
            size="sm"
            class='btn-rounded mt-2'
            variant="outline-primary"
            @click="$store.dispatch('editor/schema/' + scope + '/newModel')"
          >
            <i class="fa fa-plus"></i>
            Add {{ label }}
          </b-btn> -->
        </b-list-group-item>

        <li class="list-group-item" v-for="rel in reverse_relations" v-else>
          <small>
            <!-- <i class="fa fa-arrow-left text-primary mr-2"></i> -->
            <!-- <span class="text-info">Many </span>{{ rel.alias.label_plural }}<span class="text-info"> to one </span>{{ model.label }} -->

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
      return inflate({ blueprint: { schemas: this.schemas, schema: this.model } }).schemas.find(s => s.id === this.model.id).reverse_relations
    }
  }
}
</script>

<style lang='sass' scoped>
  // TODO - remove, testing for reverse relations
  li.list-group-item
    padding: 0.25rem 0.5rem
</style>
