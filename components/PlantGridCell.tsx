import Link from "next/link";
import { IPlant } from "../types";
import Image from "next/image";
import imageLoader from "../utils/imageLoader";
import {
  PLANT_GRID_CELL_IMAGE_WIDTH,
  PLANT_GRID_CELL_IMAGE_HEIGHT,
} from "../constants";

type Props = {
  plant: IPlant;
  key: number;
};

const PlantGridCell: React.FC<Props> = ({ plant }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        width={PLANT_GRID_CELL_IMAGE_WIDTH}
        height={PLANT_GRID_CELL_IMAGE_HEIGHT}
        src={plant.photo}
        loader={imageLoader}
        alt="photo"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {plant.name}
        </div>
        <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
          {plant.species}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link href="/plants/[id]" as={`/plants/${plant.id}`}>
          <a className="flex flex-col justify-center items-center bg-gray-200 rounded-full px-3 py-1 text-md font-semibold text-blue-700 mr-2 mb-2">
            More
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PlantGridCell;
