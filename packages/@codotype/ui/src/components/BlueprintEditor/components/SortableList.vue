<template>
  <b-row>
    <b-col lg=12>

      <div class="card" id='attribute-detail'>

        <div class="card-header d-flex align-items-center p-2">

          <NewModalButton
            :id="'add-' + scope + '-button'"
            :vuexAction="'editor/schema/' + scope + '/newModel'"
          />

          <HelpPopover
            :target="'add-' + scope + '-button'"
            placement="right"
            :content="'Add ' + label">
          </HelpPopover>

          <span class='ml-2'>
            <strong>{{ label }}</strong>
          </span>

        </div>

        <draggable
          v-if="collection.length"
          class='list-group list-group-flush'
          v-model='collection'
          :options="sortableOptions"
        >

          <AttributeListItem
            v-if="scope === 'attribute'"
            v-for="item in collection"
            :key="item.id"
            :item="item">
          </AttributeListItem>

          <RelationListItem
            v-else-if="scope === 'relation'"
            v-for="item in collection"
            :key="item.id"
            :item="item">
          </RelationListItem>

        </draggable>

        <b-list-group flush v-else>
          <b-list-group-item class="text-center text-primary">
            <i class="fa fa-lg fa-info-circle"></i>
            <!-- TODO - Click to add your first MODEL -->
            <p class="mb-0 mt-1">{{ info }}</p>
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
import NewModalButton from './NewModalButton'
import AttributeListItem from './attribute/AttributeListItem'
import RelationListItem from './relation/RelationListItem'
import HelpPopover from '../../HelpPopover'

export default {
  name: 'SortableList',
  props: {
    scope: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    info: {
      type: String,
      required: true
    }
  },
  mixins: [smoothReflow],
  components: {
    draggable,
    HelpPopover,
    NewModalButton,
    AttributeListItem,
    RelationListItem
  },
  mounted () {
    this.$smoothReflow()
  },
  computed: {
    sortableOptions () {
      return {
        animation: 150,
        fallbackTolerance: 100
      }
    },
    // TODO - this should be moved into Vuex store, but how?
    collection: {
      get () {
        return orderBy(this.$store.getters[`editor/schema/${this.scope}/collection/items`], ['order'], ['asc'])
      },
      set (value) {
        value.forEach((s, i) => { s.order = i })
        this.$store.commit(`editor/schema/${this.scope}/collection/items`, value)
      }
    }
  }
}
</script>
