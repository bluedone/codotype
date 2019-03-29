<template>
  <b-button
    variant="primary"
    size="sm"
    class="btn-rounded"
    @click="$store.dispatch(vuexAction, true)"
  >
    <i class="fa fa-plus"></i>
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

<style type="text/css">
  .btn-rounded {
    border-radius: 1rem;
  }
</style>
