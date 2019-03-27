<template>
  <div class="row">

    <!-- Description / Relation Preview-->
    <div class="col-lg-6 text-center" v-if="selectedRelatedSchema">

      <small v-if="model.type === RELATION_TYPE_HAS_ONE">
        Each <span class='text-info'>{{ selectedSchema.label }}</span> references one <span class='text-warning'>{{ selectedRelatedSchema.label }}</span>
      </small>

      <small v-if="model.type === RELATION_TYPE_BELONGS_TO">
        Each <span class='text-info'>{{ selectedSchema.label }}</span> references one <span class='text-warning'>{{ selectedRelatedSchema.label }}</span>
      </small>

      <small v-if="model.type === RELATION_TYPE_HAS_MANY">
        Each <span class='text-info'>{{ selectedSchema.label }}</span> references many <span class='text-warning'>{{ selectedRelatedSchema.label_plural }}</span>
      </small>

    </div>

    <!-- Description / Relation Preview-->
    <div class="col-lg-12">
      <div class="card-deck">
        <div class="card card-code">
          <pre class="bg-dark p-4 text-light h-100 mb-0">{{schemaPrototype}}</pre>
        </div>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import inflateMeta from '@codotype/util/lib/inflateMeta'
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
    // CLEANUP - abstract into codotype/util (?)
    schemaPrototype () {
      let proto = { ...this.defaultObject }
      let className = this.selectedSchema.class_name
      let identifier = this.selectedSchema.identifier
      proto.id = identifier + '_001'

      if (!this.selectedRelatedSchema) return className + ' = ' + JSON.stringify(proto, null, 2)

      let relatedMeta = inflateMeta(this.model.as || this.selectedRelatedSchema.label)

      if (this.model.type === RELATION_TYPES.RELATION_TYPE_HAS_ONE) {
        proto[relatedMeta.identifier + '_id'] = ''
      } else if (this.model.type === RELATION_TYPES.RELATION_TYPE_BELONGS_TO) {
        proto[relatedMeta.identifier + '_id'] = ''
      } else if (this.model.type === RELATION_TYPES.RELATION_TYPE_HAS_MANY) {
        proto[relatedMeta.identifier + '_ids'] = []
      }

      return className + ' = ' + JSON.stringify(proto, null, 2)
    }
  }
}
</script>

<style scoped>
  .card-code {
    font-size: 65%;
  }
</style>
