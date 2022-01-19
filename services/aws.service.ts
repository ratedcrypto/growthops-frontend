import { S3, S3_BUCKET } from "../libs/aws";
import { IAddPlantFormInput } from "../types";

class AWSService {
  uploadToS3(data: IAddPlantFormInput) {
    return S3.upload({
      ACL: "public-read",
      Body: data?.photo[0],
      Bucket: S3_BUCKET,
      Key: data?.photo[0]?.name,
    }).promise();
  }
}

export default new AWSService();
