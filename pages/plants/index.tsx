import React, { useState, useEffect, useRef } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { IPlant } from "../../types";
import PlantDataService from "../../services/plant.service";
import { ALERT_TEXT, ALERT_TITLE } from "../../constants";
import PlantGridCell from "../../components/PlantGridCell";

type Props = {
  plantsData: IPlant[];
  currentPage: number;
  totalPages: number;
};

const Index: NextPage<Props> = ({ plantsData, currentPage, totalPages }) => {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const plantsDataRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (plantsData) {
      setPlants(plantsData);
    }

    setLoading(false);
  }, [plantsData]);

  return (
    <>
      <div className="plantsDataRef p-20">
        {loading ? (
          <div className="flex items-center justify-center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="mt-5">
            <h2 className="text-2xl font-bold leading-5 text-gray-900 sm:text-3xl sm:truncate">
              All Plants
            </h2>
            {plants.length > 0 ? (
              <div>
                <div
                  ref={plantsDataRef}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-5"
                >
                  {plants.map((plant) => (
                    <PlantGridCell plant={plant} key={plant.id} />
                  ))}
                </div>
              </div>
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

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let plantsData = [];
  let totalPages = 0;
  let currentPage = context.query?.page || "1";
  try {
    const result = await PlantDataService.getAll({ page: currentPage });
    plantsData = result.data.data.data;
    totalPages = result.data.data.last_page;
  } catch (err) {
    console.log(err);
  }

  return { props: { plantsData, currentPage, totalPages } };
};
