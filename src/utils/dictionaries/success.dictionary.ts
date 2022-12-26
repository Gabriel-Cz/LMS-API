import { ApiResponse } from './entities/response.entity';

export const Success: { [label: string]: ApiResponse } = {
  GET_LECTURE: {
    status: 200,
    description: 'Lecture created',
  },
};
