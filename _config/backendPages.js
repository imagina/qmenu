//Layout container
import master from 'src/layouts/master'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
  //Menu List
  menus: {
    permission: null,
    activated: true,
    path: '/imenu/menus',
    name: 'qmenu.menus.index',
    layout: require('@imagina/qmenu/_layouts/admin/menus/index').default,
    containerLayout: master,
    title: 'Menus',
    icon: 'fas fa-clipboard-list',
    middleware: [auth,access]
  },
  //MenuItem List
  menuitems: {
    permission: null,
    activated: true,
    path: '/imenu/menuitems',
    name: 'qmenu.menuitems.index',
    layout: require('@imagina/qmenu/_layouts/admin/menuitems/index').default,
    containerLayout: master,
    title: 'Item List',
    icon: 'fas fa-stream',
    middleware: [auth,access]
  },
}
