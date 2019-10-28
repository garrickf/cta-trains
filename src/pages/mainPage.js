import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    getStations,
    getCurrentStationName,
    getCurrentStationId,
} from '../redux/selectors';
import { updateStations } from '../redux/actions';

import TransitAPI from '../api';
import CardLayout from '../layouts/cardLayout';
import SearchLayout from '../layouts/searchLayout';
import Header from '../components/header';

export default () => {
    const stations = useSelector(getStations);
    const currentStationName = useSelector(getCurrentStationName);
    const currentStationId = useSelector(getCurrentStationId);

    const dispatch = useDispatch();

    useEffect(() => {
        TransitAPI
            .getInstance()
            .getStations((s) => {
                dispatch(updateStations(s))
            });
    }, [dispatch]);

    return (
        <>
            <Header stations={stations} />
            <SearchLayout />
            <CardLayout stationName={currentStationName} stationId={currentStationId} />
        </>
    );
}