<template>
  <div class="card px-2 py-2">
    <span class="text-muted">
      Preview
      <i class="fa fa-info-circle fa-xs" title="TODO - this should be templated as well!" v-b-tooltip.hover.right></i>
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

// TODO - this component should ONLY render the template
export default {
  props: {
    model: { required: true },
    schema: { required: false },
    template: { required: true }
  },
  components: {
    OptionTemplateRenderer
  }
}
</script>
