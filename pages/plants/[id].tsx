import React, { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import PlantDataService from "../../services/plant.service";
import { IPlant } from "../../types";
import PlantDetail from "../../components/PlantDetail";
import { ALERT_TEXT, ALERT_TITLE } from "../../constants";

type Props = {
  plantData: IPlant | null;
};

const Plant: NextPage<Props> = ({ plantData }) => {
  const [plant, setPlant] = useState<IPlant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (plantData) {
      setPlant(plantData);
    }
    setLoading(false);
  }, [plantData]);

  return (
    <>
      <div className="p-20">
        {loading ? (
          <div className="flex items-center justify-center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="mt-5">
            {plant ? (
              <PlantDetail plant={plant} key={plant.id} />
            ) : (
              <Alert severity="error" variant="outlined">
                <AlertTitle>{ALERT_TITLE}</AlertTitle>
                {ALERT_TEXT}
              </Alert>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Plant;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let id = context.query.id as string;
  let plantData = null;
  try {
    const result = await PlantDataService.get({
      id,
    });
    plantData = result.data.data;
  } catch (err) {
    console.log(err);
  }

  return { props: { plantData } };
};
