import React, { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { CircularProgress } from "@mui/material";
import PlantDataService from "../../services/plant.service";
import { IPlant } from "../../types";
import PlantDetail from "../../components/PlantDetail";
import { ALERT_TITLE, ALERT_TEXT } from "../../constants";
import ErrorPage from "next/error";

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
        {!plant && (
          <ErrorPage statusCode={404} title={`${ALERT_TITLE} ${ALERT_TEXT}`} />
        )}
        {loading && (
          <div className="flex items-center justify-center">
            <CircularProgress color="secondary" />
          </div>
        )}
        <div className="mt-5">
          {plant && <PlantDetail plant={plant} key={plant.id} />}
        </div>
      </div>
    </>
  );
};

export default Plant;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context.params?.id || "";
    const result = await PlantDataService.get({ id: id.toString() });
    if (result.status === 200) {
      const plantData = result.data.data;
      if (typeof plantData === "object") {
        return {
          props: {
            plantData,
          },
        };
      }
    }
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      plantData: null,
    },
  };
};
