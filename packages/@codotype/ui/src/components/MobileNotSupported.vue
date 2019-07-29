<template>
  <div class="mobile-not-supported-wrapper">
    <div class="mobile-not-supported-content">
      <img
        src="https://res.cloudinary.com/codotype/image/upload/c_scale,w_200/v1560045005/tech-logos/codotype.png"
        width="80px"
        height="80px"
      />
      <h3 class="mt-3">Mobile Not Supported</h3>
      <p>
        <strong>Uh oh</strong> - it looks like your screen is too small to use Codotype. Please increase your browser size or visit on a larger device.
      </p>

      <p>
        In the meantime, feel free to give us a <i class="fa fa-fw text-warning fa-star" /> on <a href="https://github.com/codotype/codotype" target='_blank'><i class="fab fa-fw fa-github-alt" />GitHub</a>, follow us on <a href="https://twitter.com/codotype" target='_blank'><i class="fab fa-fw fa-twitter" />Twitter</a>, or visit our <a href="https://codotype.io" target='_blank'>homepage</a>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileNotSupported',
}
</script>

<style lang="css" scoped>
.mobile-not-supported-wrapper {
  display: none;
}

@media screen and (max-width: 768px) {
  .mobile-not-supported-wrapper {
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0,0,0,0.87);
  }

  .mobile-not-supported-content {
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0 47px;
    width: 100%;
  }
}

</style>
