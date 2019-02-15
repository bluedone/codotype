<!-- TODO - this should really be an entire separate Editor component -->
<!-- Should not even be SCOPED to the generator module -->
<template>
  <b-row class='justify-content-center'>
    <b-col lg=9>

      <!-- Header - Description -->
      <!-- <small class="text-muted">{{group.description}}</small> -->

      <!-- Define new instance -->
      <div
        class="card card-body mt-2"
        v-for="attr in group.attributes"
        :key="attr.identifier"
      >
        <OptionFormItem
          :group="group"
          :model="attr"
        />
      </div>

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OptionFormItem from '../../option/components/OptionFormItem'

export default {
  name: 'GlobalOptionEditor',
  props: {
    group: { required: true }
  },
  components: {
    OptionFormItem
  }
}
</script>
