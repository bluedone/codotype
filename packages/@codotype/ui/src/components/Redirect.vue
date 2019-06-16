<template>
  <div class="row h-100 align-items-center">
      <div class="col-lg-12 text-center">
        <h4>Redirecting...</h4>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  metaInfo: {
    title: 'Redirecting...'
  },
  props: {
    redirectUrl: {
      type: String,
      required: true
    }
  },
  created () {
    window.location = this.redirectUrl
  }
}
</script>
