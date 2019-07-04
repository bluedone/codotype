<template>
    <RelationDiagram
      v-if="model.type === RELATION_TYPE_BELONGS_TO"
      :direction="direction"
      :sourcePlural="true"
      :sourceLabel="selectedSchema.label_plural"
      :sourceAlias="inflated.reverse_alias.label_plural"
      :destPlural="false"
      :destLabel="inflated.schema.label"
      :destAlias="inflated.alias.label"
      :slim="slim"
    />

    <RelationDiagram
      v-else-if="model.type === RELATION_TYPE_HAS_ONE"
      :direction="direction"
      :sourcePlural="false"
      :sourceLabel="selectedSchema.label"
      :sourceAlias="inflated.reverse_alias.label"
      :destPlural="false"
      :destLabel="inflated.schema.label"
      :destAlias="inflated.alias.label"
      :slim="slim"
    />

    <RelationDiagram
      v-else-if="model.type === RELATION_TYPE_HAS_MANY"
      :direction="direction"
      :sourcePlural="false"
      :sourceLabel="selectedSchema.label"
      :sourceAlias="inflated.reverse_alias.label"
      :destPlural="true"
      :destLabel="inflated.schema.label_plural"
      :destAlias="inflated.alias.label_plural"
      :slim="slim"
    />

    <RelationDiagram
      v-else-if="model.type === RELATION_TYPE_HAS_AND_BELONGS_TO_MANY"
      :direction="direction"
      :sourcePlural="true"
      :sourceLabel="selectedSchema.label_plural"
      :sourceAlias="inflated.reverse_alias.label_plural"
      :destPlural="true"
      :destLabel="inflated.schema.label_plural"
      :destAlias="inflated.alias.label_plural"
      :slim="slim"
    />
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import inflateMeta from '@codotype/util/lib/inflateMeta'
import { inflateRelation } from '@codotype/util/lib/inflate'
import RELATION_TYPES from '@codotype/types/lib/relation-types'
import RelationDiagram from './RelationDiagram'

export default {
  props: {
    model: {
      required: true
    },
    direction: {
      required: false,
      type: String,
    },
    slim: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  components: {
    RelationDiagram
  },
  data () {
    return {
      RELATION_TYPE_HAS_ONE: RELATION_TYPES.RELATION_TYPE_HAS_ONE,
      RELATION_TYPE_BELONGS_TO: RELATION_TYPES.RELATION_TYPE_BELONGS_TO,
      RELATION_TYPE_HAS_MANY: RELATION_TYPES.RELATION_TYPE_HAS_MANY,
      RELATION_TYPE_HAS_AND_BELONGS_TO_MANY: RELATION_TYPES.RELATION_TYPE_HAS_AND_BELONGS_TO_MANY,
    }
  },
  computed: {
    ...mapGetters({
      allSchemas: 'editor/schema/collection/items',
      selectedSchema: 'editor/schema/selectedModel'
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
    }
  }
}
</script>
<!--
<style scoped>
  p.large {
    font-size: 1.5rem;
  }
</style> -->
