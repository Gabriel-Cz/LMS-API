import { ApiResponse } from '../entities/response.entity';

export function ApiResponses<T extends Record<string, ApiResponse>>(arg: T): T {
  return arg;
}

const Error = ApiResponses({
  BAD_REQUEST: {
    description:
      'The server cannot or will not process the request due to something that is perceived to be a client error',
    status: 400,
  },
  UNAUTHORIZED_ERROR: {
    description: "The user is don't authenticated",
    status: 401,
  },
  FORBIDDEN_ERROR: {
    description: "The user don't have the permissions for this operation",
    status: 403,
  },
  NOT_FOUND: {
    description: 'The server cannot find the requested resource',
    status: 404,
  },
  UNKNOWN_ERROR: {
    description:
      'The server has encountered a situation it does not know how to handle.',
    status: 500,
  },
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
  UPDATE_USER: {
    description: "The user couldn't be updated",
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
  CREATE_LEARNER: {
    description: "The learner couldn't be created",
    status: 500,
  },
  GET_LEARNERS: {
    description:
      "The list of learners for the specified provider couldn't be retrieved",
    status: 500,
  },
  CREATE_INSTRUCTOR: {
    description: "The instructor couldn't be created",
    status: 500,
  },
});

export default Error;
