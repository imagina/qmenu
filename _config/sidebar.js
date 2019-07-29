const pages = config('pages') // Get Pages from config

//Menu
export default [
  {
    title: 'qmenu.sidebar.adminGroup',
    icon: 'fas fa-ellipsis-h',
    children: [
      pages.qmenu.menus,//menus index
      pages.qmenu.menuItems,//menuitems index
    ]
  },
]
