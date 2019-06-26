const pages = config('pages') // Get Pages from config

//Menu
export default [
  {
    title: 'Menus',
    icon: 'fas fa-bars',
    children: [
      pages.qmenu.menus,//menus index
      pages.qmenu.menuitems,//menuitems index
    ]
  },
]
