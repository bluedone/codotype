<template>
  <span class='badge badge-success mr-1'>{{ model.experience }}</span>
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
