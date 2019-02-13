<template>
  <span class="badge" v-if="item.datatype !== 'RELATION'">
    <i :class="'mr-2 ' + icon" v-b-tooltip.hover.left :title='tooltip'></i>
    {{item.label}}
    <span class='text-danger' v-if="item.required">*</span>
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
