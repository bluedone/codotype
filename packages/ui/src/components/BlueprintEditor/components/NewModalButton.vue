<template>
  <b-button
    variant="primary"
    size="sm"
    @click="$store.dispatch(vuexAction, true)"
  >
    <i class="fa fa-fw fa-plus"></i>
  </b-button>
</template>

<script>
export default {
  name: 'NewModalButton',
  props: {
    'vuexAction': {
      type: String,
      required: true
    },
  }
}
</script>
