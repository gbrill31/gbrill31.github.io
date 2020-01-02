import {
  ON_AUTOCOMPLETE_PENDING,
  ON_AUTOCOMPLETE_SUCCESS,
  ON_AUTOCOMPLETE_FAILED,
  ON_TEMPRATURE_UNITS_UPDATE
} from './constants';

// import autocompleteCities from '../../autocomplete.json';

const INITIAL_STATE = {
  search: {
    isPending: false,
    cities: [],
    error: null
  },
  temprature: {
    units: 'C'
  }
}

const autocomplete = (state = INITIAL_STATE.search, action = {}) => {
  switch (action.type) {
    case ON_AUTOCOMPLETE_PENDING:
      return { ...state, isPending: true };
    case ON_AUTOCOMPLETE_SUCCESS:
      return { ...state, isPending: false, cities: action.payload };
    case ON_AUTOCOMPLETE_FAILED:
      return { ...state, isPending: false, error: action.payload };
    default:
      return state;
  }
};

const tempratureUnits = (state = INITIAL_STATE.temprature, action = {}) => {
  switch (action.type) {
    case ON_TEMPRATURE_UNITS_UPDATE:
      return { ...state, units: action.payload };
    default:
      return state;
  }
};

export {
  autocomplete,
  tempratureUnits
}