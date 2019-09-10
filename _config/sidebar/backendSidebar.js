import appConfig from 'src/config/app'

let response = []//Response

//Autoload sidebars of modules
if (appConfig) {
  let modules = appConfig.modules
  modules.forEach((name) => {
    try {
      let moduleSidebar = require(`@imagina/${name}/_config/sidebar`).default
      if (moduleSidebar && moduleSidebar[0]) {
        response = response.concat(moduleSidebar)
      }
    } catch (e) {}
  })
}

//Export
export default response
