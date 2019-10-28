import React, { useEffect, useState } from 'react';
import {
    Flex,
    Heading,
} from 'rebass';

import TransitAPI from '../api';
import Card from '../components/card';

export default ({stationName, stationId}) => {
    const [etas, setEtas] = useState([]);

    useEffect(() => {
        TransitAPI
            .getInstance()
            .getArrivalsForStation(stationId, (a) => {
                console.log(a);
                setEtas(a.ctatt.eta);
            });

        TransitAPI.getInstance().getStations((stations) => {
            console.log(stations);
        });
    }, [stationId]);

    console.log(etas);

    if (stationName === '' || !etas) return (
        <Flex alignItems='center' justifyContent='center'>
            <Heading fontSize={5} p={3} color='gray'>No station selected yet!</Heading>
        </Flex>
    );

    // Filter the etas by the station's platforms, and present a card view for each.
    var uniqPlatforms = []
    etas.forEach(eta => {
        if (uniqPlatforms.includes(eta.stpDe[0])) return;
        uniqPlatforms.push(eta.stpDe[0]);
    });

    return (
        <>
            <Heading fontSize={5} p={3}>{`${stationName} Station`}</Heading>

            {uniqPlatforms.map(platform => (
                <>
                    <Heading p={3}>{platform}</Heading>
                    <Flex flexWrap='wrap' p={2}>
                        {etas.filter(eta => {return eta.stpDe[0] === platform}).map(eta => (
                            <Card eta={eta}></Card>
                        ))}
                    </Flex>
                </>
            ))}
        </>
    );
}