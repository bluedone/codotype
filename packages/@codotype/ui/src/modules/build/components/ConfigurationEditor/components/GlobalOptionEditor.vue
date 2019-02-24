<!-- TODO - this should really be an entire separate Editor component -->
<!-- Should not even be SCOPED to the generator module -->
<template>
  <b-row class='justify-content-center'>
    <b-col lg=12>

      <div
        class="card card-body mt-2"
        v-for="attr in group.attributes"
        :key="attr.identifier"
      >
        <OptionFormItem
          :group="group"
          :attribute="attr"
        />
      </div>

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OptionFormItem from './OptionFormItem'

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
