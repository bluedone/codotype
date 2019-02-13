<template>
  <div class="row">
    <div class="col-lg-12">

      <span class='d-flex align-items-center'>
        <OptionFormItemIcon class="mr-3" :model="model" v-if="model.icon" />
        <label class='mb-0'>{{model.label}}</label>
        <span class='ml-1 text-danger' v-if="model.required">*</span>
        <MoreInfoLink class='mx-3' :url="model.more_info_url" />

        <toggle-button
          v-if="model.type === DATATYPE_BOOLEAN"
          ref="input"
          :value="getValue(model.identifier)"
          :color="'#4582EC'"
          class='mr-3 mb-0'
          @change="updateModel()"
        />
      </span>

      <small class='mt-2' v-html="model.help"></small>

    </div>

    <div class="col-lg-12 mt-2" v-if="model.type !== DATATYPE_BOOLEAN">

      <input
        v-if="model.type === DATATYPE_STRING"
        :value="getValue(model.identifier)"
        :placeholder="model.label"
        class='form-control'
        type="text"
        ref="input"
        @input="setValue({ attr: model.identifier, value: $event.target.value })"
      />

      <select
        v-if="model.type === DATATYPE_STRING_SELECT"
        class='form-control'
        :value="getValue(model.identifier)"
        type="text"
        ref="input"
        @change="setValue({ attr: model.identifier, value: $event.target.value })"
      >
        <option :value="opt.value" v-for="opt in model.options" :key="opt.id">{{opt.label}}</option>
      </select>

      <ul class='list-group' v-if="model.type === DATATYPE_BOOLEAN_GROUP">

        <li class='list-group-item d-flex align-items-center'
          v-for="opt in model.options"
          :key="opt.identifier">

          <toggle-button
            ref="input"
            :value="getValue(model.identifier)"
            :color="'#4582EC'"
            class='mb-0 mr-3'
            @change="updateModel()"
          />

          <label class='mb-0 mr-2'>{{opt.label}}</label>
          <i class="fa fa-question-circle text-muted" v-b-tooltip.hover.right :title="opt.help"></i>
          <!-- <MoreInfoLink class='ml-3 mb-2' :url="opt.more_info_url" /> -->
        </li>

      </ul>

      <OptionPreview
        v-if="model.previewTemplate"
        :model="{ value: getValue(model.identifier) }"
        :schema="schema"
        :template="model.previewTemplate"
      >
      </OptionPreview>

    </div>
  </div>
</template>

<script>
import {
  DATATYPE_STRING,
  DATATYPE_STRING_SELECT,
  DATATYPE_BOOLEAN,
  DATATYPE_BOOLEAN_GROUP,
  DATATYPE_NUMBER_INTEGER,
  DATATYPE_NUMBER_FLOAT,
  DATATYPE_NUMBER_DOUBLE
} from '@codotype/types/lib/datatypes'

import OptionPreview from './OptionTemplateRenderer'
import MoreInfoLink from '../../../components/MoreInfoLink'
import OptionFormItemIcon from './OptionFormItemIcon'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'OptionFormitem',
  props: ['group', 'model', 'schema'],
  components: {
    OptionPreview,
    OptionFormItemIcon,
    MoreInfoLink
  },
  beforeCreate () {
    // Isolates the 'module' prop
    let group = this.$options.propsData.group
    let model = this.$options.propsData.model
    let schema = this.$options.propsData.schema

    function updateModel () { // NOTE - DOES NOT WORK WITH ADDONS!
      if (this.model.type === DATATYPE_BOOLEAN) {
        this.setValue({ attr: this.model.identifier, value: this.$refs.input.toggled })
      } else if ([DATATYPE_NUMBER_INTEGER, DATATYPE_NUMBER_FLOAT, DATATYPE_NUMBER_DOUBLE].includes(this.model.type)) {
        this.setValue({ attr: this.model.identifier, value: Number(this.$refs.input.value) })
      } else {
        this.setValue({ attr: this.model.identifier, value: this.$refs.input.value })
      }
    }

    // OPTION_GROUP_TYPE_MODEL_OPTION
    if (group.type === 'OPTION_GROUP_TYPE_GLOBAL_OPTION') {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: `build/editor/data/${group.identifier}/valueOf`
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: `build/editor/data/${group.identifier}/value`
        })
      }
    } else if (group.type === 'OPTION_GROUP_TYPE_MODEL_OPTION') {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: `build/editor/data/${group.identifier}/${schema.identifier}/valueOf`
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: `build/editor/data/${group.identifier}/${schema.identifier}/value`
        })
      }
    } else if (group.type === 'OPTION_GROUP_TYPE_MODEL_ADDON') {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: `build/editor/addon/newModelAttr`
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: `build/editor/addon/newModelAttr`
        })
      }
    }
  },
  data () {
    return {
      DATATYPE_STRING,
      DATATYPE_STRING_SELECT,
      DATATYPE_BOOLEAN,
      DATATYPE_BOOLEAN_GROUP,
      DATATYPE_NUMBER_INTEGER,
      DATATYPE_NUMBER_FLOAT,
      DATATYPE_NUMBER_DOUBLE
    }
  },
  mounted () {
    // TODO - this should be abstracted to buildConfiguration
    if (!this.$refs.input) { return }
    if (!this.$refs.input.value && this.model.default_value) {
      this.$refs.input.value = this.model.default_value
    }
  }
}
</script>
