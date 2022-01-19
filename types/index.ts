export interface IPlant {
  id: number;
  name: string;
  species: string;
  watering_instructions: string;
  photo: string;
}

export interface IAddPlantFormInput {
  name: string;
  species: string;
  watering_instructions: string;
  photo: {
    message: string;
    0: {
      name: string;
      size: number;
    };
  };
}

export interface IAddPlantResponseErrors {
  name: string[];
  species: string[];
  watering_instructions: string[];
  photo: string[];
}
