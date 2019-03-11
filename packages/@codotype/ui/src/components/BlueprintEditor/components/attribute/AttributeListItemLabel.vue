<template>
  <span class="badge" v-if="item.datatype !== 'RELATION'">
    <i :class="'mr-2 ' + icon" v-b-tooltip.hover.left :title='tooltip'></i>
    {{item.label}}
    <span class='text-danger' v-if="item.required">*</span>
    <b-badge
      v-if="item.unique"
      class='ml-2'
      variant="light"
      title="Unique"
      v-b-tooltip.hover.right
    >
      <i class="fas fa-snowflake"></i>
    </b-badge>
  </span>
</template>

<script>
import DATATYPE_META from '@codotype/types/lib/meta.js'

export default {
  name: 'AttributeListItemLabel',
  props: {
    item: {
      required: true
    }
  },
  computed: {
    icon () {
      return DATATYPE_META[this.item.datatype].icon
    },
    tooltip () {
      return DATATYPE_META[this.item.datatype].text
    }
  }
}
</script>

<style lang='sass'>

  .badge
    font-weight: 300
    padding: .3rem .3rem

</style>
