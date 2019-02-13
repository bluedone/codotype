import GeneratorList from './pages/list'
import GeneratorShow from './pages/show'

export default [
  {
    path: '/generators',
    component: GeneratorList
  },
  // TODO - add an additional page - generators/:id/build
  // This specific route should encapsulate a series of sub-routes
  // for the GeneratorShow and GeneratorBuild pages
  {
    path: '/generators/:id',
    component: GeneratorShow,
    name: 'GeneratorShow',
    props: true
  }
]
