/**
 * Keeps track of the query part of the state: the searchbar + current view
 */

import {
  UPDATE_SEARCH_QUERY,
  UPDATE_CURRENT_STATION,
  UPDATE_ALL_STATIONS,
} from "../actionTypes";

const initialState = {
  allStations: [],
  currentStation: '',
  currentStationId: '',
  search: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        search: action.data,
      }
    case UPDATE_CURRENT_STATION:
      return {
        ...state,
        currentStation: action.data.stationName,
        currentStationId: action.data.stationId,
      }
    case UPDATE_ALL_STATIONS:
      return {
        ...state,
        allStations: action.data,
      }
    default:
      return state;
  }
}