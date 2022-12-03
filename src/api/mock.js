import axios from "axios"
export default {
  getMockJson(index) {
    return axios({
      url: `/mock/${index}.json`,
      method: "get"
    });
  },
}