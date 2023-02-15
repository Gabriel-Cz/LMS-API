import { ApiResponse } from '../entities/response.entity';

export function ApiResponses<T extends Record<string, ApiResponse>>(arg: T): T {
  return arg;
}

const Success = ApiResponses({
  // Auth
  SIGN_UP: {
    description: 'Successfully sign up',
    status: 201,
  },
  LOGIN: {
    description: 'Successfully login',
    status: 200,
  },
  UPDATE_PASSWORD: {
    description: 'User password successfully updated',
    status: 500,
  },
  CREATE_LECTURE: {
    description: 'Lecture successfully created',
    status: 201,
  },
  GET_LECTURES: {
    description: 'Lecture successfully retrieved',
    status: 200,
  },
  GET_LECTURE: {
    description: 'Lecture successfully retrieved',
    status: 200,
  },
  UPDATE_LECTURE: {
    description: 'Lecture successfully updated',
    status: 200,
  },
  DELETE_LECTURE: {
    description: 'Lecture successfully deleted',
    status: 204,
  },
  CREATE_TEST: {
    description: 'Test successfully created',
    status: 201,
  },
  GET_TESTS: {
    description: 'Test successfully retrieved',
    status: 200,
  },
  GET_TEST: {
    description: 'Test successfully retrieved',
    status: 200,
  },
  UPDATE_TEST: {
    description: 'Test successfully updated',
    status: 200,
  },
  DELETE_TEST: {
    description: 'Test successfully deleted',
    status: 204,
  },
  CREATE_LEARNER: {
    description: "The test couldn't be deleted",
    status: 500,
  },
  GET_LEARNERS: {
    description:
      "The list of learners for the specified provider couldn't be retrieved",
    status: 500,
  },
  CREATE_INSTRUCTOR: {
    description: 'Instructor successfully created',
    status: 201,
  },
});

export default Success;
