<template>
  <b-row>
    <b-col lg=12>

      <div class="card" id='attribute-detail'>

        <!-- Attribute card header -->
        <div class="card-header d-flex justify-content-between align-items-center">

          <span>
            <i class="fa fa-tags mr-1"></i>
            Attributes
          </span>

          <NewModalButton
            id="add-attribute-button"
            vuexAction="editor/schema/attribute/newAttribute"
          />

        </div>

        <!-- <b-list-group flush v-if="collection[0]"> -->
        <!-- </b-list-group> -->

        <draggable class='list-group list-group-flush'
          v-model='collection'
          :options="sortableOptions"
          v-if="collection.length"
        >
          <AttributeListItem v-for="item in collection" :key="item.id" :item="item" />
        </draggable>

        <b-list-group flush v-else>
          <b-list-group-item class="text-center text-primary">
            <i class="fa fa-lg fa-info-circle"></i>
            <p class="mb-0 mt-1">
              <!-- TODO - Click to add your first Attribute -->
              Attributes define properties that can be assigned to a single model
            </p>
          </b-list-group-item>
        </b-list-group>

      </div>

    </b-col>
  </b-row>
</template>

<script>
import orderBy from 'lodash/orderBy'
import draggable from 'vuedraggable'
import smoothReflow from 'vue-smooth-reflow'
import NewModalButton from '../NewModalButton'
import AttributeListItem from './AttributeListItem'

export default {
  name: 'AttributeList',
  mixins: [smoothReflow],
  components: {
    draggable,
    NewModalButton,
    AttributeListItem
  },
  mounted () {
    this.$smoothReflow()
  },
  computed: {
    // ...mapGetters({
    //   collection: 'editor/schema/attribute/collection/items'
    // }),
    sortableOptions () {
      return {
        animation: 150,
        fallbackTolerance: 100
      }
    },
    // TODO - this should be moved into Vuex store, but how?
    collection: {
      get () {
        return orderBy(this.$store.getters['editor/schema/attribute/collection/items'], ['order'], ['asc'])
      },
      set (value) {
        value.forEach((s, i) => { s.order = i })
        this.$store.commit('editor/schema/attribute/collection/items', value)
      }
    }
  }
}
</script>
