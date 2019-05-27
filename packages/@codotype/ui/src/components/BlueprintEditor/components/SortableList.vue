<template>
  <b-row>
    <b-col lg=12>

      <div :id='`${scope}-detail`' class="card">

        <div class="card-header p-2 d-flex align-items-center justify-content-between">

          <span>
            <NewModalButton
              :id="'add-' + scope + '-button'"
              :vuexAction="'editor/schema/' + scope + '/newModel'"
            />
            <strong class='text-muted ml-2'>{{ label }}</strong>

            <HelpPopover
              :target="'add-' + scope + '-button'"
              placement="right"
              :content="'Add ' + label">
            </HelpPopover>
          </span>


          <span class='text-muted pr-2' v-if="collection.length > 1">
            <i v-if="collapsed" class="fa collapse-icon fa-chevron-down" @click="collapsed = !collapsed"></i>
            <i v-else class="fa collapse-icon fa-chevron-down fa-rotate-180" @click="collapsed = !collapsed"></i>
          </span>

        </div>

        <div :id='`${scope}-detail`'>
          <draggable
            v-if="scope === 'attribute' && ((collection.length && !collapsed) || collection.length == 1)"
            class='list-group list-group-flush reflow-target'
            v-model='collection'
            :animation="150"
            :fallbackTolerance="100"
          >
            <AttributeListItem
              v-for="item in collection"
              :key="item.id"
              :item="item">
            </AttributeListItem>
          </draggable>

          <draggable
            v-if="scope === 'relation' && ((collection.length && !collapsed) || collection.length == 1)"
            class='list-group list-group-flush'
            v-model='collection'
            :animation="150"
            :fallbackTolerance="100"
          >
            <RelationListItem
              v-for="item in collection"
              :key="item.id"
              :item="item">
            </RelationListItem>
          </draggable>

          <b-list-group flush v-else-if="!collection.length">
            <b-list-group-item class="text-center">

              <!-- <span class='text-muted'>¯\_(ツ)_/¯</span> -->
              <!-- <br> -->
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
    this.$smoothReflow({ el: '.reflow-target' })
  },
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    collection: {
      get () {
        return this.$store.getters[`editor/schema/${this.scope}/collection/items`]
      },
      set (value) {

        // Ensures only truthy values
        value = value.filter(s => !!s)

        // Sets `order` attribute on each item
        value.forEach((s, i) => { s.order = i })

        // Sorts the values by `order` attribute before commiting to the Vuex store
        value = orderBy(value, ['order'], ['asc'])

        // Commits the sorted list to the store
        this.$store.commit(`editor/schema/${this.scope}/collection/items`, value)

        // Updates the selectedSchema's attributes or relations
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

<style lang="sass">
  i.fa.collapse-icon
    cursor: pointer
    transition: all 0.2s ease-in-out
    &:hover
      color: black
</style>
