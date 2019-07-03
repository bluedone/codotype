export const DEFAULT_OPTION = {
  _id: null,
  order: 0,
  label: 'Use Bootstrap 4',
  identifier: 'include_template',
  help: 'Whether or not to build the UI using Bootstrap 4.',
  more_info_url: 'https://getbootstrap.com',
  required: false,
  unique: false,
  type: '',
  default_value: true,
  datatypeOptions: {}
}

export const DEFAULT_ADDON = {
  _id: null,
  label: '',
  label_plural: '',
  identifier: '',
  identifier_plural: '',
  class_name: '',
  class_name_plural: '',
  description: '',
  more_info_url: '',
  attributes: [
    {
      order: 0,
      label: 'Label',
      identifier: 'label',
      help: '',
      required: true,
      unique: true,
      datatype: 'TEXT',
      default_value: '',
      datatypeOptions: {}
    }
  ]
}