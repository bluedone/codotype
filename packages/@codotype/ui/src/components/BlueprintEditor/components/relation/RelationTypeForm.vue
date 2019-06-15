 <template>
  <div class="row">
    <div class="col-lg-4">
      <div class="form-group text-primary text-center">
        <label class='mb-0'>{{ selectedSchema.label }}</label>
        <small class="form-text text-primary">Where the relational data is stored</small>
        <input type="text" class='form-control border-primary text-primary' disabled :value="selectedSchema.label">
      </div>
    </div>

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
              v-for="relation in filteredRelationTypes"
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
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapMutations } from 'vuex'
import RELATION_META from '@codotype/types/lib/relation-meta'

export default {
  data () {
    return {
      // TODO - filter these based on which relations are exposed by the generator
      relationTypes: Object.keys(RELATION_META).map(rt => RELATION_META[rt])
    }
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
      generator: 'generator/selectedModel',
      model: 'editor/schema/relation/form/model',
      allSchemas: 'editor/schema/collection/items',
      selectedSchema: 'editor/schema/selectedModel'
    }),
    selectedRelationType() {
      return RELATION_META[this.model.type]
    },
    filteredRelationTypes() {
      return this.generator.supportedRelations.map(id => RELATION_META[id])
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
