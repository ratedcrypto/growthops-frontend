import type { GetServerSideProps, NextPage } from "next";
import { IPlant } from "../../types";
import PlantDataService from "../../services/plant.service";

type Props = {
  plantsData: IPlant[];
  currentPage: number;
  totalPages: number;
};

const Index: NextPage<Props> = ({ plantsData, currentPage, totalPages }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center min-h-screen">
      <h1 className="text-3xl font-bold">Plants!</h1>
    </div>
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
