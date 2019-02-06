
<template>
  <div class="row">

    <!-- Description / Relation Preview-->
    <div class="col-lg-6 text-center" v-if="selectedRelatedSchema">

      <small v-if="model.type === 'HAS_ONE'">
        <!-- Each <span class='text-info'>{{ schema.label }}</span> references one <span class='text-warning'>{{ selectedRelatedSchema.label }}</span> -->
      </small>

      <small v-if="model.type === 'BELONGS_TO'">
        <!-- Each <span class='text-info'>{{ schema.label }}</span> references one <span class='text-warning'>{{ selectedRelatedSchema.label }}</span> -->
      </small>

      <small v-if="model.type === 'HAS_MANY'">
        <!-- Each <span class='text-info'>{{ schema.label }}</span> references many <span class='text-warning'>{{ selectedRelatedSchema.label_plural }}</span> -->
      </small>

    </div>

    <div class="col-lg-6 text-center" v-if="selectedRelatedSchema">

      <small v-if="model.type === 'HAS_MANY'">
        <!-- Many <span class='text-warning'>{{ selectedRelatedSchema.label_plural }}</span> are referenced by one <span class='text-info'>{{ schema.label }}</span> -->
      </small>

      <small v-if="model.type === 'HAS_ONE'">
        <!-- One <span class='text-warning'>{{ selectedRelatedSchema.label }}</span> is referenced by one <span class='text-info'>{{ schema.label }}</span> -->
      </small>

      <small v-if="model.type === 'BELONGS_TO'">
        <!-- One <span class='text-warning'>{{ selectedRelatedSchema.label }}</span> is referenced by many <span class='text-info'>{{ schema.label_plural }}</span> -->
      </small>

    </div>

    <!-- Description / Relation Preview-->
    <div class="col-lg-12">
      <div class="card-deck">
        <div class="card card-code">
          <pre class="bg-dark p-4 text-light h-100 mb-0">{{schemaPrototype}}</pre>
        </div>
        <div class="card card-code">
          <pre class="bg-dark p-4 text-light h-100 mb-0">{{selectedRelatedSchemaPrototype}}</pre>
        </div>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import { inflateMeta } from '@codotype/util/lib/inflateMeta'

export default {
  props: {
    model: {
      required: true
    }
  },
  computed: {
    ...mapGetters({
      relationTypes: 'schema/relationTypes',
      selectedSchema: 'editor/schema/selectedModel'
    }),
    allSchemas () {
      return this.$store.getters['editor/schema/collection/items']
    },
    selectedRelatedSchema () {
      return this.allSchemas.find(m => m.id === this.model.related_schema_id)
    },
    schemaPrototype () {
      let proto = {}
      let className = this.selectedSchema.class_name
      let identifier = this.selectedSchema.identifier
      proto.id = identifier + '_001'

      if (!this.selectedRelatedSchema) return className + ' = ' + JSON.stringify(proto, null, 2)

      // Handles valid Ids for a relation between the same schema
      const relatedIdentifier = this.selectedRelatedSchema.identifier
      let relatedId = this.selectedRelatedSchema.identifier === this.selectedSchema.identifier ? '_002' : '_001'
      relatedId = relatedIdentifier + relatedId

      let relatedMeta = inflateMeta(this.model.as || this.selectedRelatedSchema.label)

      if (this.model.type === 'HAS_ONE') {
        proto[relatedMeta.identifier + '_id'] = relatedId
      } else if (this.model.type === 'BELONGS_TO') {
        proto[relatedMeta.identifier + '_id'] = relatedId
      } else if (this.model.type === 'HAS_MANY') {
        proto[relatedMeta.identifier + '_ids'] = [relatedId]
      } else if (this.model.type === 'MANY_TO_MANY') {
        proto[relatedMeta.identifier + '_ids'] = [relatedId]
      }

      return className + ' = ' + JSON.stringify(proto, null, 2)
    },
    selectedRelatedSchemaPrototype () {
      if (!this.selectedRelatedSchema) return ''
      let proto = {}
      let className = this.selectedRelatedSchema.class_name
      let identifier = this.selectedRelatedSchema.identifier
      const schemaIdentifier = this.selectedSchema.identifier

      let relatedId = identifier === schemaIdentifier ? '_002' : '_001'
      proto.id = identifier + relatedId

      let relatedMeta = inflateMeta(this.model.reverse_as || this.selectedSchema.label)

      if (this.model.type === 'ONE_TO_MANY') {
        proto[relatedMeta.identifier + '_id'] = schemaIdentifier + '_001'
      } else if (this.model.type === 'BELONGS_TO') {
        // proto['getRelated' + relatedMeta.class_name_plural] = 'This method returns ' + relatedMeta.class_name_plural + '.where({' + schemaIdentifier + '_id: ' + schemaIdentifier + '_001 })'
        proto['getRelated' + relatedMeta.class_name_plural] = relatedMeta.class_name + '.find({' + identifier + '_id: ' + identifier + '_001 })'
      } else if (this.model.type === 'MANY_TO_MANY') {
        proto[relatedMeta.identifier + '_ids'] = [schemaIdentifier + '_001']
      } else if (this.model.type === 'BELONGS_TO_MANY') {
        proto[relatedMeta.identifier + '_ids'] = [schemaIdentifier + '_001']
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
