import axios from "../libs/axios";

class PlantDataService {
  getAll(params: { page: string | string[] }) {
    return axios.get("/v1/plants", { params });
  }
}

export default new PlantDataService();
