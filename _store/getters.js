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

