import GeneratorList from './pages/list'
import GeneratorShow from './pages/show'
import GeneratorBuild from './pages/build'

export default [
  {
    path: '/generators',
    component: GeneratorList
  },
  {
    path: '/generators/:id',
    name: 'GeneratorShow',
    props: true,
    component: GeneratorShow
  },
  {
    path: '/generators/:id/build',
    name: 'GeneratorBuild',
    props: true,
    component: GeneratorBuild
  }
]
