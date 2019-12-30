import {
  ON_AUTOCOMPLETE_PENDING,
  ON_AUTOCOMPLETE_SUCCESS,
  ON_AUTOCOMPLETE_FAILED,
  ON_AUTOCOMPLETE_SELECTED,
  ON_SELECTED_CURRENT_CONDITIONS,
  ON_SELECTED_CURRENT_FORECAST

} from './constants';

const INITIAL_STATE = {
  search: {
    isPending: false,
    cities: [],
    error: ''
  },
  city: {
    selected: null,
    currentConditions: null,
    forecast: []
  }
}

const autocompleteSearch = (state = INITIAL_STATE.search, action = {}) => {
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

const autocompleteSelect = (state = INITIAL_STATE.city, action = {}) => {
  switch (action.type) {
    case ON_AUTOCOMPLETE_SELECTED:
      return { ...state, selected: action.payload };
    case ON_SELECTED_CURRENT_CONDITIONS:
      return { ...state, currentConditions: action.payload };
    case ON_SELECTED_CURRENT_FORECAST:
      return { ...state, forecast: action.payload };
    default:
      return state;
  }
};

export {
  autocompleteSearch,
  autocompleteSelect
}