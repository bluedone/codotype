<template>
  <div class="h-100 d-flex flex-row justify-content-center align-items-center">
    <div class="col-lg-8">
      <div class="card card-body text-center shadow-sm">
        <p class="title"><strong>Codotype</strong> is generating your codebase</p>
        <small class="text-muted">
          This should only take a few moments
          <i class="far fa-laugh" />
        </small>
        <div class="row my-4">
          <div class="col-lg-12 text-center d-flex justify-content-center">
            <i class="fa fa-fw fa-spinner fa-3x fa-spin my-3" />
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
export default {
  name: 'LoadingBuild'
}
</script>

<style scoped>
  p.title {
    font-size: 1.25rem;
  }
</style>
