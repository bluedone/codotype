<template>
  <button
    class="btn btn-primary btn-sm"
    @click="$store.dispatch(vuexAction, true)"
  >
    <i class="fa fa-plus"></i>
  </button>
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
