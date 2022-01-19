import React, { useState } from "react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  InputLabel,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import PlantDataService from "../../services/plant.service";
import AWSService from "../../services/aws.service";
import { IAddPlantFormInput, IAddPlantResponseErrors } from "../../types";
import plantFormInputValidator from "../../utils/plantFormInputValidator";
import { MDEditor } from "../../libs/markdown";
import { PLANT_WATERING_INSTRUCTION } from "../../constants";

const Add: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [responseErrors, setResponseErrors] =
    useState<IAddPlantResponseErrors | null>(null);
  const [wateringInstructions, setWateringInstructions] = useState<string>(
    PLANT_WATERING_INSTRUCTION
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddPlantFormInput>({
    resolver: yupResolver(plantFormInputValidator),
  });

  const onSubmit = async (data: IAddPlantFormInput) => {
    setLoading(true);
    const s3Response = await AWSService.uploadToS3(data);
    try {
      const response = await PlantDataService.add({
        name: data.name,
        species: data.species,
        watering_instructions: wateringInstructions,
        photo: null
          ? s3Response.Location
          : `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL_WITH_HTTPS}/plant-placeholder.jpeg`,
      });
      setResponseErrors(null);
      router.push(`/plants/${response.data.data.id}`);
    } catch (err: any) {
      setResponseErrors(err.response.data.errors);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="p-20">
        {loading && (
          <div className="flex items-center justify-center mb-5">
            <CircularProgress color="secondary" />
          </div>
        )}
        {responseErrors && (
          <Alert severity="error" variant="outlined" className="mb-5">
            <AlertTitle>Whoops!</AlertTitle>
            {responseErrors.name}
            {responseErrors.species}
            {responseErrors.watering_instructions}
            {responseErrors.photo}
          </Alert>
        )}
        <h2 className="text-2xl font-bold leading-5 text-gray-900 sm:text-3xl sm:truncate mt-5">
          Add Plant
        </h2>
        <div className="md:block py-5">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register("name")}
              variant="standard"
              margin="normal"
              label="Name"
              helperText={errors.name?.message}
              error={!!errors.name?.message}
              fullWidth
              required
            />

            <TextField
              {...register("species")}
              variant="standard"
              margin="normal"
              label="Species"
              helperText={errors.species?.message}
              error={!!errors.species?.message}
              fullWidth
            />

            <InputLabel variant="standard" className="mt-5">
              Watering Instructions
            </InputLabel>
            <MDEditor
              value={wateringInstructions}
              onChange={setWateringInstructions}
              height={500}
            />

            <TextField
              {...register("photo")}
              type="file"
              variant="standard"
              margin="normal"
              label="Photo"
              helperText={errors.photo?.message}
              error={!!errors.photo?.message}
              fullWidth
              required
              className="mt-0 pt-0"
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="secondary"
              className="mt-5"
            >
              Add Plant
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
