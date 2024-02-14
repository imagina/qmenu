/*Services*/
import crud from 'modules/qcrud/_services/baseService'
import { helper } from 'src/plugins/utils'

export const MENU_MAIN = ({ commit, state, dispatch }, criteria, params = {}) => {
   params = {
    refresh: true,
    params: {
      include:'menuitems'
    }
  }
  return new Promise(async (resolve, reject) => {
    await crud.show('apiRoutes.qmenu.menus', criteria, params)
      .then(response => {
        commit('MENU_SUCCESS',  response.data)
        helper.storage.set('menu.main',response.data)
        resolve(true)
      })
      .catch(error=>{
        reject(error)
      })
  })
}

export const GET_MENUS = ({ commit, state, dispatch }, params = {}) => {
  params = {
    refresh: true,
    params: {
      include:'menuitems'
    }
  }
  return new Promise(async (resolve, reject) => {
    await crud.index('apiRoutes.qmenu.menus', params)
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
    await crud.index('apiRoutes.qmenu.menuItems', params)
      .then(response => {
      commit('SET_MENU_ITEMS', response.data)
  resolve(true)
})
.catch(error=>{
    reject(error)
  })
})
}
