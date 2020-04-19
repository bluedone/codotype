<template>
  <img
    id="loading"
    src="https://res.cloudinary.com/codotype/image/upload/c_scale,w_200/v1560045005/tech-logos/codotype.png"
    width="100px"
    height="100px"
  />
</template>

<script>
export default {
  name: 'LoadingSpinner'
}
</script>

<style type="text/css">
#loading {
  -webkit-animation: rotation 1000ms infinite cubic-bezier(0.62, 0.23, 0.01, 0.83)
}

@-webkit-keyframes rotation {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(359deg);
    }
}
</style>
