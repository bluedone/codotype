<template>
  <div class="row d-flex flex-row align-items-center">

    <div class="col-lg-4">
      <small>
        <pre class="rounded bg-dark text-light mb-0 px-3 py-2">{{ schemaPrototype }}</pre>
      </small>
    </div>

    <!-- Description / Relation Preview-->
    <div class="col-lg-8 text-center" v-if="selectedRelatedSchema">

      <p class='large mb-0' v-if="model.type === RELATION_TYPE_BELONGS_TO">
        <span v-if="inflated.reverse_alias.label !== selectedSchema.label">({{selectedSchema.label}}) </span><span class='text-primary'>Many <strong>{{ inflated.reverse_alias.label_plural }}</strong><i class="fa mx-3 fa-arrow-right text-primary mx-1"></i></span><span class="text-info">One <strong>{{ inflated.alias.label }}</strong></span><span v-if="inflated.alias.label !== inflated.schema.label"> ({{inflated.schema.label}})</span>
      </p class='lead mb-0'>

      <!-- RELATION_TYPE_HAS_ONE -->
      <p class='large mb-0' v-if="model.type === RELATION_TYPE_HAS_ONE">
        <span v-if="inflated.reverse_alias.label !== selectedSchema.label">({{selectedSchema.label}}) </span><span class='text-primary'>One <strong>{{ inflated.reverse_alias.label }}</strong></span><i class="fa mx-3 fa-arrow-right text-primary mx-1"></i><span class="text-info">One <strong>{{ inflated.alias.label }}</strong></span><span v-if="inflated.alias.label !== inflated.schema.label"> ({{inflated.schema.label}})</span>
      </p class='lead mb-0'>

      <!-- HAS_MANY -->
      <p class='large mb-0' v-if="model.type === RELATION_TYPE_HAS_MANY">
        <span v-if="inflated.reverse_alias.label !== selectedSchema.label">({{selectedSchema.label}}) </span><span class='text-primary'>One <strong>{{ inflated.reverse_alias.label }}</strong><i class="fa mx-3 fa-arrow-right mx-1"></i></span> <span class='text-info'>Many <strong>{{ inflated.alias.label_plural }}</strong></span><span v-if="inflated.alias.label !== inflated.schema.label"> ({{inflated.schema.label_plural}})</span>
      </p class='lead mb-0'>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import inflateMeta from '@codotype/util/lib/inflateMeta'
import { inflateRelation } from '@codotype/util/lib/inflate'
import RELATION_TYPES from '@codotype/types/lib/relation-types'

export default {
  props: {
    model: {
      required: true
    }
  },
  data () {
    return {
      RELATION_TYPE_HAS_ONE: RELATION_TYPES.RELATION_TYPE_HAS_ONE,
      RELATION_TYPE_BELONGS_TO: RELATION_TYPES.RELATION_TYPE_BELONGS_TO,
      RELATION_TYPE_HAS_MANY: RELATION_TYPES.RELATION_TYPE_HAS_MANY
    }
  },
  computed: {
    ...mapGetters({
      allSchemas: 'editor/schema/collection/items',
      selectedSchema: 'editor/schema/selectedModel',
      defaultObject: 'editor/schema/defaultObject'
    }),
    selectedRelatedSchema () {
      return this.allSchemas.find(m => m.id === this.model.related_schema_id)
    },
    inflated () {
      this.model.schema_id = this.selectedSchema.id
      return inflateRelation({
        relation: this.model,
        schemas: this.$store.getters['editor/schema/collection/items']
      })
    },
    schemaPrototype () {
      let className = this.selectedSchema.class_name
      let identifier = this.selectedSchema.identifier

      const proto = {
        id: identifier + '_001',
        ...this.defaultObject
      }

      // if (!this.selectedRelatedSchema) return className + ' = ' + JSON.stringify(proto, null, 2)

      let relatedMeta = inflateMeta(this.model.as || this.selectedRelatedSchema.label)

      if (this.model.type === RELATION_TYPES.RELATION_TYPE_HAS_ONE) {
        proto[relatedMeta.identifier + '_id'] = ''
      } else if (this.model.type === RELATION_TYPES.RELATION_TYPE_BELONGS_TO) {
        proto[relatedMeta.identifier + '_id'] = ''
      } else if (this.model.type === RELATION_TYPES.RELATION_TYPE_HAS_MANY) {
        proto[relatedMeta.identifier + '_ids'] = []
      }

      // return className + ' = ' + JSON.stringify(proto, null, 2)
      return JSON.stringify(proto, null, 2)
    }
  }
}
</script>

<style scoped>
  .card-code {
    font-size: 65%;
  }
  p.large {
    font-size: 1.5rem;
  }
</style>
