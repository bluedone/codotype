import GeneratorList from './pages/list'
import GeneratorShow from './pages/show'

export default [
  {
    path: '/generators',
    component: GeneratorList
  },
  {
    path: '/generators/:id',
    component: GeneratorShow,
    name: 'GeneratorShow',
    props: true
  }
]
