 <template>
  <div class="row">
    <div class="col-lg-12">
      <b-tabs pills>
        <b-tab title="Cardinality">
          <div class="row mt-2">
            <div class="col-sm-12">
              <p class="lead mb-0">Cardinality</p>
              <p class="small text-muted"><span class="text-success">Cardinality</span> describes the nature of a <strong>Relation</strong> between two <strong>Schemas</strong></p>
              <hr />
            </div>
          </div>
          <RelationTypeForm />
        </b-tab>

        <b-tab title="Alias">
          <div class="row mt-2">
            <div class="col-sm-12">
              <p class="lead mb-0">Alias</p>
              <p class="small text-muted"><span class="text-success">Aliases</span> enable you to change the way <strong>Schemas</strong> refer to eachother <i>through</i> a <strong>Relation</strong>.</p>
              <hr />
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
import RelationTypeForm from './RelationTypeForm'
import RelationBadge from './RelationBadge'

export default {
  components: {
    RelationBadge,
    RelationTypeForm,
    RelationFormAlias,
  },
  created () {
    // TODO - this should be moved into the relationModule vuex store
    // Selects the schema_id related_schema_id property
    const relatedSchema = this.allSchemas.find(m => m.id !== this.selectedSchema.id)
    this.model.schema_id = this.selectedSchema.id
    this.model.related_schema_id = relatedSchema ? relatedSchema.id : this.selectedSchema.id
    this.$store.commit('editor/schema/relation/form/model', this.model)
  },
  computed: mapGetters({
    model: 'editor/schema/relation/form/model',
    allSchemas: 'editor/schema/collection/items',
    selectedSchema: 'editor/schema/selectedModel'
  })
}
</script>
