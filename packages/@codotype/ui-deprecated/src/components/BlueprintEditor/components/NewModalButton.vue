<template>
  <button
    :disabled="disabled"
    class="btn btn-primary btn-sm"
    @click="$store.dispatch(vuexAction, true)"
  >
    <i class="fa fa-plus" />
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
    disabled: {
      type: Boolean
    },
  }
}
</script>
