import * as a from "./actionTypes"

// Query actions
export const updateSearchQuery = (query) => ({
    type: a.UPDATE_SEARCH_QUERY,
    data: query,
});

export const updateCurrentStation = (stationName, stationId) => ({
    type: a.UPDATE_CURRENT_STATION,
    data: {
        stationName,
        stationId
    },
});

export const updateStations = (stations) => ({
    type: a.UPDATE_ALL_STATIONS,
    data: stations,
});
