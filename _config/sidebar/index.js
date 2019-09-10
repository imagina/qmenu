import appConfig from 'src/config/app'
import backendSidebar from '@imagina/qmenu/_config/sidebar/backendSidebar'
import frontendSidebar from '@imagina/qmenu/_config/sidebar/frontendSidebar'

let response = []

//CHeck is app is backend to return sidebar
if(appConfig){
  response = (appConfig.isBackend) ? backendSidebar : frontendSidebar
}

export default response
