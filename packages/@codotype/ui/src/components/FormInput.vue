<template>
  <div class="form-group">
    <label>
      {{ label }}
      <span class='text-danger' v-if="required">*</span>
    </label>
    <small class="form-text text-muted" v-if="example && help">{{example}}<br>{{help}}</small>
    <small class="form-text text-muted" v-else-if="help">{{help}}</small>

    <toggle-button
      v-if="type === 'BOOL'"
      ref="input_el"
      :value="value"
      :color="'#4582EC'"
      @change="updateModel()"
    />

    <input
      v-else-if="type === 'INTEGER'"
      type="number"
      step="1"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    />

    <input
      v-else-if="type === 'FLOAT'"
      type="number"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    />

    <input
      v-else-if="type === 'DECIMAL'"
      type="number"
      step="0.01"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    />

    <input
      v-else-if="type === 'DATE'"
      type="date"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    />

    <input
      v-else-if="type === 'TIME'"
      type="time"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    />

    <input
      v-else-if="type === 'DATETIME'"
      type="datetime-local"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    />

    <input
      v-else
      type="text"
      ref="input_el"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateModel()"
    />

  </div>
</template>

<script>
// TODO - update this to leverage Codotype DATATYPES
// TODO - clean up these props, damn
export default {
  props: ['required', 'focus', 'label', 'type', 'example', 'help', 'ex', 'help', 'placeholder', 'value'],
  mounted () {
    if (this.focus) {
      setTimeout(() => { this.$refs.input_el.focus() }, 200) // Minor delay for input element focus
    }
  },
  methods: {
    updateModel () {
      if (this.type === 'BOOL') {
        this.$emit('input', this.$refs.input_el.toggled)
      } else if (['INTEGER', 'FLOAT', 'DECIMAL'].includes(this.type)) {
        this.$emit('input', Number(this.$refs.input_el.value))
      } else {
        this.$emit('input', this.$refs.input_el.value)
      }
    }
  }
}
</script>

<style lang="sass">
  .form-group
    label
      margin-bottom: 0
    small
      margin-bottom: .6rem
</style>
