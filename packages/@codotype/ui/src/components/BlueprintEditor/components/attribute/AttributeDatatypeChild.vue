
<template>
  <div class="col-sm-6 my-2">
    <button class='btn btn-outline-secondary btn-block text-left active' v-if="opt.value === val" @click="click(opt.value)">
      <i :class="'fa-fw mr-2 ' + opt.icon"></i>
      <strong>{{opt.label}}</strong>
      <small class='ml-2'>{{opt.desc}}</small>
    </button>

    <button class='btn btn-outline-secondary btn-block text-left' v-else @click="click(opt.value)">
      <i :class="'fa-fw mr-2 ' + opt.icon"></i>
      <strong>{{opt.label}}</strong>
      <small class='ml-2'>{{opt.desc}}</small>
    </button>
  </div>
</template>

<!-- // // // //  -->

<script>
export default {
  props: {
    opt: { required: true },
    val: { required: true },
    click: { required: true }
  }
}
</script>
