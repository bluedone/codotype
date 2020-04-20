<template>
  <div class="card col-lg-12 shadow-hover border-light">
    <div class="card-body">
      <div class="row d-flex align-items-end flex-column">

        <div class="col-lg-12 d-flex justify-content-center">
          <p class="lead mb-0">
            <b-btn variant="link" :to="`/generators/${model.id}`" class="d-flex align-items-center flex-column" style='text-decoration: none'>
              <img class='generator-icon mb-2' :src="model.icon"/>
              {{ model.label }}
            </b-btn>
          </p>
        </div>

        <div class="col-lg-12">
          <p class="card-text mt-2">
            <small>
              {{ model.description }}
            </small>
          </p>
        </div>

      </div>
    </div>

    <div class="card-footer bg-white">
      <small>
        <a class='text-muted' :href="model.github_url">
          <i class="fab fa-github" />
          codotype
        </a>
        <span class='badge badge-light text-muted'>{{ model.version }}</span>
        <span class='badge badge-warning' v-if="model.official">Official</span>
        <br>
        <span class='badge badge-primary mr-1' v-for="tag in model.type_tags.slice(0,1)" :key="tag">{{ tag }}</span>
        <span class='badge badge-light mr-1' v-for="tag in model.tech_tags.slice(0,3)" :key="tag">{{ tag }}</span>
        <!-- <span class='badge badge-info' v-if="model.self_configuring">Self-Configuring</span> -->
      </small>
    </div>

    <!-- <div class="card-footer"> -->
      <!-- <div class="row"> -->
        <!-- <b-col> -->
          <!-- <button class="btn btn-outline-primary btn-block"> -->
            <!-- <i class="fa fa-check" /> -->
          <!-- </button> -->
          <!-- <span class='badge badge-primary mr-1' v-for="tag in model.type_tags.slice(0,3)" :key="tag">{{ tag }}</span> -->
          <!-- <br> -->
          <!-- <span class='badge badge-light mr-1' v-for="tag in model.tech_tags.slice(0,3)" :key="tag">{{ tag }}</span> -->
        <!-- </b-col> -->
      <!-- </div> -->
    <!-- </div> -->

  </div>
</template>

<script>
export default {
  name: 'GeneratorCard',
  props: {
    model: {
      type: Object,
      required: true
    }
  }
}
</script>
