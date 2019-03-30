
<template>
  <div class="col-sm-6 pb-2">
    <button class='btn btn-outline-dark mt-2 btn-block text-left active' v-if="opt.value === val" @click="click(opt.value)">
      <i :class="'mr-1 ' + opt.icon"></i>
      {{opt.label}}
      <br>
      <small class='text-muted'>{{opt.desc}}</small>
    </button>

    <button class='btn btn-outline-dark mt-2 btn-block text-left' v-else @click="click(opt.value)">
      <i :class="'mr-1 ' + opt.icon"></i>
      {{opt.label}}
      <br>
      <small text-muted>{{opt.desc}}</small>
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
