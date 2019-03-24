<template>
  <b-row>
    <b-col lg=12>

      <div class="card" :id='`${scope}-detail`'>

        <div class="card-header d-flex align-items-center justify-content-between p-2">

          <span>
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

          </span>

          <span class='mr-2' v-if="collection.length">
            <i v-if="collapsed" class="fa fa-chevron-down" @click="collapsed = !collapsed"></i>
            <i v-else class="fa fa-chevron-up" @click="collapsed = !collapsed"></i>
          </span>

        </div>

        <draggable
          v-if="collection.length && !collapsed"
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
            v-if="scope === 'relation'"
            v-for="item in collection"
            :key="item.id"
            :item="item">
          </RelationListItem>

        </draggable>

        <b-list-group flush v-else-if="!collection.length">
          <b-list-group-item class="text-center">

            <img style="width: 2rem;" :src="icon">
            <br>
            <strong class="mb-0 mt-1 text-muted">{{ title }}</strong>
            <br>
            <small class="text-muted">{{ info }}</small>
            <br>
            <b-btn
              size="sm"
              class='btn-rounded mt-2'
              variant="outline-primary"
              @click="$store.dispatch('editor/schema/' + scope + '/newModel')"
            >
              <i class="fa fa-plus"></i>
              Add {{ label }}
            </b-btn>
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
    title: {
      type: String,
      required: true
    },
    icon: {
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
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    sortableOptions () {
      return {
        animation: 150,
        fallbackTolerance: 100
      }
    },
    collection: {
      get () {
        return orderBy(this.$store.getters[`editor/schema/${this.scope}/collection/items`], ['order'], ['asc'])
      },
      set (value) {
        value.forEach((s, i) => { s.order = i })
        this.$store.commit(`editor/schema/${this.scope}/collection/items`, value)
        if (this.scope === 'attribute') {
          this.$store.dispatch('editor/schema/updateAttributes')
        } else {
          this.$store.dispatch('editor/schema/updateRelations')
        }
      }
    }
  }
}
</script>
