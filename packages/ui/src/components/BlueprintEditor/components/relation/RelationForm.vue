
<template>
  <div class="row">
    <div class="col-lg-12">

      <!-- SOURCE MODEL -->
      <div class="row">
        <div class="col-lg-4">
          <div class="form-group text-center">
            <label class='mb-0'>{{ selectedSchema.label }}</label>
            <small class="form-text text-muted">This Model</small>
            <input type="text" class='form-control' disabled :value="selectedSchema.label">
          </div>
        </div>

        <!-- RELATION TYPE -->
        <!-- TODO - abstract RELATION_TYPE_SELECTOR into independent component? -->
        <div class="col-lg-4">

          <div class="row">
            <div class="col-lg-12">
              <div class="form-group mb-2 text-center">
                <label class='mb-0'>{{ selectedRelationType.label }}</label>
                <small class="form-text text-muted mb-0">{{ selectedRelationType.description }}</small>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="btn-group w-100">
                <b-button
                  v-for="relation in relationTypes"
                  :key="relation.id"
                  @click="setRelationType(relation.id)"
                  size="sm"
                  variant="outline-primary"
                  :active="relation.id === model.type"
                >
                  <img class='relation-thumbnail' :src=" relation.id === model.type ? '/static/' + relation.id.toLowerCase() + '_active' + '.png' : '/static/' + relation.id.toLowerCase() + '.png'"/>
                </b-button>
              </div>
            </div>
          </div>
        </div>

        <!-- RELATED SCHEMA -->
        <div class="col-lg-4">
          <div class="form-group text-center">
            <label class='mb-0'>Related Model</label>
            <small class="form-text text-muted">The related Model definition.</small>
            <select class="form-control" v-model="model.related_schema_id" >

              <!-- <option v-if="model.type === 'HAS_ONE'" v-for="s in allSchemas" :key="s.id" :value="s.id">{{s.label}}</option> -->
              <template v-if="model.type === 'HAS_MANY'">
                <option v-for="s in allSchemas" :key="s.id" :value="s.id">
                  {{s.label_plural}}
                </option>
              </template>

              <!-- <option v-if="model.type === 'BELONGS_TO'" v-for="s in allSchemas" :key="s.id" :value="s.id">{{s.label}}</option> -->
              <template v-else>
                <option v-for="s in allSchemas" :key="s.id" :value="s.id">
                  {{s.label}}
                </option>
              </template>

            </select>
          </div>
        </div>

        <div class="col-lg-12">
          <RelationFormAlias :model="model" />
        </div>

        <div class="col-lg-12">
          <hr>
        </div>

        <div class="col-lg-12">
          <RelationFormPreview :model="model" />
        </div>

      </div>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import RelationFormAlias from './RelationFormAlias'
import RelationFormPreview from './RelationFormPreview'
// import { inflateMeta } from '@codotype/util/lib/inflateMeta'

export default {
  props: {
    model: {
      required: true
    }
  },
  components: {
    RelationFormAlias,
    RelationFormPreview
  },
  created () {
    this.model.type = 'BELONGS_TO' // TODO - constantize
    const relatedSchema = this.allSchemas.find(m => m.id !== this.selectedSchema.id)
    this.model.related_schema_id = relatedSchema ? relatedSchema.id : this.selectedSchema.id
  },
  methods: {
    setRelationType (relationId) {
      this.model.type = relationId
      if (relationId !== 'BELONGS_TO') { this.model.reverse_as = '' }
    }
  },
  computed: {
    ...mapGetters({
      relationTypes: 'schema/relationTypes',
      selectedSchema: 'editor/schema/selectedModel'
    }),
    allSchemas () {
      // return this.$store.getters['schema/collection'].filter(s => s.id !== this.schema.id)
      return this.$store.getters['editor/schema/collection/items']
    },
    selectedRelatedSchema () {
      return this.allSchemas.find(m => m.id === this.model.related_schema_id)
    },
    selectedRelationType () {
      return this.relationTypes.find(r => r.id === this.model.type)
    }
  }
}
</script>

<style scoped>

  img.relation-thumbnail {
    width: 50%;
  }

  .btn-outline-primary {
    width: 33%;
  }

  .form-text {
    margin-bottom: 0.6rem;
  }
</style>
