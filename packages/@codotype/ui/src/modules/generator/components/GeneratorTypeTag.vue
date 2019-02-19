<template>
  <span class='badge badge-primary mr-1'>{{ tag }}</span>
</template>

<script>
export default {
  props: {
    tag: {
      required: true
    }
  }
}
</script>
