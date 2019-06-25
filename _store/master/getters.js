/*
export const someGetter = (state) => {}
*/
export const mainMenu = (state) => {
  let mainMenu = []

  if(state.mainMenu){
    mainMenu = state.mainMenu
  }

  return mainMenu
};

export function menus (state){
  return state.menus
}

export function menuItems (state){
  return state.menuItems
}
