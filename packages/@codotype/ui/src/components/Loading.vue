<template>
  <div class="h-100 d-flex flex-row align-items-center">
    <b-container>
      <b-row>
        <div class="col-sm-12 text-center">
          <LoadingSpinner />
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import LoadingSpinner from './LoadingSpinner'
export default {
  name: 'Loading',
  components: {
    LoadingSpinner
  }
}
</script>
