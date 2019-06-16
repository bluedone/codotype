<template>
  <div class="row d-flex align-items-center h-100 justify-content-center">
    <div class="col-sm-12 col-md-8 col-lg-6">
      <div class="card card-body shadow-sm">

        <div class="row">
          <div class="col-lg-12 text-center">
            <p class="title">
              <strong>Uh oh.</strong>
              <br />
              Something went wrong
            </p>
            <p class="lead mb-2">
              <i class="fas fa-lg fa-heart-broken text-danger"></i>
            </p>
            <small class="text-muted">
              Suspense is worse than disappointment
              <br />
              - <strong>Robert Burns</strong>
            </small>
          </div>
        </div>

        <div class="row d-flex justify-content-center mt-3">
          <div class="col-lg-6 text-center">
            <router-link
              class="w-100" to="https://codotype.io">
              <!-- <i class="fa fa-fw fa-reply"></i> -->
              Take me home
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuildError',
  metaInfo: {
    title: 'Error :('
  }
}
</script>

<style scoped>
  p.title {
    font-size: 1.25rem;
  }
</style>
