import React, { useState, useEffect, useRef } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { CircularProgress, Pagination } from "@mui/material";
import { IPlant } from "../../types";
import PlantDataService from "../../services/plant.service";
import { ALERT_TITLE, ALERT_TEXT } from "../../constants";
import PlantGridCell from "../../components/PlantGridCell";
import ErrorPage from "next/error";

type Props = {
  plantsData: IPlant[];
  currentPage: number;
  totalPages: number;
};

const Index: NextPage<Props> = ({ plantsData, currentPage, totalPages }) => {
  const router = useRouter();
  const [plants, setPlants] = useState<IPlant[]>([]);
  const plantsDataRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(currentPage);

  useEffect(() => {
    if (plantsData) {
      setPlants(plantsData);
    }
    setPage(parseInt(router.query.page ? (router.query.page as string) : "1"));
    setLoading(false);
  }, [plantsData, router.query.page]);

  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const query = router.query;
    query.page = value.toString();
    router.push({
      pathname: router.pathname,
      query: query,
    });
    if (null !== plantsDataRef.current) {
      plantsDataRef.current.scrollIntoView();
    }
  };

  return (
    <>
      <div className="plantsDataRef p-20">
        {!plantsData && (
          <ErrorPage statusCode={404} title={`${ALERT_TITLE} ${ALERT_TEXT}`} />
        )}
        {loading && (
          <div className="flex items-center justify-center">
            <CircularProgress color="secondary" />
          </div>
        )}
        {plants.length > 0 && (
          <div className="mt-5">
            <h2 className="text-2xl font-bold leading-5 text-gray-900 sm:text-3xl sm:truncate">
              All Plants
            </h2>
            <div
              ref={plantsDataRef}
              className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-5"
            >
              {plants.map((plant) => (
                <PlantGridCell plant={plant} key={plant.id} />
              ))}
            </div>
            <Pagination
              count={totalPages}
              color="primary"
              onChange={handlePagination}
              page={page}
              className="flex justify-center items-center mt-8"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const currentPage = context.query?.page || "1";
    const result = await PlantDataService.getAll({ page: currentPage });
    if (result.status === 200) {
      const plantsData = result.data.data.data || [];
      const totalPages = result.data.data.last_page || 0;
      return { props: { plantsData, currentPage, totalPages } };
    }
  } catch (err) {
    console.log(err);
  }

  return {
    props: {} as never,
  };
};
