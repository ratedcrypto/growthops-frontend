import * as yup from "yup";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../constants";

const plantFormInputValidator = yup.object().shape({
  name: yup.string().required().min(3).max(255),
  species: yup.string().required().min(3).max(500),
  photo: yup
    .mixed()
    .test(
      "required",
      "photo is a required field",
      (value) => value && value.length > 0
    )
    .test("fileSize", "file is too large", (value) => {
      if (value && value.length > 0) {
        return value[0].size <= FILE_SIZE;
      }
      return false;
    })
    .test("fileFormat", "file format is not supported", (value) => {
      if (value && value.length > 0) {
        return SUPPORTED_FORMATS.includes(value[0].type);
      }
      return false;
    }),
});

export default plantFormInputValidator;
