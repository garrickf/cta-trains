## cta-trains
A small train tracker app with simple functionality for:
- Viewing estimated arrival times at a station
- Searching for stations

Some design and implementation notes:
- The front end is organized into a directory structure of `pages`, which have `layouts`, which have `components`
- [Rebass](https://rebassjs.org/) was used to mock the UI up quickly. I've been curious about it for a while, but this 
  is this the first time actually trying it, and it feels nice.
- There's a small slice of [Redux](https://redux.js.org/) managing state info for the query (since, e.g., the search    
  bar updates it, and the search view consumes it). The [hooks syntax](https://react-redux.js.org/api/hooks) was used.
- The app ingests the [TrainTracker API](https://www.transitchicago.com/developers/ttdocs/) for arrival times as well
  as [a JSON object](https://data.cityofchicago.org/Transportation/CTA-System-Information-List-of-L-Stops/8pix-ypme) of 
  the L stops in order to list and search over stations. `mapid` is used as a common key between API and dataset.

In terms of future possibilities:
- It would be interesting to do more aggregation on the stations (across platforms) so the search only goes by 
  stations.
- With the above, knowing the lines and the stations along them would allow for a small visual "map" to be displayed
  with the station.
- It would be cool to have the cards be clickable and explore trains in addition to stations. Using more API (perhaps
  the follow this train API, or using prior knowledge about the lines as above) to display not just the end destination,
  but the destination one stop and two stops down would be nice.
- Offloading and caching more of the on-the-fly calculations to the `api.js` layer. For example, we do a few
  transformations in the `SearchView` that don't need to be done on every update.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To run, `cd` to the project directory, then run:

```npm start```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
