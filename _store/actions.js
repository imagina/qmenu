/*Services*/
import menuService from '../_services/menu'

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
