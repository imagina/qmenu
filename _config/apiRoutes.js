const baseApiUrl = env('BASE_URL', 'http://localhost:8000') + '/api';
const moduleName = 'imenu';
const urlBase = `${baseApiUrl}/${moduleName}`;

export default {
  menus: `${urlBase}/menu`,
  menuItems: `${urlBase}/menuitem`,
}
