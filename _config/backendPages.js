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
  //Menu Create
  menuCreate: {
    permission: null,
    activated: true,
    path: '/imenu/menus/create',
    name: 'qmenu.menus.create',
    layout: require('@imagina/qmenu/_layouts/admin/menus/form').default,
    containerLayout: master,
    title: 'Menus create',
    icon: 'fas fa-clipboard-list',
    middleware: [auth,access]
  },
  //Menu Edit
  menuEdit: {
    permission: null,
    activated: true,
    path: '/imenu/menus/:id',
    name: 'qmenu.menus.edit',
    layout: require('@imagina/qmenu/_layouts/admin/menus/form').default,
    containerLayout: master,
    title: 'Menus edit',
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
  //MenuItem create
  menuitemsCreate: {
    permission: null,
    activated: true,
    path: '/imenu/menuitems/create',
    name: 'qmenu.menuitems.create',
    layout: require('@imagina/qmenu/_layouts/admin/menuitems/form').default,
    containerLayout: master,
    title: 'Item Create',
    icon: 'fas fa-stream',
    middleware: [auth,access]
  },
  //MenuItem edit
  menuitemsEdit: {
    permission: null,
    activated: true,
    path: '/imenu/menuitems/:id',
    name: 'qmenu.menuitems.edit',
    layout: require('@imagina/qmenu/_layouts/admin/menuitems/form').default,
    containerLayout: master,
    title: 'Item Edit',
    icon: 'fas fa-stream',
    middleware: [auth,access]
  },
}
