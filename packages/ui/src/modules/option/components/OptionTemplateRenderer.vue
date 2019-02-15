<template>
  <v-runtime-template :template="template"></v-runtime-template>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'

export default {
  props: {
    model: { required: true },
    schema: { required: true },
    template: { required: true }
  },
  components: {
    VRuntimeTemplate
  }
}
</script>
