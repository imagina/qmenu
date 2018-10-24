import config from 'src/config/index'
import http from "axios"

export default {

  /**
   * Get preleads
   */
  show(id) {
    return new Promise((resolve, reject) => {
      http.get(config('api.api_url') + '/menu/'+id)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject([]);
        })
    });
  },
}
