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
    name: 'qmenu.admin.menus',
    layout: require('@imagina/qmenu/_layouts/admin/menus/index').default,
    containerLayout: master,
    title: 'qmenu.sidebar.adminMenus',
    icon: 'fas fa-stream',
    middleware: [auth,access]
  },
  //MenuItem List
  menuItems: {
    permission: null,
    activated: true,
    path: '/imenu/menuitems',
    name: 'qmenu.admin.menu.items',
    layout: require('@imagina/qmenu/_layouts/admin/menuitems/index').default,
    containerLayout: master,
    title: 'qmenu.sidebar.adminMenuItems',
    icon: 'fas fa-circle',
    middleware: [auth,access]
  },
}
