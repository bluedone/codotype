<template>
  <small>
    <i :class="'mr-1 fa-fw ' + icon" v-b-tooltip.hover.left :title='tooltip'></i>
    {{item.label}}
    <span class='text-danger' v-if="item.required">*</span>

    <b-badge
      v-if="index === 0"
      class='ml-2'
      variant="light"
      title="Title Attribute"
      v-b-tooltip.hover.right
    >
      <i class="fa text-primary fa-tag" />
    </b-badge>

    <b-badge
      v-if="item.unique"
      class='ml-2'
      variant="light"
      title="Unique"
      v-b-tooltip.hover.right
    >
      <i class="fas fa-snowflake" />
    </b-badge>
  </small>
</template>

<script>
import DATATYPE_META from '@codotype/types/lib/datatype-meta'

export default {
  name: 'AttributeListItemLabel',
  props: {
    item: {
      required: true
    },
    index: {
      required: true
    }
  },
  computed: {
    icon () {
      return DATATYPE_META[this.item.datatype].icon
    },
    tooltip () {
      return DATATYPE_META[this.item.datatype].label
    }
  }
}
</script>

<style lang='sass'>

  .badge
    font-weight: 300
    padding: .3rem .3rem

</style>
