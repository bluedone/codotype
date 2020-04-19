// Blueprint Containers
import BlueprintList from './pages/list'
import BlueprintShow from './pages/show'

export default [
  {
    path: '/blueprints',
    name: 'BlueprintList',
    component: BlueprintList
  },
  {
    path: '/blueprints/:blueprint_id',
    name: 'BlueprintShow',
    component: BlueprintShow,
    props: true
  }
]
