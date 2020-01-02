import {
  ON_AUTOCOMPLETE_PENDING,
  ON_AUTOCOMPLETE_SUCCESS,
  ON_AUTOCOMPLETE_FAILED
} from './constants';

// import autocompleteCities from '../../autocomplete.json';

const INITIAL_STATE = {
  search: {
    isPending: false,
    cities: [],
    error: null
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

export {
  autocomplete
}