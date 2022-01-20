import axios from "../libs/axios";

class PlantDataService {
  getAll(params: { page: string }) {
    return axios.get("/v1/plants", { params });
  }

  get(params: { id: string }) {
    return axios.get(`/v1/plants/${params.id}`);
  }

  add(data: {
    name: string;
    species: string;
    watering_instructions: string;
    photo: string;
  }) {
    return axios.post("/v1/plants", data);
  }
}

export default new PlantDataService();
