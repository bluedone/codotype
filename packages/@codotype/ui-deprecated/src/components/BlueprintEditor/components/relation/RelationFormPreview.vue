<template>
  <pre class="rounded bg-dark text-light mb-0 px-3 py-2">{{ schemaPrototype }}</pre>
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
      RELATION_TYPE_HAS_MANY: RELATION_TYPES.RELATION_TYPE_HAS_MANY,
      RELATION_TYPE_HAS_AND_BELONGS_TO_MANY: RELATION_TYPES.RELATION_TYPE_HAS_AND_BELONGS_TO_MANY,
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
    schemaPrototype () {
      let className = this.selectedSchema.class_name
      let identifier = this.selectedSchema.identifier

      const proto = {
        // id: identifier + '_001',
        // ...this.defaultObject
      }

      // if (!this.selectedRelatedSchema) return className + ' = ' + JSON.stringify(proto, null, 2)

      let relatedMeta = inflateMeta(this.model.as || this.selectedRelatedSchema.label)

      if (this.model.type === RELATION_TYPES.RELATION_TYPE_HAS_ONE) {
        proto[relatedMeta.identifier + '_id'] = ''
      } else if (this.model.type === RELATION_TYPES.RELATION_TYPE_BELONGS_TO) {
        proto[relatedMeta.identifier + '_id'] = ''
      } else if (this.model.type === RELATION_TYPES.RELATION_TYPE_HAS_MANY) {
        proto[relatedMeta.identifier + '_ids'] = []
      } else if (this.model.type === RELATION_TYPES.RELATION_TYPE_HAS_AND_BELONGS_TO_MANY) {
        proto[relatedMeta.identifier + '_ids'] = []
      }

      // return className + ' = ' + JSON.stringify(proto, null, 2)
      return JSON.stringify(proto, null, 2)
    }
  }
}
</script>
