<template>
  <div class="h-100 d-flex flex-row justify-content-center align-items-center">
    <div class="col-sm-12 col-md-8 col-lg-6">
      <div class="card card-body text-center shadow-sm">
        <h3>codotype <span class='light'>is generating your codebase</span></h3>
        <small class="text-muted">
          This should only take a few moments
          <i class="far fa-laugh" />
        </small>
        <div class="row my-4">
          <div class="col-lg-12 text-center d-flex justify-content-center">
            <LoadingSpinner class="my-2" />
          </div>
        </div>
        <small class="text-muted">
          I have no patience with dinosaurs.
          <br>
          - <strong>Adam West</strong>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '../../../components/LoadingSpinner'
export default {
  name: 'LoadingBuild',
  components: {
    LoadingSpinner
  }
}
</script>

<style scoped>
  span.light {
    font-weight: 100;
  }
</style>
