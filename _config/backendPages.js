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
  menusShow: {
    permission: null,
    activated: true,
    path: '/imenu/menus/:id',
    name: 'qmenu.admin.menus.show',
    layout: require('@imagina/qmenu/_layouts/admin/menus/show').default,
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
  menuItemsCreate: {
    permission: null,
    activated: true,
    path: '/imenu/menuitems/:menuId',
    name: 'qmenu.admin.menu.create',
    layout: require('@imagina/qmenu/_layouts/admin/menuitems/form').default,
    containerLayout: master,
    title: 'qmenu.sidebar.adminMenuItems',
    icon: 'fas fa-circle',
    middleware: [auth,access]
  },
  menuItemsUpdate: {
    permission: null,
    activated: true,
    path: '/imenu/menuitems/:menuid/:id',
    name: 'qmenu.admin.menu.update',
    layout: require('@imagina/qmenu/_layouts/admin/menuitems/form').default,
    containerLayout: master,
    title: 'qmenu.sidebar.adminMenuItems',
    icon: 'fas fa-circle',
    middleware: [auth,access]
  },
}
