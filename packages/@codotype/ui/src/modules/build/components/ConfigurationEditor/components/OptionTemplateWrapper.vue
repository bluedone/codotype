<template>
  <div class="card px-2 py-2">
    <span class="text-muted">
      Preview
      <i
        v-if="tooltip"
        class="fa fa-info-circle fa-xs"
        :title="tooltip"
        v-b-tooltip.hover.right
      />
    </span>
    <hr class="mt-0">
    <OptionTemplateRenderer
      :model="model"
      :schema="schema"
      :template="template"
    />
  </div>
</template>

<script>
import OptionTemplateRenderer from './OptionTemplateRenderer'

export default {
  props: {
    model: { required: true },
    schema: { required: false },
    template: { required: true },
    tooltip: { type: String }
  },
  components: {
    OptionTemplateRenderer
  }
}
</script>
