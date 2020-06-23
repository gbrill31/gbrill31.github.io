import { GLOBAL } from "../consts";

const INITIAL_STATE = {
  isSearchPending: false,
  foundCities: [],
  searchError: null,
  units: "C",
  isDarkModeOn: false,
};

const global = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GLOBAL.ON_AUTOCOMPLETE_PENDING:
      return { ...state.search, isSearchPending: true };
    case GLOBAL.ON_AUTOCOMPLETE_SUCCESS:
      return {
        ...state.search,
        isSearchPending: false,
        searchError: null,
        foundCities: action.payload,
      };
    case GLOBAL.ON_AUTOCOMPLETE_FAILED:
      return {
        ...state.search,
        isSearchPending: false,
        searchError: action.payload,
      };

    case GLOBAL.ON_TEMPRATURE_UNITS_UPDATE:
      return { ...state.temprature, units: action.payload };

    case GLOBAL.ON_DARK_MODE_UPDATE:
      return { ...state.darkMode, isDarkModeOn: action.payload };

    default:
      return state;
  }
};

// const autocomplete = (state = INITIAL_STATE.search, action = {}) => {
//   switch (action.type) {
//     case GLOBAL.ON_AUTOCOMPLETE_PENDING:
//       return { ...state, isPending: true };
//     case GLOBAL.ON_AUTOCOMPLETE_SUCCESS:
//       return { ...state, isPending: false, cities: action.payload };
//     case GLOBAL.ON_AUTOCOMPLETE_FAILED:
//       return { ...state, isPending: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const tempratureUnits = (state = INITIAL_STATE.temprature, action = {}) => {
//   switch (action.type) {
//     case GLOBAL.ON_TEMPRATURE_UNITS_UPDATE:
//       return { ...state, units: action.payload };
//     default:
//       return state;
//   }
// };

// const darkMode = (state = INITIAL_STATE.darkMode, action = {}) => {
//   switch (action.type) {
//     case GLOBAL.ON_DARK_MODE_UPDATE:
//       return { ...state, isDarkModeOn: action.payload };
//     default:
//       return state;
//   }
// };

export default global;
