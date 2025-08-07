import Joi from "joi";
import httpStatus from "../utils/httpStatus.js";
import ApiError from "../utils/ApiError.js";

const ValidationSource = {
  BODY: "body",
  QUERY: "query",
  PARAM: "params",
  HEADER: "headers",
};

const validate = (schema, source = ValidationSource.BODY) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[source]);
      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");

      console.error(message);
      next(new ApiError(httpStatus.badRequest, message));
    } catch (e) {
      next(e);
    }
  };
};

export default validate;
export { ValidationSource };
