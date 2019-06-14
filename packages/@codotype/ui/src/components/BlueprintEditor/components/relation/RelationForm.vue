
<template>
  <div class="row">
    <div class="col-lg-12">
      <b-tabs pills>
        <b-tab title="Cardinality">
          <div class="row mt-2">
            <div class="col-sm-12">
              <h4>Cardinality</h4>

              <p class="small mt-2 mb-3 text-muted"><span class="text-success">Cardinality</span> describes the structure of the <strong>Relation</strong></p>
            </div>
          </div>
          <!-- SOURCE MODEL -->
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group text-primary text-center">
                <label class='mb-0'>{{ selectedSchema.label }}</label>
                <small class="form-text text-primary">Where the relational data is stored</small>
                <input type="text" class='form-control border-primary text-primary' disabled :value="selectedSchema.label">
              </div>
            </div>

            <!-- RELATION TYPE -->
            <!-- CLEANUP - abstract RELATION_TYPE_SELECTOR into independent component? -->
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
                      :class="relation.id === model.type ? 'active' : ''"
                    >
                      <img class='relation-thumbnail' :src=" relation.id === model.type ? 'https://res.cloudinary.com/codotype/image/upload/v1551448517/codotype-icons/' + relation.id.toLowerCase() + '_active' + '.png' : 'https://res.cloudinary.com/codotype/image/upload/v1551448517/codotype-icons/' + relation.id.toLowerCase() + '.png'"/>
                    </b-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- RELATED SCHEMA -->
            <div class="col-lg-4">
              <div class="form-group text-center">
                <label class='mb-0 text-info'>Related Schema</label>
                <small class="form-text text-info">Schema referenced by this relation</small>
                <select class="form-control border-info text-info" v-model="model.related_schema_id" @change="updateModel()">

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
          </div>
        </b-tab>

        <b-tab title="Alias">
          <div class="row mt-2">
            <div class="col-sm-12">
              <h4>Alias</h4>
              <p class="small mt-2 mb-3 text-muted"><span class="text-success">Cardinality</span> describes the structure of the <strong>Relation</strong>Alias this relation under a different singlar, title-cased noun.</p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <RelationFormAlias :model="model" />
            </div>
          </div>
        </b-tab>

        <div class="row">
          <div class="col-lg-12">
            <hr>
          </div>
          <div class="col-lg-12">
            <!-- <RelationFormPreview :model="model" /> -->
            <RelationBadge :model="model" />
          </div>
        </div>
      </b-tabs>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapMutations } from 'vuex'
import RelationFormAlias from './RelationFormAlias'
import RelationFormPreview from './RelationFormPreview'
import RelationBadge from './RelationBadge'
import RELATION_META from '@codotype/types/lib/relation-meta'

export default {
  components: {
    RelationBadge,
    RelationFormAlias,
    RelationFormPreview
  },
  data () {
    return {
      relationTypes: Object.keys(RELATION_META).map(rt => RELATION_META[rt])
    }
  },
  created () {
    // TODO - this should be moved into the relationModule vuex store
    // Selects the schema_id related_schema_id property
    const relatedSchema = this.allSchemas.find(m => m.id !== this.selectedSchema.id)
    this.model.schema_id = this.selectedSchema.id
    this.model.related_schema_id = relatedSchema ? relatedSchema.id : this.selectedSchema.id
    this.updateModel()
  },
  methods: {
    // CLEANUP - this should be moved into the Vuex store
    setRelationType (relationId) {
      this.model.type = relationId
      if (relationId !== 'BELONGS_TO') { this.model.reverse_as = '' }
      this.updateModel()
    },
    updateModel () {
      this.$store.commit('editor/schema/relation/form/model', this.model)
    }
  },
  computed: {
    ...mapGetters({
      model: 'editor/schema/relation/form/model',
      allSchemas: 'editor/schema/collection/items',
      selectedSchema: 'editor/schema/selectedModel'
    }),
    selectedRelatedSchema () {
      return this.allSchemas.find(m => m.id === this.model.related_schema_id)
    },
    selectedRelationType () {
      return RELATION_META[this.model.type]
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
