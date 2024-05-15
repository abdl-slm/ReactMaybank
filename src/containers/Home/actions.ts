import * as types from './types';

export const requestLocation = (data: string) => ({
  type: types.REQUEST_LOCATION,
  payload: data,
});

export const requestLocationSuccess = (data: string) => ({
  type: types.REQUEST_LOCATION_SUCCESS,
  payload: data,
});

export const requestLocationFailed = () => ({
  type: types.REQUEST_LOCATION_FAILED,
});
