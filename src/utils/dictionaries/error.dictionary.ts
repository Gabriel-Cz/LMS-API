import { ApiResponse } from "../entities/response.entity";

export function ApiResponses<T extends Record<string, ApiResponse>>(arg: T): T {
  return arg;
}

const Error = ApiResponses({
  UNKNOWN_ERROR: {
    description: 'Unknown error',
    status: 500
  },
  // Auth
  SIGN_UP: {
    description: "The user couldn't sign up",
    status: 500,
  },
  LOGIN: {
    description: "The user couldn't login",
    status: 500,
  },
  UPDATE_PASSWORD: {
    description: "The password couldn't be updated",
    status: 500,
  },
  CREATE_LECTURE: {
    description: "The lecture couldn't be created",
    status: 500,
  },
  GET_LECTURES: {
    description: "The lectures couldn't be retrieved",
    status: 500,
  },
  GET_LECTURE: {
    description: "The lecture couldn't be retrieved",
    status: 500,
  },
  UPDATE_LECTURE: {
    description: "The lecture couldn't be updated",
    status: 500,
  },
  DELETE_LECTURE: {
    description: "The lecture couldn't be deleted",
    status: 500,
  },
  CREATE_TEST: {
    description: "The test couldn't be created",
    status: 500,
  },
  GET_TESTS: {
    description: "The tests couldn't be retrieved",
    status: 500,
  },
  GET_TEST: {
    description: "The test couldn't be retrieved",
    status: 500,
  },
  UPDATE_TEST: {
    description: "The test couldn't be updated",
    status: 500,
  },
  DELETE_TEST: {
    description: "The test couldn't be deleted",
    status: 500,
  },
});

export default Error;