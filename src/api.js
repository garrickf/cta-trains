/**
 * Presents a layer for communicating with the CTA API.
 */
const parseString = require('xml2js').parseString;

const STATIONS_URL = 'https://data.cityofchicago.org/resource/8pix-ypme.json'
const ARRIVALS_URL = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx';
const API_KEY = '7612a994470f4195b0d9f3a2c5b56947';


var instance;
var stationNamesToIds = {};
var stationIdsToNames = {};
var cachedStations;

function TransitAPI() {}

TransitAPI.getInstance = function() {
    if (!instance) {
        instance = new TransitAPI();
    }
    return instance;
}

async function getArrivalsForStationXML(id, max) {
    const response = await fetch(`${ARRIVALS_URL}?key=${API_KEY}&max=${max}&mapid=${id}`);
    const xml = await response.text();
    return xml;
}

async function getStationsJSON() {
    const response = await fetch(STATIONS_URL);
    const json = await response.json();
    return json;
}

TransitAPI.prototype.getArrivalsForStation = function(id, callback) {
    const max = '10'
    getArrivalsForStationXML(id, max).then(xml => {
        parseString(xml, (err, res) => {
            if (err) {
                console.log(err)
                return null;
            }
            callback(res);
        });
    });
    // console.log(xml);
}

// Assume that stations only need to fetched once. We can cache
// the results to avoid future calls
TransitAPI.prototype.getStations = function(callback) {
    if (cachedStations) {
        callback(cachedStations);
        return;
    }
    
    console.log('API call to grab station names...')
    getStationsJSON().then(json => {
        json.forEach(s => {
            stationIdsToNames[s.stop_id] = s.station_name;
            stationNamesToIds[s.station_name] = s.stop_id;
        });

        cachedStations = json;
        callback(cachedStations);
    });
}

// Translate between station names and id's
TransitAPI.prototype.stationNameToId = function(name) {
    return stationNamesToIds[name];
}

TransitAPI.prototype.stationIdToName = function(id) {
    return stationIdsToNames[id];
}

export default TransitAPI;
