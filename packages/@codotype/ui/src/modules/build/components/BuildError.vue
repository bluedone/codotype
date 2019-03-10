<template>
  <div class="row d-flex align-items-center h-100 justify-content-center">
    <div class="col-sm-12 col-md-8 col-lg-6">
      <div class="card card-body">

        <div class="row">
          <div class="col-lg-12 text-center">
            <p class="lead">
              Uh oh - something went wrong with Codotype
            </p>
            <p class="lead mb-2">
              <i class="fas fa-lg fa-heart-broken text-danger"></i>
            </p>
            <small class="text-muted">And it just breaks my little heart</small>
          </div>
        </div>

        <div class="row d-flex justify-content-center mt-3">
          <div class="col-lg-6 text-center">
            <router-link
              class="w-100" to="/">
              <i class="fa fa-fw fa-reply"></i>
              Take me back
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
