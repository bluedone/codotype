<template>
  <span class='badge badge-dark mr-1'>Version {{ model.version }}</span>
</template>

<script>
export default {
  props: {
    model: {
      required: true
    }
  }
}
</script>
