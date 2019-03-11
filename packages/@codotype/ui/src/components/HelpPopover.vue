<template>
  <b-popover
    :target="target"
    :placement="placement"
    :triggers="triggers"
    :show="$store.getters['editor/help/showing']"
    :content="content">
  </b-popover>
</template>

<script>
export default {
  name: 'HelpPopover',
  props: {
    target: { required: true },
    content: { required: true },
    placement: { required: false },
    triggers: { default: () => [] }
  }
}
</script>
