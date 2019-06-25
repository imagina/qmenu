/*Services*/
import menuService from '@imagina/qmenu/_services/menu'
import service from '@imagina/qmenu/_services/index'

/**
 * Request menu by ID
 * @param commit
 * @param dispatch
 * @param route
 * @returns {Promise<any>}
 * @constructor
 */
export const MENU_MAIN = ({commit, dispatch}) => {
  return new Promise((resolve, reject) => {
    menuService.show(1).then((menu) => {
      commit('MENU_SUCCESS', menu.data)
      resolve(menu)
    }).catch((error) => {
      reject(error)
    })
  })
}
export const GET_MENUS = ({ commit, state, dispatch }, params = {}) => {
  return new Promise(async (resolve, reject) => {
    await service.crud.index('apiRoutes.qmenu.menus', params)
      .then(response => {
      commit('SET_MENUS',  response.data)
  resolve(true)
})
.catch(error=>{
    reject(error)
  })
})
}

export const GET_MENU_ITEMS = ({ commit, state, dispatch }, params = {}) => {
  return new Promise(async (resolve, reject) => {
    await service.crud.index('apiRoutes.qmenu.menuItems', params)
      .then(response => {
      commit('SET_MENU_ITEMS', response.data)
  resolve(true)
})
.catch(error=>{
    reject(error)
  })
})
}
