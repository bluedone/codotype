import SchemaDetailHelp from './partials/SchemaDetailHelp.html'
import NewSchemaButtonHelp from './partials/NewSchemaButtonHelp.html'
import AttributeListHelp from './partials/AttributeListHelp.html'
import RelationListHelp from './partials/RelationListHelp.html'
import SchemaPreviewHelp from './partials/SchemaPreviewHelp.html'
import ConfigurationHelp from './partials/ConfigurationHelp.html'

export const APP_EDITOR_TOUR = [
  {
    element: '#new-schema-button',
    popover: {
      title: 'Schemas',
      description: SchemaDetailHelp,
      position: 'right'
    }
  },
  {
    element: '#attribute-detail',
    popover: {
      title: 'Attributes',
      description: AttributeListHelp,
      position: 'left'
    }
  },
  {
    element: '#relation-detail',
    popover: {
      title: 'Relations',
      description: RelationListHelp,
      position: 'left'
    }
  },
  {
    element: '#schema-preview',
    popover: {
      title: 'Preview',
      description: SchemaPreviewHelp,
      position: 'left'
    }
  },
  {
    element: '#configuration',
    popover: {
      title: 'Configuration',
      description: ConfigurationHelp,
      position: 'top'
    }
  }
]
