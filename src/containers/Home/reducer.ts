import * as types from './types';
import { IAction } from  '../../interfaces/store';

interface IState {
  loading: boolean;
  location: string;
}

const initialState: IState = {
  loading: false,
  location: ''
};

const homeReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.REQUEST_LOCATION: {
      return { ...state, location: action.payload, loading: true};
    }
    case types.REQUEST_LOCATION_SUCCESS: {
      return { ...state, location: action.payload, loading: false};
    }
    case types.REQUEST_LOCATION_FAILED: {
      return { ...state, loading: false};
    }
    default: {
      return state;
    }
  }
};

export default homeReducer;
