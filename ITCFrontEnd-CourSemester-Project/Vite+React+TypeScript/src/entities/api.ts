import { FetchDataPayload, DataResponse } from '../app/saga/saga'

export const api = {
  fetchData: async (payload: FetchDataPayload): Promise<DataResponse> => {
    const response = await fetch(`/api/data/${payload.id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
};
