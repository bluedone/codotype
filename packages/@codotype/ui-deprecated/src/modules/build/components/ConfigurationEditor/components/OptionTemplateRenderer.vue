<template>
  <v-runtime-template :template="template"></v-runtime-template>
</template>

<script>
export default {
  props: {
    model: { required: true },
    schema: { required: false },
    template: { required: true }
  }
}
</script>
