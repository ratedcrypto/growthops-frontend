import { MarkdownPreview } from "../libs/markdown";
import { IPlant } from "../types";
import Image from "next/image";
import imageLoader from "../utils/imageLoader";
import {
  PLANT_DETAILS_IMAGE_WIDTH,
  PLANT_DETAILS_IMAGE_HEIGHT,
  PLANT_WATERING_INSTRUCTION,
} from "../constants";

type Props = {
  plant: IPlant;
  key: number;
};

const PlantDetail: React.FC<Props> = ({ plant }) => {
  return (
    <>
      <h2 className="text-2xl font-bold leading-5 text-gray-900 sm:text-3xl sm:truncate">
        Plant Details {plant.id}
      </h2>
      <div className="md:flex py-10">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block">
          <Image
            width={PLANT_DETAILS_IMAGE_WIDTH}
            height={PLANT_DETAILS_IMAGE_HEIGHT}
            src={plant.photo}
            loader={imageLoader}
            alt="photo"
          />
        </div>
        <div className="xl:w-2/3 md:w-2/3 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="pb-6">
            <p className="text-sm leading-none text-gray-300 ">Name</p>
            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-black-300 mt-2">
              {plant.name}
            </p>
          </div>
          <div className="pb-6">
            <p className="text-sm leading-none text-gray-300 ">Species</p>
            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-black-300 mt-2">
              {plant.species}
            </p>
          </div>
          <div className="pb-6">
            <p className="text-sm leading-none text-gray-300 ">
              Watering Instructions
            </p>
            <div className="xl:pr-48 text-base lg:leading-tight leading-normal text-black-300 mt-2">
              <MarkdownPreview
                source={
                  plant.watering_instructions
                    ? plant.watering_instructions
                    : PLANT_WATERING_INSTRUCTION
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlantDetail;
