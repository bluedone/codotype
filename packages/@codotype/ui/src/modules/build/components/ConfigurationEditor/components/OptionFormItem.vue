<template>
  <div class="row">
    <div class="col-lg-12">

      <span class='d-flex align-items-center'>
        <OptionFormItemIcon class="mr-3" :model="attribute" v-if="attribute.icon" />
        <label class='mb-0'>{{attribute.label}}</label>
        <span class='ml-1 text-danger' v-if="attribute.required">*</span>
        <MoreInfoLink class='mx-3' :url="attribute.more_info_url" />

        <toggle-button
          v-if="attribute.type === DATATYPE_BOOLEAN"
          ref="input"
          :value="getValue({ group: group, schema: schema, attribute: attribute })"
          :color="'#4582EC'"
          class='mr-3 mb-0'
          @change="updateModel()"
        />
      </span>

      <small class='mt-2' v-html="attribute.help"></small>

    </div>

    <div class="col-lg-12 mt-2" v-if="attribute.type !== DATATYPE_BOOLEAN">

      <input
        v-if="attribute.type === DATATYPE_STRING"
        :value="getValue({ group: group, schema: schema, attribute: attribute })"
        :placeholder="attribute.label"
        class='form-control'
        type="text"
        ref="input"
        @input="setValue({ group: group, schema: schema, attribute: attribute, value: $event.target.value })"
      />

      <select
        v-if="attribute.type === DATATYPE_STRING_SELECT"
        class='form-control'
        :value="getValue({ group: group, schema: schema, attribute: attribute })"
        type="text"
        ref="input"
        @change="setValue({ group: group, schema: schema, attribute: attribute, value: $event.target.value })"
      >
        <option :value="opt.value" v-for="opt in attribute.options" :key="opt.id">{{opt.label}}</option>
      </select>

      <OptionTemplateWrapper
        class='mt-2'
        v-if="attribute.previewTemplate"
        :model="{ value: getValue({ group: group, schema: schema, attribute: attribute }) }"
        :schema="schema"
        :template="attribute.previewTemplate"
      >
      </OptionTemplateWrapper>

    </div>
  </div>
</template>

<script>
import {
  DATATYPE_STRING,
  DATATYPE_STRING_SELECT,
  DATATYPE_BOOLEAN,
  DATATYPE_INTEGER,
  DATATYPE_FLOAT
} from '@codotype/types/lib/datatypes'

import OptionTemplateWrapper from './OptionTemplateWrapper'
import MoreInfoLink from '../../../../../components/MoreInfoLink'
import OptionFormItemIcon from './OptionFormItemIcon'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'OptionFormitem',
  props: {
    group: { required: true },
    schema: { required: false },
    attribute: { required: true }
  },
  components: {
    OptionTemplateWrapper,
    OptionFormItemIcon,
    MoreInfoLink
  },
  beforeCreate () {
    // Isolates the 'module' prop
    let group = this.$options.propsData.group
    let schema = this.$options.propsData.schema
    let attribute = this.$options.propsData.attribute

    function updateModel () { // NOTE - DOES NOT WORK WITH ADDONS!
      if (this.attribute.type === DATATYPE_BOOLEAN) {
        this.setValue({
          group: this.group,
          schema: this.schema,
          attribute: this.attribute,
          value: this.$refs.input.toggled
        })
      } else if ([DATATYPE_INTEGER, DATATYPE_FLOAT].includes(this.attribute.type)) {
        this.setValue({
          group: this.group,
          schema: this.schema,
          attribute: this.attribute,
          value: Number(this.$refs.input.value)
        })
      } else {
        this.setValue({
          group: this.group,
          schema: this.schema,
          attribute: this.attribute,
          value: this.$refs.input.value
        })
      }
    }

    // OPTION_GROUP_TYPE_MODEL_OPTION
    if (group.type === 'OPTION_GROUP_TYPE_GLOBAL_OPTION') {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: 'build/editor/optionValue'
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: 'build/editor/optionValue'
        })
      }
    } else if (group.type === 'OPTION_GROUP_TYPE_MODEL_OPTION') {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: 'build/editor/modelOptionValue'
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: 'build/editor/modelOptionValue'
        })
      }
    } else if (group.type === 'OPTION_GROUP_TYPE_MODEL_ADDON') {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: 'build/editor/model_addon/newModelAttr'
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: 'build/editor/model_addon/newModelAttr'
        })
      }
    } else if (group.type === 'OPTION_GROUP_TYPE_GLOBAL_ADDON') {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: 'build/editor/global_addon/newModelAttr'
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: 'build/editor/global_addon/newModelAttr'
        })
      }
    }
  },
  data () {
    return {
      DATATYPE_STRING,
      DATATYPE_STRING_SELECT,
      DATATYPE_BOOLEAN,
      DATATYPE_INTEGER,
      DATATYPE_FLOAT
    }
  }
}
</script>
