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

        <b-list-group flush v-if="collection[0]">
          <AttributeListItem v-for="item in collection" :key="item.id" :item="item" />
        </b-list-group>

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
import { mapGetters } from 'vuex'
import NewModalButton from '../NewModalButton'
import AttributeListItem from './AttributeListItem'

export default {
  name: 'AttributeList',
  components: {
    NewModalButton,
    AttributeListItem
  },
  computed: mapGetters({
    collection: 'editor/schema/attribute/collection/items'
  })
}
</script>
