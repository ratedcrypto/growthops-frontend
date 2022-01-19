import axios from "../libs/axios";

class PlantDataService {
  getAll(params: { page: string | string[] }) {
    return axios.get("/v1/plants", { params });
  }

  get(params: { id: string }) {
    return axios.get(`/v1/plants/${params.id}`);
  }
}

export default new PlantDataService();
