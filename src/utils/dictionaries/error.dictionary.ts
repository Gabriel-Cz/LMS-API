import { ApiResponse } from '../entities';

export const Error: { [label: string]: ApiResponse } = {
  GET_LECTURE: {
    status: 500,
    description: 'Lecture created',
  },
  GET_LECTURES_FOR_ONE: {
    status: 500,
    description: 'Lecture created',
  },
  CREATE_LECTURE: {
    status: 500,
    description: 'Lecture created',
  },
  UPDATE_LECTURE: {
    status: 500,
    description: 'Lecture created',
  },
  DELETE_LECTURE: {
    status: 500,
    description: 'Lecture created',
  },
};
